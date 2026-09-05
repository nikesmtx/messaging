import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import { Button, Input, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClick = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const registerUser = async () => {
    try {
      const response = await fetch("/api/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Check the status of the response first
      if (response.status === 401) {
        const data = await response.json();
        setErrorMessage(data.message);
      } else if (response.status === 201) {
        navigate("/");
      }
    } catch (e) {
      console.log("Error registering user: ", e);
    }
  };

  useEffect(() => {
    if (!email || !password || !secondPassword) {
      setErrorMessage("");
      setConfirmPassword(false);
    } else if (email && password && secondPassword) {
      if (password !== secondPassword) {
        setErrorMessage("Passwords do not match.");
      } else {
        setErrorMessage("");
        setConfirmPassword(true);
      }
    }
  }, [email, password, secondPassword]);

  return (
    <div className="registerPageContainer">
      <div className="header">Registration</div>
      {errorMessage ? (
        <label style={{ color: "red" }}>{errorMessage}</label>
      ) : null}
      <div className="inputFields">
        <Input
          className="username"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
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
          onChange={(e) => setSecondPassword(e.target.value)}
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
          className="registerButton"
          variant="contained"
          size="medium"
          disabled={!confirmPassword}
          onClick={() => registerUser()}
        >
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
