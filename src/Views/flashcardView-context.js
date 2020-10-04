import React from 'react';

const FlashcardContext = React.createContext();

function FlashcardProvider({ children, state }) {
  return (
    <FlashcardContext.Provider value={state}>
      {children}
    </FlashcardContext.Provider>
  );
}

const useFlashcardContext = () => React.useContext(FlashcardContext);

export { FlashcardProvider, useFlashcardContext };
