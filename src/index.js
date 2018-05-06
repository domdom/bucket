import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const hash = window.location.hash.substring(1);

ReactDOM.render(<App hash={hash} />, document.getElementById('root'));
