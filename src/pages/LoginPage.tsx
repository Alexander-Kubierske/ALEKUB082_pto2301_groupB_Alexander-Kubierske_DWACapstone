import React from "react";
import { Tabs, Tab, Typography, Box, Paper } from "@mui/material";
import { LoginForm, SignUpForm, Navbar } from "../components/1componentIndex.ts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// <=========== Create the content for a label ===========>

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

// <=========== User Accessability ===========>

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// <=========== Final login page render ===========>

const LoginPage = () => {
  const [value, setValue] = React.useState(0);
  const buttonRender = 'login';

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div> 
      <Navbar buttonRender={buttonRender}/>
      <Paper className="login--container">
        <div className="login--form">
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
              }}
              className="tab--container"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Sign Up" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <LoginForm />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SignUpForm />
            </CustomTabPanel>
          </Box>
        </div>
      </Paper>
    </div>
  );
};

export default LoginPage;
