import React from "react";
import styled from "styled-components";
import { Button, Box, Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TabPanel } from "@mui/lab";
import { useState } from "react";

const SidebarWrapper = styled.div`
  width: 256px;
  border: 1px solid #cccccc;
  padding: 8px;
  min-height: 100vh;
`;

const Sidebar = ({valueTab, handleChangeTab, onOpenTypeEmail}) => {
  
  


  

  return (
    <SidebarWrapper>
      <Button variant="outlined" onClick={onOpenTypeEmail}
      >
        <AddIcon color="primary" />
        Type Email
      </Button>
      <Box>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Inbox" />
          <Tab label="Sent" />
        </Tabs>
      </Box>
    </SidebarWrapper>
  );
};

export default Sidebar;
