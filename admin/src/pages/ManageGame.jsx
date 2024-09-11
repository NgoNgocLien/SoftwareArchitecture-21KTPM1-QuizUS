import React, { useState } from 'react';
import "../styles/common.css";
import "../styles/manage.css";

export default function ManageGame() {
    return (
      <div className='game-container'>
        <button className='game'>
          <img className='game-img' src='/images/quiz.png' alt='Trắc nghiệm' />
          <h6 className='game-name'>Trắc nghiệm</h6>
        </button>

        <button className='game'>
          <img className='game-img' src='/images/lacxu.png' alt='Trắc nghiệm' />
          <h6 className='game-name'>Lắc vật phẩm</h6>
        </button>
      </div>
    )
}