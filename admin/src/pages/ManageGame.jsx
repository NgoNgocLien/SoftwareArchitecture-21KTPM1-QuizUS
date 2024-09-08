import React, { useState } from 'react';
import "../styles/common.css";
import "../styles/manage.css";

export default function ManageGame() {
    return (
      <div className='game-container'>
        <div className='game'>
          <img className='game-img' src='/images/quiz.png' alt='Trắc nghiệm' />
          <h6 className='game-name'>Trắc nghiệm</h6>
        </div>

        <div className='game'>
          <img className='game-img' src='/images/lacxu.png' alt='Trắc nghiệm' />
          <h6 className='game-name'>Trắc nghiệm</h6>
        </div>
      </div>
    )
}