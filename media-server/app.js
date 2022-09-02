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
  session.socket.on("data", (data) => 
  {
    if (data.toString("utf-8") != undefined) 
    {
      // use toString in order to get a string that we can manipulate
      // replace all hex characters with blanks as hexadecimal is not a valid input for this section
      // use trim to remove all leading and trailing whitespaces that can cause unexpected behavior
      // slice to remove first 2 identification chars from packet data as they are insignificant for this section
      data = data.toString("utf-8").replace(/[\x00-\x1F\x7F-\xA0]+/g, "").trim().slice(2); 
     
      if (data.startsWith("releaseStream@"))
      {
        console.dir("RTMP STREAM INBOUND [preConnect]: [" + data + "]");
        const uuidRegex = new RegExp(/(?<=releaseStream@.).+?(?=\?)+/g, "");
        const streamkeyRegex = new RegExp(/key=(\w+)+/g, "");
        const uuidMatch = data.match(uuidRegex);
        const streamkeyMatch = data.match(streamkeyRegex);
        if (uuidMatch && streamkeyMatch)
        {
          let uuid = uuidMatch[0]; // index [0] == "UUID" index [1] == NULL
          let streamkey = streamkeyMatch[1]; // index [0] == "key=KEYVALUE" index [1] == "KEYVALUE"

          const usernameExists = streamkey.match(/.+?(?=_)/g, "");
          const randStrExists = streamkey.match(/_\w+/g, "");

          if (usernameExists != null && randStrExists != null)
          {      
            const username = usernameExists[0]; // index [0] == "USERNAME" index [1] == "START OF RANDOM STRING"
            const randStr  = randStrExists[0];  // index [0] == "RANDOM STRING" index [1] == NULL

            console.dir(`[[uuid: ${uuid}], [streamkey: ${streamkey}]]`);
            console.dir(`[[username: ${username}], [randStr: ${randStr}]]`);

            axios
            .post(AUTHURL, { uuid: uuid, user: username }) // No post url needs to be set as default is configured to authentication api url
            .then((res) => {
              console.dir("RESPONSE FROM AUTH-API: " + JSON.stringify(res.data));
              if (res.data.allow_access === true)
              {
                console.dir("[+] Authorized successfully . . .");
              } else { session.reject(); }
            })
            .catch((error) => {
              console.error("ERROR ON REQUEST TO AUTH-API: " + JSON.stringify(error));
            });
          }
          else { session.reject(); }
        }
        else { session.reject(); }
      }
    }
  });
});