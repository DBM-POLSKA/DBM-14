module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Invite Logger Join",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Other Stuff",

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadURL:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-v14/actions/invite_logger_join_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle() {
    return "Invite Logger Join";
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["member", "inviteCode", "storage", "varName"],

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
      <member-input
        dropdownLabel="Source Member"
        selectId="member"
        variableContainerId="varNameContainer"
        variableInputId="varName"
      ></member-input>
    </div>
    
    <br><br><br>
    
    <div style="padding-top: 8px;">
      <span class="dbminputlabel">Invite Code</span>
      <textarea class="round" id="inviteCode" rows="1" placeholder="Invite Code | e.g. abcdef" style="width: 99%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
    </div>
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
    const fs = require("fs").promises;
    const path = require("path");
    const axios = require("axios");
    const data = cache.actions[cache.index];
    const member = await this.getMemberFromData(
      data.member,
      data.varName,
      cache
    );

    if (!member) {
      this.callNextAction(cache);
      return;
    }

    const memberID = member.user.id;
    const inviteCode = data.inviteCode || "your_invite_code_here";
    const timestamp = new Date().toISOString();

    let inviteData;
    try {
      const response = await axios.get(
        `https://discord.com/api/v10/invites/${inviteCode}`,
        {
          headers: {
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
          },
        }
      );

      inviteData = response.data;

      const maxUses =
        inviteData.max_uses !== null ? inviteData.max_uses : "No Limit";
      const isTemporary =
        inviteData.temporary !== undefined ? inviteData.temporary : false;

      if (!inviteData) {
        console.error("[Invite Logger Join] Invite data is missing.");
        return this.callNextAction(cache);
      }

      const inviterID = inviteData.inviter.id;
      const serverID = inviteData.guild.id;
      const serverName = inviteData.guild.name;
      const inviteURL = `https://discord.gg/${inviteCode}`;
      const uses = inviteData.uses;
      const inviteObject = {
        Inviter: inviterID,
        "Server Name": serverName,
        "Invite Code": inviteCode,
        "Invite URL": inviteURL,
        "Invite All Uses": 1,
        "Invite Uses": 1,
        "Invite Joins": 1,
        "Invite Leaves": 0,
        "Creation Date": timestamp,
        "Is Temporary": isTemporary,
        "Max Uses": maxUses,
        Members: [memberID],
      };

      const inviteFile = path.join("data", "invites.json");

      try {
        const folderPath = path.dirname(inviteFile);
        await fs.mkdir(folderPath, { recursive: true });

        let fileData = await fs.readFile(inviteFile, "utf8");
        let invites = {};
        try {
          invites = JSON.parse(fileData || "{}");
        } catch (parseError) {
          console.error(
            "[Invite Logger Join] Error parsing invites data:",
            parseError
          );
        }

        if (!invites[serverID]) {
          invites[serverID] = [];
        }

        const serverInvites = invites[serverID];
        const existingInvite = serverInvites.find(
          (invite) => invite["Invite Code"] === inviteCode
        );

        if (existingInvite) {
          existingInvite["Invite All Uses"] += 1;
          existingInvite["Invite Joins"] += 1;
          existingInvite["Invite Uses"] += 1;

          if (!existingInvite.Members.includes(memberID)) {
            existingInvite.Members.push(memberID);
          }
        } else {
          serverInvites.push(inviteObject);
        }

        await fs.writeFile(inviteFile, JSON.stringify(invites, null, 2));
      } catch (error) {
        console.error(
          "[Invite Logger Join] Error handling invites file:",
          error
        );
      }
    } catch (error) {
      console.error(
        "[Invite Logger Join] Error fetching invite data from Discord API:",
        error
      );
    }

    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
