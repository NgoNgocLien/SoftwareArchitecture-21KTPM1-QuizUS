import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet  } from 'react-router-dom';

// Components
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Backbar from './components/topbar/Backbar';

// Pages
import Dashboard from './pages/Dashboard';
import ManageBrand from './pages/ManageBrand';
import ManagePlayer from './pages/ManagePlayer';
import ManageGame from './pages/ManageGame';
import Login from './pages/login';
import AddBrand from './pages/AddBrand';
import EditUser from './pages/EditUser';
import EditBrand from './pages/EditBrand';
import GameSettings from './pages/GameSettings';

function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Topbar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function Layout1() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Backbar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brand" element={<ManageBrand />} />
          <Route path="/player" element={<ManagePlayer />} />
          <Route path="/game" element={<ManageGame />} />
          {/* <Route path="/add-brand" element={<AddBrand />} />
          <Route path="/edit-user" element={<EditUser />} /> */}
        </Route>

        <Route element={<Layout1 />}>
          <Route path="/add-brand" element={<AddBrand />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/edit-brand/:id_brand" element={<EditBrand />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
