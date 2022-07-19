import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { Backdrop } from './Modal';
import Fade from './Fade';
import { useDebounce } from 'react-use';
import useSiteContext from './SiteContext';
import SearchResults from './SearchResults';
import { BiLoaderAlt } from 'react-icons/bi';
import spin from './spin';
import nProgress from 'nprogress';

const Search = ({ search, toggleSearch, logoWidth }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { setIsolate } = useSiteContext();
  const [loading, setLoading] = useState(false);

  const [, cancel] = useDebounce(
    async () => {
      setNoResults(false);
      // setLoading(true);
      if (searchTerm) {
        const res = await fetch(`http://movetolearnms.local/wp-json/m2l-video/v1/search?term=${searchTerm}`);
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

  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition key={search} timeout={300}>
          <>
            {search && (
              <SearchWrap className="search-wrap">
                <Backdrop className="search-backdrop" onClick={() => toggleSearch(false)} />
                <SearchBar className="search-bar" logoWidth={logoWidth}>
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
                {loading && (
                  <Loader className="search-loader">
                    <BiLoaderAlt />
                  </Loader>
                )}
                {results && <SearchResults logoWidth={logoWidth} results={results} setIsolate={setIsolate} noResults={noResults} />}
              </SearchWrap>
            )}
          </>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  z-index: 3;
  width: 50px;
  height: 50px;
  svg {
    color: white;
    width: 100%;
    height: 100%;
    animation: 1s ${spin} infinite;
  }
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

const SearchBar = styled.div`
  position: absolute;
  height: 82px;
  left: ${({ logoWidth }) => logoWidth}px;
  /* transform: translateX(-50%); */
  background: ${({ theme }) => theme.black};
  width: calc(100vw - ${({ logoWidth }) => logoWidth + 80 + 7}px);
  max-width: 100%;

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
