import React from 'react';
import Camera from './Camera.jsx';
import Mirror from './Mirror.jsx';

export default class App extends React.Component {
  render() {

    return (
      <div  className="app">

        <a href="https://github.com/escusado/emoji-mirror">
          <img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" alt="Tenedoreame en GitHub" />
        </a>

        <Mirror />
        <Camera />

      </div>
    );
  }
}
