import React from 'react';
import Camera from './Camera.jsx';
import Mirror from './Mirror.jsx';

export default class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div  className="app">
        <Mirror />
        <Camera />
      </div>
    );
  }

}
