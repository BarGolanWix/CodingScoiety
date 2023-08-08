import React from "react";
import { useState, useEffect } from "react";
import { OutlinedInput, InputLabel, Button } from "@mui/material";
import axios from "axios";

function UserSearchBox({ baseURL, getFilteredUsers }) {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="searchBox">
      <OutlinedInput
        error={false}
        id="searchBox-keywword"
        label="serach"
        value={keyword}
        placeholder="Search for a user..."
        onChange={(event) => {
          setKeyword(event.target.value);
        }}
        data-testid="addNewPost-postTitle"
      />
      <Button
        variant="contained"
        size="small"
        onClick={() => getFilteredUsers(keyword)}
      >
        Search
      </Button>
    </div>
  );
}

export default UserSearchBox;
