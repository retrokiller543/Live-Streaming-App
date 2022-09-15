import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axios } from "../api/index";

const API_URL = "/api/user/retUsers";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        });
        setUsers(res.data);
        console.log(users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      {users.map((user, index) => {
        const person = JSON.stringify(user.username);
        console.log(person);
        console.log("its looping");
        return (
          <div key={index}>
            <Link key={index} to={`/users/${person}/profile`}>
              <h2>Link to {person} profile</h2>
            </Link>
            <Link key={index} to={`/users/${person}/live`}>
              <h2>Link to {person} live feed</h2>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Home;
