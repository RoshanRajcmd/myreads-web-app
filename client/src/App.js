import './App.css';
import { React, useState } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BooksList } from './components/BooksList';
import { UpdateUserProfile } from './components/UpdateUserProfile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from './components/PrivateRoute'

function App() {
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  }

  return (
    <div class="bg-white dark:bg-gray-800">
      <Router>
        <Routes>

          {/* Reroute to Login as defaul path whenever the localhost path gets accessed */}
          <Route path="/" element={<Navigate to="/myreads/login" />} />
          <Route
            exact
            path="/myreads/login"
            element={<Login />}
          />

          <Route
            exact
            path="/myreads/register"
            element={<Register />}
          />

          <Route
            exact
            path="/myreads/home"
            element={<PrivateRoute><BooksList toggleDarkMode={toggleDarkMode} /></PrivateRoute>}
          />

          <Route
            exact
            path="/myreads/updateprofile"
            element={<PrivateRoute><UpdateUserProfile toggleDarkMode={toggleDarkMode} /></PrivateRoute>}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
