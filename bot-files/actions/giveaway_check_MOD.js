module.exports = {
  name: "Giveaway Check If Member",

  section: "Giveaway",

  subtitle(data, presets) {
    return `${presets.getConditionsText(data)}`;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/giveaway_check_MOD.js",
  },

  fields: ["member", "varName", "giveawayId", "branch"],

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


<member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
<br><br>
<div style="float: left; width: 100%; padding: 0; margin-top: 20px;">
  <span class="dbminputlabel">Giveaway ID</span>
  <input id="giveawayId" class="round" type="text" placeholder="Enter Giveaway ID">
</div>

<hr class="subtlebar" style="width: 100%; margin-top: 120px; margin-bottom: 30px;">

<conditional-input id="branch" style="padding-top: 16px;"></conditional-input>`;
  },

  async action(cache) {
    const fs = require("fs");
    const data = cache.actions[cache.index];

    const member = await this.getMemberFromData(
      data.member,
      data.varName,
      cache
    );

    const giveawayId = this.evalMessage(data.giveawayId, cache);
    const filePath = "./data/giveaways.json";

    if (!member) {
      this.executeResults(false, data?.branch ?? data, cache);
      return;
    }

    let giveaways;
    try {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({}, null, 2));
      }

      const fileData = fs.readFileSync(filePath, "utf8");
      giveaways = JSON.parse(fileData);
    } catch (err) {
      console.error(
        "[Giveaway Check if Member] Error reading giveaways.json:",
        err
      );
      this.executeResults(false, data?.branch ?? data, cache);
      return;
    }

    const guildId = member.guild.id;
    const giveawayList = giveaways[guildId];

    if (
      !giveawayList ||
      !Array.isArray(giveawayList) ||
      giveawayList.length === 0
    ) {
      console.error(
        "[Giveaway Check if Member] No giveaway found for this guild or invalid format."
      );
      this.executeResults(false, data?.branch ?? data, cache);
      return;
    }

    const giveaway = giveawayList.find((gw) => gw.id === giveawayId);

    if (!giveaway) {
      console.error(
        `[Giveaway Check if Member] Giveaway with ID "${giveawayId}" not found in guild ${guildId}.`
      );
      this.executeResults(false, data?.branch ?? data, cache);
      return;
    }

    if (!giveaway.members || !Array.isArray(giveaway.members)) {
      console.error(
        "[Giveaway Check if Member] Giveaway members data is missing or invalid."
      );
      this.executeResults(false, data?.branch ?? data, cache);
      return;
    }

    const result = giveaway.members.includes(member.id);
    this.executeResults(result, data?.branch ?? data, cache);
  },

  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },

  mod() {},
};
