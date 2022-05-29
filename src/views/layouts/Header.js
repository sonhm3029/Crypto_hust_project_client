import React from "react";
import styled from "styled-components";
import { Box, Avatar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const HeaderWrapper = styled.div`
  height: 64px;
  padding: 8px;
  display: flex;
  align-items: center;
  border: 1px solid #cccccc;
  justify-content: space-between;
  a {
    text-decoration: none;
  }
  .logo {
    display: flex;
    align-items: center;
    h1 {
      color: #000000;
      text-decoration: none;
    }
  }
`;

const Header = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
        toast.success("You have logged out!")
    }

  return (
    <HeaderWrapper>
      <Link to="/">
        <div className="logo">
          <Box sx={{ p: 3 }}>
            <img src={require("@images/logo.jpg")} alt="" height={50} />
          </Box>
          <h1>My Crypto Mail</h1>
        </div>
      </Link>
      <Box style={{ display: "flex" }}>
        <Avatar alt="" sx={{ width: 60, height: 60 }}>
          SN
        </Avatar>
        <div style={{ display: "flex", alignItems: "center", padding:"8px" }}>
          <Button variant="contained" size="small" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Box>
    </HeaderWrapper>
  );
};

export default Header;
