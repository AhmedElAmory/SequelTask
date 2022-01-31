import './App.css';
import { Routes, Route } from "react-router-dom";
import Register from './components/Register/register';
import Login from './components/Login/login';
import Profile from './components/Profile/profile';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
