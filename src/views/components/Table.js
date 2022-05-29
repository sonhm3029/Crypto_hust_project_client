import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const Table = ({
    rowsPerPage,
    page,
    rows,
    emptyRows,
    props
}) => {
  return (
    <TableBody {...props}>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      )?.map((row) => (
        <TableRow key={row.name}>
          <TableCell style={{ width: "30%" }}>{row?.title}</TableCell>
          <TableCell style={{ width: "60%" }} align="left">
            {row?.title}
          </TableCell>
          <TableCell style={{ width: "10%" }} align="right">
            {new Date(row?.createdAt).toLocaleDateString()}
          </TableCell>
        </TableRow>
      ))}

      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default Table;
