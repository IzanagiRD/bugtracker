import React from 'react';

function Card({ title, description }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

export default Card;