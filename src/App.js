import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Controls from './components/Controls';
import World from './components/World';

import { startGame } from './actions';

class App extends Component {
  renderEndGame(endGameText) {
    return (
      <div>
        <div className="row">
          <div className="col"><h3>{endGameText}</h3></div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-secondary" onClick={() => this.props.startGame()}>RESTART</button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h3>Rogue-like Game by <a href="http://kuriakinzeng.com">Kuri</a></h3>
          {
            this.props.isRunning ?
              (<div>
                <Controls />
                <hr />
                <World />
              </div>
              ) : (this.props.isWon ? this.renderEndGame("YOU WON") : this.renderEndGame("YOU LOST"))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ isRunning: state.isRunning, isWon: state.isWon })

export default connect(mapStateToProps, { startGame })(App);
