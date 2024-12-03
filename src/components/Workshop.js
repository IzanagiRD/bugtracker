import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './Workshop.css'; // Import CSS file

const ITEM_TYPES = {
  CARD: "card",
  TASK: "task"
};

const DATASET = {
  tasks: {
    "task-1": { id: "task-1", content: "water plants" },
    "task-2": { id: "task-2", content: "buy oat milk" },
    "task-3": { id: "task-3", content: "build a trello board" },
    "task-4": { id: "task-4", content: "have a beach day" },
    "task-5": { id: "task-5", content: "build tic tac toe" }
  },
  cards: {
    "card-1": {
      id: "card-1",
      title: "Home Todos",
      taskIds: ["task-1", "task-2"]
    },
    "card-2": {
      id: "card-2",
      title: "Work Todos",
      taskIds: ["task-3"]
    },
    "card-3": { id: "card-3", title: "Fun Todos", taskIds: ["task-4"] },
    "card-4": { id: "card-4", title: "Completed", taskIds: ["task-5"] }
  },
  cardOrder: ["card-1", "card-2", "card-3", "card-4"]
};

const genRandomID = () => Math.random().toString(36).substr(2, 9);

function Workshop() {
  const [dataset, setDataset] = useState(() => {
    const savedDataset = localStorage.getItem("aleka-trello-board-dataset");
    return savedDataset ? JSON.parse(savedDataset) : DATASET;
  });

  const [tasks, setTasks] = useState(dataset.tasks);
  const [cards, setCards] = useState(dataset.cards);
  const [cardOrder, setCardOrder] = useState(dataset.cardOrder);

  useEffect(() => {
    localStorage.setItem("aleka-trello-board-dataset", JSON.stringify({ tasks, cards, cardOrder }));
  }, [tasks, cards, cardOrder]);

  const onAddNewCard = () => {
    const newCard = {
      id: "card-" + genRandomID(),
      title: "**New**",
      taskIds: []
    };
    const newCardOrder = [newCard.id, ...cardOrder];
    setCards((prevCards) => ({ ...prevCards, [newCard.id]: newCard }));
    setCardOrder(newCardOrder);
  };

  const onAddNewTask = (cardID, content) => {
    const newTask = { id: "task-" + genRandomID(), content };
    setTasks((prevTasks) => ({ ...prevTasks, [newTask.id]: newTask }));
    const newTaskIds = [...cards[cardID].taskIds, newTask.id];
    setCards((prevCards) => ({ ...prevCards, [cardID]: { ...prevCards[cardID], taskIds: newTaskIds } }));
  };

  const onRemoveTask = (taskID, cardID) => {
    const newTaskIds = cards[cardID].taskIds.filter(id => id !== taskID);
    setCards((prevCards) => ({ ...prevCards, [cardID]: { ...prevCards[cardID], taskIds: newTaskIds } }));
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      delete newTasks[taskID];
      return newTasks;
    });
  };

  const onEditCardTitle = (cardID, newTitle) => {
    setCards((prevCards) => ({
      ...prevCards,
      [cardID]: { ...prevCards[cardID], title: newTitle }
    }));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (type === ITEM_TYPES.CARD) {
      reorderCards(source, destination, draggableId);
    } else {
      const start = cards[source.droppableId];
      const finish = cards[destination.droppableId];
      if (start.id === finish.id) {
        reorderTasksWithinCard(start, source.index, destination.index, draggableId);
      } else {
        moveTask(start, finish, source.index, destination.index, draggableId);
      }
    }
  };

  const reorderCards = (source, destination, draggableId) => {
    const newCardOrder = Array.from(cardOrder);
    newCardOrder.splice(source.index, 1);
    newCardOrder.splice(destination.index, 0, draggableId);
    setCardOrder(newCardOrder);
  };

  const reorderTasksWithinCard = (card, sourceIdx, destinationIdx, draggableId) => {
    const newTaskIds = Array.from(card.taskIds);
    newTaskIds.splice(sourceIdx, 1);
    newTaskIds.splice(destinationIdx, 0, draggableId);
    setCards((prevCards) => ({
      ...prevCards,
      [card.id]: { ...card, taskIds: newTaskIds }
    }));
  };

  const moveTask = (start, finish, sourceIdx, destinationIdx, draggableId) => {
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(sourceIdx, 1);
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destinationIdx, 0, draggableId);

    setCards((prevCards) => ({
      ...prevCards,
      [start.id]: { ...start, taskIds: startTaskIds },
      [finish.id]: { ...finish, taskIds: finishTaskIds }
    }));
  };

  const onRemoveCard = (cardID) => {
    // Remove card from cardOrder
    const newCardOrder = cardOrder.filter(id => id !== cardID);
    setCardOrder(newCardOrder);

    // Remove card from cards
    const newCards = { ...cards };
    delete newCards[cardID];
    setCards(newCards);
  };

  return (
    <div className="container">
      <div className="menu">
        <div className="note">
          You can add, edit, or remove cards & tasks. <br />
          Double click to edit card title or task content. <br />
          Task is removed when content is empty. <br />
          Drag/drop card or task to desired order. <br />
          Your edited changes are saved in local storage.
        </div>
        <div className="new-card" onClick={onAddNewCard}>+ New Card</div>
      </div>
      <DragDropCards
        cards={cards}
        tasks={tasks}
        cardOrder={cardOrder}
        setCards={setCards}
        setTasks={setTasks}
        setCardOrder={setCardOrder}
        onAddNewTask={onAddNewTask}
        onRemoveTask={onRemoveTask}
        onRemoveCard={onRemoveCard}
        onEditCardTitle={onEditCardTitle}
        onDragEnd={onDragEnd}
      />
    </div>
  );
}

const DragDropCards = ({ cards, tasks, cardOrder, onAddNewTask, onRemoveTask, onRemoveCard, onEditCardTitle, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-cards" direction="horizontal" type="card">
        {(provided) => (
          <div
            className="cards-container"
            {...provided.droppableProps} // Ensure droppable props are applied
            ref={provided.innerRef}      // Ensure ref is set for droppable area
          >
            {cardOrder.map((id, index) => {
              const card = cards[id];
              const cardTasks = card.taskIds.map(taskId => tasks[taskId]);
              return (
                <Card
                  key={card.id}
                  card={card}
                  tasks={cardTasks}
                  index={index}
                  onAddNewTask={onAddNewTask}
                  onRemoveTask={onRemoveTask}
                  onRemoveCard={onRemoveCard}
                  onEditCardTitle={onEditCardTitle}
                />
              );
            })}
            {provided.placeholder} {/* Ensure placeholder is used for spacing */}

            
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const Card = ({ card, tasks, index, onAddNewTask, onRemoveTask, onRemoveCard, onEditCardTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.title);

  const handleEdit = () => setIsEditing(true);
  const handleBlur = () => {
    setIsEditing(false);
    if (cardTitle !== card.title) {
      onEditCardTitle(card.id, cardTitle);  // Save the card title
    }
  };

  const handleChange = (e) => setCardTitle(e.target.value);

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="card-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style, cursor: "move" }} // Ensure drag handle styling
        >
          <div className="card-title">
            {isEditing ? (
              <input
                type="text"
                value={cardTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                className="edit-card-title"
              />
            ) : (
              <span onDoubleClick={handleEdit} className="card-title-text">{cardTitle}</span>
            )}
          </div>
          <Droppable droppableId={card.id} type="task">
            {(provided) => (
              <div
                className="task-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} card={card} index={index} onRemoveTask={onRemoveTask} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="new-task" onClick={() => onAddNewTask(card.id, "New Task")}>+ New Task</div>

          <div 
              className="remove-card"
              onClick={() => onRemoveCard(card.id)}
            >
              X
            </div>
        </div>
      )}
    </Draggable>
  );
};

const Task = ({ task, card, index, onRemoveTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskContent, setTaskContent] = useState(task.content);
  
    const handleEdit = () => setIsEditing(true);
    const handleBlur = () => {
      setIsEditing(false);
      if (taskContent !== task.content && taskContent !== "") {
        // Do nothing if content is empty
        task.content = taskContent;  // Save the task content
      }
    };
  
    const handleChange = (e) => setTaskContent(e.target.value);
  
    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className="task-container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {isEditing ? (
              <input
                type="text"
                value={taskContent}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                className="edit-task-content"
              />
            ) : (
              <span onDoubleClick={handleEdit} className="task-content-text">{taskContent}</span>
            )}
            
            <div 
              className="remove-task"
              onClick={() => onRemoveTask(task.id, card.id)}
              style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}
            >
              X
            </div>
          </div>
        )}
      </Draggable>
    );
  };
  

export default Workshop;
