import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Events from 'events';
const EventEmitter = Events.EventEmitter;

require('./scss/index.scss');

import Emojis from '../emojis/list.json';
window.Emojis = emojis;

window.Mediator = new EventEmitter();
ReactDOM.render(<App />, document.getElementById('root'));
