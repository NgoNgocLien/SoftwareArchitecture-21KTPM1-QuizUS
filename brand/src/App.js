import logo from './logo.svg';
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
        <Route path="" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event" element={<ManageEvent />} />
          <Route path="/voucher" element={<ManageVoucher />} />
          {/* <Route path="/info" element={<BrandInfo />} /> */}
          <Route path="/edit" element={<UpdatePlayer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;