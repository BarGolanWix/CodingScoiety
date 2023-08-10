import {
  Card,
  CardContent,
  CardActions,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  TextField,
  Button,
  Select,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function Login({ setAdmitted, baseURL }) {
  const navigate = useNavigate();
  const [account, setAccount] = useState({ userName: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    setAdmitted("");
  }, []);

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = async () => {
    if (account.userName === "" || account.password === "") {
      return alert("All required fields must not be empty!");
    }
    try {
      const response = await axios.post(
        `${baseURL}/credentialsCheck`,
        {
          account,
          rememberMe,
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.authorization !== "unauthorized") {
        setAdmitted(response.data.authorization);
        localStorage.setItem("admitted", response.data.authorization);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      alert("User name or password are not correct");
    }
  };

  const changeAccountDetails = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAccount({ ...account, [name]: value });
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
              id="login-userName"
              label="UserName"
              name="userName"
              fullWidth
              value={account.userName}
              onChange={(event) => {
                changeAccountDetails(event);
              }}
              data-testid="addNewPost-postTitle"
            />
          </FormControl>
          <FormControl sx={{ minWidth: "100%" }}>
            <InputLabel
              required
              htmlFor="userName-field"
              data-testid="addNewPost-postTitleLabel"
            >
              Password
            </InputLabel>
            <OutlinedInput
              error={false}
              id="login-userName"
              label="UserName"
              name="password"
              fullWidth
              value={account.password}
              onChange={(event) => {
                changeAccountDetails(event);
              }}
              data-testid="addNewPost-postTitle"
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
            }
            label="Remember me"
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            data-testid="addNewPost-submitBtn"
            onClick={handleLogin}
          >
            Log In
          </Button>
          <Button
            variant="outlined"
            size="large"
            data-testid="addNewPost-submitBtn"
            onClick={handleLogin}
          >
            Sign Up
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Login;
