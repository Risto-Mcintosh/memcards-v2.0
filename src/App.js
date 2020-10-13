import React from 'react';
import AuthenticatedApp from 'AuthenticatedApp';
import UnauthenticatedApp from 'UnauthenticatedApp';
import { useAuth } from 'context/auth-context';

function App() {
  const user = useAuth().user;
  console.log(user);
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
export default App;
