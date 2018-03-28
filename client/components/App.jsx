import React from 'react';
import Camera from './Camera.jsx';
import Mirror from './Mirror.jsx';

export default class App extends React.Component {
  render() {
    
    return (
      <div  className="app">
        <Mirror />
        <Camera />
        <div className="header">
          <img src="./logo.png" />
        </div>
      </div>
    );
  }
}
