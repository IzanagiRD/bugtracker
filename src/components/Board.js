import React from 'react';
import List from './List';

function Board({ board }) {
  return (
    <div className="board">
      <h2>{board.title}</h2>
      {board.lists && board.lists.length > 0 ? (
        board.lists.map(list => (
          <List key={list._id} list={list} />
        ))
      ) : (
        <p>No lists available for this board.</p>
      )}
    </div>
  );
}

export default Board;