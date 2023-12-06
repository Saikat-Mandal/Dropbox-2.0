import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
   <>
    <Routes>
      <Route path="/"  element={<Home/>} />
      <Route path="/login"  element={<Login/>} />
      <Route path="/signup"  element={<Register/>} />
      <Route path="/dashboard"  element={<Dashboard/>} />
    </Routes>
   </>
  );
}

export default App;
