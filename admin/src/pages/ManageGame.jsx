import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/common.css";
import "../styles/manage.css";

export default function ManageGame() {
    const navigate = useNavigate();
    return (
      <div className='game-container'>
        <button className='game' onClick={() => {navigate('/game-settings/1')}} >
          <img className='game-img' src='/images/quiz.png' alt='Trắc nghiệm' />
          <h6 className='game-name'>Trắc nghiệm</h6>
        </button>

        <button className='game' onClick={() => {navigate('/game-settings/2')}} >
          <img className='game-img' src='/images/lacxu.png' alt='Trắc nghiệm' />
          <h6 className='game-name'>Lắc vật phẩm</h6>
        </button>
      </div>
    )
}