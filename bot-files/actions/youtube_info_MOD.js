module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Store YouTube Info",

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
    const info = [
      "Video ID",
      "Video URL",
      "Video Title",
      "Video Description",
      "Video Channel Name",
      "Video Channel ID",
      "Video Thumbnail URL",
      "Unused but needed!",
      "Unused but needed!",
      "Unused but needed!",
      "Video is Unlisted?",
      "Video is Family Friendly?",
      "Video Duration",
      "Video Views",
      "Available Countries",
      "Video Like Count",
      "Video Dislike Count",
      "Unused but needed!",
      "Unused but needed!",
      "Video is Live?",
      "Unused but needed!",
      "Video Publish Date",
      "Video Owner Viewing?",
      "Video is Age Restricted?",
      "Video Channel Avatar URL",
      "Video Channel is Verified?",
      "Video Channel Subscriber Count",
    ];
    return `${info[parseInt(data.info, 10)]}`;
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = "Unknown Type";
    switch (parseInt(data.info, 10)) {
      case 0:
      case 2:
      case 3:
      case 5:
      case 4:
      case 12:
      case 21:
        dataType = "Text";
        break;
      case 1:
      case 20:
      case 24:
        dataType = "URL";
        break;
      case 6:
        dataType = "Image URL";
        break;
      case 19:
      case 22:
      case 23:
      case 25:
      case 11:
      case 10:
        dataType = "Boolean";
        break;
      case 13:
      case 16:
      case 17:
      case 26:
        dataType = "Number";
        break;
      case 14:
        dataType = "Object";
        break;
    }
    return [data.varName, dataType];
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["video", "info", "storage", "varName"],

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
  

<div>
  <div style="width: 100%;">
    <span class="dbminputlabel">Video URL</span>
    <textarea id="video"></textarea>
  </div>

  <div style="width: 100%; padding-top: 16px;">
    <span class="dbminputlabel">Source Info</span>
    <select id="info" class="round">
      <option value="0">Video ID</option>
      <option value="1">Video URL</option>
      <option value="2">Video Title</option>
      <option value="3">Video Description</option>
      <option value="4">Video Channel Name</option>
      <option value="5">Video Channel ID</option>
      <option value="6">Video Thumbnail URL</option>
      <option value="20">Video Channel URL</option>
      <option value="24">Video Channel Avatar URL</option>
      <option value="25">Video Channel is Verified?</option>
      <option value="26">Video Channel Subscriber Count</option>
      <option value="10">Video is Unlisted?</option>
      <option value="11">Video is Family Friendly?</option>
      <option value="12">Video Duration</option>
      <option value="13">Video Views</option>
      <option value="14">Available Countries</option>
      <option value="16">Video Like Count</option>
      <option value="17">Video Dislike Count</option>
      <option value="21">Video Publish Date</option>
      <option value="19">Video is Live?</option>
      <option value="22">Video Owner Viewing?</option>
      <option value="23">Video is Age Restricted?</option>
    </select>
  </div>
  <br>

  <div>
    <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
  </div>
</div>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];
    const info = parseInt(data.info, 10);
    const input = this.evalMessage(data.video, cache);
    const Mods = this.getMods();
    const ytsr = Mods.require("ytsr");
    const ytdl = Mods.require("ytdl-core");
    let result;

    if (!input) {
      console.log("Please specify a video to get video information.");
      return this.callNextAction(cache);
    }

    console.log("[Store YouTube Info] Searching for video with input:", input);
    const searchResults = await ytsr(input);
    console.log("[Store YouTube Info] Search results:", searchResults);
    if (!searchResults) return this.callNextAction(cache);
    const sr = searchResults.items[0];
    console.log("[Store YouTube Info] Selected search result:", sr);
    if (!sr) return this.callNextAction(cache);

    let videoInfo = await ytdl.getBasicInfo(sr.url);
    videoInfo = videoInfo.videoDetails;
    console.log("[Store YouTube Info] Video details:", videoInfo);

    switch (info) {
      case 0:
        result = videoInfo.videoId;
        break;
      case 1:
        result = `https://www.youtube.com/watch?v=${videoInfo.videoId}`;
        break;
      case 2:
        result = videoInfo.title
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&#39;/g, "'");
        break;
      case 3:
        result = videoInfo.description
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&#39;/g, "'");
        break;
      case 4:
        result = videoInfo.author.name;
        break;
      case 5:
        result = videoInfo.author.id;
        break;
      case 6:
        result = sr.bestThumbnail.url;
        break;
      case 10:
        result = videoInfo.isUnlisted;
        break;
      case 11:
        result = videoInfo.isFamilySafe;
        break;
      case 12:
        result = videoInfo.lengthSeconds;
        break;
      case 13:
        result = videoInfo.viewCount;
        break;
      case 14:
        result = videoInfo.availableCountries;
        break;
      case 16:
        result = videoInfo.likes;
        break;
      case 17:
        result = videoInfo.dislikes;
        break;
      case 19:
        result = videoInfo.isLiveContent;
        break;
      case 20:
        result = videoInfo.author.channel_url;
        break;
      case 21:
        result = videoInfo.uploadDate;
        break;
      case 22:
        result = videoInfo.isOwnerViewing;
        break;
      case 23:
        result = videoInfo.age_restricted;
        break;
      case 24:
        result = sr.author.bestAvatar.url;
        break;
      case 25:
        result = videoInfo.author.verified;
        break;
      case 26:
        result = videoInfo.author.subscriber_count;
        break;
      default:
        break;
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName2, cache);
      console.log("[Store YouTube Info] Stored result:", result);
    }
    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
