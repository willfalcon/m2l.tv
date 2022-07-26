import React, { Suspense } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import PrimaryVideo from './PrimaryVideo';

const Tracks = dynamic(() => import('./Track/Tracks'), {
  suspense: true,
});

const Main = ({ topVideos, videoSlug }) => {
  return (
    <PageWrapper className="page-wrapper">
      <PrimaryVideo {...topVideos[0]} />
      <Suspense>
        <Tracks topVideos={topVideos} videoSlug={videoSlug} />
      </Suspense>
    </PageWrapper>
  );
};
const PageWrapper = styled.div``;
export default Main;
