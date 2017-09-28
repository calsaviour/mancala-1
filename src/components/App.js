import React, { Component } from 'react'
import Header from './Header'
import Board from './Board'
import StatusBar from './StatusBar'

import { makeMove } from '../utils'

import '../App.css';

const intialState = {
  player: 0,
  board: [3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 0],
  isOver: false,
  message: ''
}

class App extends Component {

  constructor () {
    super()
    this.state = Object.assign({}, intialState)
    this.clickHandler = this.clickHandler.bind(this)
    this.resetHandler = this.resetHandler.bind(this)
  }

  resetHandler () {
    console.log(this.state)
    this.setState(intialState)
  }

  clickHandler (i) {
    const newState = makeMove(i)(this.state)
    this.setState(newState)
  }

  render () {
    return (
      <div className="App">

        <Header />

        <StatusBar
          player={this.state.player}
          isOver={this.state.isOver}
          message={this.state.message}
        />

        <Board
          board={this.state.board}
          clickHandler={this.clickHandler}
        />

        <button onClick={this.resetHandler}>
          Reset
        </button>

      </div>
    );
  }
}

export default App;
