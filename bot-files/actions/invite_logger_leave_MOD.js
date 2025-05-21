module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Invite Logger Leave",

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
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-v14/actions/invite_logger_leave_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle() {
    return "Invite Logger Leave";
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["member", "storage", "varName"],

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
    const guildID = member.guild.id;
    const timestamp = new Date().toISOString();

    const inviteFile = path.join("data", "invites.json");

    try {
      const fileData = await fs.readFile(inviteFile, "utf8");

      let invites;
      try {
        invites = JSON.parse(fileData);
      } catch (parseError) {
        console.error(
          "[Invite Logger Join] Error parsing invites data:",
          parseError
        );
        return this.callNextAction(cache);
      }

      const serverInvites = invites[guildID];

      if (!serverInvites) {
        this.callNextAction(cache);
        return;
      }

      const foundInvite = serverInvites.find((invite) =>
        invite.Members.includes(memberID)
      );

      if (!foundInvite) {
        this.callNextAction(cache);
        return;
      }

      foundInvite["Invite Leaves"] += 1;
      foundInvite["Invite Uses"] -= 1;
      foundInvite.Members = foundInvite.Members.filter((id) => id !== memberID);

      await fs.writeFile(inviteFile, JSON.stringify(invites, null, 2));

      this.callNextAction(cache);
    } catch (err) {
      console.error(
        "[Invite Logger Join] Error handling invite log file:",
        err
      );
      this.callNextAction(cache);
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
