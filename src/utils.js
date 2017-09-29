const NUM_HOLES = 6

const advance = index => ((index + 1) % (2 * NUM_HOLES + 2))

const noStones = board => player => {
  return board.slice(player * 6, player * 6 + 6).every(n => n === 0)
}

const emptyHomes = board => {
  return board.map((n, i) => ((i + 1) % 7 === 0 ? 0 : n))
}

const sum = (a, b) => a + b

const findWinner = board => {
  const totalPlayer1 = board[getHomeIndex(0)]
  const totalPlayer2 = board[getHomeIndex(1)]
  return totalPlayer1 > totalPlayer2 
    ? 'Player 1 wins! ' 
    : totalPlayer2 > totalPlayer1
      ? 'Player 2 wins! '
      : 'Draw! '
}

const getHomeIndex = player => player * 7 + 6

const playerTotalInPlay = board => player => {
  return board.slice(player * 6, player * 6 + 6).reduce(sum)
}

const clearStones = board => {
  return board.map((n, i) => ((i + 1) % 7 === 0 ? n : 0))
}

const belongsTo = player => index => {
  return index > player * 6 && index <= player * 6 + 6 
}

const makeMove = moveIndex => ({ player, board, isOver }) => {

  if ((moveIndex + 1) % 7 === 0) {
    return { message: 'bad move' }
  }
  if (Math.floor(moveIndex / 7) !== player) {
    return { message: 'wrong player' }
  }
  if (!board[moveIndex] || isOver){
    return { message: 'no stones!' }
  }

  const otherPlayer = 1 - player

  const playerHomeIndex = getHomeIndex(player)
  const otherPlayerHomeIndex = getHomeIndex(otherPlayer)

  let numStones = board[moveIndex]
  // remove the stones from the hole at moveIndex
  let newBoard = board.slice().map((n, i) => i === moveIndex ? 0 : n)
  // and advance the currIndex
  let currIndex = moveIndex

  // repeatedly advance the index and drop a stone
  while (numStones > 0) {
    currIndex = advance(currIndex)
    numStones = numStones - 1
    newBoard[currIndex] = newBoard[currIndex] + 1
  }

  // no stones left
  if (noStones(newBoard)(player)) {
    // move stones to otherPlayer's pot
    const otherPlayerTotal = playerTotalInPlay(otherPlayer)
    newBoard[playerHomeIndex] = newBoard[playerHomeIndex] + otherPlayerTotal
    newBoard = clearStones(newBoard)
    return {
      board: newBoard,
      isOver: true,
      message: ''
    }
  }

  if (noStones(newBoard)(otherPlayer)) {
    // move stones to otherPlayer's pot
    const playerTotal = playerTotalInPlay(player)
    newBoard[otherPlayerHomeIndex] = newBoard[otherPlayerHomeIndex] + playerTotal
    newBoard = clearStones(newBoard)
    return {
      board: newBoard,
      isOver: true,
      message: findWinner(newBoard)
    }
  }

  // if final stone was in players home
  if (currIndex === playerHomeIndex) {
    return {
      board: newBoard,
      message: ''
    }
  }

  // if final stone was in player's empty hole
  if (belongsTo(player)(currIndex) && newBoard[currIndex] === 1) {
    const oppositeIndex = 12 - currIndex
    newBoard[playerHomeIndex] = newBoard[playerHomeIndex] + newBoard[oppositeIndex] + 1
    newBoard[currIndex] = 0
    newBoard[oppositeIndex] = 0
    return {
      newBoard: newBoard,
      player: otherPlayer,
      message: ''
    }
  }

  // else nothing special
  return {
    board: newBoard,
    player: otherPlayer,
    message: ''
  }

}

export { makeMove, emptyHomes }