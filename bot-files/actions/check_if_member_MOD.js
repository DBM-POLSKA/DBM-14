module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Check If Member",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Conditions",

  //---------------------------------------------------------------------
  // Action Size
  //---------------------------------------------------------------------

  size: function () {
    return { width: 540, height: 450 };
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/DBM-POLSKA",
    downloadURL:
      "https://github.com/DBM-POLSKA/DBM-14/blob/main/bot-files/actions/check_if_member_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    const info = [
      "Is Bot?",
      "Is Bannable?",
      "Is Kickable?",
      "Is In Voice Channel?",
      "Is User Manageable?",
      "Is Bot Owner?",
      "Is Muted?",
      "Is Deafened?",
      "Is Command Author?",
      "Is Current Server Owner?",
      "Is Boosting Current Server?",
      "Is in timeout?",
      "Is Online?",
      "Is Idle?",
      "Is DND?",
      "Is Offline?",
      "Is Streaming?",
      "Is Playing?",
      "Is Listening?",
      "Is Watching?",
      "Is Competing?",
      "Is Custom Status?",
    ];
    return `${presets.getMemberText(data.member, data.varName)} - ${
      info[parseInt(data.info, 10)]
    }`;
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["member", "varName", "info", "varName2", "branch"],

  //---------------------------------------------------------------------
  // Command HTML
  //---------------------------------------------------------------------

  html(isEvent) {
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

    <member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
    <br><br><br>

    <div style="padding-top: 8px;">
      <div style="float: left; width: 35%;">
        <span class="dbminputlabel">Check If Member</span>
        <select id="info" class="round">
        <optgroup label="Default">
          <option value="0" selected>Is Bot?</option>
          <option value="1">Is Bannable?</option>
          <option value="2">Is Kickable?</option>
          <option value="3">Is In Voice Channel?</option>
          <option value="4">Is User Manageable?</option>
          <option value="5">Is Bot Owner?</option>
          <option value="6">Is Muted?</option>
          <option value="7">Is Deafened?</option>
          ${!isEvent && '<option value="8">Is Command Author?</option>'}
          ${!isEvent && '<option value="9">Is Current Server Owner?</option>'}
          ${
            !isEvent &&
            '<option value="10">Is Boosting Current Server?</option>'
          }
          <option value="11">Is in timeout?</option>
          <optgroup label="Status">
          <option value="12">Is Online?</option>
          <option value="13">Is Idle?</option>
          <option value="14">Is DND?</option>
          <option value="15">Is Offline?</option>
          <optgroup label="Activity">
          <option value="16">Is Streaming?</option>
          <option value="17">Is Playing?</option>
          <option value="18">Is Listening?</option>
          <option value="19">Is Watching?</option>
          <option value="20">Is Competing?</option>
          <option value="21">Is Custom Status?</option>
        </select>
      </div>
    </div>
    <br><br><br>

    <br>
    <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px; width: 100%;">
    <br>

    <conditional-input id="branch" style="padding-top: 8px;"></conditional-input>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];
    const info = parseInt(data.info, 10);
    const { Files } = this.getDBM();
    const { ActivityType } = this.getDBM().DiscordJS;

    const { msg, interaction } = cache;
    const member = await this.getMemberFromData(
      data.member,
      data.varName,
      cache
    );

    if (!member) {
      console.error(
        `The "Check If Member" action failed because no valid member was provided. Ensure the variable references a valid member.`
      );
      return this.executeResults(false, data?.branch ?? data, cache);
    }

    let result = false;
    switch (info) {
      case 0: // Is Bot?
        result = member.user?.bot;
        break;
      case 1: // Is Bannable?
        result = member.bannable;
        break;
      case 2: // Is Kickable?
        result = member.kickable;
        break;
      case 3: // Is In Voice Channel?
        result = Boolean(member.voice?.channel);
        break;
      case 4: // Is User Manageable?
        result = member.manageable;
        break;
      case 5: // Is Bot Owner?
        const fs = require("fs");
        const filePath = require("path").join(
          __dirname,
          "..",
          "data",
          "multiple_bot_owners.json"
        );
        if (!fs.existsSync(filePath)) {
          result = member.id === Files.data.settings.ownerId;
        } else {
          result =
            JSON.parse(fs.readFileSync(filePath, "utf8")).includes(member.id) ||
            member.id === Files.data.settings.ownerId;
        }
        break;
      case 6: // Is Muted?
        result = Boolean(member.voice?.mute);
        break;
      case 7: // Is Deafened?
        result = Boolean(member.voice?.deaf);
        break;
      case 8: // Is Command Author?
        result = member.id === (msg?.author?.id ?? interaction?.user?.id);
        break;
      case 9: // Is Current Server Owner?
        result = member.id === member.guild?.ownerId;
        break;
      case 10: // Is Boosting Current Server?
        result = Boolean(member.premiumSince);
        break;
      case 11: // Is in timeout?
        result = member.isCommunicationDisabled();
        break;
      case 12: // Is Online?
        result = member.presence?.status === "online";
        break;
      case 13: // Is Idle?
        result = member.presence?.status === "idle";
        break;
      case 14: // Is DND?
        result = member.presence?.status === "dnd";
        break;
      case 15: // Is Offline?
        result = member.presence?.status === "offline";
        break;
      case 16: // Is Streaming?
        result =
          Array.isArray(member.presence?.activities) &&
          member.presence.activities.some(
            (a) => a.type === ActivityType.Streaming
          );
        break;
      case 17: // Is Playing?
        result =
          Array.isArray(member.presence?.activities) &&
          member.presence.activities.some(
            (a) => a.type === ActivityType.Playing
          );
        break;
      case 18: // Is Listening?
        result =
          Array.isArray(member.presence?.activities) &&
          member.presence.activities.some(
            (a) => a.type === ActivityType.Listening
          );
        break;
      case 19: // Is Watching?
        result =
          Array.isArray(member.presence?.activities) &&
          member.presence.activities.some(
            (a) => a.type === ActivityType.Watching
          );
        break;
      case 20: // Is Competing?
        result =
          Array.isArray(member.presence?.activities) &&
          member.presence.activities.some(
            (a) => a.type === ActivityType.Competing
          );
        break;
      case 21: // Is Custom Status?
        result =
          Array.isArray(member.presence?.activities) &&
          member.presence.activities.some(
            (a) => a.type === ActivityType.Custom
          );
        break;

      default:
        console.error(
          'Please check your "Check If Member" action! There is something wrong...'
        );
        break;
    }

    this.executeResults(result, data?.branch ?? data, cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod Init
  //---------------------------------------------------------------------

  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
