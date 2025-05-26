import React from 'react';
import ReactDOM from 'react-dom/client';
import PopupHTML from './UI/basicPopup';
import './UI/styles.css';
const App = () => (React.createElement(PopupHTML, { blocked: 28 }));
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));
