import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import { Search, AccountCircle } from "@mui/icons-material";
import styled from "styled-components";
import { Link } from 'react-router-dom';


interface Props {
  children: React.ReactElement;
}

interface NavBarProps {
  buttonRender: string;
}

// <=========== Services ===========>

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

  const LogoContainer = styled.button`
    background: none;
    padding: 30;
    border: none;
    height: 100%;
    flex-shrink: 0;
  `;

  // <=========== NavBar Function ===========>

const NavBar: React.FC<NavBarProps> = (props) => {

  /**
  * The currently active page that the navbar can be on.
  * string passed as prop from parent component.
  * @type {string} One of: 'home' | 'login'
  */
  const currentPageRendering = props.buttonRender;

  // <=========== NavBar Button Funcs===========>

  const LogoButton = () => {
    const handleButtonClick = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    return (
      <LogoContainer onClick={handleButtonClick}>
        <Link to="/">
          <img src="./src/images/logo.jpg" alt="Logo" className="logo--button" />
        </Link>
      </LogoContainer>
    );
  };

  const SearchButton = () => {
    return (
      
        <div className="navbar--search--container" to="/search">
          <Link to="/search" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Search fontSize="large" />
          </Link>
        </div>
    );
  };

  const ProfileButton = () => {
    const handleProfileClick = () => {
      console.log("is my pfp hot?");
    };

    return (
      <div className="profile-container" onClick={handleProfileClick}>
        <AccountCircle fontSize="large" />
      </div>
    );
  };

  // <=========== NavBar Output ===========>

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <LogoButton />
            <Typography>HitBox Radio</Typography>
            {currentPageRendering === "home" && <SearchButton />}
            {currentPageRendering === "home" && <ProfileButton />}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
};

export default NavBar;
