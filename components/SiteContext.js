import React, { useContext } from 'react';
import { useLocalStorage } from 'react-use';

const SiteContext = React.createContext();

const SiteContextProvider = ({ children, data }) => {
  const [autoplay, setAutoplay] = useLocalStorage('autoplay', 'countdown');
  return <SiteContext.Provider value={{ ...data, autoplay, setAutoplay }}>{children}</SiteContext.Provider>;
};

export default function useSiteContext() {
  return useContext(SiteContext);
}

export { SiteContextProvider, SiteContext };
