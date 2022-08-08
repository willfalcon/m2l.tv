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

const LogRocket = require('logrocket');
const setupLogRocketReact = require('logrocket-react');

// only initialize when in the browser
if (typeof window !== 'undefined') {
  LogRocket.init('app/id');
  // plugins should also only be initialized when in the browser
  setupLogRocketReact(LogRocket);
}

function MyApp(props) {
  const { Component, pageProps, topVideos, other, curriculumSlug, tagSlug, openVideo } = props;
  const [isolate, setIsolate] = useState(null);
  const [videoModal, toggleVideoModal] = useState(false);

  useEffect(() => {
    if (openVideo) {
      setIsolate(openVideo);
      toggleVideoModal(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SiteContextProvider data={{ ...other, isolate, setIsolate, videoModal, toggleVideoModal, curriculumSlug, tagSlug }}>
        <Wrapper>
          <Main topVideos={topVideos} />
          <Component {...pageProps} topVideos={topVideos} />
        </Wrapper>
      </SiteContextProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);

  const videoSlug = appContext.ctx.query.video || null;
  const dataRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/m2l-video/v2/data?video=${videoSlug}`);
  const data = await dataRes.json();

  const curriculumSlug = appContext.ctx.query.curriculum || null;
  const tagSlug = appContext.ctx.query.tag || null;

  return {
    ...appProps,
    topVideos: shuffle(data.topVideos),
    other: data.other,
    curriculumSlug,
    tagSlug,
    openVideo: data.openVideo,
  };
};

export default MyApp;
