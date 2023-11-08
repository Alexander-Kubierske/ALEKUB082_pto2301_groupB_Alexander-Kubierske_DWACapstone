import React from "react";
import styled from 'styled-components';

import { Search, AccountCircle } from '@mui/icons-material';

const NavWrapper = styled.nav`
    width: 100vw;
    height: 100px;
    display: flex;
    padding: 20px 36px;
    box-shadow: 0px 2.98256px 7.4564px rgba(0, 0, 0, 0.1);
    /* background: red; */
    align-items: center;
    `
const LogoContainer = styled.button`
    margin-right: auto;
    background: none;
    padding: 0;
    border: none;
    height: 100%;
    flex-shrink: 0;
`

const Navbar = () => {


    const LogoButton = () => {
      
        const handleButtonClick = () => {
          console.log("take me home")
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
    
    return (
        <NavWrapper>
            <LogoButton/> 
            <SearchButton/>
            <ProfileButton/>
        </NavWrapper>
    )


}

export default Navbar