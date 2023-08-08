import React from "react";
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

function UserCard({ userId, userName, userImage, onFollowClick }) {
  const [follow, setFollow] = useState(false);

  const followClickHandler = () => {
    setFollow((prev) => !prev);
    onFollowClick(userId);
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
