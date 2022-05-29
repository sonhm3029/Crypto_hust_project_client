import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import userProvider from "@src/data-access/users";

const theme = createTheme();

export default function SignUpSide() {
  const [validate, setValidate] = useState({
    email: true,
    password: true,
  });
  const _setValidate = (data) => {
    setValidate((pre) => ({
      ...pre,
      ...data,
    }));
  };

  const navigate = useNavigate();

  const isValid = (field) => {
    if (validate[field]) return {};
    else {
      return {
        error: true,
        helperText: `Please fill in ${field}`,
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    if (!email || email === "") {
      _setValidate({ email: false });
    }
    if (!password || password === "") {
      _setValidate({ password: false });
    }
    if (email && password) {
      try {
        let res = await userProvider.create({ email, password });
        console.log(res);
        if (res?.data?.data) {
          localStorage.setItem("user", JSON.stringify(res?.data?.data));
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (event) => {
    if (event.target.value !== null && event.target.value !== "") {
      _setValidate({ [event.target.name]: true });
    } else {
      _setValidate({ [event.target.name]: false });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                {...isValid("email")}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                placeholder="Type in your email"
                autoComplete={"off"}
                autoFocus
                type="text"
                onChange={handleInputChange}
              />
              <TextField
                {...isValid("password")}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                placeholder="Type in your password"
                autoComplete={"off"}
                type="text"
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login">{"Have an account? Sign In"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
