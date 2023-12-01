import { useEffect, useState, useRef } from "react";
import Login from "./Login";
import { Navigate, useNavigate } from "react-router-dom";
import CepedaRapel from "../media/CepedaRapel.jpg";
import TextField from "@mui/material/TextField";
import InfoIcon from '@mui/icons-material/Info';

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//to validate username: can contain upper and lowercase characters - and _ and be between 3 and 20 characters
const USER_REGEX = /^[a-zA-Z][a-zAZ0-9-_]{3,20}$/;
//to validate password: must contain at least one lowercase, one uppercase, one number and be between 6 and 24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;

export default function Register() {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(null);
  const [userFocus, setUserFocus] = useState(null);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(null);
  const [passwordFocus, setPasswordFocus] = useState(null);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(null);
  const [matchFocus, setMatchFocus] = useState(null);

  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  //to check username validity
  useEffect(() => {
    if (username !== "" && userFocus === true) {
        console.log(username);
      setValidName(true);
    }
  }, [username]);

  //to check password validity and password match in confirmation field
  useEffect(() => {
    if (password !== "" && passwordFocus === true) {
        setValidPassword(true)
    }
  }, [password]);

//   useEffect(() => {
//     if (matchPassword !== "" && matchFocus === true) {
//         setValidMatch(true)
//     }
//   }, [matchPassword]);

  useEffect(() => {
    setErrMessage("");
  }, [username, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3007/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSuccess(true);
      } else {
        //console.error("Registration failed", response.statusText);
      } //error at this point, not sure why, no errors in console or terminal, will come back to here later on
    } catch (error) {
      if (!error?.response) {
        setErrMessage("No server response");
      } else if (errMessage.response?.status === 409) {
        setErrMessage("Username taken, please choose another one.");
      } else {
        setErrMessage("Registration Failed.");
      }
    }
  };

  function checkUserBlur() {
    const result = USER_REGEX.test(username);
    console.log(result, username);
    result ? setValidName(true) : setValidName(false)
  }

  function checkPasswordBlur() {
    const result = PWD_REGEX.test(password);
    console.log(result, password);
    result ? setValidPassword(true) : setValidPassword(false);
  }

  function checkPasswordMatch() {
    const result = PWD_REGEX.test(password);
    if(password === matchPassword && result) {
        setValidMatch(true)
    } else {
        setValidMatch(false)
    }
  }

  const handleLoginClick = async () => {
    navigate("/login");
  };

  return (
    <>

 <div className= "background" style={{backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100vw', // Full width of the viewport
  height: '100vh', // Full height of the viewport
  maxWidth: "1280px",
  backgroundImage: `url(${CepedaRapel})`, objectFit: 'contain'}}>

    <div className="register">
      {success ? (
        <div>
          <h1>You have successfully created a new account!</h1>
          <button onClick={handleLoginClick}>
            Click here to login and get started!
          </button>
        </div>
      ) : (
        <div className="registerForm">
          <p
            ref={errRef}
            className={errMessage ? "errMessage" : "offscreen"}
          ></p>
          <div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                
              </span>
              <span className={validName || !username ? "hide" : "invalid"}></span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={checkUserBlur}
            ></input>
            {validName === false ? (
              <p
                id="username-reqs-note"
                className={
                  userFocus && username && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Username must begin with a letter and be 4- 20 characters in
                length. <br />
                Characters permitted: Letters, numbers, underscores and hyphens.
              </p>
            ) : (
              ""
            )} <br/>

            <label htmlFor="password">
              Password:
              <span className={validPassword ? "valid" : "hide"}>
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={() => setPasswordFocus(true)}
              onBlur={checkPasswordBlur}
            ></input>
            {validPassword === false ? (
              <p
                id="password-reqs-note"
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Password must be 6-24 charcters in length. <br />
                It must contain at least one upper and lowercase letter and one
                number.
              </p>
            ) : (
              ""
            )}<br/><br/>
            <label htmlFor="confirm-password">
              Confirm password:
              <span
                className={validMatch && matchPassword ? "hide" : "invalid"}
              >
              </span>
            </label>
            <input
              type="password"
              id="confirm-password"
              onChange={(e) => setMatchPassword(e.target.value)}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={checkPasswordMatch}
            />
            {validMatch === false ? (
              <p
                id="confirm-note"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Password must match the first input.
              </p>
            ) : (
              ""
            )}
            <button 
              onClick={handleSubmit}
              
              
            >
              Create Account
            </button>
          </form>
          <p>
            Already have an account? Click{" "}
            <button onClick={handleLoginClick}>here</button> to login.
          </p>
        </div>
        </div>
      )}
      </div>
      </div>
    </>
  );
}
//need to add login to link here
//should use DTOs or conditions in the backend
