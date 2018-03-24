import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Events from 'events';
const EventEmitter = Events.EventEmitter;

require('./scss/index.scss');
window.Mediator = new EventEmitter();
ReactDOM.render(<App />, document.getElementById('root'));
