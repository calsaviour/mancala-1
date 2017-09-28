const NUM_HOLES = 6

const advance = index => ((index + 1) % (2 * NUM_HOLES + 2))

const noStones = board => player => {
  return board.slice(player * 6, player * 6 + 6).every(n => n === 0)
}

const sum = (a, b) => a + b

const getHomeIndex = player => player * 7 + 6

const playerTotalInPlay = board => player => {
  return board.slice(player * 6, player * 6 + 6).reduce(sum)
}

const clearStones = board => {
  return board.map((n, i) => ((i + 1) % 7 === 0 ? n : 0))
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

  let numStones = board[moveIndex]
  // remove the stones from the hole at moveIndex
  let newBoard = board.slice().map((n, i) => i === moveIndex ? 0 : n)
  // and advance the currIndex
  let currIndex = moveIndex

  // advance the index and drop a stone
  while (numStones > 0) {
    currIndex = advance(currIndex)
    numStones = numStones - 1
    newBoard[currIndex] = newBoard[currIndex] + 1
  }

  console.log(newBoard)

  // no stones left
  if (noStones(newBoard)(player)) {
    // move stones to otherPlayer's pot
    const otherPlayerTotal = playerTotalInPlay(otherPlayer)
    const playerHomeIndex = getHomeIndex(player)
    newBoard[playerHomeIndex] = newBoard[playerHomeIndex] + otherPlayerTotal
    newBoard = clearStones(newBoard)
    return {
      board: newBoard,
      isOver: true
    }
  }

  if (noStones(newBoard)(otherPlayer)) {
    // move stones to otherPlayer's pot
    const playerTotal = playerTotalInPlay(player)
    const otherPlayerHomeIndex = getHomeIndex(otherPlayer)
    newBoard[otherPlayerHomeIndex] = newBoard[otherPlayerHomeIndex] + playerTotal
    newBoard = clearStones(newBoard)
    return {
      board: newBoard,
      isOver: true
    }
  }

  // if final stone was in players home
  if (currIndex === getHomeIndex(player)) {
    return {
      board: newBoard
    }
  }

  // if final stone was in players empty hole


  return {
    board: newBoard,
    player: otherPlayer
  }

}

export { makeMove }