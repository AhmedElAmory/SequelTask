import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Register from './components/Register/register';
import Login from './components/Login/login';
import Profile from './components/Profile/profile';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
