module.exports = {
  name: "Check If Member",
  section: "Conditions",
  meta: {
    version: "3.2.4",
    preciseCheck: false,
    author: "DBM Mods",
    authorUrl: "https://github.com/dbm-network/mods",
    downloadURL:
      "https://github.com/dbm-network/mods/blob/master/actions/check_if_member_MOD.js",
  },

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
    ];
    return `${presets.getMemberText(data.member, data.varName)} - ${
      info[parseInt(data.info, 10)]
    }`;
  },

  fields: ["member", "varName", "info", "varName2", "branch"],

  html(isEvent) {
    return `
    <member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
    <br><br><br>

    <div style="padding-top: 8px;">
      <div style="float: left; width: 35%;">
        <span class="dbminputlabel">Check If Member</span>
        <select id="info" class="round">
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
        </select>
      </div>
    </div>
    <br><br><br>

    <conditional-input id="branch" style="padding-top: 8px;"></conditional-input>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const info = parseInt(data.info, 10);
    const { Files } = this.getDBM();
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
      default:
        console.error(
          'Please check your "Check If Member" action! There is something wrong...'
        );
        break;
    }

    this.executeResults(result, data?.branch ?? data, cache);
  },

  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },

  mod() {},
};
