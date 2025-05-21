module.exports = {
  name: "Giveaway Delete",
  section: "Giveaway",

  subtitle(data, presets) {
    return `Delete giveaway with ID ${data.giveawayId}`;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/giveaway_delete_MOD.js",
  },

  fields: ["giveawayId"],

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


        <div style="float: left; width: 100%;">
          <span class="dbminputlabel">Giveaway ID</span>
          <input id="giveawayId" class="round" type="text" placeholder="Enter Giveaway ID to delete">
        </div>
      `;
  },

  init() {},

  async action(cache) {
    const fs = require("fs");
    const path = require("path");
    const data = cache.actions[cache.index];
    const giveawayId = this.evalMessage(data.giveawayId, cache);

    if (!giveawayId) {
      console.error(
        "[Giveaway Delete] Giveaway Delete: No Giveaway ID provided."
      );
      this.callNextAction(cache);
      return;
    }

    const filePath = path.join(__dirname, "../data/giveaways.json");
    let giveaways = {};

    if (fs.existsSync(filePath)) {
      try {
        giveaways = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch (err) {
        console.error("[Giveaway Delete] Error reading giveaways.json:", err);
        this.callNextAction(cache);
        return;
      }
    }

    let deleted = false;

    for (const guildId in giveaways) {
      giveaways[guildId] = giveaways[guildId].filter((giveaway) => {
        if (giveaway.id === giveawayId) {
          deleted = true;
          return false;
        }
        return true;
      });
    }

    if (deleted) {
      try {
        fs.writeFileSync(filePath, JSON.stringify(giveaways, null, 4));
      } catch (err) {
        console.error(
          "[Giveaway Delete] Error writing to giveaways.json:",
          err
        );
      }
    } else {
    }

    this.callNextAction(cache);
  },

  mod() {},
};
