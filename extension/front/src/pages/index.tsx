import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import type { NextPage } from "next";
import { IMicroAppsConfig, microAppsConfigMock } from "../utils/microApps";
import { Typography } from "@mui/material";
import theme from "../styles/theme";

interface IRegisterCenter {
  defaultValue: IMicroAppsConfig;
  onFinish: (data: IMicroAppsConfig) => void;
}

const RegisterCenter = (props: IRegisterCenter) => {
  const { defaultValue } = props;
  const [microAppsConfig, setMicroAppsConfig] =
    useState<IMicroAppsConfig>(defaultValue);

  const handleChange = (event: any) => {
    setMicroAppsConfig({
      ...microAppsConfig,
      [event.target.name]: event.target.value,
    });
  };

  const handleFinish = () => {
    // microAppsConfig
    window.location.reload();
    // console.log(microAppsConfig);
  };

  return (
    <form autoComplete="off" noValidate>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          注册中心
        </Typography>

        <Grid container spacing={3}>
          {microAppsConfig.map(({ name, entry }) => {
            return (
              <Grid item md={6} xs={12} key={name}>
                <TextField
                  fullWidth
                  label={name}
                  name={name}
                  onChange={handleChange}
                  required
                  value={entry}
                  variant="outlined"
                />
              </Grid>
            );
          })}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
            position: "sticky",
            bottom: 0,
          }}
        >
          <Button color="primary" variant="contained" onClick={handleFinish}>
            保存
          </Button>
        </Box>
      </Box>
    </form>
  );
};

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          微应用开发工具
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const Home: NextPage = () => {
  const handleFinish = (data: IMicroAppsConfig) => {
    console.log(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <RegisterCenter
        defaultValue={microAppsConfigMock}
        onFinish={handleFinish}
      />
    </ThemeProvider>
  );
};

export default Home;
