module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Temp Ban Member",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Member Control",

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `${presets.getMemberText(data.member, data.varName)}`;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/DBM-POLSKA",
    downloadUrl:
      "https://github.com/DBM-POLSKA/DBM-14/blob/main/bot-files/actions/temp_ban_member_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: [
    "member",
    "varName",
    "reason",
    "days",
    "time",
    "storage",
    "varName2",
  ],

  //---------------------------------------------------------------------
  // Action Storage Function
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;

    return [data.varName2, `Timestamp`];
  },

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

<member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Reason</span><br>
	<textarea id="reason" class="dbm_monospace" rows="5" placeholder="Insert reason here..." style="white-space: nowrap; resize: none;"></textarea>
</div><br>

<div>
  <span class="dbminputlabel">Number of days of messages to delete</span>
  <input id="days" placeholder="Optional" class="round" type="text">
</div><br>

<div>
  <span class="dbminputlabel">Duration of ban</span>
  <input id="time" placeholder="e.g. 1d / 1h / 1m / 1s" class="round" type="text">
</div><br>

<store-in-variable allowNone dropdownLabel="Store Timestamp In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
`;
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
    const fs = require("fs");
    const path = require("path");

    process.on("unhandledRejection", (reason) => {
      console.error("[Temp Ban Member] Error:", reason);
      this.callNextAction(cache);
    });

    const member = await this.getMemberFromData(
      data.member,
      data.varName,
      cache
    );
    const reason = this.evalMessage(data.reason, cache);
    const days = parseInt(data.days, 10) || 0;
    const timeStr = this.evalMessage(data.time, cache).trim() || "1h";

    function parseDuration(str) {
      const match = str.match(/^(\d+)([dhms])$/i);
      if (!match) return null;
      const num = parseInt(match[1], 10);
      const unit = match[2].toLowerCase();
      switch (unit) {
        case "d":
          return num * 24 * 60 * 60 * 1000;
        case "h":
          return num * 60 * 60 * 1000;
        case "m":
          return num * 60 * 1000;
        case "s":
          return num * 1000;
        default:
          return null;
      }
    }

    const recordBan = async (guildId, userId, expiresAt) => {
      try {
        const dataDir = path.resolve("data");
        const filePath = path.join(dataDir, "bans.json");

        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
        if (!fs.existsSync(filePath))
          fs.writeFileSync(filePath, JSON.stringify({}, null, 2));

        let bans = {};
        try {
          bans = JSON.parse(fs.readFileSync(filePath, "utf8"));
        } catch (err) {
          bans = {};
        }

        if (!bans[guildId]) bans[guildId] = {};
        bans[guildId][userId] = expiresAt;
        fs.writeFileSync(filePath, JSON.stringify(bans, null, 2));
      } catch (err) {
        console.error("[Temp Ban Member] Error saving ban record:", err);
      }
    };

    const onBanSuccess = () => {
      const durationMs = parseDuration(timeStr);
      if (durationMs !== null) {
        const expiresAt = Date.now() + durationMs;
        recordBan(member.guild.id, member.id, expiresAt);

        const storage = parseInt(data.storage, 10);
        const varName2 = this.evalMessage(data.varName2, cache);
        const unixSec = Math.floor(expiresAt / 1000);
        this.storeValue(unixSec, storage, varName2, cache);
      }
      this.callNextAction(cache);
    };

    if (member) {
      member
        .ban({ days, reason })
        .then(onBanSuccess)
        .catch((err) => this.displayError(data, cache, err));
    } else {
      this.callNextAction(cache);
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod(DBM) {
    const fs = require("fs"),
      path = require("path");

    setInterval(() => {
      const filePath = path.resolve("data", "bans.json");
      if (!fs.existsSync(filePath)) return;
      let bans;
      try {
        bans = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch {
        return;
      }
      const now = Date.now();
      let updated = false;
      const client = DBM.Bot.bot;
      for (const gid in bans) {
        const guild = client.guilds.cache.get(gid);
        if (!guild) continue;
        for (const uid in bans[gid]) {
          if (now >= bans[gid][uid]) {
            guild.members
              .unban(uid)
              .then(() => {})
              .catch(console.error);
            delete bans[gid][uid];
            updated = true;
          }
        }
        if (Object.keys(bans[gid]).length === 0) {
          delete bans[gid];
          updated = true;
        }
      }
      if (updated) {
        fs.writeFileSync(filePath, JSON.stringify(bans, null, 2));
      }
    }, 5000);
  },
};
