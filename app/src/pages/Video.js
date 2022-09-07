import React from "react";

import Flvplayer from "../components/FlvPlayer";

function video() {
  return (
    <div>
      <Flvplayer url={"http://localhost:8000/live/emil.flv"} type="flv" />
    </div>
  );
}

export default video;
