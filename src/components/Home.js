// src/components/Home.js
import { React } from 'react';
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div className="page-container">
            <h1 className="home-title">Welcome to Bug Tracker</h1>
            <div className='pageDescriptionContainer'>
                <div className='pageDescription'>
                    <p>Track and manage bugs with ease.</p>
                    <p>Keep track of your member's tasks.</p>
                    <p>Stay organized with real-time updates and notifications.</p>
                    <p>Prioritize bugs and tasks based on severity and deadlines.</p>
                    <p>Generate detailed reports to analyze bug trends and team performance.</p>
                    <p>Access your bug tracker from anywhere, anytime, with cloud-based storage.</p>
                </div>
                <img 
                    src='https://getweeklyupdate.com/blog/wp-content/uploads/2018/02/1.jpg' 
                    alt="Meeting in progress" 
                    className='imageHome' 
                />
            </div>
            
            
            <nav className='cta'>
                <Link to="/about" className='aboutUsHyperLink'>About Us</Link>
                <a href="#pageReasonsContainer" className='learnmoreHyperLink'>Learn More</a>
            </nav>
            

            <div id="pageReasonsContainer" className='pageReasonsContainer'>
                <div className='pageReasonsBox'>
                    <div className='pageReasonsDescription'>
                        <h1>Features to help your team succeed</h1>
                        <hr></hr>
                        <p>Powering a productive team means using a powerful tool (and plenty of snacks).
                            From meetings and projects to events and goal setting, Trello’s
                            intuitive features give any team the ability to quickly set up and customize workflows
                            for just about anything.
                        </p>
                    </div>
                    <img 
                        src='https://images.ctfassets.net/rz1oowkt5gyp/4kCNudjaBYj90CGgG7Lict/cbafa67336b2007278f50d99ceabfb22/Boards_2x.png?w=1080' 
                        alt="Meeting in progress" 
                        className='imageReasons' 
                    />
                </div>


                <div className='pageReasonsBox'>
                    <img 
                        src='https://images.ctfassets.net/rz1oowkt5gyp/6qNFanQxzRQEUQGMwc72KG/e0d4a143dfd448cfc14e89813924f3da/PremiumLP_HeroImage_2x.png?w=1080' 
                        alt="Meeting in progress" 
                        className='imageReasons' 
                    />
                    <div className='pageReasonsDescription'>
                        <h1>The board is just the beginning</h1>
                        <hr></hr>
                        <p>Lists and cards are the building blocks of organizing work on a Trello board. Grow from there with task assignments, timelines, productivity metrics, calendars, and more.
                        </p>
                        
                    </div>                   
                </div>


                <div className='pageReasonsBox'>
                    <div className='pageReasonsDescription'>
                        <h1>Automate your workflow</h1>
                        <hr></hr>
                        <p>Create a foolproof process for moving work forward with Trello’s built-in automation system. Run commands and set automated rules for almost any action in Trello so that your team can focus on what matters most.
                        </p>
                    </div>
                    <img 
                        src='https://images.ctfassets.net/rz1oowkt5gyp/17Iy0IusFlrBXJ41JUaC03/03b2150aaf8eb935183d0bf1f5d03a88/automate_your_workflow.png?w=540' 
                        alt="Meeting in progress" 
                        className='imageReasons' 
                    />
                </div>


                <div className='pageReasonsBox'>
                    <img 
                        src='https://images.ctfassets.net/rz1oowkt5gyp/5Vcv2W4DlIc88JiQqh3Uv5/d9ccb3bbf806ce8ec0aab3115b42cd07/03D_Power-ups_2x.png?w=1080' 
                        alt="Meeting in progress" 
                        className='imageReasons' 
                    />
                    <div className='pageReasonsDescription'>
                        <h1>Integrate top work tools</h1>
                        <hr></hr>
                        <p>Easily connect the apps your team already uses into your Trello workflow, or add a Power-Up that helps fine-tune one specific need. With hundreds of Power-Ups available, your team’s workflow wishes are covered.
                        </p>
                        
                    </div>                   
                </div>
                
            </div>

        </div>
    );
}

export default Home;