import React from 'react';
import Camera from './Camera.jsx';
import Mirror from './Mirror.jsx';

export default class App extends React.Component {

  componentWillMount() {
    this.state = {
      isModalActive : true
    };
  }

  toggleModal() {
    this.setState({
      isModalActive: false
    });
  }

  render() {

    return (
      <div className="app">

        <a href="https://github.com/escusado/emoji-mirror" target="blank_">
          <img style={{position: 'absolute', top: 0, right: 0, border: 0}} src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" alt="Tenedoreame en GitHub" />
        </a>

        <div className={'webcam-alert ' + (this.state.isModalActive ? 'active' : '')}>
          Please enable webcam access
          <a href="#" onClick={this.toggleModal.bind(this)}>
            OK
          </a>
        </div>

        <Mirror />
        <Camera />

      </div>
    );
  }
}
