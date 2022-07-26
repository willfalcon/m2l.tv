import { useRouter } from 'next/router';
import { lighten, rgba } from 'polished';
import React from 'react';
import { HiScale } from 'react-icons/hi';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import formatDuration from '../../lib/formatDuration';
import CatLabel from '../CatLabel';
import useSiteContext from '../SiteContext';
import theme from '../theme';

const HoverStates = ({ hoverState, setHoverState }) => {
  const transitions = useTransition(hoverState, {
    from: props => {
      const { pos, scroll } = props;
      return {
        top: `${pos.top + scroll}px`,
        left: `${pos.left}px`,
        width: `${pos.width}px`,
        height: `${pos.height}px`,
        background: rgba(theme.black, 1),
      };
    },
    enter: props => {
      const { pos, scroll, viewportWidth } = props;
      const defaultLeft = pos.left - pos.width / 4;
      const newWidth = pos.width * 1.5;
      const farthestRight = viewportWidth - newWidth - 30;
      const left = defaultLeft < 10 ? 10 : defaultLeft > farthestRight ? farthestRight : defaultLeft;

      console.log({ tooFarRight: defaultLeft > farthestRight, defaultLeft, farthestRight, left });
      return {
        top: `${pos.top + scroll - pos.height / 4}px`,
        left: `${left}px`,
        width: `${newWidth}px`,
        height: `${pos.height * 1.5 + 70}px`,
        background: rgba(lighten(0.07, theme.black), 1),
      };
    },
    leave: props => {
      const { pos, scroll } = props;
      return {
        top: `${pos.top + scroll}px`,
        left: `${pos.left}px`,
        width: `${pos.width}px`,
        height: `${pos.height}px`,
        background: rgba(theme.black, 1),
      };
    },
  });

  const { setIsolate, toggleVideoModal } = useSiteContext();
  const router = useRouter();

  return transitions((styles, item) => {
    const { pos, post_title, scroll, id, video, m2l_cat, tags = [], post_name } = item;
    return (
      <HoverBox
        className="hover-box"
        style={styles}
        onMouseLeave={() => {
          const index = hoverState.findIndex(hover => hover.id === id);
          setHoverState([...hoverState.slice(0, index), ...hoverState.slice(index + 1)]);
        }}
        onClick={() => {
          setIsolate({ id, video, post_title, m2l_cat, tags });
          toggleVideoModal(true);
          router.push(`?video=${post_name}`, `/video/${post_name}`, { shallow: true });
        }}
      >
        <img className="hover-box__poster" src={video.videopress?.poster} alt={post_title} />
        <div className="hover-box__content-wrap">
          <h3 className="hover-box__name">{post_title}</h3>
          <CatLabel className="hover-box__cat">{m2l_cat?.name}</CatLabel>
          <p className="hover-box__duration">{formatDuration(video.videopress.duration)}</p>
          <ul className="hover-box__tags">
            {tags &&
              tags.map((tag, i) => (
                <li key={tag.term_id} className="hover-box__tag">
                  {tag.name}
                  {i < tags.length - 1 && ' / '}
                </li>
              ))}
          </ul>
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
  cursor: pointer;
  .hover-box {
    &__content-wrap {
      padding: 0.5rem;
      padding-bottom: 1rem;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: 30px 40px 20px;
      grid-template-areas:
        'name name'
        'cat duration'
        'tags tags';
      align-items: center;
      gap: 1rem;
    }
    &__name {
      grid-area: name;
      margin: 0;
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
  }
`;

export default HoverStates;
