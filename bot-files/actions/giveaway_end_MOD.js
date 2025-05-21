module.exports = {
  name: "Giveaway End",
  section: "Giveaway",
  subtitle() {
    return "Monitors and detects ended giveaways";
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    const dataType = "Giveaway ID";
    return [data.varName, dataType];
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/giveaway_end_MOD.js",
  },

  fields: ["storage", "varName", "interval"],

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
  

    <div style="padding-top: 8px;">
    <div id="intervalContainer" style="width: 50%; margin-bottom: 8px;">
      <span class="dbminputlabel">Interval (seconds)</span>
      <input id="interval" class="round" type="number" min="1" value="5" placeholder="Time in seconds">
    </div>
  </div>
  
  <div style="padding-top: 50px; display: block; clear: both;">
    <!-- Store Giveaway ID In (pod polem Interwału) -->
    <store-in-variable dropdownLabel="Store Giveaway ID In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
  </div>
  

    `;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(__dirname, "../data/giveaways.json");

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}), "utf8");
    }

    let interval = parseInt(this.evalMessage(data.interval, cache), 10);
    if (isNaN(interval)) {
      interval = 5;
    }

    interval *= 1000;

    const checkGiveaways = () => {
      try {
        let giveaways = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const now = Date.now();

        for (const guild in giveaways) {
          for (const giveaway of giveaways[guild]) {
            if (giveaway.end <= now && !giveaway.ended) {
              giveaway.ended = true;

              const winnersCount = parseInt(giveaway.winners, 10);
              const participants = giveaway.members;
              const winners = [];

              for (let i = 0; i < winnersCount; i++) {
                const winnerIndex = Math.floor(
                  Math.random() * participants.length
                );
                winners.push(participants[winnerIndex]);
              }

              giveaway.winnersList = winners;

              fs.writeFileSync(filePath, JSON.stringify(giveaways, null, 2));

              this.storeValue(
                giveaway.id,
                parseInt(data.storage, 10),
                data.varName,
                cache
              );
              this.callNextAction(cache);
              return;
            }
          }
        }
      } catch (err) {
        console.error("[Giveaway End] Error reading giveaways.json:", err);
      }

      setTimeout(checkGiveaways, interval);
    };

    checkGiveaways();
  },

  mod() {},
};
