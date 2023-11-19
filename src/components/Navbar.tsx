import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { Search, AccountCircle } from '@mui/icons-material';
import styled from 'styled-components';

import { usePageStore } from '../store/storeIndex';

const LogoContainer = styled.button`
    background: none;
    padding: 30;
    border: none;
    height: 100%;
    flex-shrink: 0;
`

interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    target: undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const NavBar = () => {
  const { setActivePage } = usePageStore();

  const LogoButton = () => {
      
    const handleButtonClick = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    return (
        <LogoContainer onClick={handleButtonClick}>
          <img src="./src/images/logo.jpg" alt="Logo" className="logo--button" />
        </LogoContainer>
      );
  };
  
  const SearchButton = () => {
  
    const handleSearchClick = () => {
      setActivePage('search')
    };
  
    return (
      <div className="navbar--search--container" onClick={handleSearchClick}>
        <Search fontSize="large"/>
      </div>
    );
  };
  
  const ProfileButton = () => {
  
    const handleProfileClick = () => {
      console.log("is my pfp hot?")
    };
    
    return (
      <div className="profile-container" onClick={handleProfileClick}>
        <AccountCircle fontSize="large"/>
      </div>
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <LogoButton/>
            <Typography>HitBox Radio</Typography>
            <SearchButton/>
            <ProfileButton />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
};

export default NavBar