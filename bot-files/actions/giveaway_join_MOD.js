module.exports = {
  name: "Giveaway Join",

  section: "Giveaway",

  subtitle(data) {
    return `Join giveaway with selected member`;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/giveaway_join_MOD.js",
  },

  fields: ["member", "varName", "giveawayid"],

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
      >1.2</a
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


    <div style="padding: 10px;">
      <member-input dropdownLabel="Source Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
      
      <div style="margin-top: 10px; margin-top: 70px;">
        <span class="dbminputlabel">Giveaway ID</span>
        <input id="giveawayid" class="round" type="text" placeholder="Enter Giveaway ID">
      </div>
    </div>
      `;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const fs = require("fs");
    const path = require("path");

    const member = await this.getMemberFromData(
      data.member,
      data.varName,
      cache
    );
    if (!member) {
      console.error("[Giveaway Join] User not found.");
      return this.callNextAction(cache);
    }

    const giveawayID = this.evalMessage(data.giveawayid, cache);
    if (!giveawayID) {
      console.error("[Giveaway Join] No giveaway ID provided.");
      return this.callNextAction(cache);
    }

    const guildId = member.guild?.id;
    if (!guildId) {
      console.error("[Giveaway Join] Server ID not found.");
      return this.callNextAction(cache);
    }

    const filePath = path.join(__dirname, "../data/giveaways.json");
    if (!fs.existsSync(filePath)) {
      console.error("[Giveaway Join] The giveaways.json file does not exist.");
      return this.callNextAction(cache);
    }

    let giveaways = {};
    try {
      giveaways = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      console.error("[Giveaway Join] Error reading giveaways.json:", err);
      return this.callNextAction(cache);
    }

    if (!giveaways[guildId]) {
      console.error(
        "[Giveaway Join] There are no active giveaways for this server."
      );
      return this.callNextAction(cache);
    }

    const giveaway = giveaways[guildId].find(
      (g) => g.id === giveawayID && !g.ended
    );
    if (!giveaway) {
      console.error(
        `[Giveaway Join] No active giveaway with ID: ${giveawayID} found.`
      );
      return this.callNextAction(cache);
    }

    if (!Array.isArray(giveaway.members)) {
      giveaway.members = [];
    }

    if (!giveaway.members.includes(member.id)) {
      giveaway.members.push(member.id);
    } else {
    }

    try {
      fs.writeFileSync(filePath, JSON.stringify(giveaways, null, 4));
    } catch (err) {
      console.error("[Giveaway Join] Error saving giveaways.json:", err);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
