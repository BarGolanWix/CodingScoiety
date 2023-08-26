import React, { useEffect } from "react";
import {
  CardContent,
  ListItemButton,
  Card,
  ListItem,
  Typography,
  Button,
} from "@mui/material";
import Image from "mui-image";
import { useState } from "react";
import DeleteButton from "./DeleteButton";

function UserCard({
  userId,
  userName,
  userImage,
  onFollowClick,
  isFollowed,
  onDeleteClick,
}) {
  const admitted = localStorage.getItem("admitted");
  const [follow, setFollow] = useState(isFollowed);

  const followClickHandler = () => {
    setFollow((prev) => !prev);
    onFollowClick(userName);
  };

  return (
    <div>
      <ListItem
        alignItems="flex-start"
        sx={{
          justifyContent: "center",
        }}
        key={`userCard-${userId}`}
        data-testid={`userCard-${userId}`}
      >
        <Card>
          {admitted.includes("admin") && (
            <DeleteButton onDeleteClick={onDeleteClick} userId={userId} />
          )}
          <ListItemButton disableGutters sx={{ margin: "4px" }}>
            <CardContent className="userCard">
              <Typography
                variant="h6"
                letterSpacing={1.5}
                data-testid={`userName-${userId}`}
              >
                {userName}
              </Typography>
              <Image
                src={userImage}
                alt={`${userName}'s profile Image`}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "10px",
                  border: "2px solid #000000",
                }}
              />
              <Button
                fullWidth={true}
                variant={follow ? "contained" : "outlined"}
                color={follow ? "primary" : "inherit"}
                size="small"
                onClick={followClickHandler}
              >
                {follow ? "Following" : "Follow"}
              </Button>
            </CardContent>
          </ListItemButton>
        </Card>
      </ListItem>
    </div>
  );
}

export default UserCard;
