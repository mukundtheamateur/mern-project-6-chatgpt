import React from "react";
import { Box, Typography, useTheme, createTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Navbar = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  // const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  //handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("logout successfully ");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      width={"100%"}
      backgroundColor={darkTheme.palette.background.alt}
      p="1rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2 }}
    >
      <Typography variant="h1" color="primary" fontWeight="medium">
        <Link to={'/'} >ChatGPT web app - FutureFinders</Link>
      </Typography>
      {loggedIn ? (
        <>
          <NavLink to="/" p={1} >
            Home
          </NavLink>
          <NavLink to="/login" onClick={handleLogout} p={1} >
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/" p={1} >
            Home
          </NavLink>
          <NavLink to="/register" p={1} >
            Register
          </NavLink>
          <NavLink to="/login" p={1} >
            Login
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
