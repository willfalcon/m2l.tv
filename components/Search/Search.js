import React, { useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from 'react-use';
import nProgress from 'nprogress';
import { animated, useTransition } from 'react-spring';

import { Backdrop } from '../Modal';
import Loader from './Loader';
import SearchResults from './SearchResults';
import { media } from '../theme';

const Search = ({ search, toggleSearch, logoWidth }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  useDebounce(
    async () => {
      nProgress.start();
      setNoResults(false);
      setLoading(true);
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
      <Loader loading={loading} />
      {results && search && <SearchResults logoWidth={logoWidth} results={results} noResults={noResults} toggleSearch={toggleSearch} />}
    </>
  );
};

const SearchBar = styled(animated.div)`
  position: absolute;
  height: 82px;
  /* transform: translateX(-50%); */
  background: ${({ theme }) => theme.black};
  max-width: 100%;
  transform: skew(-12deg);
  z-index: 2;
  left: 0;
  top: 82px;
  width: calc(100vw - 73px);
  padding: 1rem;

  ${media.break`
    top: 0;
    left: ${({ logoWidth }) => logoWidth}px;
    width: calc(100vw - ${({ logoWidth }) => logoWidth + 80 + 7}px);
    padding: 1rem 3.3rem;
  `}
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
