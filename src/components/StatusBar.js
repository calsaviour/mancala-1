import React from 'react'

const StatusBar = ({ player, isOver }) => (
  <div>
  	{isOver && 
  	<span>Game Over! </span> 	
  	}
  	<span>
      Player {player + 1}'s turn.
    </span>
  </div>
)

export default StatusBar