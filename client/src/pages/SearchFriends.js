import React from "react";
import UserCard from "../components/UserCard";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { List, Typography } from "@mui/material";
import UserSearchBox from "../components/UserSearchBox";

function SearchFriends({ baseURL, userId }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = useCallback(() => {
    axios
      .get(`${baseURL}/users`)
      .then((response) => {
        setUsers([...response.data["Users"]]);
        setFilteredUsers([...response.data["Users"]]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getFilteredUsers = async (keyword) => {
    if (keyword === "") {
      setFilteredUsers(users);
      return;
    }
    try {
      const response = await axios.get(
        `${baseURL}/users/searchFriends/${keyword}`
      );
      setFilteredUsers([...response.data["filteredUsers"]]);
    } catch (error) {
      console.log(error);
    }
  };

  const followClickHandler = async (userIdToFollow) => {
    try {
      const response = await axios.put(
        `${baseURL}/users/follow`,
        {
          user: {
            userIdToFollow,
          },
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <UserSearchBox
        className="searchBox"
        baseURL={baseURL}
        getFilteredUsers={getFilteredUsers}
      />
      <List className="usersContainer">
        {filteredUsers.length !== 0 &&
          filteredUsers.map((user) => {
            return (
              <UserCard
                key={`searchFriends-${user.userId}`}
                userId={user.userId}
                userName={user.userName}
                userImage={user.profileImage}
                onFollowClick={followClickHandler}
              />
            );
          })}
        {users.length === 0 && (
          <Typography variant="h5" component="div" data-testid="emptyPostList">
            No search results
          </Typography>
        )}
      </List>
    </>
  );
}

export default SearchFriends;
