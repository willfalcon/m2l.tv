import { useState } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import App from 'next/app';
import 'nprogress/nprogress.css';
import Wrapper from '../components/Wrapper';
import { ThemeProvider } from 'styled-components';
import shuffle from '../lib/shuffle';
import theme from '../components/theme';
import { SiteContextProvider } from '../components/SiteContext';
import PrimaryVideo from '../components/PrimaryVideo';
import VideoModal from '../components/VideoModal';
import VideoTrack from '../components/Track/VideoTrack';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangError', () => NProgress.done());

function MyApp(props) {
  const { Component, pageProps, topVideos, allVideos, other } = props;
  const [isolate, setIsolate] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <SiteContextProvider data={{ ...other, isolate, setIsolate }}>
        <Wrapper>
          <>
            <PrimaryVideo {...topVideos[0]} />
            <VideoTrack videos={topVideos.slice(1)} label="Top Videos" setIsolate={setIsolate} />
            {allVideos.map(track => (
              <VideoTrack key={track.term_id} {...track} setIsolate={setIsolate} />
            ))}
          </>
          <Component {...pageProps} allVideos={allVideos} />
        </Wrapper>
      </SiteContextProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);

  //TODO this is called in client when we Link to any page with it, and API_BASE isn't accessible in browser, so maybe try an api route?

  const allVideosRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/m2l-video/v1/videos`);
  const data = await allVideosRes.json();

  return {
    ...appProps,
    topVideos: shuffle(data.topVideos),
    allVideos: data.allVideos,
    other: data.other,
  };
};

export default MyApp;
