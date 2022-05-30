import * as React from "react";
import PropTypes from "prop-types";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { Table } from "@mui/material";
import MyTable from "../components/Table";
import {useEffect, useState} from "react";
import emailProvider from "../../data-access/emails";
import Dialog from '@mui/material/Dialog';


TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



export default function CustomPaginationActionsTable({typeEmail}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getData = async() => {
    let param = {
        page,
        size:rowsPerPage,
        id:JSON.parse(localStorage.getItem("user"))?._id,
        typeEmail
    }
    let res = await emailProvider.searchById(param);
    if( res?.data?.data?.length > 0) {
        setRows(res?.data?.data);
        return;
    }
    else if(res?.data?.data) {
      setRows([res?.data?.data]);
      return;
    }
  }

  useEffect(() => {
    getData();
  }, [typeEmail])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
        <MyTable
          style={{ width: "100%" }}
          rowsPerPage={rowsPerPage}
          page={page}
          rows={rows}
          typeEmail={typeEmail}
          emptyRows={emptyRows}
        />
      </Table>
    </TableContainer>
  );
}
