import {
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Input,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp({ setAdmitted, baseURL }) {
  const navigate = useNavigate();
  const [account, setAccount] = useState({ userName: "", password: "" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    setAdmitted("");
    localStorage.setItem("admitted", "");
  }, []);

  const handleSignUp = async () => {
    if (
      account.userName === "" ||
      account.password === "" ||
      account.confirmPassword === ""
    ) {
      return alert("All required fields must not be empty!");
    }
    if (account.password !== account.confirmPassword) {
      return alert("passowrd and confirm password fields are not equal!");
    }
    try {
      const response = await axios.post(
        `${baseURL}/signUp`,
        {
          account,
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      setAdmitted("authorizedUser");
      localStorage.setItem("admitted", "authorizedUser");
      navigate("/home");
    } catch (error) {
      if (error.response.data.message) {
        return alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  const changeAccountDetails = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAccount({ ...account, [name]: value });
  };

  const handleUploadClick = (event) => {
    const selectedFile = event.target.files[0];
    const selectedFileName = selectedFile.name;
    if (selectedFile) {
      setAccount({ ...account, profileImage: selectedFileName });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <Card component="form" className="form" data-testid="addNewPost-card">
        <CardContent className="formFields">
          <FormControl sx={{ minWidth: "100%" }}>
            <InputLabel
              required
              htmlFor="userName-field"
              data-testid="addNewPost-postTitleLabel"
            >
              User Name
            </InputLabel>
            <OutlinedInput
              error={false}
              id="signUp-userName"
              label="UserName"
              name="userName"
              fullWidth
              value={account.userName}
              onChange={(event) => {
                changeAccountDetails(event);
              }}
              data-testid="addNewPost-postTitle"
              autoComplete="off"
            />
          </FormControl>
          <FormControl sx={{ minWidth: "100%" }}>
            <InputLabel
              required
              htmlFor="password-field"
              data-testid="addNewPost-postTitleLabel"
            >
              Password
            </InputLabel>
            <OutlinedInput
              // type="password"
              error={false}
              id="signUp-password"
              label="Password"
              name="password"
              fullWidth
              value={account.password}
              onChange={(event) => {
                changeAccountDetails(event);
              }}
              data-testid="addNewPost-postTitle"
              autoComplete="new-password"
            />
          </FormControl>
          <FormControl sx={{ minWidth: "100%" }}>
            <InputLabel
              required
              htmlFor="confirmPassword-field"
              data-testid="addNewPost-postTitleLabel"
            >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              // type="password"
              error={false}
              id="signUp-ConfirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              fullWidth
              value={account.confirmPassword}
              onChange={(event) => {
                changeAccountDetails(event);
              }}
              data-testid="addNewPost-postTitle"
              autoComplete="new-password"
            />
          </FormControl>
          <FormControl sx={{ minWidth: "100%" }}>
            <input
              accept="image/*"
              type="file"
              onChange={handleUploadClick}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput">
              <Button
                variant="outlined"
                sx={{ minWidth: "100%" }}
                onClick={handleButtonClick}
              >
                Upload Photo
              </Button>
            </label>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            data-testid="addNewPost-submitBtn"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default SignUp;
