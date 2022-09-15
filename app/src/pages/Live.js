import React from "react";
import { useParams } from "react-router-dom";

import { Flvplayer } from "../components/index";

function Live() {
  const { user } = useParams();
  return (
    <div>
      <Flvplayer url={`http://localhost:8000/live/${user}.flv`} type="flv" />
    </div>
  );
}

export default Live;
