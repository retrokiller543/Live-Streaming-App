const NodeMediaServer = require("node-media-server");
const axios = require("axios");

const AUTHURL = "http://auth-api:4000/api/live/auth";

const config = 
{
  rtmp: 
  {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30,
  },
  http: 
  {
    port: 8000,
    mediaroot: "./media",
    allow_origin: "*",
  },
  trans: 
  {
    tasks: 
    [
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

/*
# order of NodeMediaServer :
#                            0 -> request connect
#                            1. preConnect
#                               1.1 connect
#                            2. postConnect
#                               2.1 after connection has been made
#                            3. prePublish
#                               3.1 publish rtmp stream
#                            4. postPublish
#                               4.1 after rtmp stream has been published
#                               4.2 handle audio & video
#                               4.3 close stream
#                            5. donePublish
#                               5.1 rtmp disconnect
#                            6. doneConnect
#                               6.1 cleanup (close & disconnect) connection
*/                        

NMServer.on("preConnect", (id, StreamPath, args) => {
  let session = NMServer.getSession(id);
  count = 0;
  session.socket.on("data", (data) => 
  {
    if (data.toString("utf-8") != undefined && count != 1) 
    {
      data = data.toString("utf-8").replace(/[\x00-\x1F\x7F-\xA0]+/g, "");

      console.dir(`DATA: ${data} . . .`);

      data = data.trim().slice(2);
      if (data.startsWith("releaseStream@"))
      {
        console.dir("RTMP STREAM INBOUND [preConnect]: [" + data + "]");
        const uuidRegex = new RegExp(/(?<=releaseStream@.).+?(?=\?)+/g, "");
        const streamkeyRegex = new RegExp(/key=(\w+)+/g, "");
        
        let uuidMatch = data.match(uuidRegex);
        let streamkeyMatch = data.match(streamkeyRegex);
        if (uuidMatch && streamkeyMatch)
        {
          let uuid = uuidMatch[0]; // index [0] == "UUID" index [1] == NULL
          let streamkey = streamkeyMatch[1]; // index [0] == "key=KEYVALUE" index [1] == "KEYVALUE"
          console.dir(`[[uuid: ${uuid}], [streamkey: ${streamkey}]]`);
        }
        else 
        {
          session.reject();
        }
      }
      count += 1;
    }
  });
});

/*
NMServer.on("postConnect", (id, StreamPath, args) => 
{
  axios.post(AUTHURL)
       .then((req, res) => 
       {
        console.dir(`[+] Request: ${req} . . .`)
        console.dir(`[+] Response: ${res} . . .`);
       })
       .catch((error) => 
       {
        console.log(`[-] Error: ${error} . . .`);
       });
});
*/