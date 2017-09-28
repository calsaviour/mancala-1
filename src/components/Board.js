import React from 'react'

const Board = props => (
  <div>
  	{props.board.map(hole => (
      <span> {hole} </span>
    ))}
  </div>
)

export default Board