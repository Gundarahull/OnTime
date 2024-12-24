import React, { createContext, useState } from "react";

export const CapatainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState();
  return (
    <>
      <CapatainDataContext.Provider value={{ captain, setCaptain }}>
        {children}
      </CapatainDataContext.Provider>
    </>
  );
};

export default CaptainContext;
