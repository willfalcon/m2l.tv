import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Meta from './Meta';
import GlobalStyle from './GlobalStyle';

const Wrapper = ({ children }) => {
  return (
    <SiteWrapper className="site-wrapper">
      <Meta />
      <Header />
      {children}
      <GlobalStyle />
    </SiteWrapper>
  );
};

const SiteWrapper = styled.div`
  margin-bottom: 12rem;
`;

export default Wrapper;
