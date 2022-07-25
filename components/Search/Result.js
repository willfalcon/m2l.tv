import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSiteContext from '../SiteContext';
import CatLabel from '../CatLabel';
import formatDuration from '../../lib/formatDuration';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import PlayButton from '../PlayButton';
import { useTransition } from 'react-spring';
import styled from 'styled-components';

const Result = ({ id, post_name, video, post_title, m2l_cat, tags, toggleSearch }) => {
  const { setIsolate, toggleVideoModal } = useSiteContext();
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const playTransition = useTransition(hover, {
    from: { opacity: 0, transform: `translateX(-50%)` },
    enter: { opacity: 1, transform: `translateX(0%)` },
    leave: { opacity: 0, transform: `translateX(-50%)` },
  });
  return (
    <SearchResult className="result">
      <button
        className="result__button"
        onClick={() => {
          toggleSearch(false);
          setIsolate({ id, post_name, video, post_title, m2l_cat, tags });
          toggleVideoModal(true);
          router.push(`?video=${post_name}`, `/video/${post_name}`, { shallow: true });
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="result__poster-wrapper">
          <img className="result__poster" src={video.videopress.poster} alt={post_title} />
        </div>
        <h3 className="result__name">{post_title}</h3>
        <CatLabel className="result__cat">{m2l_cat.name}</CatLabel>
        <span className="result__duration">{formatDuration(video.videopress.duration)}</span>
        {tags && (
          <ul className="result__tags">
            {tags.map((tag, i) => (
              <li key={tag.term_id}>
                {tag.name}
                {i < tags.length - 1 && ' / '}
              </li>
            ))}
          </ul>
        )}
        {playTransition((styles, item) => item && <PlayButton styles={styles} className="result__play-button" />)}
      </button>
    </SearchResult>
  );
};

const SearchResult = styled.li`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.black};
  position: relative;
  .result {
    &__button {
      display: flex;
      width: 100%;
      color: white;
      border: 0;
      background: none;
      display: grid;
      gap: 1rem;
      grid-template-columns: 250px auto auto 1fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        'poster name name name'
        'poster cat duration tags ';
      justify-items: start;
      align-items: center;
      align-content: center;
      text-decoration: none;
    }
    &__poster-wrapper {
      /* grid-row: 1 / 3;
      grid-column: 1 / 2; */
      /* width: 100%; */
      height: 100%;
      grid-area: poster;
    }
    &__poster {
      /* position: absolute; */
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &__name {
      /* grid-row: 1 / 2;
      grid-column: 2 / 4; */
      justify-self: start;
      font-size: 2.8rem;
      margin: 0;
      grid-area: name;
    }
    &__cat {
      margin: 0;
      grid-area: cat;
    }
    &__play-button {
      position: absolute;
      right: 10px;
      top: 50%;
      opacity: 1;
    }
    &__tags {
      list-style: none;
      margin: 0;
      padding: 0;
      display: inline;
      grid-area: tags;
      color: ${({ theme }) => theme.pink};
      text-align: left;
    }
  }
`;

export default Result;