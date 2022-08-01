import React, { createContext, useContext } from 'react';

const TrackContext = createContext();

const TrackContextProvider = ({ children, data }) => {
  return <TrackContext.Provider value={{ ...data }}>{children}</TrackContext.Provider>;
};

const useTrackContext = () => useContext(TrackContext);

export { TrackContextProvider, TrackContext };
export default useTrackContext;
