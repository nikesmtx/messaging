import React, { useState } from "react";
import "./RegisterPage.css";
import { Button, Input, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClick = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className="registerPageContainer">
      <div className="header">Registration</div>
      <div className="inputFields">
        <Input className="username" placeholder="Email" />
        <Input
          className="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
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
        <Input
          className="password"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
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
        <Button className="registerButton" variant="contained" size="medium">
          <Link className="registerLink" to="/">
            Register
          </Link>
        </Button>
        <Button className="returnButton" variant="contained" size="medium">
          <Link className="returnLink" to="/">
            Back to Login Page
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
