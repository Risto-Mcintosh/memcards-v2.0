import * as firebase from "firebase/app";
import "firebase/auth";
import { setAuthenticatedUser } from "../actions/actionCreator";
import history from "../history";
import store from "../store";

const dispatch = store.dispatch;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    dispatch(setAuthenticatedUser(true));
  } else {
    dispatch(setAuthenticatedUser(false));
  }
});
export function signInFlow(authResult) {
  console.log(authResult);

  history.push("/decks");
  return false;
}
