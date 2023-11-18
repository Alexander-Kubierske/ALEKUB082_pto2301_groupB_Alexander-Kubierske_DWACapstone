import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import { Search, AccountCircle } from '@mui/icons-material';
import styled from 'styled-components';


interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}



const LogoContainer = styled.button`
    margin-right: auto;
    background: none;
    padding: 30;
    border: none;
    height: 100%;
    flex-shrink: 0;
`

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
  
    const handleButtonClick = () => {
        console.log("Look me up")
    };

    return (
        <div className="search--container" onClick={handleButtonClick}>
          <Search fontSize="large"/>
        </div>
      );
};

const ProfileButton = () => {
  
    const handleButtonClick = () => {
        console.log("is my pfp hot?")
    };

    return (
        <div className="profile-container" onClick={handleButtonClick}>
          <AccountCircle fontSize="large"/>
        </div>
      );
};

export default function NavBar(props: Props) {

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <LogoButton/>
            <SearchButton/>
            <ProfileButton/>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}