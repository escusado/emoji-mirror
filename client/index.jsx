import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Events from 'events';
const EventEmitter = Events.EventEmitter;

require('./scss/index.scss');
import emojis from '../emojis/list.json';
window.emojis = emojis;

window.Mediator = new EventEmitter();
ReactDOM.render(<App />, document.getElementById('root'));
