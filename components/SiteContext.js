import React, { useContext, useState } from 'react';
import { useLocalStorage } from 'react-use';

const SiteContext = React.createContext();

const SiteContextProvider = ({ children, data }) => {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [loadingTags, loadTags] = useState(!!data.tagSlug);
  return <SiteContext.Provider value={{ ...data, favorites, setFavorites, loadingTags, loadTags }}>{children}</SiteContext.Provider>;
};

export default function useSiteContext() {
  return useContext(SiteContext);
}

export { SiteContextProvider, SiteContext };
