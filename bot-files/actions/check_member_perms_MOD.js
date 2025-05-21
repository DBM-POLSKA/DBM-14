module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Check Member Permissions",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Conditions",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `${presets.getConditionsText(data)}`;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/check_member_perms_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["member", "varName", "permission", "branch"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
  //---------------------------------------------------------------------

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


<member-input dropdownLabel="Source Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>

<br><br><br>

<div style="padding-top: 8px; width: 80%;">
	<span class="dbminputlabel">Permission</span><br>
	<select id="permission" class="round">
      <optgroup label="General Permissions">
        <option value="Administrator">Administrator</option>
        <option value="ViewAuditLog">View Audit Log</option>
        <option value="ManageGuild">Manage Server</option>
        <option value="ManageRoles">Manage Roles</option>
        <option value="ManageChannels">Manage Channels</option>
        <option value="KickMembers">Kick Members</option>
        <option value="BanMembers">Ban Members</option>
        <option value="ModerateMembers">Timeout Members</option>
        <option value="ViewGuildInsights">View Server Insights</option>
      </optgroup>
      <optgroup label="Text Channel Permissions">
        <option value="ViewChannel">View Channels</option>
        <option value="SendMessages">Send Messages</option>
        <option value="SendTTSMessages">Send TTS Messages</option>
        <option value="ManageMessages">Manage Messages</option>
        <option value="EmbedLinks">Embed Links</option>
        <option value="AttachFiles">Attach Files</option>
        <option value="ReadMessageHistory">Read Message History</option>
        <option value="MentionEveryone">Mention Everyone</option>
        <option value="UseExternalEmojis">Use External Emojis</option>
        <option value="UseExternalStickers">Use External Stickers</option>
        <option value="ManageThreads">Manage Threads</option>
        <option value="CreatePublicThreads">Create Public Threads</option>
        <option value="CreatePrivateThreads">Create Private Threads</option>
        <option value="SendMessagesInThreads">Send Messages in Threads</option>
      </optgroup>
      <optgroup label="Voice Channel Permissions">
        <option value="Connect">Connect</option>
        <option value="Speak">Speak</option>
        <option value="Stream">Stream</option>
        <option value="UseVAD">Use Voice Activity</option>
        <option value="MuteMembers">Mute Members</option>
        <option value="DeafenMembers">Deafen Members</option>
        <option value="MoveMembers">Move Members</option>
        <option value="PrioritySpeaker">Priority Speaker</option>
      </optgroup>
      <optgroup label="Advanced Permissions">
        <option value="ManageEmojisAndStickers">Manage Emojis & Stickers</option>
        <option value="ManageWebhooks">Manage Webhooks</option>
        <option value="ManageEvents">Manage Events</option>
        <option value="ManageNicknames">Manage Nicknames</option>
        <option value="ChangeNickname">Change Nickname</option>
        <option value="RequestToSpeak">Request to Speak</option>
        <option value="UseApplicationCommands">Use Application Commands</option>
      </optgroup>
    </select>
</div>

<br>

<hr class="subtlebar">

<br>

<conditional-input id="branch"></conditional-input>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Pre-Init Code
  //
  // Before the fields from existing data in this action are applied
  // to the user interface, this function is called if it exists.
  // The existing data is provided, and a modified version can be
  // returned. The returned version will be used if provided.
  // This is to help provide compatibility with older versions of the action.
  //
  // The "formatters" argument contains built-in functions for formatting
  // the data required for official DBM action compatibility.
  //---------------------------------------------------------------------

  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];
    const member = await this.getMemberFromData(
      data.member,
      data.varName,
      cache
    );
    let result = false;
    if (member) {
      result = member.permissions.has([data.permission]);
    }
    this.executeResults(result, data?.branch ?? data, cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod Init
  //
  // An optional function for action mods. Upon the bot's initialization,
  // each command/event's actions are iterated through. This is to
  // initialize responses to interactions created within actions
  // (e.g. buttons and select menus for Send Message).
  //
  // If an action provides inputs for more actions within, be sure
  // to call the `this.prepareActions` function to ensure all actions are
  // recursively iterated through.
  //---------------------------------------------------------------------

  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod() {},
};
