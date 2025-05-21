module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "YouTube Search",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "YouTube Tools",

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadURL:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-v14/actions/youtube_search_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data) {
    const videoInfo = [
      "Video ID",
      "Video URL",
      "Video Title",
      "Video Description",
      "Video Channel ID",
      "Video Channel URL",
      "Video Channel Name",
      "Video Channel Avatar URL",
      "Video Thumbnail URL",
      "Video Duration",
      "Video Publish Date",
      "Video Views",
      "Video is live?",
    ];
    const playlistInfo = [
      "Playlist ID",
      "Playlist URL",
      "Playlist Name",
      "Playlist Description",
      "Playlist Thumbnail URL (Default)",
      "Playlist Thumbnail URL (Medium)",
      "Playlist Thumbnail URL (High)",
      "Playlist Channel ID",
      "Playlist Channel URL",
      "Playlist Channel Name",
      "Playlist Channel Thumbnail URL (Default)",
      "Playlist Channel Thumbnail URL (Medium)",
      "Playlist Channel Thumbnail URL (High)",
      "Video IDs",
      "Video URLs",
      "Video Titles",
      "Video Descriptions",
      "Video Channel IDs",
      "Video Channel URls",
      "Video Channel Names",
      "Video Channel Thumbnail URLs (Default)",
      "Video Channel Thumbnail URLs (Medium)",
      "Video Channel Thumbnail URLs (High)",
      "Video Thumbnail URLs (Default)",
      "Video Thumbnail URLs (Medium)",
      "Video Thumbnail URLs (High)",
      "Video Positions",
      "Video Publish Dates",
    ];
    if (parseInt(data.type, 10) === 1) {
      return `${playlistInfo[parseInt(data.info1, 10)]}`;
    }
    return `${videoInfo[parseInt(data.info0, 10)]}`;
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = "Unknown Type";
    switch (parseInt(data.type, 10)) {
      case 0:
        switch (parseInt(data.info0, 10)) {
          case 0:
          case 2:
          case 3:
          case 4:
          case 6:
          case 17:
          case 18:
            dataType = "Text";
            break;
          case 1:
          case 5:
            dataType = "URL";
            break;
          case 7:
            dataType = "Image URL";
            break;
          case 24:
            dataType = "Boolean";
            break;
          case 19:
            dataType = "Number";
            break;
        }
        break;
      case 1:
        switch (parseInt(data.info1, 10)) {
          case 0:
          case 2:
          case 3:
          case 7:
          case 9:
            dataType = "Text";
            break;
          case 1:
          case 8:
            dataType = "URL";
            break;
          case 4:
          case 5:
          case 6:
          case 10:
          case 11:
          case 12:
            dataType = "Image URL";
            break;
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
          case 27:
            dataType = "List";
            break;
        }
        break;
    }
    return [data.varName, dataType];
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: [
    "type",
    "input",
    "info0",
    "info1",
    "apikey",
    "results",
    "storage",
    "varName",
  ],

  //---------------------------------------------------------------------
  // Command HTML
  //---------------------------------------------------------------------

  html() {
    return `
    <div class="dbmmodsbr1" style="height: 59px">
    <p>Mod Info:</p>
    <p>Created by Shadow</p>
    <p>
      Help:
      <a
        href="https://discord.gg/9HYB4n3Dz4"
        target="_blank"
        style="color: #0077ff; text-decoration: none"
        >discord</a
      >
    </p>
  </div>
  
  <div class="dbmmodsbr dbmmodsbr2">
    <p>Mod Version:</p>
    <p>
      <a
        href="https://github.com/Shadow64gg/DBM-14"
        target="_blank"
        style="color: #0077ff; text-decoration: none"
        >1.0</a
      >
    </p>
  </div>
  
  <style>
    .dbmmodsbr1,
    .dbmmodsbr2 {
      position: absolute;
      bottom: 0px;
      background: rgba(0, 0, 0, 0.7);
      color: #999;
      padding: 5px;
      font-size: 12px;
      z-index: 999999;
      cursor: pointer;
      line-height: 1.2;
      border-radius: 8px;
      transition: transform 0.3s ease, background-color 0.6s ease, color 0.6s ease;
    }
  
    .dbmmodsbr1 {
      left: 0px;
      border: 2px solid rgba(50, 50, 50, 0.7);
    }
  
    .dbmmodsbr2 {
      right: 0px;
      text-align: center;
    }
  
    .dbmmodsbr1:hover,
    .dbmmodsbr2:hover {
      transform: scale(1.01);
      background-color: rgba(29, 29, 29, 0.9);
      color: #fff;
    }
  
    .dbmmodsbr1 p,
    .dbmmodsbr2 p {
      margin: 0;
      padding: 0;
    }
  
    .dbmmodsbr1 a,
    .dbmmodsbr2 a {
      font-size: 12px;
      color: #0077ff;
      text-decoration: none;
    }
  
    .dbmmodsbr1 a:hover,
    .dbmmodsbr2 a:hover {
      text-decoration: underline;
    }
  </style>
  

<div id="wrexdiv">
  <div style="float: left; width: 30%;">
    <span class="dbminputlabel">Source Type</span>
    <select id="type" class="round" onchange="glob.onChange1(this)">
      <option value="0" selected>YouTube Video</option>
      <option value="1">YouTube Playlist</option>
    </select>
  </div>
  <div style="float: left; width: 100%; padding-top: 16px;">
    <span class="dbminputlabel">Video to Search</span>
    <textarea id="input" placeholder="Insert your url or keywords in here..." style="font-family: monospace; white-space: nowrap; resize: none; min-height: 100px;"></textarea>
  </div>
  <div id="divinfo0"; style="float: left; width: 60%; padding-top: 16px;">
    <span class="dbminputlabel">Source Video Info</span>
    <select id="info0" class="round">
      <option value="0">Video ID</option>
      <option value="1" selected>Video URL</option>
      <option value="2">Video Title</option>
      <option value="3">Video Description</option>
      <option value="4">Video Channel ID</option>
      <option value="5">Video Channel URL</option>
      <option value="6">Video Channel Name</option>
      <option value="7">Video Channel Avatar URL</option>
      <option value="8">Video Thumbnail URL</option>
      <option value="9">Video Duration</option>
      <option value="10">Video Publish Date</option>
      <option value="11">Video Views</option>
      <option value="12">Video is Live?</option>
    </select>
  </div>
  <div id="divinfo1"; style="float: left; width: 60%; padding-top: 16px;">
    <span class="dbminputlabel">Source Playlist Info</span>
    <select id="info1" class="round">
      <option value="0">Playlist ID</option>
      <option value="1" selected>Playlist URL</option>
      <option value="2">Playlist Name</option>
      <option value="3">Playlist Description</option>
      <option value="4">Playlist Thumbnail URL (Default)</option>
      <option value="5">Playlist Thumbnail URL (Medium)</option>
      <option value="6">Playlist Thumbnail URL (High)</option>
      <option value="7">Playlist Channel ID</option>
      <option value="8">Playlist Channel URL</option>
      <option value="9">Playlist Channel Name</option>
      <option value="10">Playlist Channel Thumbnail URL (Default)</option>
      <option value="11">Playlist Channel Thumbnail URL (Medium)</option>
      <option value="12">Playlist Channel Thumbnail URL (High)</option>
      <option value="13">Video IDs</option>
      <option value="14">Video URLs</option>
      <option value="15">Video Titles</option>
      <option value="16">Video Descriptions</option>
      <option value="17">Video Channel IDs</option>
      <option value="18">Video Channel URLs</option>
      <option value="19">Video Channel Names</option>
      <option value="20">Video Channel Thumbnail URLs (Default)</option>
      <option value="21">Video Channel Thumbnail URLs (Medium)</option>
      <option value="22">Video Channel Thumbnail URLs (High)</option>
      <option value="23">Video Thumbnail URLs (Default)</option>
      <option value="24">Video Thumbnail URLs (Medium)</option>
      <option value="25">Video Thumbnail URLs (High)</option>
      <option value="26">Video Positions</option>
      <option value="27">Video Publish Dates</option>
    </select>
  </div>
  <div id="divresults" style="float: right; width: 35%; padding-top: 16px;">
    <span class="dbminputlabel">Result Number</span>
    <select id="results" class="round">
      <option value="1">1st Result</option>
      <option value="2">2nd Result</option>
      <option value="3">3rd Result</option>
      <option value="4">4th Result</option>
      <option value="5">5th Result</option>
      <option value="6">6th Result</option>
      <option value="7">7th Result</option>
      <option value="8">8th Result</option>
      <option value="9">9th Result</option>
      <option value="10">10th Result</option>
      <option value="11">11th Result</option>
      <option value="12">12th Result</option>
      <option value="13">13th Result</option>
      <option value="14">14th Result</option>
      <option value="15">15th Result</option>
      <option value="16">16th Result</option>
      <option value="17">17th Result</option>
      <option value="18">18th Result</option>
      <option value="19">19th Result</option>
      <option value="20">20th Result</option>
    </select>
  </div>
  <div id="divapikey" style="float: left; width: 100%; padding-top: 16px;">
    <span class="dbminputlabel">API Key</span>
    <input id="apikey" class="round" type="text" placeholder="Insert your YouTube Data V3 API Key... (Not needed for search)">
  </div>

  <div style="float: left; padding-top: 16px; width: 100%;">
    <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
  </div>
</div>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //---------------------------------------------------------------------

  init() {
    const { glob, document } = this;

    glob.onChange1 = function onChange1(event) {
      const id = parseInt(event.value, 10);
      const videoDiv = document.getElementById("divinfo0");
      const video = document.getElementById("info0");
      const playlistDiv = document.getElementById("divinfo1");
      const playlist = document.getElementById("info1");
      let result = "";
      switch (id) {
        case 0:
          result = "Video";
          video.style.display = null;
          videoDiv.style.display = null;
          playlist.style.display = "none";
          playlistDiv.style.display = "none";
          break;
        case 1:
          result = "Playlist";
          video.style.display = "none";
          videoDiv.style.display = "none";
          playlist.style.display = null;
          playlistDiv.style.display = null;
          break;
      }
      document.getElementById("tempName").innerHTML = result;
    };
    glob.onChange1(document.getElementById("type"));
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];
    const { Actions } = this.getDBM();
    const Mods = this.getMods();
    const input = this.evalMessage(data.input, cache);
    const apikey = this.evalMessage(data.apikey, cache);
    const type = parseInt(data.type, 10);
    const info0 = parseInt(data.info0, 10);
    const info1 = parseInt(data.info1, 10);
    const results = parseInt(data.results, 10);
    const { Client } = Mods.require("youtubei");
    const youtubei = new Client();
    const YTapi = Mods.require("simple-youtube-api");

    if (!input) {
      console.error(
        "[YouTube Search] Please provide a url or some keywords to search for."
      );
      return this.callNextAction(cache);
    }

    switch (type) {
      case 0: {
        const searchResults = await youtubei.search(input, { type: "video" });

        if (!searchResults) {
          console.error("[YouTube Search] No search results returned.");
          return this.callNextAction(cache);
        }

        const compact = searchResults.items[results - 1];

        if (!compact) {
          console.error(
            "[YouTube Search] No compact result found at the specified index."
          );
          return this.callNextAction(cache);
        }

        const videoId =
          compact.videoId || (compact.id && compact.id.videoId) || compact.id;

        if (!videoId) {
          console.error("[YouTube Search] videoId is undefined.");
          return this.callNextAction(cache);
        }
        const video = await youtubei.getVideo(videoId);

        if (!video) {
          console.error(
            "[YouTube Search] Could not retrieve video details for videoId:",
            videoId
          );
          return this.callNextAction(cache);
        }
        let result;
        switch (info0) {
          case 0:
            result = video.id;

            break;
          case 1:
            result = `https://www.youtube.com/watch?v=${video.id}`;

            break;
          case 2:
            result = video.title;

            break;
          case 3:
            result = video.description;

            break;
          case 4:
            result = video.channel.id;

            break;
          case 5:
            result = `https://www.youtube.com/channel/${video.channel.id}`;

            break;
          case 6:
            result = video.channel.name;

            break;
          case 7:
            result =
              video.channel.thumbnails[video.channel.thumbnails.length - 1].url;

            break;
          case 8:
            result = video.thumbnails[video.thumbnails.length - 1].url;

            break;
          case 9:
            result = video.duration;

            break;
          case 10:
            result = video.uploadDate;

            break;
          case 11:
            result = video.viewCount;

            break;
          case 12:
            result = video.isLiveContent;

            break;
          default:
            break;
        }
        if (result !== undefined) {
          const storage = parseInt(data.storage, 10);
          const varName = this.evalMessage(data.varName, cache);
          this.storeValue(result, storage, varName, cache);

          return this.callNextAction(cache);
        }
        break;
      }
      case 1: {
        if (!apikey || apikey === "") {
          console.error(
            "[YouTube Search] Please provide a valid API key for YouTube Search Playlist."
          );
          return this.callNextAction(cache);
        }

        const YouTube = new YTapi(apikey);
        const playlists = await YouTube.searchPlaylists(input, results);

        let result;
        const playlist = playlists[results - 1];

        if (!playlist) return this.callNextAction(cache);
        switch (info1) {
          case 0:
            result = playlist.id;
            break;
          case 1:
            result = `https://www.youtube.com/playlist?list=${playlist.id}`;
            break;
          case 2:
            result = playlist.title
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, "&")
              .replace(/&#39;/g, "'");
            break;
          case 3:
            result = playlist.description
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, "&")
              .replace(/&#39;/g, "'");
            break;
          case 4:
            result = playlist.thumbnails.default.url;
            break;
          case 5:
            result = playlist.thumbnails.medium.url;
            break;
          case 6:
            result = playlist.thumbnails.high.url;
            break;
          case 7:
            result = playlist.channel.id;
            break;
          case 8:
            result = `https://www.youtube.com/channel/${playlist.channel.id}`;
            break;
          case 9:
            result = playlist.channel.title;
            break;
          case 10:
            result = playlist.channel.raw.snippet.thumbnails.default.url;
            break;
          case 11:
            result = playlist.channel.raw.snippet.thumbnails.medium.url;
            break;
          case 12:
            result = playlist.channel.raw.snippet.thumbnails.high.url;
            break;
          default: {
            const videos = await playlist.getVideos();
            const result2 = [];
            videos.forEach((video, pos) => {
              switch (info1) {
                case 13:
                  result2.push(video.id);
                  break;
                case 14:
                  result2.push(`https://www.youtube.com/watch?v=${video.id}`);
                  break;
                case 15:
                  result2.push(
                    video.title
                      .replace(/&quot;/g, '"')
                      .replace(/&amp;/g, "&")
                      .replace(/&#39;/g, "'")
                  );
                  break;
                case 16:
                  result2.push(
                    video.description
                      .replace(/&quot;/g, '"')
                      .replace(/&amp;/g, "&")
                      .replace(/&#39;/g, "'")
                  );
                  break;
                case 17:
                  result2.push(video.channel.id);
                  break;
                case 18:
                  result2.push(
                    `https://www.youtube.com/channel/${video.channel.id}`
                  );
                  break;
                case 19:
                  result2.push(video.channel.title);
                  break;
                case 20:
                  result2.push(
                    video.channel.raw.snippet.thumbnails.default.url
                  );
                  break;
                case 21:
                  result2.push(video.channel.raw.snippet.thumbnails.medium.url);
                  break;
                case 22:
                  result2.push(video.channel.raw.snippet.thumbnails.high.url);
                  break;
                case 23:
                  result2.push(video.thumbnails.default.url);
                  break;
                case 24:
                  result2.push(video.thumbnails.medium.url);
                  break;
                case 25:
                  result2.push(video.thumbnails.high.url);
                  break;
                case 26:
                  result2.push(pos + 1);
                  break;
                case 27:
                  result2.push(video.publishedAt);
                  break;
                default:
                  console.error(
                    "[YouTube Search] Please check your YouTube Search action... There is something wrong."
                  );
                  break;
              }
            });
            if (result2.length > 0) {
              const storage = parseInt(data.storage, 10);
              const varName = this.evalMessage(data.varName, cache);
              this.storeValue(result2, storage, varName, cache);
              return this.callNextAction(cache);
            }
            break;
          }
        }
        if (result !== undefined) {
          const storage = parseInt(data.storage, 10);
          const varName = this.evalMessage(data.varName, cache);
          this.storeValue(result, storage, varName, cache);
          return this.callNextAction(cache);
        }
        break;
      }
      default:
        break;
    }
    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
