import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import userProvider from "@src/data-access/users";
import emailProvider from "@src/data-access/emails";

const DialogWrapper = styled.div``;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyDialog = ({ handleCloseDialog, handleOpenDialog, openDialog }) => {
  const [listUsers, setListUser] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [state, setState] = useState({
    selectedEmail: "",
    emailTitle: "",
    emailContent: "",
    senderId: JSON.parse(localStorage.getItem("user"))?._id,
  });
  const resetContent = () => {
      setState({
        selectedEmail: "",
        emailTitle: "",
        emailContent: "",
        senderId: JSON.parse(localStorage.getItem("user"))?._id,
      })
  }

  const handleInputChange = (event) => {
    setState((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }));
  };
  const getData = async () => {
    try {
      let res = await userProvider.search();
      if (res?.data?.data?.length > 0) {
        setListUser(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSend = async () => {
    let { selectedEmail, emailTitle, emailContent, senderId } = state;
    let body = {
      senderId: senderId,
      receiverId: selectedEmail,
      content: emailContent,
      title: emailTitle,
    };
    try {
      setIsSent(true);
      let res = await emailProvider.create(body);
      if (res?.data?.data) {
          setTimeout(()=> {
              handleCloseDialog();
              setIsSent(false);
              resetContent()
          },3000)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DialogWrapper>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Type Email
            </Typography>
            <Button
              disabled={isSent}
              autoFocus
              color="inherit"
              onClick={handleSend}
            >
              Send
            </Button>
          </Toolbar>
        </AppBar>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Receiver Email
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={state.selectedEmail}
              label="Email"
              name="selectedEmail"
              onChange={handleInputChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {listUsers?.map((item, index) => (
                <MenuItem key={index} value={item?._id}>
                  {item?.email}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Please select receiver email</FormHelperText>
          </FormControl>
        </Box>
        <Box style={{ padding: "8px" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Title"
            name="emailTitle"
            value={state.emailTitle}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            label="Content"
            multiline
            name="emailContent"
            minRows={4}
            value={state.emailContent}
            onChange={handleInputChange}
          />
        </Box>
      </Dialog>
    </DialogWrapper>
  );
};

export default MyDialog;
