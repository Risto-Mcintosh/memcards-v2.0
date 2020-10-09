import React from 'react';
import * as auth from '../service/auth';

const AuthContext = React.createContext();

function AuthProvider(props) {
  const logIn = (form) => auth.login(form);
  const register = (form) => auth.register(form);
  const logOut = () => auth.logOut();

  return (
    <AuthContext.Provider value={{ logIn, register, logOut }} {...props} />
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
