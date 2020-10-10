import React from 'react';
import { ReactComponent as FlashCardsSVG } from '../../images/flashcards.svg';

function Landing({ form }) {
  return (
    <div className="d-flex bg-primary justify-content-center align-items-center flex-column vh-100">
      <div className=" mb-3" style={{ maxWidth: '210px' }}>
        <FlashCardsSVG className="w-100" />
      </div>
      <h1 className="text-white">Memcards</h1>
      <div className=" bg-white p-3 rounded">{form}</div>
    </div>
  );
}

export default Landing;
