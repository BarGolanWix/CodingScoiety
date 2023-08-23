import {
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SessionContext from "../session-store/SessionContext";

function Login({ setAdmitted }) {
  const baseURL = localStorage.getItem("baseURL");
  const navigate = useNavigate();
  const sessionCtx = useContext(SessionContext);
  const [account, setAccount] = useState({ userName: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    autoCheckUserCred();
  }, []);

  const autoCheckUserCred = async () => {
    try {
      const response = await axios.get(`${baseURL}/autoCredentialsCheck`);
      const authorization = response.data.authorization;
      if (authorization === "admin" || authorization === "authorizedUser") {
        // setAdmitted(authorization);
        // localStorage.setItem("admitted", authorization);
        navigate("/home");
      } else {
        setAdmitted("");
        localStorage.setItem("admitted", "");
      }
    } catch (error) {
      window.location.href !== window.location.origin + "/" &&
        console.log(error.response.data.message);
    }
  };

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
        let authorization = response.data.authorization + `-${new Date()}`;
        setAdmitted(authorization);
        localStorage.setItem("admitted", authorization);

        let accessTokenExpiration = response.data.accessTokenExpiration;
        sessionCtx.setAccessTokenFromCookie();
        localStorage.setItem("accessTokenExpiration", accessTokenExpiration);

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
      <Card component="form" className="form" data-testid="login-card">
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
              autoComplete="off"
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
              type="password"
              error={false}
              id="login-password"
              label="UserName"
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
            onClick={() => navigate("/signUp")}
          >
            Sign Up
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Login;
