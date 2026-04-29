/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Lightformer, Loader, Decal, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// Pointing to public assets (Next.js approach)
const cardGLB = '/assets/lanyard/card.glb';

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position, fov }}
        // Optimasi: Membatasi DPR maksimal ke 1.5 agar tidak membebani GPU pada layar beresolusi tinggi (Retina/4K)
        dpr={[1, 1.5]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI} />
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
          {/* Optimasi: Menurunkan resolusi Environment map dari default (1024) ke 256. Sangat meringankan GPU tapi pantulan tetap terlihat bagus */}
          <Environment blur={0.75} resolution={256}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{ background: 'transparent' }}
        innerStyles={{ width: '200px' }}
        barStyles={{ background: 'var(--accent-purple)' }}
        dataInterpolation={(p) => `Memuat 3D... ${p.toFixed(0)}%`}
      />
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  // Single Rope Refs
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);

  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const stickerTexture = useTexture('/assets/foto/coding.png');

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -0.5, 0),
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(0, -1.5, 0)
    ])
  );

  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  // Titik temu tali dan pengait besi
  const stringAttachmentPoint: [number, number, number] = [0, 2.78, 0];

  // Setup sendi tali (Single Rope Joints)
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.7]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.8]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.7]);
  useSphericalJoint(j3, card, [[0, 0, 0], stringAttachmentPoint]);
  // Variabel untuk menghitung putaran saat ditarik
  const targetRot = useRef(new THREE.Quaternion());
  const currentRot = useRef(new THREE.Quaternion());

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });

      // Efek langsung muter saat ditarik (interaktif 3D)
      targetRot.current.setFromEuler(new THREE.Euler(0, state.pointer.x * (Math.PI * 1.5), 0));
      currentRot.current.slerp(targetRot.current, 0.15);
      card.current?.setNextKinematicRotation(currentRot.current);
    }

    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      // Mengubah geometri tali menjadi Tabung 3D (Bulat) setiap frame
      if (band.current) {
        band.current.geometry.dispose();
        // Optimasi: Mengurangi jumlah segmen tabung (radialSegments diturunkan ke 4/6) agar kalkulasi dan Garbage Collection sangat ringan
        band.current.geometry = new THREE.TubeGeometry(curve, isMobile ? 16 : 24, 0.05, isMobile ? 4 : 6, false);
      }
      if (card.current) {
        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());
        // Memaksa putaran Y agar selalu membal (kembali) menghadap ke depan
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
      }
    }
  });

  // Menghapus texture.wrapS karena sudah tidak menggunakan MeshLineMaterial
  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody position={[0, 0, 0]} ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
        <RigidBody position={[0, -0.5, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -1, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -1.5, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[0, -2, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          {/* Memperkecil kembali kotak fisiknya agar kartu tidak menjadi "berat/kaku" secara physics, sehingga mudah berputar */}
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={3.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              if (card.current) {
                drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
              }
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
                // Custom properti untuk menghilangkan logo tapi mempertahankan transparansi lubang
                color="#ffffff"
                transparent={true}
                alphaTest={0.5}
                onBeforeCompile={(shader) => {
                  shader.fragmentShader = shader.fragmentShader.replace(
                    '#include <map_fragment>',
                    `
                    #ifdef USE_MAP
                      vec4 texelColor = texture2D( map, vMapUv );
                      diffuseColor = vec4( diffuseColor.rgb, diffuseColor.a * texelColor.a );
                    #endif
                    `
                  );
                }}
              />
              {/* Ini adalah stiker/gambar yang ditempel ke atas kartu */}
              <Decal
                position={[0, -0.1, 0.02]} // Posisi stiker (X, Y, Z)
                rotation={[0, 0, 0]}       // Rotasi stiker
                scale={[0.7, 0.7, 0.7]}    // Ukuran stiker
                map={stickerTexture}
                depthTest={true}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      {/* Rendering 1 Tali Bulat (Tube) */}
      <mesh ref={band}>
        <tubeGeometry args={[curve, isMobile ? 24 : 64, 0.05, 8, false]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
      </mesh>
    </>
  );
}

// Preload model GLB agar langsung di-download saat file ini dibaca (menghilangkan delay render)
useGLTF.preload(cardGLB);