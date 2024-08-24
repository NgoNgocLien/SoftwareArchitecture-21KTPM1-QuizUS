import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Sidebar from './components/sidebar/Sidebar';
import UpdatePlayer from './pages/UpdatePlayer.jsx';

function Layout() {
    return (
        <div className="">
            <Sidebar />
            <Outlet />
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="" element={<Layout />}>
                    <Route path="update-player" element={<UpdatePlayer />} />
                </Route>
                
            </Routes>
        </Router>
    );
}

export default App;
