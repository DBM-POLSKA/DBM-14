module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Level System",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Economy",

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `Level and XP management`;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/level_system_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["xpPerMessage", "xpToLevelUp", "actions"],

  //---------------------------------------------------------------------
  // Command HTML
  //---------------------------------------------------------------------

  html(isEvent, data) {
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
  

    <tab-system style="margin-top: 20px;">
      <!-- General Tab -->
      <tab label="General" icon="cogs">
        <div style="margin-top: 12px; display: flex; gap: 20px;">
          <div style="flex: 1;">
            <span class="dbminputlabel">XP per Message</span>
            <input id="xpPerMessage" class="round" type="text">
          </div>
          <div style="flex: 1;">
            <span class="dbminputlabel">XP to Level Up</span>
            <input id="xpToLevelUp" class="round" type="text">
          </div>
        </div>
      </tab>

      <!-- Action Tab -->
      <tab label="Level UP" icon="cogs">
        <action-list-input id="actions" height="calc(100vh - 300px)"></action-list-input>
      </tab>
    </tab-system>
    `;
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    const storageType = parseInt(data.storage, 10);
    if (storageType !== varType) return;
    return [data.varName, "Text"];
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const fs = require("fs");
    const path = require("path");
    const data = cache.actions[cache.index];
    const xpPerMessage = parseInt(this.evalMessage(data.xpPerMessage, cache));
    const xpToLevelUp = parseInt(this.evalMessage(data.xpToLevelUp, cache));

    const economyFilePath = path.join(__dirname, "..", "data", "players.json");

    let economyData = {};
    if (fs.existsSync(economyFilePath)) {
      economyData = JSON.parse(fs.readFileSync(economyFilePath, "utf-8"));
    } else {
      fs.writeFileSync(
        economyFilePath,
        JSON.stringify(economyData, null, 2),
        "utf-8"
      );
    }

    const member = cache.msg.guild.members.cache.get(cache.msg.author.id);
    if (!member) {
      console.error("Could not find member.");
      return this.callNextAction(cache);
    }
    const memberId = member.id;
    const currentXP = economyData[memberId]?.xp || 0;
    let newXP = currentXP + xpPerMessage;
    let currentLevel = economyData[memberId]?.level || 0;

    let levelUp = false;
    if (newXP >= xpToLevelUp) {
      newXP = 0;
      currentLevel += 1;
      levelUp = true;
    }

    if (!economyData[memberId]) {
      economyData[memberId] = {
        username: member.user.username,
        xp: newXP,
        level: currentLevel,
      };
    } else {
      economyData[memberId].username = member.user.username;
      economyData[memberId].xp = newXP;
      economyData[memberId].level = currentLevel;
    }
    fs.writeFileSync(
      economyFilePath,
      JSON.stringify(economyData, null, 2),
      "utf-8"
    );

    if (levelUp) {
      const actions = data.actions ? data.actions : [];
      if (actions.length > 0) {
        this.executeSubActionsThenNextAction(actions, cache);
        return;
      } else {
      }
    }

    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
