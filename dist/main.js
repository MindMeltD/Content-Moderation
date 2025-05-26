import React from 'react';
import ReactDOM from 'react-dom/client';
const App = () => React.createElement("h1", null, "Hello from React!");
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));
