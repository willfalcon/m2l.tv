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
  const { Component, pageProps, topVideos, other, openedVideo, videoSlug } = props;
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
      <SiteContextProvider data={{ ...other, isolate, setIsolate, videoModal, toggleVideoModal }}>
        <Wrapper>
          <Main topVideos={topVideos} videoSlug={videoSlug} />
          <Component {...pageProps} />
        </Wrapper>
      </SiteContextProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);

  //TODO this is called in client when we Link to any page with it, and API_BASE isn't accessible in browser, so maybe try an api route?

  const allVideosRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/m2l-video/v1/videos`);
  const dataRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/m2l-video/v2/data`);
  const data = await dataRes.json();
  const { topVideos, allVideos, other } = await allVideosRes.json();

  const videoSlug = appContext.ctx.query.video || null;

  const openedVideo = videoSlug
    ? allVideos
        .filter(cat => {
          return cat.videos.some(video => video.post_name === videoSlug);
        })[0]
        .videos.find(video => video.post_name === videoSlug)
    : null;

  return {
    ...appProps,
    topVideos: shuffle(data.topVideos),
    // allVideos: allVideos,
    other: data.other,
    // openedVideo,
    videoSlug,
  };
};

export default MyApp;
