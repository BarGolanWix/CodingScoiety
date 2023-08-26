import React from "react";
import UserCard from "../components/Users/UserCard";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SessionContext from "../session-store/SessionContext";
import { List, Typography, Button, ButtonGroup } from "@mui/material";
import UserSearchBox from "../components/Users/UserSearchBox";

function SearchFriends({ baseURL }) {
  const usersQantum = 8;
  const navigate = useNavigate();
  const sessionCtx = useContext(SessionContext);
  const [users, setUsers] = useState([]);
  const [usersRange, setUsersRange] = useState({ base: 0, limit: usersQantum });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [usersRange]);

  useEffect(() => {
    if (!sessionCtx.isSessionValid()) {
      navigate("/sessionExpired");
    }
  });

  const getUsers = () => {
    axios
      .get(`${baseURL}/users`, { params: { usersRange } })
      .then((response) => {
        setUsers([...response.data["usersWithoutCurrentUser"]]);
        setFilteredUsers([...response.data["usersWithoutCurrentUser"]]);
        // const newUsers = response.data["usersWithoutCurrentUser"];
        // setUsers((prevFilteredUsers) => [...prevFilteredUsers, ...newUsers]);
        // setFilteredUsers((prevFilteredUsers) => [
        //   ...prevFilteredUsers,
        //   ...newUsers,
        // ]);
        setFollowedUsers([...response.data["followedUsers"]]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      setFollowedUsers([...response.data["followedUsers"]]);
    } catch (error) {
      console.log(error);
    }
  };

  const followClickHandler = async (userNameToFollow) => {
    try {
      const response = await axios.put(
        `${baseURL}/users/follow`,
        {
          user: {
            userNameToFollow,
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

  const handleNextClick = () => {
    const newBase = usersRange.limit;
    const newLimit = usersRange.limit + usersQantum;
    console.log(usersRange);
    setUsersRange({ base: newBase, limit: newLimit });
  };

  const handlePrevClick = () => {
    let newBase = usersRange.base - usersQantum;
    newBase < 0 ? (newBase = 0) : (newBase = newBase);
    const newLimit = newBase + usersQantum;
    console.log(usersRange);
    setUsersRange({ base: newBase, limit: newLimit });
  };

  const deleteUserHandler = async (userId) => {
    try {
      const response = await axios.delete(
        `${baseURL}/deleteUser`,
        {
          params: {
            userId,
          },
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      getUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {" "}
      <div className="seachFriends-SearchBox-ButtonGroup">
        <UserSearchBox
          className="searchBox"
          baseURL={baseURL}
          getFilteredUsers={getFilteredUsers}
        />
        <ButtonGroup sx={{ margin: "auto 50px" }} disableElevation>
          {usersRange.base === 0 ? (
            <Button
              size="large"
              sx={{ letterSpacing: 1 }}
              variant="outlined"
              onClick={handlePrevClick}
              disabled
            >
              Prev
            </Button>
          ) : (
            <Button
              size="large"
              sx={{ letterSpacing: 1 }}
              variant="outlined"
              onClick={handlePrevClick}
            >
              Prev
            </Button>
          )}
          {users.length === 0 ? (
            <Button
              size="large"
              sx={{ letterSpacing: 1 }}
              variant="outlined"
              onClick={handleNextClick}
              disabled
            >
              Next
            </Button>
          ) : (
            <Button
              size="large"
              sx={{ letterSpacing: 1 }}
              variant="outlined"
              onClick={handleNextClick}
            >
              Next
            </Button>
          )}
        </ButtonGroup>
      </div>
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
                isFollowed={
                  followedUsers.includes(user.userName) ? true : false
                }
                onDeleteClick={deleteUserHandler}
              />
            );
          })}
        {users.length === 0 && (
          <Typography
            variant="h5"
            component="div"
            fontFamily="monospace"
            data-testid="emptyPostList"
            padding="30px"
          >
            No search results . . .
          </Typography>
        )}
      </List>
    </>
  );
}

export default SearchFriends;
