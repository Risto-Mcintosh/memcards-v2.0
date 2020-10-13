import React from 'react';
import { ReactComponent as FlashCardsSVG } from 'images/flashcards.svg';
import LoginForm from 'components/landing/LogInForm';
import RegisterForm from 'components/landing/RegisterForm';

function UnauthenticatedApp() {
  const [isRegisterFrom, showRegisterForm] = React.useState(false);
  return (
    <div className="d-flex bg-primary justify-content-center align-items-center flex-column vh-100">
      <div className=" mb-3" style={{ maxWidth: '210px' }}>
        <FlashCardsSVG className="w-100" />
      </div>
      <h1 className="text-white">Memcards</h1>
      <div className=" bg-white p-3 rounded">
        {isRegisterFrom ? (
          <RegisterForm showRegisterForm={showRegisterForm} />
        ) : (
          <LoginForm showRegisterForm={showRegisterForm} />
        )}
      </div>
    </div>
  );
}

export default UnauthenticatedApp;
