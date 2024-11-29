import React from 'react';

function Dashboard() {
    return (
        <div>
            <h2>Your Dashboard</h2>
            <p>Overview of your tracked bugs and statistics.</p>
            <div className='tasks-container'>
                <h2>Your Tasks:</h2>
                <div className='tasks'>
                    <p>Task 1</p>
                </div>
                <div className='tasks'>
                    <p>Task 2</p>
                </div>
                <div className='tasks'>
                    <p>Task 3</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;