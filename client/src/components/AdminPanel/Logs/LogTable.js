import React from "react";
import { useContext } from "react";
import AdminContext from "../store/AdminContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";

const LogTable = () => {
  const ctx = useContext(AdminContext);

  const handleSortClick = (event) => {
    const sortBy = event.target.getAttribute("value");
    const sorted = ctx.currLogs.slice().sort((a, b) => {
      if (sortBy === "userId" || sortBy === "operation") {
        return a[sortBy].localeCompare(b[sortBy]);
      } else if (sortBy === "date") {
        const dateA = new Date(a["time"]);
        const dateB = new Date(b["time"]);
        return dateA.getDate() - dateB.getDate();
      } else if (sortBy === "time") {
        const timeA = new Date(a["time"]).getTime() % (24 * 60 * 60 * 1000);
        const timeB = new Date(b["time"]).getTime() % (24 * 60 * 60 * 1000);
        return timeA - timeB;
      }
    });
    ctx.setCurrLogs(sorted);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "45%", maxHeight: "80vh", marginTop: "5%" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              variant="text"
              sx={{ color: "#9c27b0", fontSize: "1rem", fontWeight: "bold" }}
              onClick={handleSortClick}
              value="userId"
            >
              User ID
            </TableCell>
            <TableCell
              variant="text"
              sx={{ color: "#9c27b0", fontSize: "1rem", fontWeight: "bold" }}
              onClick={handleSortClick}
              value="operation"
            >
              Operation
            </TableCell>
            <TableCell
              variant="text"
              sx={{ color: "#9c27b0", fontSize: "1rem", fontWeight: "bold" }}
              onClick={handleSortClick}
              value="date"
            >
              Date
            </TableCell>
            <TableCell
              variant="text"
              sx={{ color: "#9c27b0", fontSize: "1rem", fontWeight: "bold" }}
              onClick={handleSortClick}
              value="time"
            >
              Time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ctx.currLogs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{log.userId}</TableCell>
              <TableCell>{log.operation}</TableCell>
              <TableCell>{new Date(log.time).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(log.time).toLocaleTimeString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogTable;
