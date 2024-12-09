import React, { useContext, useState } from 'react';
import { ChevronRight, ChevronLeft, Plus, X, MoreVertical } from 'react-feather'; // Importing MoreVertical for the 3 dots
import { BoardContext } from '../context/BoardContext';

const Sidebar = () => {
    const blankBoard = {
        name: '',
        bgcolor: '#f60000',
        list: [],
    };
    const [boardData, setBoardData] = useState(blankBoard);
    const [collapsed, setCollapsed] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const [showMenus, setShowMenus] = useState({}); // Object to track dropdown visibility per board
    const { allBoard, setAllBoard } = useContext(BoardContext);

    const setActiveBoard = (i) => {
        let newBoard = { ...allBoard };
        newBoard.active = i;
        setAllBoard(newBoard);
    };

    const addBoard = () => {
        if (!boardData.name) {
            alert("Board name is required!");
            return;
        }

        const newB = { ...allBoard };
        newB.boards.push(boardData);
        setAllBoard(newB);
        setBoardData(blankBoard);
        setShowPop(false); // Close popover after adding the board
    };

    const togglePopover = () => {
        setShowPop(!showPop);
    };

    // Function to delete a board
    const deleteBoard = (index) => {
        console.log('Before Deleting:', allBoard.boards); // Log before deletion
        const newBoards = [...allBoard.boards]; // Create a shallow copy of the boards array
        newBoards.splice(index, 1); // Remove the board at the specified index

        const updatedBoard = { ...allBoard, boards: newBoards }; // Update the whole board state
        setAllBoard(updatedBoard); // Update the context state
        console.log('After Deleting:', newBoards); // Log after deletion
    };

    const toggleMenu = (index) => {
        setShowMenus((prevMenus) => ({
            ...prevMenus,
            [index]: !prevMenus[index], // Toggle the visibility for the specific board
        }));
    };

    return (
        <div className={`bg-[#121417] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 ${collapsed ? 'w-[42px]' : 'w-[280px]'}`}>
            {collapsed && (
                <div className='p-2'>
                    <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-slate-600 rounded-sm'>
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
            {!collapsed && (
                <div>
                    {/* Workspace Header */}
                    <div className="workspace p-3 flex justify-between border-b border-b-[#9fadbc29]">
                        <h4 className="font-semibold text-white">Remote Dev's Workspace</h4>
                        <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-slate-600 rounded-sm p-1'>
                            <ChevronLeft size={18} />
                        </button>
                    </div>

                    {/* Board List Section */}
                    <div className="boardlist p-3 bg-[#1b1f24] rounded-md">
                        <div className='flex justify-between items-center mb-4'>
                            <h6 className="text-white">Your Boards</h6>

                            {/* Add Board Button */}
                            <button onClick={togglePopover} className='p-2 rounded-full bg-slate-800 hover:bg-slate-600'>
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Popover Content: Add Board Modal */}
                        {showPop && (
                            <div className="absolute top-16 left-40 w-[320px] p-4 bg-slate-800 text-white rounded-lg shadow-lg z-50">
                                <button onClick={() => setShowPop(false)} className='absolute right-2 top-2 text-white hover:bg-gray-500 p-1 rounded-full'>
                                    <X size={16} />
                                </button>
                                <h4 className='text-xl font-semibold py-3'>Create Board</h4>
                                <div className="mt-3 flex flex-col items-start w-full">
                                    <label htmlFor="title" className='font-semibold mb-1'>Board Title <span className="text-red-500">*</span></label>
                                    <input
                                        value={boardData.name}
                                        onChange={(e) => setBoardData({ ...boardData, name: e.target.value })}
                                        type="text"
                                        className='text-black rounded-sm p-2 mb-3 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        placeholder="Enter board name"
                                    />
                                    <label htmlFor="bgcolor" className='font-semibold mb-1'>Board Background Color</label>
                                    <input
                                        value={boardData.bgcolor}
                                        onChange={(e) => setBoardData({ ...boardData, bgcolor: e.target.value })}
                                        type="color"
                                        className="mb-3 border-none p-0"
                                    />
                                    <div className="buttons flex justify-between w-full mt-4">
                                        <button onClick={addBoard} className='rounded text-white p-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300'>
                                            Add Board
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Boards List */}
                        <div className="boards space-y-2">
                            {allBoard.boards.map((board, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveBoard(index)}
                                    className='flex justify-between p-2 items-center cursor-pointer hover:bg-slate-600 rounded-md'>
                                    <div>
                                        <h6 className="font-semibold text-white">{board.name}</h6>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className='w-[20px] h-[20px]' style={{ backgroundColor: board.bgcolor }}></span>

                                        {/* More Vertical (3 dots) */}
                                        <div className="relative">
                                            <button onClick={() => toggleMenu(index)} className="text-white hover:bg-slate-600 rounded-md p-1">
                                                <MoreVertical size={16} />
                                            </button>
                                            {showMenus[index] && (
                                                <div className="absolute left-full ml-2 bg-slate-800 text-white rounded-md shadow-lg z-10">
                                                    <button
                                                        onClick={() => {
                                                            deleteBoard(index);
                                                            setShowMenus((prev) => ({ ...prev, [index]: false })); // Close the menu after deleting
                                                        }} // Call delete when clicked
                                                        className="block w-full text-left px-4 py-2 hover:bg-red-500"
                                                    >
                                                        Delete Board
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
