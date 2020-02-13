import React from 'react';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import * as firebaseUI from 'firebaseui';
// import firebase from 'firebase/app';
// import signInFlow from '../../firebase/auth';
import { ReactComponent as FlashCardsSVG } from '../../images/flashcards.svg';

type Props = {
  form: React.ReactNode;
};

function Landing({ form }: Props) {
  // const uiConfig = {
  //   signInFlow: 'popup',
  //   signInOptions: [
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //     firebaseUI.auth.AnonymousAuthProvider.PROVIDER_ID
  //   ],
  //   callbacks: {
  //     signInSuccessWithAuthResult: signInFlow
  //   }
  // };

  return (
    <div className="d-flex bg-primary justify-content-center align-items-center flex-column vh-100">
      <div className=" mb-3" style={{ maxWidth: '210px' }}>
        <FlashCardsSVG className="w-100" />
      </div>
      <h1 className="text-white">Memcards</h1>
      {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
      {form}
    </div>
  );
}

export default Landing;
