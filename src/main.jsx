// main.jsx
import React from 'react';  //JSX構文使うために使用
import ReactDOM from 'react-dom/client';  //ReactコンポーネントをDOMにレンダリングするために使用
import { BrowserRouter } from 'react-router-dom';
import App from './App'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);