import { useState } from 'react';
import './Workshop.css';
import Header from './workshop/Header';
import Sidebar from './workshop/Sidebar';
import Main from './workshop/Main';
import { BoardContext } from '../components/context/BoardContext';

function Workshop() {
  const boardData = {
    active: 0,
    boards: [
      {
        name: 'My Trello Board',
        bgcolor: '#069',
        list: [
          { id: "1", title: "To do", items: [{ id: "cdrFt", title: "Project Description 1" }] },
          { id: "2", title: "In Progress", items: [{ id: "cdrFv", title: "Project Description 2" }] },
          { id: "3", title: "Done", items: [{ id: "cdrFb", title: "Project Description 3" }] }
        ]
      }
    ]
  };

  const [allBoard, setAllBoard] = useState(boardData);

  return (
    <>
    <div className="tailwind-scope">
        <Header />
            <BoardContext.Provider value={{ allBoard, setAllBoard }}>
            <div className='content flex'>
                <Sidebar />
                <Main />
            </div>
        </BoardContext.Provider>
      </div>
    </>
  );
}

export default Workshop;
