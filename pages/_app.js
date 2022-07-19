import NProgress from 'nprogress';
import Router from 'next/router';

import 'nprogress/nprogress.css';
import Wrapper from '../components/Wrapper';
import { ThemeProvider } from 'styled-components';

import theme from '../components/theme';
import { SiteContextProvider } from '../components/SiteContext';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <SiteContextProvider data={{ ...pageProps.other }}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </SiteContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
