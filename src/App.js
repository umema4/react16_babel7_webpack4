// @flow

import React, { Component } from 'react';
import styles from './App.css';

type Props = {
  name: string,
};

class App extends Component<Props> {
  handleClick = () => {
    const { name } = this.props;

    console.log(name);
  };

  render() {
    const { name } = this.props;
    return (
      <div className={styles.App}>
        <h1> {name} </h1>
        <button onClick={this.handleClick}>click me</button>
      </div>
    );
  }
}

export default App;
