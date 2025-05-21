module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Store Invite Info",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Other Stuff",

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: false,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadURL:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-v14/actions/store_invite_info_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data) {
    const info = [
      "Channel Object",
      "Invite Creator",
      "Creation Date",
      "Expiration Date",
      "Guild Object",
      "Max. Uses",
      "Is Temporary?",
      "URL for Invite",
      "Times Used",
      "Invite server member count",
      "Invite code",
      "Invite Joins",
      "Invite Leaves",
      "Invite",
    ];
    return `Store ${info[parseInt(data.info, 10)]} from Invite`;
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = "Unknown Type";
    switch (parseInt(data.info, 10)) {
      case 0:
        dataType = "Object";
        break;
      case 1:
        dataType = "User";
        break;
      case 2:
        dataType = "date";
        break;
      case 3:
        dataType = "date";
        break;
      case 4:
        dataType = "Guild";
        break;
      case 5:
        dataType = "number";
        break;
      case 6:
        dataType = "boolean";
        break;
      case 7:
        dataType = "string";
        break;
      case 8:
        dataType = "number";
        break;
      case 9:
        dataType = "number";
        break;
      case 10:
        dataType = "number";
        break;
      case 11:
        dataType = "number";
        break;
      case 12:
        dataType = "number";
        break;
      case 13:
        dataType = "number";
        break;
      default:
        break;
    }
    return [data.varName, dataType];
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["invite", "info", "storage", "varName"],

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
  

<div style="padding-top: 8px;">
  <span class="dbminputlabel">Source Invite</span>
  <textarea class="round" id="invite" rows="1" placeholder="Code or URL | e.g abcdef or discord.gg/abcdef" style="width: 99%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
</div>

<div style="padding-top: 16px; width: 70%;">
  <span class="dbminputlabel">Source Info</span>
  <select id="info" class="round">
    <option value="0" selected>Channel object</option>
    <option value="1">Creator of invite</option>
    <option value="2">Creation date</option>
    <option value="3">Expiration date</option>
    <option value="4">Guild object</option>
    <option value="5">Max. uses</option>
    <option value="6">Is temporary?</option>
    <option value="7">Url for invite</option>
    <option value="8">Times used</option>
    <option value="9">Invite server member count</option>
    <option value=10">Invite Code</option>
    <option value=11">Invite Joins</option>
    <option value=12">Invite Leaves</option>
    <option value=13">Invite Uses</option>

  </select>
</div>
<br>

<div>
  <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
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
    const invite = this.evalMessage(data.invite, cache);
    const info = parseInt(data.info, 10);
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const fs = require("fs");
    const path = require("path");

    const inviteGuild = await this.getDBM()
      .Bot.bot.fetchInvite(invite)
      .catch(console.error);
    const inviteInfo = await inviteGuild.guild.invites
      .fetch(invite)
      .catch(console.error);

    if (!inviteInfo) return this.callNextAction(cache);

    // Wczytanie danych z pliku invites.json
    const inviteFile = path.join("data", "invites.json");
    let invitesData = {};

    try {
      const fileData = fs.readFileSync(inviteFile, "utf8");
      invitesData = JSON.parse(fileData || "{}");
    } catch (err) {
      console.error("Error reading invites data:", err);
      return this.callNextAction(cache);
    }

    // Sprawdzenie, czy zaproszenie istnieje w danych
    const inviteData = Object.values(invitesData)
      .flat()
      .find(
        (inviteEntry) =>
          inviteEntry["Invite Code"] === invite ||
          inviteEntry["Invite URL"] === invite
      );

    if (!inviteData) {
      console.error("Invite data not found.");
      return this.callNextAction(cache);
    }

    let result;
    switch (info) {
      case 0:
        result = inviteInfo.channel;
        break;
      case 1:
        result = inviteInfo.inviter;
        break;
      case 2:
        result = inviteInfo.createdAt;
        break;
      case 3:
        result = inviteInfo.expiresAt;
        break;
      case 4:
        result = inviteInfo.guild;
        break;
      case 5:
        result = inviteInfo.maxUses;
        break;
      case 6:
        result = inviteInfo.temporary;
        break;
      case 7:
        result = inviteInfo.url;
        break;
      case 8:
        result = inviteInfo.uses;
        break;
      case 9:
        result = inviteInfo.memberCount;
        break;
      case 10:
        result = inviteInfo.code;
        break;
      case 11:
        result = inviteData["Invite Joins"] || 0;
        break;
      case 12:
        result = inviteData["Invite Leaves"] || 0;
        break;
      case 13:
        result = inviteData["Invite Uses"] || 0;
        break;
      default:
        break;
    }

    if (result !== undefined) {
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
