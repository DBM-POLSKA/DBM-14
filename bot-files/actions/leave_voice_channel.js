module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Leave Voice Channel",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Audio Control",

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return "The bot leaves voice channel.";
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: null,
    authorUrl: null,
    downloadUrl: null,
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: [],

  //---------------------------------------------------------------------
  // Command HTML
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return "";
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const { getVoiceConnection } = require("@discordjs/voice"); // Importowanie funkcji do pobrania połączenia głosowego
    const server = cache.server;

    if (server) {
      const connection = getVoiceConnection(server.id); // Uzyskanie połączenia głosowego na serwerze
      if (connection) {
        connection.destroy(); // Rozłączenie z kanałem głosowym
      }
    }

    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
