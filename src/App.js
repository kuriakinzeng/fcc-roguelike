import React, { Component } from 'react';
import './App.css';

import Controls from './components/Controls';
import World from './components/World';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <h3>Rogue Game</h3>
          <Controls />
          <hr />
          <World />
        </div>
      </div>
    );
  }
}

export default App;
