import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

import logo from '../public/m2l-tv.png';
import m2lLogo from '../public/move-to-learn.png';
import Link from 'next/link';
import theme from './theme';
import useSiteContext from './SiteContext';

import HeaderModals from './HeaderModals';
import Search from './Search';

const Header = () => {
  const aspect = 600 / 211;
  const height = 70;
  const width = aspect * height;

  const { aboutNav, worksNav } = useSiteContext();
  const [about, toggleAbout] = useState(false);
  const [works, toggleWorks] = useState(false);
  const [search, toggleSearch] = useState(false);
  // a = w / h    ah = w
  return (
    <>
      <StyledHeader className="header">
        <Link href="/">
          <a style={{ display: 'block', flex: `0 0 ${width}px` }}>
            <Image className="header-logo" src={logo} alt="M2L.tv" />
          </a>
        </Link>
        <p className="header-tagline">The 5-minute energy reset for your Mississippi classroom</p>
        <nav className="header-nav">
          <div className="nav-link">
            <button onClick={() => toggleWorks(true)}>{worksNav}</button>
          </div>
          <div className="nav-link">
            <button onClick={() => toggleAbout(true)}>{aboutNav}</button>
          </div>
        </nav>

        <button className="search-button" onClick={() => toggleSearch(!search)}>
          <FaSearch color="#ffffff" />
        </button>
      </StyledHeader>

      <Search search={search} toggleSearch={toggleSearch} logoWidth={width} />
      <HeaderModals about={about} toggleAbout={toggleAbout} works={works} toggleWorks={toggleWorks} />
    </>
  );
};

const StyledHeader = styled.header`
  display: flex;
  height: 82px;
  align-items: end;
  .header-tagline {
    color: ${({ theme }) => theme.neon};
    font-size: 1.4rem;
    flex-grow: 1;
  }

  .header-nav {
  }
  .nav-link {
    color: ${({ theme }) => theme.neon};
    height: 82px;
    display: inline-flex;
    justify-content: center;
    align-items: end;
    padding: 2rem;
    transform: skew(-12deg);
    text-transform: uppercase;
    button {
      background: none;
      border: 0;
      text-transform: inherit;
      color: inherit;
      font-size: inherit;
      cursor: pointer;
    }
    > * {
      transform: skew(12deg);
    }

    :nth-child(1) {
      background: ${({ theme }) => theme.darkPurple};
    }
    :nth-child(2) {
      background: ${({ theme }) => theme.lightPurple};
    }
    :nth-child(3) {
    }
  }

  .search-button {
    border: 0;
    height: 82px;
    background: ${({ theme }) => theme.gradient};
    display: block;
    width: 80px;
    margin-left: -8px;

    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export default Header;
