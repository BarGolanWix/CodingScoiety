import React from "react";
import { useState, useContext } from "react";
import AdminContext from "../store/AdminContext";
import {
  RadioGroup,
  FormControlLabel,
  Divider,
  Typography,
  Radio,
  Checkbox,
} from "@mui/material";

function LogsList() {
  const ctx = useContext(AdminContext);

  return (
    <div className="logsList">
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", marginTop: "10%" }}
        color="secondary"
        data-testid="tagList-title"
      >
        Logs
      </Typography>
      <Divider sx={{ padding: "3px" }} />
      {ctx.logsOptions.map((log) => (
        <FormControlLabel
          key={log.id + "-checkbox"}
          id={log.id}
          checked={log.checked}
          control={
            <Checkbox
              onChange={(event) => ctx.handleLogsClick(event, log.id)}
            />
          }
          label={log.label}
        />
      ))}
    </div>
  );
}

export default LogsList;
