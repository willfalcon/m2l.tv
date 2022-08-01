import { useRouter } from 'next/router';
import { lighten, rgba } from 'polished';
import React from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import formatDuration from '../../lib/formatDuration';
import AddButton from '../AddButton';
import CatLabel from '../CatLabel';
import useSiteContext from '../SiteContext';
import TagsList from '../TagsList';
import useTrackContext from '../Track/TrackContext';
import useHoverTransition from './useHoverTransition';

const HoverStates = () => {
  const { setIsolate, toggleVideoModal, setFavorites, favorites } = useSiteContext();
  const router = useRouter();
  const { hoverState, setHoverState } = useTrackContext();
  const transitions = useHoverTransition(hoverState);

  function openVideo(video) {
    setIsolate(video);
    toggleVideoModal(true);
    router.push(`?video=${video.post_name}`, `/video/${video.post_name}`, { shallow: true });
  }

  return transitions((styles, item) => {
    const { pos, post_title, scroll, id, video, m2l_cat, tags = [], post_name } = item;
    const favIndex = favorites.indexOf(id);
    const isFavorite = favIndex >= 0;
    const modalData = { id, video, post_title, post_name, m2l_cat, tags };
    return (
      <HoverBox
        className="hover-box"
        style={styles}
        onMouseLeave={() => {
          const index = hoverState.findIndex(hover => hover.id === id);
          setHoverState([...hoverState.slice(0, index), ...hoverState.slice(index + 1)]);
        }}
      >
        <img
          className="hover-box__poster"
          src={video.videopress?.poster}
          alt={post_title}
          onClick={() => {
            openVideo(modalData);
          }}
        />
        <div className="hover-box__content-wrap">
          <h3
            className="hover-box__name"
            onClick={() => {
              openVideo(modalData);
            }}
          >
            {post_title}
          </h3>
          <CatLabel className="hover-box__cat" slug={m2l_cat?.slug}>
            {m2l_cat?.name}
          </CatLabel>
          <p className="hover-box__duration">{formatDuration(video.videopress.duration)}</p>

          <TagsList className="hover-box__tags" tags={tags} />

          <AddButton
            className="hover-box__add-to-favorites"
            onClick={() => {
              if (isFavorite) {
                setFavorites([...favorites.slice(0, favIndex), ...favorites.slice(favIndex + 1)]);
              } else {
                setFavorites([...favorites, id]);
              }
            }}
            added={isFavorite}
            name="Add to Favorites"
          />
        </div>
      </HoverBox>
    );
  });
};

const HoverBox = styled(animated.div)`
  position: absolute;
  z-index: 4;
  background: ${({ theme }) => lighten(0.07, theme.black)};
  box-shadow: ${({ theme }) => `${rgba(lighten(0.07, theme.black), 0.5)}`} 0 2px 4px;
  overflow: hidden;

  .hover-box {
    &__poster {
      cursor: pointer;
    }
    &__content-wrap {
      padding: 0.5rem;
      padding-bottom: 1rem;
      display: grid;
      grid-template-columns: auto 1fr 40px;
      grid-template-rows: 30px 40px 20px;
      grid-template-areas:
        'name name name'
        'cat duration button'
        'tags tags button';
      align-items: center;
      gap: 1rem;
    }
    &__name {
      grid-area: name;
      margin: 0;
      cursor: pointer;
    }
    &__cat {
      grid-area: cat;
      margin: 0;
      transform: scale(0.9);
    }
    &__duration {
      grid-area: duration;
    }
    &__tags {
      grid-area: tags;
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        display: inline;
      }
    }
    &__add-to-favorites {
      grid-area: button;
    }
  }
`;

export default HoverStates;
