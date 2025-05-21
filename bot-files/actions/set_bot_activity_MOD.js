module.exports = {
  name: "Set Bot Activity",
  section: "Bot Client Control",
  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadURL:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/set_bot_activity_MOD.js",
  },

  subtitle: function (data) {
    const activities = [
      "Playing",
      "Listening",
      "Watching",
      "Streaming",
      "Competing",
      "Custom",
    ];

    const stats = ["Online", "Idle", "Invisible", "Do Not Disturb"];

    return `Status: ${stats[data.stats]} - ${activities[data.activity]}: ${
      data.nameText
    }`;
  },

  fields: ["activity", "nameText", "url", "stats"],

  html: function () {
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
        >1.1</a
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
  


        <div style="display: flex;">
          <div style="width: 50%; padding-right: 10px">
            <span class="dbminputlabel">Type</span><br>
            <select id="activity" class="round" style="width: 100%;" onchange="glob.onComparisonChanged(this)">
              <option value="0">Playing</option>
              <option value="1">Listening</option>
              <option value="2">Watching</option>
              <option value="3">Streaming</option>
              <option value="4">Competing</option>
              <option value="5">Custom</option>
            </select>
          </div>
          <div style="width: 50%; padding-left: 10px">
            <span class="dbminputlabel">Status</span><br>
            <select id="stats" class="round" style="width: 100%;">
              <option value="0">Online</option>
              <option value="1">Idle</option>
              <option value="2">Invisible</option>
              <option value="3">Do Not Disturb</option>
            </select>
          </div>
        </div>
        <br>
        <span class="dbminputlabel">Activity Name</span><br>
        <input id="nameText" class="round" type="text" style="width: 100%;"><br>
        
        
      `;
  },

  init: function () {
    const { glob, document } = this;

    glob.onComparisonChanged = function (event) {
      const urlContainer = document.getElementById("containerxin");
      if (event.value === "3") {
        urlContainer.classList.remove("hidden");
      } else {
        urlContainer.classList.add("hidden");
      }
    };

    glob.onComparisonChanged(document.getElementById("activity"));
  },

  async action(cache) {
    const botClient = this.getDBM().Bot.bot.user;
    const { ActivityType } = require("discord.js");
    const data = cache.actions[cache.index];

    const nameText = this.evalMessage(data.nameText, cache);
    const url = this.evalMessage(data.url, cache);
    const activityType = parseInt(data.activity);
    const statusType = parseInt(data.stats);

    const status = ["online", "idle", "invisible", "dnd"][statusType];

    const activityTypes = [
      ActivityType.Playing,
      ActivityType.Listening,
      ActivityType.Watching,
      ActivityType.Streaming,
      ActivityType.Competing,
      ActivityType.Custom,
    ];

    let activity = {
      name: nameText,
      type: activityTypes[activityType],
    };

    if (activityType === 3 && url) {
      activity.url = url;
    }

    try {
      await botClient.setPresence({
        status: status,
        activities: [activity],
      });

      this.callNextAction(cache);
    } catch (err) {
      this.displayError(data, cache, err);
    }
  },

  mod: function () {},
};
