import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { Backdrop } from '../Modal';
import Fade from '../Fade';
import { useDebounce } from 'react-use';
import useSiteContext from '../SiteContext';
import SearchResults from './SearchResults';
import { BiLoaderAlt } from 'react-icons/bi';
import spin from '../spin';
import nProgress from 'nprogress';
import { animated, useTransition } from 'react-spring';

const Search = ({ search, toggleSearch, logoWidth }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const [, cancel] = useDebounce(
    async () => {
      setNoResults(false);
      // setLoading(true);
      if (searchTerm) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/m2l-video/v1/search?term=${searchTerm}`);
        const data = await res.json();

        if (data.length) {
          setResults(data);
        } else {
          setResults([]);
          setNoResults(true);
        }
      } else {
        setResults([]);
      }
      setLoading(false);
      nProgress.done();
    },
    500,
    [searchTerm]
  );

  const transition = useTransition(search, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const backdropTransition = useTransition(search, {
    from: { opacity: 0 },
    enter: { opacity: 0.65 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {backdropTransition(
        (styles, item) => item && <Backdrop style={styles} className="search-backdrop" onClick={() => toggleSearch(false)} />
      )}
      {transition(
        (styles, item) =>
          item && (
            <SearchBar className="search-bar" logoWidth={logoWidth} style={styles}>
              <input
                className="search-bar__input"
                value={searchTerm}
                onChange={e => {
                  setLoading(true);
                  nProgress.start();
                  setSearchTerm(e.target.value);
                }}
                placeholder="Search Here"
              />
            </SearchBar>
          )
      )}

      {results && search && <SearchResults logoWidth={logoWidth} results={results} noResults={noResults} toggleSearch={toggleSearch} />}
    </>
  );
};

const SearchBackdrop = styled(Backdrop)`
  top: 0;
  height: 100%;
`;

const SearchWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: 0.3s;
  z-index: 4;

  ${Fade}
  .search-close {
    top: 2rem;
    right: 1rem;
    z-index: 3;
  }
  .search-backdrop {
    top: 0;
    height: 100%;
  }
`;

const SearchBar = styled(animated.div)`
  position: absolute;
  height: 82px;
  left: ${({ logoWidth }) => logoWidth}px;
  /* transform: translateX(-50%); */
  background: ${({ theme }) => theme.black};
  width: calc(100vw - ${({ logoWidth }) => logoWidth + 80 + 7}px);
  max-width: 100%;
  top: 0;
  padding: 1rem 3.3rem;
  transform: skew(-12deg);
  z-index: 2;
  .search-bar {
    &__input {
      width: 100%;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
      display: block;
      height: 60px;
      font-size: 2.6rem;
      padding: 1rem;
      transform: skew(12deg);
    }
  }
`;

export default Search;
