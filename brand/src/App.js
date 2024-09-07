import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet  } from 'react-router-dom';

// Components
import Sidebar from './components/sidebar/Sidebar';
//import Topbar from './components/topbar/Topbar';

// Pages
import BrandInfo from './pages/BrandInfo';
import ManageEvent from './pages/ManageEvent';
import ManageVoucher from './pages/ManageVoucher';

function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        {/* <Topbar /> */}
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
          <Route path="/event" element={<ManageEvent />} />
          <Route path="/voucher" element={<ManageVoucher />} />
          <Route path="/info" element={<BrandInfo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;