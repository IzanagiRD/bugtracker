import React from 'react';
import './About.css';

function About() {
    return (
        <div className="about-container">
            <h2 className="about-title">About Bug Tracker</h2> 
            
            <section className="about-section about-why-us">
                <h3 className="about-subtitle">Why Use Bug Tracker?</h3>
                <p className="about-text">
                    Bug Tracker streamlines the bug management process by providing an intuitive, user-friendly interface that integrates seamlessly into your development workflow. With its robust set of features, Bug Tracker helps teams save time, reduce errors, and ensure the successful delivery of software projects.
                </p>
            </section>

            <section className="about-section about-beneficiaries">
                <h3 className="about-subtitle">Who Can Benefit?</h3>
                <div className="about-benefits">
                    <div className="about-benefit">
                        <strong>Development Teams:</strong>
                        <p>Stay organized and manage bugs more effectively by centralizing issue tracking and assigning tasks to team members.</p>
                    </div>
                    <div className="about-benefit">
                        <strong>QA Testers:</strong>
                        <p>Track reported bugs and ensure that they are thoroughly tested and resolved before releases.</p>
                    </div>
                    <div className="about-benefit">
                        <strong>Project Managers:</strong>
                        <p>Gain insights into the progress of your project and ensure timely bug resolution to keep development on track.</p>
                    </div>
                </div>
            </section>

            <section className="about-section about-get-started">
                <h3 className="about-subtitle">Get Started</h3>
                <p className="about-text">
                    <a className="about-link" href='/login'>Sign up</a> today and start managing your bugs with ease. Bug Tracker is the go-to solution for teams looking to improve their bug resolution process and deliver high-quality software on time.
                </p>
            </section>

            <section className="about-section about-history">
                <h3 className="about-subtitle">A Brief History of Bug Tracker</h3>
                <div className="about-history">
                    <div class="timeline-container">
                        <div class="timeline">
                            <div class="timeline-content">
                                <div class="timeline-item">
                                    <div class="card left">
                                        <div class="date">Early 2000s</div>
                                        <p>Software teams struggled with manual bug tracking. Bugzilla, an open-source bug tracker, is created in 2004 by Mozilla to centralize defect management.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="card right">
                                        <div class="date">2007</div>
                                        <p>Jira, developed by Atlassian, evolves from project management to bug tracking, becoming popular for its customizability.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="card left">
                                        <div class="date">2010s</div>
                                        <p>Other tools like Redmine, MantisBT, and Trac gain popularity, adding features like version control integration and multi-project support.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="card right">
                                        <div class="date">2014</div>
                                        <p>GitHub introduces issue tracking, widely adopted in open-source communities for its simplicity.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="card left">
                                        <div class="date">2015</div>
                                        <p>Platforms like Trello and Asana integrate bug tracking, providing a unified solution for task and defect management.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="card right">
                                        <div class="date">2020s</div>
                                        <p>AI-powered features and CI/CD tool integrations streamline bug tracking, offering faster issue resolution and smarter workflows.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="card left">
                                        <div class="date">Today</div>
                                        <p>Tools like Jira, GitHub Issues, and Trello continue to be central to modern software development, improving collaboration and efficiency in bug management.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="about-section about-team">
                <h3 className="about-subtitle">Our Team</h3>
                <div className="about-team-members">
                    <div className="about-team-member">
                        <h4 className="team-name">Krish</h4>
                        <p className="team-role">Front-End Login/Register, Back-End</p>
                    </div>
                    <div className="about-team-member">
                        <h4 className="team-name">Nicolas</h4>
                        <p className="team-role">Front-End All, Workshop Back-End, Integration</p>
                    </div>
                    <div className="about-team-member">
                        <h4 className="team-name">Rizeen Roe</h4>
                        <p className="team-role">Front-End All, Page Contents</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
