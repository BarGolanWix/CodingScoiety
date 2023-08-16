import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Fab, Tooltip } from "@mui/material";

function DeleteButton({ handleDeletePostClick, postId }) {
  return (
    <Fab
      variant="extended"
      size="small"
      fontSize="medium"
      sx={{ float: "right", padding: "5px" }}
      disableRipple
      onClick={() => handleDeletePostClick(postId)}
    >
      <Tooltip title="delete post" arrow placement="top">
        <DeleteOutlineIcon color="action" />
      </Tooltip>
    </Fab>
  );
}

export default DeleteButton;
