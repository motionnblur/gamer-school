import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Box, Tabs, Tab } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

interface A11yProps {
  id: string;
  "aria-controls": string;
}

function a11yProps(index: number): A11yProps {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LoginCard() {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xs">
      <Card sx={{ mt: 8 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="login signup tabs"
          centered
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Sign Up" {...a11yProps(1)} />
        </Tabs>
        <CardContent>
          <TabPanel value={value} index={0}>
            <Typography variant="h5" component="div" gutterBottom>
              Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="login-email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="login-password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h5" component="div" gutterBottom>
              Sign Up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="signup-email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="signup-password"
                autoComplete="new-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="new-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>
    </Container>
  );
}
