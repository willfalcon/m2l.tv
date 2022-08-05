import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTransition } from 'react-spring';
import styled from 'styled-components';

import CatLabel from '../CatLabel';
import PlayButton from '../PlayButton';

import useSiteContext from '../SiteContext';
import formatDuration from '../../lib/formatDuration';
import { media } from '../theme';

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
        <CatLabel className="result__cat" slug={m2l_cat.slug}>
          {m2l_cat.name}
        </CatLabel>
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
  background: ${({ theme }) => theme.black};
  position: relative;
  padding: 1rem;
  ${media.break`
  padding: 1rem 2rem;
  `}
  .result {
    &__button {
      display: flex;
      width: 100%;
      color: white;
      border: 0;
      background: none;
      display: grid;
      gap: 1rem;
      grid-template-columns: 50% auto 1fr;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        'poster name name'
        'poster cat duration'
        'poster tags tags';
      justify-items: start;
      align-items: center;
      align-content: center;
      text-decoration: none;
      ${media.break`
      grid-template-columns: 250px auto auto 1fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        'poster name name name'
        'poster cat duration tags ';
      `}
    }
    &__poster-wrapper {
      height: 100%;
      grid-area: poster;
    }
    &__poster {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &__name {
      justify-self: start;
      font-size: 1.8rem;
      text-align: left;
      ${media.break`
      font-size: 2.8rem;
      `}
      margin: 0;
      grid-area: name;
    }
    &__cat {
      margin: 0;
      grid-area: cat;
      padding: 1rem;
      ${media.break`
        padding: 1rem 2rem;
      `}
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
