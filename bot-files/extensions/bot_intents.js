const INTENTS = [
  "GUILDS",
  "GUILD_MEMBERS",
  "GUILD_BANS",
  "GUILD_EMOJIS_AND_STICKERS",
  "GUILD_INTEGRATIONS",
  "GUILD_WEBHOOKS",
  "GUILD_INVITES",
  "GUILD_VOICE_STATES",
  "GUILD_PRESENCES",
  "GUILD_MESSAGES",
  "GUILD_MESSAGE_REACTIONS",
  "GUILD_MESSAGE_TYPING",
  "GUILD_MESSAGE_POLLS",
  "DIRECT_MESSAGES",
  "DIRECT_MESSAGE_REACTIONS",
  "DIRECT_MESSAGE_TYPING",
  "MESSAGE_CONTENT",
  "GUILD_SCHEDULED_EVENTS",
  "AUTO_MODERATION_CONFIGURATION",
  "AUTO_MODERATION_EXECUTION",
  "DIRECT_MESSAGE_POLLS",
];

module.exports = {
  name: "Bot Intents",
  isEditorExtension: true,
  saveButtonText: "Save Intents",
  fields: [],
  defaultFields: { intents: -2 },

  size: function () {
    return { width: 460, height: 450 };
  },

  html: function (data) {
    if (data.intents === null || data.intents === undefined) data.intents = -2;
    let intents = data.intents >= 0 ? data.intents : 0;
    if (data.intents === -1)
      intents = INTENTS.reduce((sum, _, i) => sum | (1 << i), 0);
    else if (data.intents === -2) {
      // non-privileged = all except privileged bits (1<<8,1<<1,1<<15)
      const PRIV = ["GUILD_MEMBERS", "GUILD_PRESENCES", "MESSAGE_CONTENT"];
      intents = INTENTS.reduce(
        (sum, name, i) => (PRIV.includes(name) ? sum : sum | (1 << i)),
        0
      );
    }

    const labels = {
      GUILDS: "Server Events",
      GUILD_MEMBERS: "Server Member Events",
      GUILD_BANS: "Server Ban Events",
      GUILD_EMOJIS_AND_STICKERS: "Server Emoji & Sticker Events",
      GUILD_INTEGRATIONS: "Server Integration Events",
      GUILD_WEBHOOKS: "Server Webhook Events",
      GUILD_INVITES: "Server Invite Events",
      GUILD_VOICE_STATES: "Server Voice Events",
      GUILD_PRESENCES: "Server Presence Events",
      GUILD_MESSAGES: "Server Message Events",
      GUILD_MESSAGE_REACTIONS: "Server Message Reaction Events",
      GUILD_MESSAGE_TYPING: "Server Typing Events",
      GUILD_MESSAGE_POLLS: "Server Poll Events",
      DIRECT_MESSAGES: "Direct Message Events",
      DIRECT_MESSAGE_REACTIONS: "DM Reaction Events",
      DIRECT_MESSAGE_TYPING: "DM Typing Events",
      MESSAGE_CONTENT: "Message Content",
      GUILD_SCHEDULED_EVENTS: "Server Scheduled Event Events",
      AUTO_MODERATION_CONFIGURATION: "AutoMod Config Events",
      AUTO_MODERATION_EXECUTION: "AutoMod Exec Events",
      DIRECT_MESSAGE_POLLS: "DM Poll Events",
    };

    let html = `<div style="padding:10px;">
      <input type="radio" id="All" name="ratio" value="All" ${
        data.intents === -1 ? "checked" : ""
      }><label for="All">All Intents</label><br>
      <input type="radio" id="NonPrivileged" name="ratio" value="NonPrivileged" ${
        data.intents === -2 ? "checked" : ""
      }><label for="NonPrivileged">Non-Privileged</label><br>
      <input type="radio" id="Custom" name="ratio" value="Custom" ${
        data.intents >= 0 ? "checked" : ""
      }><label for="Custom">Custom</label><br>
      <br><hr><br><div style="column-count:2;">`;

    INTENTS.forEach((intent, i) => {
      html += `<input type="checkbox" id="${intent}" value="${intent}" ${
        intents & (1 << i) ? "checked" : ""
      }><label for="${intent}">${labels[intent]}</label><br>`;
    });
    html += `</div>
             <br>
             <hr>
             <br>
             <label>These require your bot to have them enabled in the developer portal. Furthermore, they can only be enabled if your bot is in less than 100 servers or is whitelisted. If you enable them without turning them on in the portal, your bot will crash!</label></div>`;
    return html;
  },

  init: function (document) {
    function setAll(enable) {
      INTENTS.forEach((name) => {
        const c = document.getElementById(name);
        c.disabled = !enable;
      });
    }
    document.getElementById("All").onclick = () => {
      setAll(false);
      INTENTS.forEach((n) => (document.getElementById(n).checked = true));
    };
    document.getElementById("NonPrivileged").onclick = () => {
      setAll(false);
      const PRIV = ["GUILD_MEMBERS", "GUILD_PRESENCES", "MESSAGE_CONTENT"];
      INTENTS.forEach(
        (n) => (document.getElementById(n).checked = !PRIV.includes(n))
      );
    };
    document.getElementById("Custom").onclick = () => setAll(true);
    // init
    ["All", "NonPrivileged", "Custom"].forEach((id) => {
      if (document.getElementById(id).checked)
        document.getElementById(id).onclick();
    });
  },

  close: function (document, data) {
    let res = 0;
    if (document.getElementById("All").checked) res = -1;
    else if (document.getElementById("NonPrivileged").checked) res = -2;
    else
      INTENTS.forEach((n, i) => {
        if (document.getElementById(n).checked) res |= 1 << i;
      });
    data.intents = res;
  },

  mod: function (DBM) {
    DBM.Bot.intents = function () {
      const d = DBM.Files.data.settings["Bot Intents"];
      const i = d.customData["Bot Intents"].intents;
      if (i === -1) return DBM.Bot.ALL_INTENTS;
      if (i === -2) return DBM.Bot.NON_PRIVILEGED_INTENTS;
      return i;
    };
  },
};
