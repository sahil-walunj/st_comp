import { useState } from 'react'
import './App.css'
import Login from './pages/Login';
import Home from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import RefreshHandler from './RefreshHandler';
import { Analytics } from '@vercel/analytics/react';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
      <Analytics />
    </div>
  );
}

export default App
