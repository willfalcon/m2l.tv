import React from 'react';

import styled from 'styled-components';

import Result from './Result';

import { media } from '../theme';

const SearchResults = ({ logoWidth, results, noResults, toggleSearch }) => {
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
  max-width: 100%;
  position: absolute;
  z-index: 3;
  top: ${({ theme }) => theme.sizes.mobileHeader}px;
  left: 0;
  width: 100%;

  ${media.break`
  top: 81px;
  left: ${({ logoWidth }) => logoWidth}px;
  width: calc(100vw - ${({ logoWidth }) => logoWidth + 80 + 7}px);
  `}
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: 100%;

  .no-results {
    padding: 0 2.1rem;
  }
`;

export default SearchResults;
