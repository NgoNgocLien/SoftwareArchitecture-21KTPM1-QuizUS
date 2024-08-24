import React from 'react';
import './common.css';

const Navbar = () => {
    return (
      <div className="navbar">
        <div className="tab-item">
            <img src="/icons/announcement-03.svg"></img>
            Sự kiện
        </div>
        <div className="tab-item">Trò chơi</div>
        <div className="tab-item">Thông tin</div>
      </div>
    );
  };
  
export default Navbar;