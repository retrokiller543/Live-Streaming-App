import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

import { useStateContext } from "../contexts/ContextProvider";
import { axios } from "../api/index";

const LOGIN_URL = "/api/user/login";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const {
    email,
    setEmail,
    pwd,
    setPwd,
    errMsg,
    setErrMsg,
    success,
    setSuccess,
    setAuth,
  } = useStateContext();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    // eslint-disable-next-line
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ email, pwd, accessToken });
      setEmail("");
      setPwd("");
      setSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/users/user/profile");
      setSuccess(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="w-full max-w-s min-h-xs flex flex-col justify-start p-4 bg-opacity-40 bg-gray-600">
          <p>You are logged in!</p>
        </section>
      ) : (
        <section className="w-full max-w-s min-h-xs flex flex-col justify-start p-4 bg-opacity-40 bg-gray-600">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Login</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-evenly flex-grow pb-4"
          >
            <lable htmlFor="email">Email:</lable>
            <input
              type="text"
              id="email"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <lable htmlFor="password">Password:</lable>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <button>Sign In</button>
          </form>
          <p>
            Don't have an account?
            <br />
            <span className="line">
              <Link to="/register">Register Account</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
