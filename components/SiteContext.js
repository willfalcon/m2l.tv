import React, { useContext } from 'react';

const SiteContext = React.createContext();

const SiteContextProvider = ({ children, data }) => {
  return <SiteContext.Provider value={{ ...data }}>{children}</SiteContext.Provider>;
};

export default function useSiteContext() {
  return useContext(SiteContext);
}

export { SiteContextProvider, SiteContext };
