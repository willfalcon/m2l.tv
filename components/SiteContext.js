import React, { useContext, useState } from 'react';
import { useLocalStorage } from 'react-use';

const SiteContext = React.createContext();

const SiteContextProvider = ({ children, data }) => {
  const [autoplay, setAutoplay] = useLocalStorage('autoplay', 'countdown');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [loadingTags, loadTags] = useState(!!data.tagSlug);
  return (
    <SiteContext.Provider value={{ ...data, autoplay, setAutoplay, favorites, setFavorites, loadingTags, loadTags }}>
      {children}
    </SiteContext.Provider>
  );
};

export default function useSiteContext() {
  return useContext(SiteContext);
}

export { SiteContextProvider, SiteContext };
