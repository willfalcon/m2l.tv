import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import useSiteContext from '../SiteContext';
import Result from './Result';

const SearchResults = ({ logoWidth, results, noResults, toggleSearch }) => {
  const router = useRouter();
  const { setIsolate, toggleVideoModal } = useSiteContext();
  return (
    <ResultsList logoWidth={logoWidth}>
      {noResults && <h3 className="no-results">No results found.</h3>}
      {results.map(result => (
        <Result key={result.id} {...result} toggleSearch={toggleSearch} />
      ))}
    </ResultsList>
  );
};

const ResultsList = styled.ul`
  list-style: none;
  padding: 1rem;
  margin: 0;
  width: calc(100vw - ${({ logoWidth }) => logoWidth + 80 + 7}px);
  max-width: 100%;
  left: ${({ logoWidth }) => logoWidth}px;
  position: absolute;
  top: 81px;
  z-index: 3;

  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: 100%;

  .no-results {
    padding: 0 2.1rem;
  }
`;

export default SearchResults;
