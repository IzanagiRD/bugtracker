import React, { Suspense } from 'react';
import './Home.css';
import Globe from './Globe';
import ModernOffice from "./ModernOffice";

function Home() {
    return (
        <div className="home-page-container">

            <div className="new-section">
                <ModernOffice />
            </div>

            {/* Intro Section */}
            <div className="intro-section">
                <div className="intro-description">
                    <h2>Effortlessly Manage Bugs and Boost Productivity</h2>
                    <p>Your all-in-one solution for bug tracking and task management.</p>
                    <div className="intro-buttons">
                        <a href="#get-started" className="btn-primary">Get Started</a>
                        <a href="#learn-more" className="btn-secondary">Learn More</a>
                    </div>
                </div>
                <img
                    src="https://getweeklyupdate.com/blog/wp-content/uploads/2018/02/1.jpg"
                    alt="Meeting in progress"
                    className="intro-image"
                />
            </div>

            {/* 3D Globe Section */}
            <section id="globe-section" className="globe-section">
                <div className="globe-content">
                    <div className="globe-left">
                        <Suspense fallback={<div>Loading Globe...</div>}>
                            <Globe />
                        </Suspense>
                    </div>
                    <div className="globe-right">
                        <h2>Collaborate on Boards with others</h2>
                        <p>Seamlessly work with your team on shared boards and tasks, ensuring smooth collaboration and productivity.</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <div id="features-section" className="features-section">
                {[
                    {
                        title: "Features to help your team succeed",
                        text: "Powering a productive team means using a powerful tool...",
                        img: "https://images.ctfassets.net/rz1oowkt5gyp/4kCNudjaBYj90CGgG7Lict/cbafa67336b2007278f50d99ceabfb22/Boards_2x.png?w=1080"
                    },
                    {
                        title: "The board is just the beginning",
                        text: "Lists and cards are the building blocks of organizing work...",
                        img: "https://images.ctfassets.net/rz1oowkt5gyp/6qNFanQxzRQEUQGMwc72KG/e0d4a143dfd448cfc14e89813924f3da/PremiumLP_HeroImage_2x.png?w=1080"
                    },
                    {
                        title: "Automate your workflow",
                        text: "Create a foolproof process for moving work forward...",
                        img: "https://images.ctfassets.net/rz1oowkt5gyp/17Iy0IusFlrBXJ41JUaC03/03b2150aaf8eb935183d0bf1f5d03a88/automate_your_workflow.png?w=540"
                    },
                    {
                        title: "Integrate top work tools",
                        text: "Easily connect the apps your team already uses...",
                        img: "https://images.ctfassets.net/rz1oowkt5gyp/5Vcv2W4DlIc88JiQqh3Uv5/d9ccb3bbf806ce8ec0aab3115b42cd07/03D_Power-ups_2x.png?w=1080"
                    },
                ].map((feature, index) => (
                    <div key={index} className="feature-box">
                        <div className="feature-description">
                            <h1>{feature.title}</h1>
                            <hr />
                            <p>{feature.text}</p>
                        </div>
                        <img src={feature.img} alt={feature.title} className="feature-image" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
