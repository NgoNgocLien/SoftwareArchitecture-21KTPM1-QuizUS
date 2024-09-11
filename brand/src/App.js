import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet  } from 'react-router-dom';

// Components
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Backbar from './components/topbar/Backbar';

// Pages
import Dashboard from './pages/Dashboard';
import ManageEvent from './pages/ManageEvent'; 
import ManageVoucher from './pages/ManageVoucher';
import UpdatePlayer from './pages/UpdatePlayer';
import Login from './pages/Login';
import Signup from './pages/signup';
import BrandInfo from './pages/BrandInfo';
import CreateEvent from './pages/CreateEvent';
import CreateGame from './pages/CreateGame';
import CreateShake from './pages/CreateShake';
import EditEvent from './pages/EditEvent';

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
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event" element={<ManageEvent />} />
          <Route path="/voucher" element={<ManageVoucher />} />
          <Route path="/info" element={<BrandInfo />} />
          <Route path="/edit" element={<UpdatePlayer />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/create-game" element={<CreateGame />} />
          <Route path="/create-shake" element={<CreateShake />} />
        </Route>

        <Route element={<Layout1 />}>
          <Route path="/edit-event/:id" element={<EditEvent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;