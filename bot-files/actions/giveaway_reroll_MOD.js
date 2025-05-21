module.exports = {
  name: "Giveaway Reroll",
  section: "Giveaway",
  subtitle() {
    return "Rerolls the winners of an ended giveaway";
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    const dataType = "Giveaway Winners List";
    return [data.varName, dataType];
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/giveaway_reroll_MOD.js",
  },

  fields: ["giveawayId", "storage", "varName"],

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


      <div>
        <div style="float: left; width: 100%;">
          <span class="dbminputlabel">Giveaway ID</span><br>
          <input id="giveawayId" class="round" type="text" placeholder="Enter Giveaway ID"><br>
        </div>
        <div style="clear: both;"></div>
        <div style="padding-top: 8px;">
          <store-in-variable dropdownLabel="Store Winners In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
        </div>
      </div>
    `;
  },

  init() {},

  async action(cache) {
    const fs = require("fs");
    const path = require("path");
    const data = cache.actions[cache.index];
    const filePath = path.join(__dirname, "../data/giveaways.json");
    const giveawayId = this.evalMessage(data.giveawayId, cache);

    if (!giveawayId) {
      console.error("[Giveaway Reroll] No Giveaway ID provided.");
      this.callNextAction(cache);
      return;
    }

    const checkGiveaways = () => {
      try {
        let giveaways = JSON.parse(fs.readFileSync(filePath, "utf8"));

        for (const guild in giveaways) {
          const giveaway = giveaways[guild].find((g) => g.id === giveawayId);

          if (!giveaway) continue;

          const winnersCount = parseInt(giveaway.winners, 10);
          const participants = giveaway.members;
          const winners = [];

          for (let i = 0; i < winnersCount; i++) {
            const winnerIndex = Math.floor(Math.random() * participants.length);
            const winner = participants[winnerIndex];
            winners.push(`<@${winner}>`);
          }

          giveaway.winnersList = winners;

          fs.writeFileSync(filePath, JSON.stringify(giveaways, null, 2));

          this.storeValue(
            winners.join(", "),
            parseInt(data.storage, 10),
            data.varName,
            cache
          );
          this.callNextAction(cache);
          return;
        }
      } catch (err) {
        console.error("[Giveaway Reroll] Error reading giveaways.json:", err);
      }
      setTimeout(checkGiveaways, 5000);
    };

    checkGiveaways();
  },

  mod() {},
};
