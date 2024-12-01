// src/components/About.js
import React from 'react';
// import { Link } from 'react-router-dom';

function About() {
    return (
        <div className="aboutPage">
            <h2>About Bug Tracker</h2> 
            {/* <p style={{paddingTop: 0}}>behind the scenes</p> */}
            
            <div className='whyUs'>
                <h3>Why Use Bug Tracker?</h3>
                <p>
                    Bug Tracker streamlines the bug management process by providing an intuitive, user-friendly interface that integrates seamlessly into your development workflow. With its robust set of features, Bug Tracker helps teams save time, reduce errors, and ensure the successful delivery of software projects.
                </p>
                <h3>Who Can Benefit?</h3>
                <p>
                    <strong>Development Teams:</strong> Stay organized and manage bugs more effectively by centralizing issue tracking and assigning tasks to team members.
                </p>
                <p>
                    <strong>QA Testers:</strong> Track reported bugs and ensure that they are thoroughly tested and resolved before releases.
                </p>
                <p>
                    <strong>Project Managers:</strong> Gain insights into the progress of your project and ensure timely bug resolution to keep development on track.
                </p>
                <h3>Get Started</h3>
                <p>
                    <a href='/login'>Sign up</a> today and start managing your bugs with ease. Bug Tracker is the go-to solution for teams looking to improve their bug resolution process and deliver high-quality software on time.
                </p>
            </div>

            <div className='history'>
                <h3>A Brief History of Bug Tracker</h3>
                <ul>
                    <li><strong>Early 2000s:</strong> Software teams struggled with manual bug tracking. Bugzilla, an open-source bug tracker, is created in 2004 by Mozilla to centralize defect management.</li>
                    <li><strong>2007:</strong> Jira, developed by Atlassian, evolves from project management to bug tracking, becoming popular for its customizability.</li>
                    <li><strong>2010s:</strong> Other tools like Redmine, MantisBT, and Trac gain popularity, adding features like version control integration and multi-project support.</li>
                    <li><strong>2014:</strong> GitHub introduces issue tracking, widely adopted in open-source communities for its simplicity.</li>
                    <li><strong>2015:</strong> Platforms like Trello and Asana integrate bug tracking, providing a unified solution for task and defect management.</li>
                    <li><strong>2020s:</strong> AI-powered features and CI/CD tool integrations streamline bug tracking, offering faster issue resolution and smarter workflows.</li>
                    <li><strong>Today:</strong> Tools like Jira, GitHub Issues, and Trello continue to be central to modern software development, improving collaboration and efficiency in bug management.</li>
                </ul>
            </div>
            
            <div className='ourTeam'>
                <h3>Our Team</h3>
                <h4>Krish</h4>
                <p>Back-End</p>
                <h4>Nicholas</h4>
                <p>Logics and Functions</p>
                <h4>Rizeen Roe</h4>
                <p>Front-End</p>
            </div>
        </div>
    );
}

export default About;
