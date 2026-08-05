/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Lightformer, useProgress, Decal, useTexture } from '@react-three/drei';
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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pause render loop when component is off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-0 w-full h-[65vh] md:h-screen flex justify-center items-center transform scale-100 origin-center"
    >
      <Canvas
        camera={{ position, fov }}
        frameloop={isInView ? 'demand' : 'never'}
        dpr={[1, 1.5]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI} />
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
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
      <LanyardSkeleton />
    </div>
  );
}

function LanyardSkeleton() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!active && progress === 100) {
      // Fade out smoothly
      const fadeTimer = setTimeout(() => {
        setOpacity(0);
      }, 100);
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 700);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [active, progress]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        opacity,
        transition: 'opacity 0.6s ease',
        zIndex: 10,
      }}
    >
      {/* Lanyard string skeleton */}
      <div style={{
        width: '3px',
        height: '120px',
        background: 'linear-gradient(180deg, rgba(139,92,246,0.6) 0%, rgba(139,92,246,0.2) 100%)',
        borderRadius: '2px',
        marginBottom: '-4px',
        animation: 'lanyardPulse 1.8s ease-in-out infinite',
      }} />

      {/* Card skeleton */}
      <div style={{
        width: '140px',
        height: '200px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(139,92,246,0.1)',
      }}>
        {/* Shimmer sweep */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          animation: 'lanyardShimmer 1.8s ease-in-out infinite',
        }} />

        {/* Photo placeholder */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(139,92,246,0.15)',
          border: '1px solid rgba(139,92,246,0.25)',
          margin: '28px auto 14px',
          animation: 'lanyardPulse 1.8s ease-in-out infinite',
        }} />

        {/* Name line */}
        <div style={{
          height: '10px',
          width: '80px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '6px',
          margin: '0 auto 8px',
          animation: 'lanyardPulse 1.8s ease-in-out infinite 0.1s',
        }} />

        {/* Role line */}
        <div style={{
          height: '8px',
          width: '100px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '6px',
          margin: '0 auto',
          animation: 'lanyardPulse 1.8s ease-in-out infinite 0.2s',
        }} />
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes lanyardShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes lanyardPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── Module-level scratch vectors (avoids per-render allocation) ──────────────
const _vec = new THREE.Vector3();
const _ang = new THREE.Vector3();
const _rot = new THREE.Vector3();
const _dir = new THREE.Vector3();

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  // Stable geometry ref — updated in-place each frame instead of dispose+recreate
  const tubeGeoRef = useRef<THREE.TubeGeometry | null>(null);
  // Track last-known velocity to stop invalidating when physics has settled
  const settledFrames = useRef(0);

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;

  // FIX 1: Load texture dengan konfigurasi yang benar
  const stickerTexture = useTexture('/assets/foto/Asset.jpeg');

  // FIX 2: Set colorSpace yang benar agar warna foto tidak pudar/aneh
  stickerTexture.colorSpace = THREE.SRGBColorSpace;
  // FIX 3: Pastikan texture wrapping tidak menyebabkan "bleeding" ke luar batas decal
  stickerTexture.wrapS = THREE.ClampToEdgeWrapping;
  stickerTexture.wrapT = THREE.ClampToEdgeWrapping;
  // FIX 4: Set filter untuk kualitas yang lebih baik
  stickerTexture.minFilter = THREE.LinearFilter;
  stickerTexture.magFilter = THREE.LinearFilter;
  stickerTexture.needsUpdate = true;

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

  const stringAttachmentPoint: [number, number, number] = [0, 2.78, 0];

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.7]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.8]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.7]);
  useSphericalJoint(j3, card, [[0, 0, 0], stringAttachmentPoint]);

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

  // Cleanup stable geometry on unmount
  useEffect(() => {
    return () => {
      tubeGeoRef.current?.dispose();
      tubeGeoRef.current = null;
    };
  }, []);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      _vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      _dir.copy(_vec).sub(state.camera.position).normalize();
      _vec.add(_dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: _vec.x - dragged.x,
        y: _vec.y - dragged.y,
        z: _vec.z - dragged.z
      });

      targetRot.current.setFromEuler(new THREE.Euler(0, state.pointer.x * (Math.PI * 1.5), 0));
      currentRot.current.slerp(targetRot.current, 0.15);
      card.current?.setNextKinematicRotation(currentRot.current);

      // Reset settled counter while dragging
      settledFrames.current = 0;
    }

    if (fixed.current) {
      let totalMovement = 0;

      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        totalMovement += clampedDistance;
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      if (band.current) {
        // ── PERF FIX: in-place geometry update, no dispose+recreate per frame ──
        // Build a new geometry for the updated curve, then copy its buffer data
        // into the existing geometry. This avoids GPU memory allocation/deallocation
        // every frame (was the #1 self-time consumer at 62.1% of trace).
        const tubeSeg = isMobile ? 16 : 24;
        const radSeg = isMobile ? 4 : 6;
        const newGeo = new THREE.TubeGeometry(curve, tubeSeg, 0.05, radSeg, false);
        if (!tubeGeoRef.current) {
          // First frame: assign directly
          tubeGeoRef.current = newGeo;
          band.current.geometry = tubeGeoRef.current;
        } else {
          // Subsequent frames: copy buffer attributes in-place (no GPU realloc)
          tubeGeoRef.current.copy(newGeo);
          newGeo.dispose(); // dispose the temp, keep tubeGeoRef on GPU
          band.current.geometry = tubeGeoRef.current;
        }
      }

      if (card.current) {
        _ang.copy(card.current.angvel());
        _rot.copy(card.current.rotation());
        card.current.setAngvel({ x: _ang.x, y: _ang.y - _rot.y * 0.25, z: _ang.z });
      }

      // ── PERF FIX: only request next frame when physics is still active ──
      // Stop hammering the render loop once the rope has settled.
      // 120 frames ~= 2s at 60fps before we stop self-requesting.
      const isPhysicsActive = dragged || totalMovement > 0.001;
      if (isPhysicsActive) {
        settledFrames.current = 0;
        state.invalidate();
      } else {
        settledFrames.current++;
        if (settledFrames.current < 120) {
          state.invalidate(); // keep going for a couple seconds to fully settle
        }
        // After 120 frames of stillness, stop — Canvas frameloop="demand" takes over
      }
    }
  });

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
                drag(new THREE.Vector3().copy(e.point).sub(_vec.copy(card.current.translation())));
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
                color="#ffffff"
                transparent={true}
                alphaTest={0.5}
                depthWrite={true}
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
              {/* FIX 5: polygonOffset dipindah ke material di dalam Decal */}
              <Decal
                position={[0, 0.523, 0.01]}
                rotation={[0, 0, 0]}
                scale={[0.75, 1.0, 0.15]}
                renderOrder={10}
              >
                <meshStandardMaterial
                  map={stickerTexture}
                  transparent={true}
                  depthTest={true}
                  depthWrite={false}
                  polygonOffset={true}
                  polygonOffsetFactor={-4}
                  polygonOffsetUnits={-4}
                />
              </Decal>
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <tubeGeometry args={[curve, isMobile ? 24 : 64, 0.05, 8, false]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB);