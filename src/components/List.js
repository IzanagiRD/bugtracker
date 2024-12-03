import React from 'react';
import Card from './Card';

function List({ list }) {
  return (
    <div className="list">
      <h3>{list.title}</h3>
      {list.cards && list.cards.length > 0 ? (
        list.cards.map(card => (
          <Card key={card._id} card={card} />
        ))
      ) : (
        <p>No cards in this list.</p>
      )}
    </div>
  );
}

export default List;