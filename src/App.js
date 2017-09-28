import React, { Component } from 'react'
import Header from './components/Header'
import Board from './components/Board'
import './App.css';

const intialState = {
  player: 0,
  board: [3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 0],
  isOver: false
}

class App extends Component {

  constructor () {
    super()
    this.state = Object.assign({}, intialState)
  }

  handleReset () {
    this.setState(Object.assign({}, intialState))
  }

  render () {
    return (
      <div className="App">

        <Header />

        <Board board={this.state.board} />

        <button onclick={this.handleReset}>
          Reset
        </button>

      </div>
    );
  }
}

export default App;
