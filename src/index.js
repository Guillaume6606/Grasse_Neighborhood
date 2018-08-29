import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
    .then(() => {
      console.log('serviceWorker registered')
    })
    .catch((err) => {
      console.log(`There was an error with the serviceWorker: ${err}`);

    });
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
