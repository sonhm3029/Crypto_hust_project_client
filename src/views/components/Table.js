import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import ModalDetail from "./ModalDetail";
import { useState } from "react";

const HoveredDiv = styled.div`
  .hovered-row:hover {
    cursor: pointer;
  }
`;

const Table = ({ rowsPerPage, page, rows, emptyRows, typeEmail, props }) => {
  const [modalState, setModalState] = useState({
    modalData: {},
    isShowModal: false,
  });

  const handleShowDetail = (record) => {
    setModalState({
      isShowModal: true,
      modalData: record,
    });
  };

  const handleCloseModalDetail = () => {
    setModalState({
      isShowModal: false,
      modalData: {},
    });
  };

  return (
    // <HoveredDiv>
    <>
      <TableBody {...props}>
        {(rowsPerPage > 0
          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : rows
        )?.map((row) => (
          <HoveredDiv>
            <div
              onClick={() => {
                handleShowDetail(row);
              }}
              className="hovered-row"
            >
              <TableRow key={row.name}>
                <TableCell style={{ width: "30%" }}>
                  {typeEmail === "sent"
                    ? row?.receiver?.email
                    : row?.sender?.email}
                </TableCell>
                <TableCell style={{ width: "60%" }} align="left">
                  {row?.title}
                </TableCell>
                <TableCell style={{ width: "10%" }} align="right">
                  {new Date(row?.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            </div>
          </HoveredDiv>
        ))}

        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
      <ModalDetail
        data={modalState.modalData}
        handleOpen={handleShowDetail}
        handleClose={handleCloseModalDetail}
        open={modalState.isShowModal}
      />
    </>
    // </HoveredDiv>
  );
};

export default Table;
