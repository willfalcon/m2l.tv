import NProgress from 'nprogress';
import Router from 'next/router';

// import '../components/styles/nprogress.css';
import Wrapper from '../components/Wrapper';
import { ThemeProvider } from 'styled-components';

import theme from '../components/theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default MyApp;
