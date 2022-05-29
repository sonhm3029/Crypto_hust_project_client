import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Main from "./Main";
import styled from "styled-components";

const BodyWrapper = styled.div`
  display: flex;
  margin-top:16px;
`;

const Body = () => {
  return (
    <BodyWrapper>
      <Sidebar />
      <Main />
    </BodyWrapper>
  );
};

export default Body;
