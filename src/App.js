import './App.css';
import React from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BooksList } from './components/BooksList';
import { UpdateUserProfile } from './components/UpdateUserProfile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div>
      <Router>
        <Routes>

          {/* Reroute to Login as defaul path whenever the localhost path gets accessed */}
          <Route path="/" element={<Navigate to="/MyReads/Login" />} />
          <Route
            exact
            path="/MyReads/Login"
            element={<Login />}
          />

          <Route
            exact
            path="/MyReads/Register"
            element={<Register />}
          />

          <Route
            exact
            path="/MyReads/Home"
            element={<BooksList />}
          />

          <Route
            exact
            path="/MyReads/UpdateProfile"
            element={<UpdateUserProfile />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
