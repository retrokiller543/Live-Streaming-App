import React from "react";

import { useParams, useNavigate } from "react-router-dom";

function UserProfile() {
  const { user } = useParams();
  const navigate = useNavigate();
  // add a state to store the user info and prob the user profile data like img...

  // add a useEffect with a axios get request to retrive info

  return (
    <div>
      <h1>{user}</h1>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default UserProfile;
