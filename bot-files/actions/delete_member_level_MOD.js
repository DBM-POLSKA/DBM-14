module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Delete Member Level",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Economy",

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/delete_member_level_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `${presets.getMemberText(data.member, data.varName)} - ${
      data.dataName
    }`;
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["member", "varName", "dataName"],

  //---------------------------------------------------------------------
  // Command HTML
  //---------------------------------------------------------------------

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
  

  <div>
    <member-input dropdownLabel="Source Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
  </div>
  <br><br><br>
  
  <div style="padding-top: 8px;">
    <div style="float: left; width: 80%;">
      <span class="dbminputlabel">Data Name</span>
      <select id="dataName" class="round">
              <option value="level" selected>Level</option>
              <option value="xp">XP</option>
      </select>
    </div>
  </div>`;
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
    const member = await this.getMemberFromData(
      data.member,
      data.varName,
      cache
    );
    const dataName = this.evalMessage(data.dataName, cache);

    member.delData(dataName);
    this.callNextAction(cache);
  },

  mod(DBM) {
    Reflect.defineProperty(DBM.DiscordJS.GuildMember.prototype, "delData", {
      value(name) {
        const { players } = DBM.Files.data;

        if (name && players[this.id]?.[name]) {
          delete players[this.id][name];
          DBM.Files.saveData("players");
        } else if (!name) {
          delete players[this.id];
          DBM.Files.saveData("players");
        }
      },
    });

    Reflect.defineProperty(DBM.DiscordJS.User.prototype, "delData", {
      value(name) {
        const { players } = DBM.Files.data;

        if (name && players[this.id]?.[name]) {
          delete players[this.id][name];
          DBM.Files.saveData("players");
        } else if (!name) {
          delete players[this.id];
          DBM.Files.saveData("players");
        }
      },
    });
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
