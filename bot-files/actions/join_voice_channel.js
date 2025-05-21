module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Join Voice Channel",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Audio Control",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `${presets.getVoiceChannelText(data.channel, data.varName)}`;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: null,
    downloadUrl: null,
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action.
  //---------------------------------------------------------------------

  fields: ["channel", "varName"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `<voice-channel-input dropdownLabel="Voice Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="45%" variableInputWidth="50%"></voice-channel-input>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run.
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  //---------------------------------------------------------------------

  async action(cache) {
    const { joinVoiceChannel } = require("@discordjs/voice");
    const data = cache.actions[cache.index];
    const channel = await this.getVoiceChannelFromData(
      data.channel,
      data.varName,
      cache
    );

    if (channel) {
      try {
        joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
      } catch (error) {
        console.error("Error joining voice channel:", error);
      }
    }

    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Requires Audio Libraries
  //
  // If 'true', this action requires audio libraries to run.
  //---------------------------------------------------------------------

  requiresAudioLibraries: true,

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run.
  //---------------------------------------------------------------------

  mod() {},
};
