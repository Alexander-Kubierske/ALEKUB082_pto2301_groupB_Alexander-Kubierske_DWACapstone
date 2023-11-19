import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

import CloseIcon from '@mui/icons-material/Close';

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


export default function NavBar(props: Props) {

  return (
    <React.Fragment>
      <CssBaseline />

      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <div>
                <Button>
                    <CloseIcon/>
                </Button>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />

        {/** results */}

    </React.Fragment>
  );
}