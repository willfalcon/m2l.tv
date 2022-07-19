import React, { useContext, useState } from 'react';

const SiteContext = React.createContext();

const SiteContextProvider = ({ children, data }) => {
  const [isolate, setIsolate] = useState(null);
  return <SiteContext.Provider value={{ ...data, isolate, setIsolate }}>{children}</SiteContext.Provider>;
};

export default function useSiteContext() {
  return useContext(SiteContext);
}

export { SiteContextProvider, SiteContext };
