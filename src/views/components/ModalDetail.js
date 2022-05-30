import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  minHeight: 500,
};

const ModalWrapper = styled.div``;

export default function ModalDetail({ data, handleOpen, handleClose, open }) {
  console.log(data);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <h1>{data?.title}</h1>
          <div style={{
              fontSize:"14px",
              marginBottom:"32px",
              border:"1px solid #cccccc",
              padding:"8px",
              lineHeight:"14px"
          }}>
            <p style={{
                marign:"1px!important"
            }}><strong>From:</strong></p>
            <p style={{
                marign:"1px!important"
            }}>{data?.sender?.email}</p>
            <p style={{
                marign:"1px!important"
            }}><strong>To:</strong></p>
            <p style={{
                marign:"1px!important"
            }}>{data?.receiver?.email}</p>
            <p><i>Date: {new Date(data?.createdAt)?.toLocaleDateString()}</i></p>
          </div>
          <div style={{
              padding:"8px",
              border: "1px solid #cccccc",
              minHeight:"200px"
          }}>
              {data?.content}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
