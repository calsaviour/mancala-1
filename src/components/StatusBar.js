import React from 'react'

const StatusBar = ({ player, isOver, message }) => (
  <div>
  	{ isOver && 
  	<span>Game Over! </span> 	
  	}
  	<span>
      Player { player + 1 }'s turn.
    </span>
    <span>
      { message }
    </span>
  </div>
)

export default StatusBar