import React, { useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import './office.css';  // Import the CSS file

function ModernOfficeModel() {
    const { scene } = useGLTF("/models/office/modern_office.glb");
    return <primitive object={scene} scale={1} />;
}

function CameraController({ targetPosition, targetFocus, onViewChange }) {
    const { camera, gl } = useThree();
    const controlsRef = React.useRef();

    useFrame(() => {
        if (controlsRef.current) {
            const lerp = (current, target, alpha) => current + (target - current) * alpha;

            const alpha = 0.05; // Smooth transition speed
            camera.position.x = lerp(camera.position.x, targetPosition[0], alpha);
            camera.position.y = lerp(camera.position.y, targetPosition[1], alpha);
            camera.position.z = lerp(camera.position.z, targetPosition[2], alpha);

            controlsRef.current.target.x = lerp(controlsRef.current.target.x, targetFocus[0], alpha);
            controlsRef.current.target.y = lerp(controlsRef.current.target.y, targetFocus[1], alpha);
            controlsRef.current.target.z = lerp(controlsRef.current.target.z, targetFocus[2], alpha);

            controlsRef.current.update();

            // Detect when the camera is close enough to the target position
            const distance = Math.sqrt(
                (camera.position.x - targetPosition[0]) ** 2 +
                (camera.position.y - targetPosition[1]) ** 2 +
                (camera.position.z - targetPosition[2]) ** 2
            );

            if (distance < 0.1) {
                if (targetPosition[0] === 5 && targetPosition[1] === -0.5 && targetPosition[2] === 0) {
                    onViewChange("reset");
                } else if (targetPosition[0] === 2.5 && targetPosition[1] === 0 && targetPosition[2] === 0) {
                    onViewChange("desk");
                }
            }
        }
    });

    return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} enableZoom={false} enableRotate={false} />;
}

export default function ModernOffice() {
    const [targetPosition, setTargetPosition] = useState([5, -0.5, 0]);
    const [targetFocus, setTargetFocus] = useState([0, 0, 0]);
    const [currentView, setCurrentView] = useState("reset");

    const setView = (view) => {
        if (view === "reset") {
            setTargetPosition([5, -0.5, 0]);
            setTargetFocus([0, 0, 0]);
        } else if (view === "desk") {
            setTargetPosition([2.5, 0, 0]);
            setTargetFocus([0, -0.5, 0]);
        }
    };

    return (
        <div style={{ width: "100%", height: "1000px" }}>
            <Canvas
                camera={{ position: [5, -0.5, 0], fov: 30 }}
                style={{ background: "black" }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <ModernOfficeModel />
                <CameraController
                    targetPosition={targetPosition}
                    targetFocus={targetFocus}
                    onViewChange={(view) => setCurrentView(view)} // Track view changes
                />

                {/* Get Started Button */}
                {/* Reset View Text and Button */}
                {currentView === "reset" && (
                    <Html position={[2.5, -0.05, 0.465]}>
                        <div className="html-content">
                            <div className="view-introduction">
                                <h1 className="exploration-title">Track Bugs. Organize Tasks. Boost Productivity.</h1>
                                <p>
                                    Your all-in-one solution for bug tracking and task management.
                                </p>
                            </div>
                            <div className="action-buttons">
                                <button onClick={() => setView("desk")} className="btn-primary">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </Html>
                )}

                {/* Desk View with Sign Up and Login Buttons */}
                {currentView === "desk" && (
                    <Html position={[0.3, -0.14, 0.59]}>
                        <div className="html-content">
                            <div className="view-introduction">
                                <h2>
                                    Want to stay organized? Use BugTracker
                                </h2>
                                <p>
                                    Create an account and start organizing now!
                                </p>
                            </div>

                            <div className="action-buttons">
                                <a href="/register" className="btn-primary">
                                    Sign Up
                                </a>
                                <a href="/login" className="btn-secondary">
                                    Log In
                                </a>
                            </div>
                        </div>
                    </Html>
                )}

            </Canvas>
        </div>
    );
}
