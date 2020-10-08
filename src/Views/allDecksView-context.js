import React from 'react';

const DecksViewContext = React.createContext();

function DecksViewProvider({ children }) {
  const [showDeckDelete, toggleDeckDelete] = React.useState(false);
  return (
    <DecksViewContext.Provider value={{ showDeckDelete, toggleDeckDelete }}>
      {children}
    </DecksViewContext.Provider>
  );
}

function useDecksViewContext() {
  return React.useContext(DecksViewContext);
}

export { DecksViewProvider, useDecksViewContext };
