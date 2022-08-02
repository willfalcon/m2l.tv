import { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import App from 'next/app';
import 'nprogress/nprogress.css';
import { ThemeProvider } from 'styled-components';

import Wrapper from '../components/Wrapper';
import { SiteContextProvider } from '../components/SiteContext';
import Main from '../components/Main';

import shuffle from '../lib/shuffle';
import theme from '../components/theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangError', () => NProgress.done());

function MyApp(props) {
  const { Component, pageProps, topVideos, other, openedVideo, videoSlug, curriculumSlug, tagSlug } = props;
  const [isolate, setIsolate] = useState(null);
  const [videoModal, toggleVideoModal] = useState(false);

  useEffect(() => {
    if (openedVideo) {
      setIsolate(openedVideo);
      toggleVideoModal(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SiteContextProvider data={{ ...other, isolate, setIsolate, videoModal, toggleVideoModal, curriculumSlug, tagSlug }}>
        <Wrapper>
          <Main topVideos={topVideos} />
          <Component {...pageProps} topVideos={topVideos} videoSlug={videoSlug} />
        </Wrapper>
      </SiteContextProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);

  //TODO: if we initially request a video url, go ahead and get the video data too so we can prerender the modal open.

  const dataRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/m2l-video/v2/data`);
  const data = await dataRes.json();

  const videoSlug = appContext.ctx.query.video || null;
  const curriculumSlug = appContext.ctx.query.curriculum || null;
  const tagSlug = appContext.ctx.query.tag || null;

  return {
    ...appProps,
    topVideos: shuffle(data.topVideos),
    other: data.other,
    videoSlug,
    curriculumSlug,
    tagSlug,
  };
};

export default MyApp;
