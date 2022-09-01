const NodeMediaServer = require("node-media-server");
const axios = require("axios");

const AUTHURL = "http://auth-api:4000/api/live/auth";

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30,
  },
  http: {
    port: 8000,
    mediaroot: "./media",
    allow_origin: "*",
  },
  trans: {
    tasks: [
      {
        app: "live",
        ac: "aac",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
      },
    ],
  },
};

var NMServer = new NodeMediaServer(config);
NMServer.run();

NMServer.on("prePublish", (id, StreamPath, args) => {
  axios
    .post(AUTHURL)
    .then((res) => {
      // console.log(res);
      console.log(`received status code: ${res.status}`);
      console.log(`response: ${res.data.text}`);
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
});
