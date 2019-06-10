import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebaseUI from "firebaseui";
import firebase from "firebase";
import { signInFlow } from "../utils/auth";
import { Container } from "react-bootstrap";

export default function Welcome() {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebaseUI.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: signInFlow
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column vh-100">
      <h1>Memcards</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Container>
  );
}
