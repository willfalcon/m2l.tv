import Link from 'next/link';
import React, { useState } from 'react';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import styled from 'styled-components';
import formatDuration from '../lib/formatDuration';
import CatLabel from './CatLabel';

const SearchResults = ({ logoWidth, results, setIsolate, noResults, toggleSearch }) => {
  return (
    <ResultsList logoWidth={logoWidth}>
      {noResults && <h3 className="no-results">No results found.</h3>}
      {results.map(result => (
        <li className="result" key={result.id}>
          <Link href={`/video/${result.post_name}`}>
            <a
              className="result__button"
              onClick={() => {
                toggleSearch(false);
              }}
            >
              <div className="result__poster-wrapper">
                <img className="result__poster" src={result.video.videopress.poster} alt={result.post_title} />
              </div>
              <h3 className="result__name">{result.post_title}</h3>
              <CatLabel className="result__cat">{result.m2l_cat.name}</CatLabel>
              <span className="result__duration">{formatDuration(result.video.videopress.duration)}</span>
            </a>
          </Link>
        </li>
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
  top: 82px;
  z-index: 2;
  /* height: calc(100vh - 82px); */
  /* max-height: calc(100vh - 82px); */
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: 100%;

  .no-results {
    padding: 0 2.1rem;
  }
  .result {
    padding: 1rem 2rem;
    background: ${({ theme }) => theme.black};
    &__button {
      display: flex;
      width: 100%;
      color: white;
      border: 0;
      background: none;
      display: grid;
      gap: 1rem;
      grid-template-columns: 250px auto 1fr;
      grid-template-rows: auto auto;
      justify-items: start;
      align-items: center;
      align-content: center;
      text-decoration: none;
    }
    &__poster-wrapper {
      grid-row: 1 / 3;
      grid-column: 1 / 2;
      /* width: 100%; */
      height: 100%;
    }
    &__poster {
      /* position: absolute; */
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &__name {
      grid-row: 1 / 2;
      grid-column: 2 / 4;
      justify-self: start;
      font-size: 2.8rem;
      margin: 0;
    }
    &__cat {
      margin: 0;
    }
  }
`;

export default SearchResults;
