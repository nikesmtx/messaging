import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import { Link } from "react-router-dom";

import { Button, Input, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const fetchTrialData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: "",
        }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTrialData();
  }, []);

  const handleClick = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="loginPageContainer">
      <div className="header">Psst</div>
      <div className="userInput">
        <Input className="username" placeholder="Email" />
        <Input
          className="password"
          type={showPassword ? "text" : "password"}
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
        <Button variant="contained" size="medium">
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
