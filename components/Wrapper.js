import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import Meta from './Meta';

const Wrapper = ({ children }) => {
  return (
    <SiteWrapper className="site-wrapper">
      <Meta />
      <Header />
      <PageWrapper className="page-wrapper">{children}</PageWrapper>
      <GlobalStyle />
    </SiteWrapper>
  );
};

const SiteWrapper = styled.div``;
const PageWrapper = styled.div``;
export default Wrapper;
