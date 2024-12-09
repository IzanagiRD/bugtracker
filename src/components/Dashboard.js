import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        const fetchedProjects = [
            { id: 1, name: 'Project 1', img: 'https://images.gamebanana.com/img/ss/mods/65fb03e768bc0.jpg' },
            { id: 2, name: 'Project 2', img: 'https://picon.ngfiles.com/935000/flash_935672_card.webp?f1718959021' },
            { id: 3, name: 'Project 2', img: 'https://picon.ngfiles.com/935000/flash_935672_card.webp?f1718959021' },
            { id: 4, name: 'Project 2', img: 'https://picon.ngfiles.com/935000/flash_935672_card.webp?f1718959021' },
            { id: 5, name: 'Project 2', img: 'https://picon.ngfiles.com/935000/flash_935672_card.webp?f1718959021' },
            { id: 6, name: 'Project 2', img: 'https://picon.ngfiles.com/935000/flash_935672_card.webp?f1718959021' },
            { id: 7 , name: 'Project 2', img: 'https://picon.ngfiles.com/935000/flash_935672_card.webp?f1718959021' },
        ];
        setProjects(fetchedProjects);
    }, []);

    return (
        <div className='dashboardContainer'>
            <div className='dashboardContents'>
                <div className='toolBarBox'>
                    <div className='userSideBar'>
                        <div className='userSideBarLogoBox'>
                                <div className='userSideBarLogo'>
                                    <div className='user'>
                                        <p>Krish</p>
                                    </div>
                                </div>
                                <div className='userSideBarProjectInformation'>
                                    <h2>Krish Dashboard</h2>
                                </div>
                            </div>
                    </div>
                    <div className='yourProjectsToolBar'>
                        {/* <h2>Your Projects</h2>
                        {projects.map((project) => (
                            <div key={project.id}>
                                <a href=''><h4>{project.name}</h4></a>
                            </div>
                        ))} */}
                        <a href=''><h2>Boards</h2></a>
                        
                    </div>
                    <div className='userSettings'>
                        <h2>Settings</h2>
                        <h2>Help</h2>
                    </div>
                </div>
                <div className='dashboardBox'>
                    <div className='userBox'>
                        <div className='userLogoBox'>
                            <div className='userLogo'>
                                <div className='user'>
                                    <p>Krish</p>
                                </div>
                            </div>
                            <div className='userProjectInformation'>
                                <h2>Krish Dashboard</h2>
                                <h2>Private</h2>
                            </div>
                        </div>
                    </div>
                    <div className="yourProjectNavigationTool">
                        <div className="navigationSection">
                            <label>
                                Sort by
                                <select>
                                    <option>Most recently edited</option>
                                    <option>Oldest</option>
                                    <option>Newest</option>
                                    <option>Alphabetical</option>
                                </select>
                            </label>
                            {/* <label>
                                Filter by
                                <select>
                                    <option>Choose a collection</option>
                                    <option>Collection 1</option>
                                    <option>Collection 2</option>
                                </select>
                            </label> */}
                        </div>
                        <div className="searchSection">
                            <label>
                                Search
                                <input type="text" placeholder="Search boards" />
                            </label>
                        </div>
                    </div>
                    <div className='yourProjects'>
                        <h2>Boards</h2>
                        <div className='projects'>
                            {projects.map((project) => (
                                <div key={project.id}>
                                    <a href=''><img src={project.img} alt={project.name} /></a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;