import React from 'react'

const Board = ({ board }) => (
  <div>
  	{board.map(hole => (
      <span> {hole} </span>
    ))}
  </div>
)

export default Board