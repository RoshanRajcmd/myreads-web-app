import './App.css';
import { useEffect } from 'react';
import { LoginPage } from './components/LoginPage'

function App() {
  //Comment the below useEffect line if you are working only on the front end
  //The below line will access the spring boot application running on the given port
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/user/getUsers')
      .then(response => response.json())
      .then(result => console.log(result));
  })

  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
