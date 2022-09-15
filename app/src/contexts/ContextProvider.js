import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [validName, setValidName] = useState(false);
  const [validFullName, setValidFullName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [auth, setAuth] = useState({});

  const [users, setUsers] = useState([]);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        validName,
        setValidName,
        userFocus,
        setUserFocus,
        pwd,
        setPwd,
        validPwd,
        setValidPwd,
        pwdFocus,
        setPwdFocus,
        matchPwd,
        setMatchPwd,
        validMatch,
        setValidMatch,
        matchFocus,
        setMatchFocus,
        errMsg,
        setErrMsg,
        success,
        setSuccess,
        validFullName,
        setValidFullName,
        fullName,
        setFullName,
        validEmail,
        setValidEmail,
        email,
        setEmail,
        auth,
        setAuth,
        users,
        setUsers,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
