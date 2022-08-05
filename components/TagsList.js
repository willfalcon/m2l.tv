import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDebounce } from 'react-use';
import styled from 'styled-components';

import useSiteContext from './SiteContext';

const TagsList = ({ className, tags }) => {
  const router = useRouter();
  const { loadTags, loadingTags, toggleVideoModal } = useSiteContext();

  const [mouseover, setMouseover] = useState(false);
  const [_, cancel] = useDebounce(
    () => {
      if (mouseover) {
        loadTags(true);
      }
    },
    50,
    [mouseover]
  );
  return (
    <List className={classNames(className, 'tags-list')}>
      {tags &&
        tags.map((tag, i) => (
          <li
            key={tag.term_id}
            className="tags-list__tag"
            onMouseEnter={() => setMouseover(true)}
            onMouseLeave={() => {
              if (!loadingTags) {
                cancel();
                setMouseover(false);
              }
            }}
          >
            <span
              onClick={() => {
                router.push(`?tag=${tag.slug}`, `/tag/${tag.slug}`, { shallow: true });
                const anchor = document.getElementById(tag.slug);
                toggleVideoModal(false);
                anchor.scrollIntoView({ block: 'center' });
              }}
            >
              {tag.name}
            </span>
            {i < tags.length - 1 && ' / '}
          </li>
        ))}
    </List>
  );
};

const List = styled.ul`
  .tags-list {
    &__tag {
      span {
        cursor: pointer;
        :hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export default TagsList;
