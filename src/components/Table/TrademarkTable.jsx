import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useLoaderData } from "react-router-dom";
import DetailsDropdown from "../Dropdown/DetailsDropdown";
import { Button, IconButton, Tooltip } from "@mui/material";
import { UilPen } from '@iconscout/react-unicons'


export default function TrademarkTable() {
  const trademarks = useLoaderData()
  return (
    <div className="Table">
      <div className="Table__header">
        <h1>Trademark</h1>
        <Button color="inherit" variant="text" size="medium">
          <Tooltip title="Create trademark">
            <IconButton>
              <UilPen />
            </IconButton>
          </Tooltip>
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {trademarks.data.map((trademark) => (
              <TableRow
                key={trademark._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {trademark._id}
                </TableCell>
                <TableCell align="left">{trademark.name}</TableCell>
                <TableCell align="left"><img className="Table__img" src={`${window.env.CLOUDINARY_URL}${trademark.img}`} alt={`trademark`} /></TableCell>
                <TableCell align="left">
                  <span className={`status ${trademark.active ? "active" : "inactive"}`}>{trademark.active ? "Còn hoạt động" : "ngừng hoạt động"}</span>
                </TableCell>
                <TableCell align="left" className="Details">
                  <DetailsDropdown />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
