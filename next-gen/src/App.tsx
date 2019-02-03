import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Card from './Card'
import {MonsterDeck} from './data/cards'

class App extends Component {
  state = {
    monster: new MonsterDeck("Bandit Guard")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Card card={this.state.monster.drawCard()} ></Card>
        </header>
      </div>
    );
  }
}

export default App;
