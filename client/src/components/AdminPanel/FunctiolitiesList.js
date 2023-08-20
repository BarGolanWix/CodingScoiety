import React from "react";
import { useContext } from "react";
import AdminContext from "../../store/AdminContext";
import FunctionalityItem from "./FunctionalityItem";
import { Divider, Typography } from "@mui/material";

function FunctiolitiesList() {
  const ctx = useContext(AdminContext);
  const functionalitiesNames = Object.keys(ctx.functionalities);

  let functionalitiesComps = [];
  for (const functionalityName of functionalitiesNames) {
    const currFunctionality = ctx.functionalities[functionalityName];
    functionalitiesComps.push(
      <FunctionalityItem
        key={currFunctionality.text + "-checkbox"}
        id={currFunctionality.id}
        text={currFunctionality.text}
        checked={currFunctionality.checked}
        onChange={ctx.handleDisableClick}
      />
    );
  }

  return (
    <div className="functionlitiesList">
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", marginTop: "10%" }}
        color="secondary"
        data-testid="tagList-title"
      >
        Functionalities
      </Typography>
      <Divider sx={{ padding: "3px" }} />
      {functionalitiesComps}
    </div>
  );
}

export default FunctiolitiesList;
