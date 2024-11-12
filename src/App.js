import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BooksList } from './components/BooksList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  //Comment the below useEffect line if you are working only on the front end
  //The below line will access the spring boot application running on the given port
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/user/getUsers')
      .then(response => response.json())
      .then(result => console.log(result));
  });

  return (
    <div className="App">
      <div class="flex items-center justify-center
              min-h-screen bg-gray-200">
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
    </div>
  );
}

export default App;
