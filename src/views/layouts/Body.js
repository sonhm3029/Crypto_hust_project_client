import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Main from "./Main";
import styled from "styled-components";
import { useState } from "react";
import MyDialog from "../components/Dialog";

const BodyWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

const Body = () => {
  const [valueTab, setValueTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <BodyWrapper>
      <Sidebar
        valueTab={valueTab}
        onOpenTypeEmail={handleOpenDialog}
        handleChangeTab={handleChangeTab}
      />
      <Main
        typeEmail={valueTab === 0 ? "receive" : "sent"}
      />
      <MyDialog
        handleCloseDialog= {handleCloseDialog}
        openDialog = {openDialog}
      />
    </BodyWrapper>
  );
};

export default Body;
