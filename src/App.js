import './App.css';
import React, { useState } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BooksList } from './components/BooksList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/MyReads/Login"
            element={<><Login /> </>}
          />
          <Route
            exact
            path="/MyReads/Register"
            element={<><Register /> </>}
          />
          <Route
            exact
            path="/MyReads/Home"
            element={<BooksList />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
