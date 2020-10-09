import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { AuthProvider } from './auth-context';

export default function AppProviders({ children }) {
  return (
    <ReactQueryConfigProvider
      config={{ queries: { refetchOnWindowFocus: false } }}
    >
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </ReactQueryConfigProvider>
  );
}
