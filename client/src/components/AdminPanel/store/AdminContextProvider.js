import React from "react";
import AdminContext from "./AdminContext";
import { useState, useEffect } from "react";
import axios from "axios";

const functionalitiesInit = {
  addNewPost: {
    checked: false,
    text: "Add New Post",
    id: "addNewPost",
  },
  exploreMorePosts: {
    checked: false,
    text: "Explore More Posts",
    id: "exploreMorePosts",
  },
  searchFriends: {
    checked: false,
    text: "Search Friends",
    id: "searchFriends",
  },
  popularityFilter: {
    checked: false,
    text: "Popularity Filter",
    id: "popularityFilter",
  },
  playground: {
    checked: false,
    text: "Playground",
    id: "playground",
  },
};

const logsOptionsInit = [
  { id: "login", label: "Logins", checked: false },
  { id: "signOut", label: "SignOuts", checked: false },
  { id: "addNewPost", label: "New Posts", checked: false },
];

function AdminContextProvider(props) {
  const admitted = localStorage.getItem("admitted");
  const baseURL = localStorage.getItem("baseURL");

  const [functionalities, setFunctionalities] = useState(functionalitiesInit);
  const [logsOptions, setLogsOptions] = useState(logsOptionsInit);
  const [currLogs, setCurrLogs] = useState({});

  useEffect(() => {
    getConfiguration();
  }, []);

  useEffect(() => {
    getLogs();
  }, [logsOptions]);

  const getConfiguration = async () => {
    try {
      const response = await axios.get(`${baseURL}/configuration/get`);
      const newConfiguration = response.data.Configuration;
      setFunctionalities(newConfiguration);
    } catch (error) {
      window.location.href !== window.location.origin + "/" &&
        console.log(error.response.data.message);
    }
  };

  const handleDisableClick = (event, checkboxId) => {
    let checkedSts = event.target.checked;
    if (admitted.includes("admin")) {
      setFunctionalities((prevFunctionalities) => ({
        ...prevFunctionalities,
        [checkboxId]: {
          ...prevFunctionalities[checkboxId],
          checked: checkedSts,
        },
      }));
      // functionalities[checkboxId].setChecked(checkedSts);
    }
    storeConfiguration(checkboxId, checkedSts);
  };

  const storeConfiguration = async (checkboxId, checkedSts) => {
    try {
      const response = await axios.put(
        `${baseURL}/configuration/store`,
        {
          functionality: {
            checkboxId,
            checkedSts,
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

  const handleLogsClick = (event, checkboxId) => {
    const checkedSts = event.target.checked;
    const updatedOptions = logsOptions.map((option) =>
      option.id === checkboxId ? { ...option, checked: checkedSts } : option
    );
    setLogsOptions(updatedOptions);
  };

  const getLogs = async () => {
    try {
      const response = await axios.get(`${baseURL}/logs/get`, {
        params: { logsOptions },
      });
      const newLogs = response.data.requestedLogs;
      setCurrLogs(newLogs);
    } catch (error) {
      window.location.href !== window.location.origin + "/" &&
        console.log(error.response.data.message);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        functionalities,
        handleDisableClick,
        getConfiguration,
        currLogs,
        setCurrLogs,
        logsOptions,
        handleLogsClick,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider;
