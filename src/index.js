import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/';
import Agendamento from './pages/agendamento/';
import Admin from './pages/admin/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="agendamento/:id" element={<Agendamento />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </Router>
  </React.StrictMode>
);