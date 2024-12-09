import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

const RotatingGlobe = () => {
    const { scene } = useGLTF('/models/globe/a_windy_day.glb');
    const globeRef = useRef();

    // Rotate the globe
    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.0005;
        }
    });

    // Modify the material for more color vibrancy
    scene.traverse((child) => {
        if (child.isMesh) {
            child.material.color.set('#2a9d8f'); // Add base color
            child.material.emissive.set('#f4a261'); // Add glow-like effect
            child.material.emissiveIntensity = 0.3;
        }
    });

    return (
        <group ref={globeRef} scale={[2, 2, 2]}>
            <primitive object={scene} />
        </group>
    );
};

const Globe = () => (
    <Canvas
        style={{ width: '100%', height: '600px' }}
        pixelRatio={[1, 2]}
    >
        {/* Colorful lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} color="#e76f51" intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} color="#264653" intensity={1} />

        <Suspense fallback={<Html>Loading...</Html>}>
            <RotatingGlobe />
        </Suspense>

        <OrbitControls enableZoom={false} />
    </Canvas>
);

export default Globe;
