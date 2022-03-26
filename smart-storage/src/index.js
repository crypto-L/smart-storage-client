import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './Register/Register';
import { DatePicker } from 'antd';
import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="register" element={<About />} />
    </Routes>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

