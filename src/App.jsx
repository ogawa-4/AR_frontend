// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import View from './pages/View';
import Post from './pages/Post';
import ViewAR from './pages/ViewAR';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view" element={<View />} />
        <Route path="/post" element={<Post />} />
        <Route path="/view-ar" element={<ViewAR />} />
      </Routes>
  );
}



export default App;

