import React from 'react';
import * as auth from 'service/auth';
import client from 'utils/api-client';
import URLS from 'service/urls';
import { useAsync } from 'utils/useAsync';
import { queryCache } from 'react-query';
import Loading from 'components/loading';

async function bootstrapAppData() {
  let user = null;
  const token = await auth.getToken();
  if (token) {
    // const data = await client(URLS.getAllDecks, {
    //   params: {
    //     userId: token
    //   }
    // });

    // queryCache.setQueryData('deckList', data);
    user = token;
  }
  return user;
}

const AuthContext = React.createContext();

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData
  } = useAsync();

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const login = React.useCallback(
    (form) => auth.login(form).then((user) => setData(user)),
    [setData]
  );
  const register = React.useCallback(
    (form) => auth.register(form).then((user) => setData(user)),
    [setData]
  );
  const logout = React.useCallback(() => {
    auth.logout();
    queryCache.clear();
    setData(null);
  }, [setData]);

  const value = React.useMemo(() => ({ user, login, logout, register }), [
    login,
    logout,
    register,
    user
  ]);

  if (isLoading || isIdle) {
    return <Loading />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
