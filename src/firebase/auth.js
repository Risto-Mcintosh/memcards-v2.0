import firebase from 'firebase/app';
import 'firebase/auth';
import { setAuthenticatedUser, hydrate } from '../actions/actionCreator';
import history from '../history';
import store from '../store';

const { dispatch } = store;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    dispatch(setAuthenticatedUser(true, user.uid));
    dispatch(hydrate());
  } else {
    dispatch(setAuthenticatedUser(false));
  }
});
export default function signInFlow() {
  history.push('/decks');
  return false;
}
