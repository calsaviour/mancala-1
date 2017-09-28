import React from 'react'

const Board = ({ board, clickHandler }) => (
  <div>
  	{board.map((hole, i) => (
      <button key={i} onClick={() => clickHandler(i)}>
        {hole}
      </button>
    ))}
  </div>
)

export default Board