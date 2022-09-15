import { Link } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";

const Home = () => {
  const { users } = useStateContext();

  return (
    <>
      {users.map((user, index) => {
        const person = JSON.stringify(user.username);
        // const uuid = JSON.stringify(user.uuid);
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
