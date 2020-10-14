import * as React from "react";

const DIContainerContext = React.createContext();

const createDIContainerProvider = (diContainer) => ({ children }) => {
  return (
    <DIContainerContext.Provider value={diContainer}>
      {children}
    </DIContainerContext.Provider>
  );
};

const useDIContainer = () => {
  const context = React.useContext(DIContainerContext);

  if (!context) {
    throw new Error(
      "`useDIContainer` must be used within a <DIContainerContext.Provider />"
    );
  }

  return context;
};

export { createDIContainerProvider, DIContainerContext, useDIContainer };
