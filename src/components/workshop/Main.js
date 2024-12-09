import React, { useContext, useState, useRef } from 'react';
import { MoreHorizontal, UserPlus, Edit2, Trash } from 'react-feather';
import CardAdd from './CardAdd';
import { BoardContext, makeid } from '../context/BoardContext';
import AddList from './AddList';

const Main = () => {
    const { allBoard, setAllBoard } = useContext(BoardContext);
    const bdata = allBoard?.boards?.[allBoard.active];

    const [activeMenu, setActiveMenu] = useState(null);
    const [editMode, setEditMode] = useState({ type: null, index: null, value: '' });

    const listMenuRefs = useRef([]);
    const cardMenuRefs = useRef([]);

    if (!bdata) {
        return <div>Loading...</div>;
    }

    const addItem = (type, data, listIndex) => {
        let newList = [...bdata.list];

        if (type === 'card') {
            newList[listIndex].items.push({ id: makeid(5), title: data });
        } else if (type === 'list') {
            newList.push({ id: makeid(5), title: data, items: [] });
        }

        let board_ = { ...allBoard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    const handleDeleteList = (index) => {
        let newList = [...bdata.list];
        newList.splice(index, 1);
        let board_ = { ...allBoard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
        setActiveMenu(null);
    };

    const handleEditList = (index, newTitle) => {
        if (newTitle.trim() === "") {
            alert("Name cannot be empty!");
            return;
        }

        let newList = [...bdata.list];
        newList[index].title = newTitle;
        let board_ = { ...allBoard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
        setEditMode({ type: null, index: null, value: '' });
    };

    const handleDeleteCard = (listIndex, cardIndex) => {
        let newList = [...bdata.list];
        newList[listIndex].items.splice(cardIndex, 1);
        let board_ = { ...allBoard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
        setActiveMenu(null);
    };

    const handleEditCard = (listIndex, cardIndex, newTitle) => {
        if (newTitle.trim() === "") {
            alert("Name cannot be empty!");
            return;
        }

        let newList = [...bdata.list];
        newList[listIndex].items[cardIndex].title = newTitle;
        let board_ = { ...allBoard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
        setEditMode({ type: null, index: null, value: '' });
    };

    const toggleListMenu = (index) => {
        setActiveMenu(activeMenu?.type === 'list' && activeMenu.id === index ? null : { type: 'list', id: index });
    };

    const toggleCardMenu = (listIndex, cardIndex) => {
        const key = `${listIndex}-${cardIndex}`;
        setActiveMenu(activeMenu?.type === 'card' && activeMenu.id === key ? null : { type: 'card', id: key });
    };

    const getMenuPosition = (listIndex, cardIndex, type) => {
        const rect = type === 'list'
            ? listMenuRefs.current[listIndex]?.getBoundingClientRect()
            : cardMenuRefs.current[`${listIndex}-${cardIndex}`]?.getBoundingClientRect();

        return { top: rect?.bottom - 200, left: rect?.left - 250};
    };

    const handleCardDragStart = (e, listIndex, cardIndex) => {
        e.dataTransfer.setData('card', JSON.stringify({ listIndex, cardIndex }));
    };

    const handleDrop = (e, targetListIndex) => {
        e.preventDefault();
        const { listIndex, cardIndex } = JSON.parse(e.dataTransfer.getData('card'));
        if (listIndex !== targetListIndex) {
            let newList = [...bdata.list];
            const cardToMove = newList[listIndex].items.splice(cardIndex, 1)[0];
            newList[targetListIndex].items.push(cardToMove);

            let board_ = { ...allBoard };
            board_.boards[board_.active].list = newList;
            setAllBoard(board_);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className='flex flex-col w-full' style={{ backgroundColor: bdata.bgcolor || '#ffffff' }}>
            <div className='p-3 bg-black flex justify-between w-full bg-opacity-50'>
                <h2 className='text-lg'>{bdata.name}</h2>
                <div className='flex items-center justify-center'>
                    <button className='bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center'>
                        <UserPlus size={16} className='mr-2'></UserPlus>
                        Share
                    </button>
                </div>
            </div>
            <div className='flex flex-col w-full flex-grow relative'>
                <div className='absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden'>
                    <div className="flex">
                        {bdata.list && bdata.list.map((x, ind) => (
                            <div
                                key={x.id}
                                className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"
                                onDrop={(e) => handleDrop(e, ind)}
                                onDragOver={handleDragOver}
                            >
                                <div className="list-body">
                                    <div className="flex justify-between p-1">
                                        {editMode?.type === 'list' && editMode.index === ind ? (
                                            <input
                                                type="text"
                                                value={editMode.value}
                                                onChange={(e) => setEditMode({ type: 'list', index: ind, value: e.target.value })}
                                                onBlur={() => handleEditList(ind, editMode.value)}
                                                autoFocus
                                                className="bg-gray-800 text-white p-1 rounded w-full"
                                            />
                                        ) : (
                                            <span>{x.title}</span>
                                        )}
                                        <button
                                            ref={(el) => listMenuRefs.current[ind] = el}
                                            className="hover:bg-gray-500 p-1 rounded-sm"
                                            onClick={() => toggleListMenu(ind)}
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>
                                        {activeMenu?.type === 'list' && activeMenu.id === ind && (
                                            <div className="absolute bg-gray-700 text-white p-2 rounded-lg shadow-lg"
                                                style={getMenuPosition(ind, null, 'list')}>
                                                <button className="flex items-center space-x-2" onClick={() => setEditMode({ type: 'list', index: ind, value: x.title })}>
                                                    <Edit2 size={16} /> <span>Edit</span>
                                                </button>
                                                <button className="flex items-center space-x-2 mt-2" onClick={() => handleDeleteList(ind)}>
                                                    <Trash size={16} /> <span>Delete</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {x.items.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500"
                                            draggable
                                            onDragStart={(e) => handleCardDragStart(e, ind, index)}
                                        >
                                            {editMode?.type === 'card' && editMode.index === `${ind}-${index}` ? (
                                                <input
                                                    type="text"
                                                    value={editMode.value}
                                                    onChange={(e) => setEditMode({ type: 'card', index: `${ind}-${index}`, value: e.target.value })}
                                                    onBlur={() => handleEditCard(ind, index, editMode.value)}
                                                    autoFocus
                                                    className="bg-gray-800 text-white p-1 rounded w-full"
                                                />
                                            ) : (
                                                <span>{item.title}</span>
                                            )}
                                            <span className="flex justify-start items-start">
                                                <button
                                                    ref={(el) => cardMenuRefs.current[`${ind}-${index}`] = el}
                                                    className="hover:bg-gray-600 p-1 rounded-sm"
                                                    onClick={() => toggleCardMenu(ind, index)}
                                                >
                                                    <MoreHorizontal size={16} />
                                                </button>
                                                {activeMenu?.type === 'card' && activeMenu.id === `${ind}-${index}` && (
                                                    <div className="absolute bg-gray-700 text-white p-2 rounded-lg shadow-lg"
                                                        style={getMenuPosition(ind, index, 'card')}>
                                                        <button className="flex items-center space-x-2" onClick={() => setEditMode({ type: 'card', index: `${ind}-${index}`, value: item.title })}>
                                                            <Edit2 size={16} /> <span>Edit</span>
                                                        </button>
                                                        <button className="flex items-center space-x-2 mt-2" onClick={() => handleDeleteCard(ind, index)}>
                                                            <Trash size={16} /> <span>Delete</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </span>
                                        </div>
                                    ))}

                                    <CardAdd getCard={(e) => addItem('card', e, ind)} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <AddList getList={(e) => addItem('list', e)}></AddList>
                </div>
            </div>
        </div>
    );
};

export default Main;