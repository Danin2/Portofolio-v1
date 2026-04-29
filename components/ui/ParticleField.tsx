'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  particleCount?: number;
  particleColor?: string;
  speed?: number;
}

export default function ParticleField({ 
  particleCount = 1800, 
  particleColor = '#5227FF',
  speed = 0.3 
}: ParticleFieldProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Optimization: Only run WebGL logic when the component is in view
    useEffect(() => {
        if (!mountRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(mountRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        const mount = mountRef.current;
        if (!mount) return;

        const W = mount.clientWidth;
        const H = mount.clientHeight;

        // ── Scene ────────────────────────────────────────────────
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); // Antialias false for performance
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Capped at 1.5 for performance
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // ── Particles ────────────────────────────────────────────
        const COUNT = particleCount;
        const positions = new Float32Array(COUNT * 3);
        const sizes = new Float32Array(COUNT);
        const colors = new Float32Array(COUNT * 3);

        const baseCol = new THREE.Color(particleColor);
        const cMid = new THREE.Color('#ffffff');

        for (let i = 0; i < COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 14;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
            sizes[i] = Math.random() * 2.5 + 0.5;
            
            const t = Math.random();
            const col = baseCol.clone().lerp(cMid, t * 0.4);
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('customSize', new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: renderer.getPixelRatio() },
                uSpeed: { value: speed },
            },
            vertexShader: `
        attribute float customSize;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uSpeed;

        void main() {
          vColor = color;
          vec3 pos = position;
          pos.y += sin(uTime * uSpeed + position.x * 0.5) * 0.08;
          pos.x += cos(uTime * (uSpeed * 0.7) + position.z * 0.5) * 0.06;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPos;
          gl_PointSize = customSize * uPixelRatio * (200.0 / -mvPos.z);
          vAlpha = clamp(1.0 - (-mvPos.z - 1.0) / 6.0, 0.15, 0.65);
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float strength = pow(1.0 - (d * 2.0), 2.0);
          gl_FragColor = vec4(vColor, strength * vAlpha);
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
        });

        const points = new THREE.Points(geo, mat);
        scene.add(points);

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        const onResize = () => {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize, { passive: true });

        let frameId = 0;
        const clock = new THREE.Clock();
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            mat.uniforms.uTime.value = t;
            points.rotation.y = t * 0.015 + mouseX * 0.06;
            points.rotation.x = mouseY * 0.04;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            geo.dispose();
            mat.dispose();
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, [isVisible, particleCount, particleColor, speed]);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        />
    );
}
