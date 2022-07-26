import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

import HeaderModals from './HeaderModals';
import Search from './Search/Search';

import logo from '../public/m2l-tv.png';
import { media } from './theme';
import useSiteContext from './SiteContext';

const Header = () => {
  const aspect = 600 / 211;
  const height = 70;
  const width = aspect * height;

  const { aboutNav, worksNav } = useSiteContext();
  const [about, toggleAbout] = useState(false);
  const [works, toggleWorks] = useState(false);
  const [search, toggleSearch] = useState(false);
  // a = w / h    ah = w

  const router = useRouter();

  useEffect(() => {
    if (router.query.modal) {
      const { modal } = router.query;
      if (modal === 'how-it-works') {
        toggleWorks(true);
      }
      if (modal === 'about') {
        toggleAbout(true);
      }
    }
  }, []);

  return (
    <>
      <StyledHeader className="header" logoWidth={width}>
        <Link href="/">
          <a className="header-logo-link" style={{ display: 'block', flex: `0 0 ${width}px` }}>
            <Image className="header-logo" src={logo} alt="M2L.tv" />
          </a>
        </Link>
        <div className="header-tagline">
          <p className="header-tagline__text">The 5-minute energy reset for your Mississippi classroom</p>
        </div>
        <nav className="header-nav">
          <div className="nav-link">
            <button
              onClick={() => {
                toggleWorks(true);
                router.push('?modal=how-it-works', '/how-it-works', { shallow: true });
              }}
            >
              <span>{worksNav}</span>
            </button>
          </div>
          <div className="nav-link">
            <button
              onClick={() => {
                toggleAbout(true);
                router.push('?modal=about', '/about', { shallow: true });
              }}
            >
              <span>{aboutNav}</span>
            </button>
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
  align-items: end;

  display: grid;
  grid-template-columns: 1fr 1fr 71px;
  grid-template-rows: auto auto;
  grid-template-areas:
    'logo tagline tagline'
    'nav nav search';

  ${media.break`
  grid-template-columns: ${({ logoWidth }) => `${logoWidth}px 1fr auto 71px`};
  grid-template-areas: 
    "logo tagline nav search";
  height: ${({ theme }) => theme.sizes.header}px;
  `}
  justify-items: end;

  .header-logo-link {
    grid-area: logo;
  }

  .header-tagline {
    color: ${({ theme }) => theme.neon};
    font-size: 1.4rem;
    flex-grow: 1;
    margin-left: 1rem;
    justify-self: start;
    grid-area: tagline;
    &__text {
      margin: 0.5rem;
    }
  }

  .header-nav {
    margin-left: auto;
    justify-self: end;
    grid-area: nav;

    display: flex;
  }
  .nav-link {
    color: ${({ theme }) => theme.neon};
    height: 82px;
    display: inline-flex;
    justify-content: center;
    padding: 1rem;
    align-items: center;
    ${media.break`
    padding: 2rem;
    align-items: end;
    `}
    transform: skew(-12deg);
    text-transform: uppercase;
    text-decoration: none;

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
    grid-area: search;

    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export default Header;
