module.exports = {
  name: "Giveaway Info",
  section: "Giveaway",
  subtitle(data) {
    let description = "Retrieve information about giveaway";

    switch (data.info) {
      case "id":
        description = `Retrieve the Giveaway ID`;
        break;
      case "guild":
        description = `Retrieve the Server ID`;
        break;
      case "channel":
        description = `Retrieve the Channel ID`;
        break;
      case "msg":
        description = `Retrieve the Message ID}`;
        break;
      case "messageObject":
        description = `Retrieve the Message Object`;
        break;
      case "serverName":
        description = `Retrieve the Server Name`;
        break;
      case "host":
        description = `Retrieve the Host (Member)`;
        break;
      case "prize":
        description = `Retrieve the Prize`;
        break;
      case "description":
        description = `Retrieve the description`;
        break;
      case "numberOfWinners":
        description = `Retrieve the Number of Winners`;
        break;
      case "memberCount":
        description = `Retrieve the Number of Participants`;
        break;
      case "members":
        description = `Retrieve the Participants List`;
        break;
      case "winners":
        description = `Retrieve the Winners List`;
        break;
      case "ended":
        description = `Retrieve the Ended Status`;
        break;
      case "endRelative":
        description = `Retrieve the Time (Countdown)`;
        break;
      case "end":
        description = `Retrieve the End Timestamp`;
        break;
      default:
        description = `Retrieve information about giveaway`;
    }

    return description;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;

    let dataType = "";

    switch (data.info) {
      case "id":
        dataType = "Giveaway ID";
        break;
      case "guild":
        dataType = "Server ID";
        break;
      case "channel":
        dataType = "Channel ID";
        break;
      case "msg":
        dataType = "Message ID";
        break;
      case "messageObject":
        dataType = "Message Object";
        break;
      case "serverName":
        dataType = "Server Name";
        break;
      case "host":
        dataType = "Host";
        break;
      case "prize":
        dataType = "Prize";
        break;
      case "description":
        dataType = "description";
        break;
      case "numberOfWinners":
        dataType = "Number Of Winners";
        break;
      case "memberCount":
        dataType = "Number of Participants";
        break;
      case "members":
        dataType = "Participants List";
        break;
      case "winners":
        dataType = "Winners List";
        break;
      case "ended":
        dataType = "Ended Status";
        break;
      case "endRelative":
        dataType = "Time Countdown";
        break;
      case "end":
        dataType = "End Timestamp";
        break;
      default:
        dataType = "Unknown";
    }

    return [data.varName, dataType];
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/giveaway_info_MOD.js",
  },

  fields: [
    "sourceGiveaway",
    "giveawayId",
    "info",
    "noParticipantsText",
    "noWinnersYetText",
    "noWinnersText",
    "noDescriptionText",
    "endedStatus1Text",
    "endedStatus2Text",
    "storage",
    "varName",
  ],
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

    
    <div style="margin-top: 20px; display: flex; align-items: center; gap: 10px; width: 100%;">
    <div style="width: 200px;">
      <span class="dbminputlabel">Source Giveaway</span>
      <select id="sourceGiveaway" class="round" style="width: 100%;">
        <option value="byId">Giveaway by ID</option>
        <option value="current">Current Giveaway</option>
      </select>
    </div>
    
    <div id="giveawayIdContainer" style="display: none; flex-grow: 1;">
      <span class="dbminputlabel">Giveaway ID</span>
      <input id="giveawayId" class="round" type="text" placeholder="Enter Giveaway ID" style="width: 100%;">
    </div>
  </div>
  
  <tab-system style="margin-top: 20px;">
  <tab label="General" icon="cogs"> 

      <div style="padding-top: 8px; margin-top: 10px;">
        <span class="dbminputlabel">Select Information</span>
        <select id="info" class="round">
          <option value="id">Giveaway ID</option>
          <option value="guild">Server ID</option>
          <option value="channel">Channel ID</option>
          <option value="msg">Message ID</option>
          <option value="messageObject">Message Object</option>
          <option value="serverName">Server Name</option>
          <option value="host">Host (Member)</option>
          <option value="prize">Prize</option>
          <option value="description">Description</option>
          <option value="numberOfWinners">Number Of Winners</option>
          <option value="memberCount">Number of Participants</option>
          <option value="members">Participants List</option>
          <option value="winners">Winners List</option>
          <option value="ended">Ended Status</option>
          <option value="endRelative">Time (Countdown)</option>
          <option value="end">End Timestamp</option>
        </select>
      </div>
      <div style="padding-top: 8px; margin-top: 20px;">
        <store-in-variable dropdownLabel="Store Result In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
      </div>
      </tab>

      <tab label="Advanced" icon="sliders"> 

      <div style="margin-top: 12px;">
        <span class="dbminputlabel">No Participants Text</span>
        <input id="noParticipantsText" class="round" type="text" value="No Participants" placeholder="Leave blank for none...">
      </div>

      <div style="margin-top: 12px;">
        <span class="dbminputlabel">No Description Text</span>
        <input id="noDescriptionText" class="round" type="text" value="No Description" placeholder="Leave blank for none...">
      </div>

      <div style="display: flex; gap: 12px; margin-top: 12px;">
  <div style="flex: 1;">
    <span class="dbminputlabel">No Winners Yet Text</span>
    <input id="noWinnersYetText" class="round" type="text" value="No Winners Yet" placeholder="Leave blank for none..." style="width: 100%;">
  </div>

  <div style="flex: 1;">
    <span class="dbminputlabel">No Winners Text</span>
    <input id="noWinnersText" class="round" type="text" value="No Winners" placeholder="Leave blank for none..." style="width: 100%;">
  </div>
</div>

      <div style="display: flex; gap: 12px; margin-top: 12px;">
      <div style="flex: 1;">
    <span class="dbminputlabel">Ended Status 1 Text</span>
    <input id="endedStatus1Text" class="round" type="text" value="🟢" placeholder="Leave blank for none...">
  </div>
  <div style="flex: 1;">
    <span class="dbminputlabel">Ended Status 2 Text</span>
    <input id="endedStatus2Text" class="round" type="text" value="🔴" placeholder="Leave blank for none...">
  </div>
</div>
      </tab>

      <tab-system>
    `;
  },

  init() {
    const sourceGiveaway = document.getElementById("sourceGiveaway");
    const giveawayIdContainer = document.getElementById("giveawayIdContainer");

    function toggleGiveawayIdField() {
      if (sourceGiveaway.value === "byId") {
        giveawayIdContainer.style.display = "block";
      } else {
        giveawayIdContainer.style.display = "none";
      }
    }

    sourceGiveaway.addEventListener("change", toggleGiveawayIdField);
    toggleGiveawayIdField();
  },

  async action(cache) {
    const fs = require("fs");
    const path = require("path");

    const data = cache.actions[cache.index];
    const sourceGiveaway = this.evalMessage(data.sourceGiveaway, cache);
    let giveawayId;
    const noParticipantsText = this.evalMessage(data.noParticipantsText, cache);
    const noWinnersYetText = this.evalMessage(data.noWinnersYetText, cache);
    const noWinnersText = this.evalMessage(data.noWinnersText, cache);
    const noDescriptionText = this.evalMessage(data.noDescriptionText, cache);
    const endedStatus1Text = this.evalMessage(data.endedStatus1Text, cache);
    const endedStatus2Text = this.evalMessage(data.endedStatus2Text, cache);

    if (sourceGiveaway === "byId") {
      giveawayId = this.evalMessage(data.giveawayId, cache);
    } else if (sourceGiveaway === "current") {
      const interaction = cache.interaction;
      if (interaction && interaction.message) {
        const message = interaction.message;
        const hours = String(new Date(message.createdAt).getHours()).padStart(
          2,
          "0"
        );
        const minutes = String(
          new Date(message.createdAt).getMinutes()
        ).padStart(2, "0");

        giveawayId = `${message.id}${new Date(message.createdAt)
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "")}${hours}${minutes}`;
      } else {
        console.error("[Giveaway Info] No button interaction message found");
        giveawayId = null;
      }
    }

    const filePath = path.join(__dirname, "../data/giveaways.json");

    let giveaways = {};
    try {
      giveaways = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      console.error("[Giveaway Info] Error reading giveaways.json:", err);
      this.callNextAction(cache);
      return;
    }

    const info = data.info;
    let result;
    let guildId, channelId, messageId;

    for (const guild in giveaways) {
      const giveaway = giveaways[guild].find((g) => g.id === giveawayId);
      if (giveaway) {
        guildId = guild;
        channelId = giveaway.channel;
        messageId = giveaway.msg;

        if (info === "host") {
          result = `<@${giveaway.host}>`;
        } else if (info === "members") {
          result =
            giveaway.members.map((m) => `<@${m}>`).join(", ") ||
            noParticipantsText;
        } else if (info === "memberCount") {
          result = giveaway.members.length;
        } else if (info === "endRelative") {
          result = `<t:${Math.floor(giveaway.end / 1000)}:R>`;
        } else if (info === "winners") {
          result = Array.isArray(giveaway.winnersList)
            ? giveaway.winnersList
                .map((w) => (w === null ? noWinnersText : `<@${w}>`))
                .join(", ") || noWinnersYetText
            : noWinnersYetText;
        } else if (info === "numberOfWinners") {
          result = giveaway.winners ? parseInt(giveaway.winners, 10) : 0;
        } else if (info === "ended") {
          result = giveaway.ended ? endedStatus2Text : endedStatus1Text;
        } else if (info === "description") {
          result = giveaway.description || noDescriptionText;
        } else if (info === "serverName") {
          result = giveaway.server_name || "";
        } else if (info === "messageObject") {
          const guildObj = this.getDBM().Bot.bot.guilds.cache.get(guildId);
          if (!guildObj) {
            console.error("[Giveaway Info] Guild not found.");
            result = null;
          } else {
            const channelObj = guildObj.channels.cache.get(channelId);
            if (!channelObj) {
              console.error("[Giveaway Info] Channel not found.");
              result = null;
            } else {
              try {
                result = await channelObj.messages.fetch(messageId);
              } catch (error) {
                console.error("[Giveaway Info] Error fetching message:", error);
                result = null;
              }
            }
          }
        } else {
          result = giveaway[info];
        }
        break;
      }
    }

    if (result === undefined) {
      console.error("[Giveaway Info] No giveaway ID found:", giveawayId);
    } else {
    }

    this.storeValue(result, parseInt(data.storage, 10), data.varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
