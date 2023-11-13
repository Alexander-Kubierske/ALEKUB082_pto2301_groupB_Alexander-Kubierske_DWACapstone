import { useState, useEffect } from "react";
import styled from 'styled-components';
import { Search, AccountCircle } from '@mui/icons-material';

interface NavWrapperProps {
  isHidden: boolean;
}

const NavWrapper: React.FC<NavWrapperProps> = ({ isHidden, ...rest }) => {
  return <StyledNavWrapper {...rest} />; // the problem here is the way styled components and ts interact in this corner case. We are passing a prop down to react which is not there when react renders the program or a prop that is native to react it therefore tells us that that prop doesn't have a value and cant modify something that doesn't have that value.
};

const StyledNavWrapper = styled.nav<NavWrapperProps>`
  z-index: 1;
  width: 100vw;
  height: 100px;
  display: flex;
  padding: 20px 36px;
  top: ${(props) => (props.isHidden ? '0' :  '-100px')};
  position: sticky;
  /* box-shadow: 0px 2.98256px 7.4564px rgba(0, 0, 0, 0.1); */
  background: red;
  align-items: center;
  transition: top 1s ease;
`;

const LogoContainer = styled.button`
    margin-right: auto;
    background: none;
    padding: 0;
    border: none;
    height: 100%;
    flex-shrink: 0;
`

let timeoutId: number | undefined;

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false)
  const [prevScrollPosition, setPrevScrollPosition] = useState(window.scrollY);

  const handleScrollEvent = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const currentScrollPosition = window.scrollY;
      setIsHidden((
        (prevScrollPosition > currentScrollPosition && prevScrollPosition - currentScrollPosition > 70) ||
        currentScrollPosition > 100
      ));
      console.log("current:", currentScrollPosition, "\n previous:", prevScrollPosition)
      setPrevScrollPosition(currentScrollPosition)
    }, 100);
  };

  useEffect(()=>{
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent)
    };
  },[prevScrollPosition, isHidden, handleScrollEvent])

  // useEffect(() => {
  //   console.log(`Navbar should be ${isHidden ? 'hidden' : 'showing'}`);
  // }, [isHidden]);


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
    
    return (
        <NavWrapper isHidden={isHidden}>
            <LogoButton/> 
            <SearchButton/>
            <ProfileButton/>
        </NavWrapper>
    )
};

export default Navbar;