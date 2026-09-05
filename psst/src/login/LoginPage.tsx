import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

import { Button, Input, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [enteredCredentials, setEnteredCredentials] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClick = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const loginResponse = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log(loginResponse);
      if (loginResponse.status === 200) {
        navigate("/messaging");
      } else {
        const data = await loginResponse.json();
        setErrorMessage(data.message);
      }
    } catch (e) {
      console.log("Error logging in: ", e);
    }
  };

  useEffect(() => {
    if (email && password) {
      setEnteredCredentials(true);
    } else {
      setEnteredCredentials(false);
    }
  }, [email, password]);

  return (
    <div className="loginPageContainer">
      <div className="header">Psst</div>
      <div className="userInput">
        <Input
          className="username"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          endAdornment={
            <IconButton
              style={{ color: "white" }}
              aria-label="toggle password visibility"
              onClick={handleClick}
              onMouseDown={handleMouseDown}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
      </div>
      <div className="buttons">
        <Button
          variant="contained"
          size="medium"
          disabled={!enteredCredentials}
          onClick={() => handleLogin()}
        >
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/messaging"
          >
            Login
          </Link>
        </Button>
        <Button variant="contained" size="medium">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/register"
          >
            Register
          </Link>
        </Button>
      </div>
      <div className="forgotPassword">
        <Button variant="text" size="small">
          Forgot Password?
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
