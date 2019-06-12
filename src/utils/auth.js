import * as firebase from "firebase/app";
import "firebase/auth";
import { setAuthenticatedUser, hydrate } from "../actions/actionCreator";
import history from "../history";
import store from "../store";

const dispatch = store.dispatch;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    dispatch(setAuthenticatedUser(true, user.uid));
    dispatch(hydrate());
  } else {
    dispatch(setAuthenticatedUser(false));
  }
});
export function signInFlow() {
  history.push("/decks");
  return false;
}
