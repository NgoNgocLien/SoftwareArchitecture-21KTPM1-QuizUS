import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet  } from 'react-router-dom';

// Components
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';

// Pages
import ManageEvent from './pages/ManageEvent'; 
import ManageVoucher from './pages/ManageVoucher';
import UpdatePlayer from './pages/UpdatePlayer';
import Login from './pages/Login';
import Signup from './pages/signup';

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
        <Route path="" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="" element={<Layout />}>
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