import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet  } from 'react-router-dom';

// Components
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';

// Pages
import Dashboard from './pages/Dashboard';
import ManageEvent from './pages/ManageEvent'; 
import ManageVoucher from './pages/ManageVoucher';
import UpdatePlayer from './pages/UpdatePlayer';
import Login from './pages/Login';
import Signup from './pages/signup';
import BrandInfo from './pages/BrandInfo';
import CreateEvent from './pages/CreateEvent';

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;