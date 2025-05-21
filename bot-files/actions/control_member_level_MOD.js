module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Control Member Level",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Economy",

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    let operator;
    if (data.changeType === "1") {
      operator = "+";
    } else if (data.changeType === "2") {
      operator = "-";
    } else {
      operator = "=";
    }
    return `${presets.getMemberText(data.member, data.varName)} (${
      data.dataName
    }) ${operator} ${data.value}`;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/control_member_level_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["member", "varName", "dataName", "changeType", "value"],

  //---------------------------------------------------------------------
  // Command HTML
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
  

  <member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
  
  <br><br><br>
  
  <div style="padding-top: 8px;">
      <div style="float: left; width: calc(50% - 12px);">
          <span class="dbminputlabel">Data Name</span><br>
          <select id="dataName" class="round">
              <option value="level" selected>Level</option>
              <option value="xp">XP</option>
          </select>
      </div>
      <div style="float: right; width: calc(50% - 12px);">
          <span class="dbminputlabel">Control Type</span><br>
          <select id="changeType" class="round">
              <option value="0" selected>Set Value</option>
              <option value="1">Add Value</option>
              <option value="2">Subtract Value</option>
          </select>
      </div>
  </div>
  
  <br><br><br>
  
  <div style="padding-top: 8px;">
      <span class="dbminputlabel">Value</span><br>
      <input id="value" class="round" type="text" name="is-eval"><br>
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
    if (member?.setData) {
      const dataName = this.evalMessage(data.dataName, cache);
      const isAdd = data.changeType === "1";
      let val = this.evalMessage(data.value, cache);
      try {
        val = this.eval(val, cache);
      } catch (e) {
        this.displayError(data, cache, e);
      }
      if (val !== undefined) {
        if (Array.isArray(member)) {
          member.forEach(function (mem) {
            if (data.changeType === "1") {
              if (mem?.addData) mem.addData(dataName, val);
            } else if (data.changeType === "2") {
              if (mem?.addData) mem.addData(dataName, -val);
            } else {
              if (mem?.setData) mem.setData(dataName, val);
            }
          });
        } else {
          if (data.changeType === "1") {
            member.addData(dataName, val);
          } else if (data.changeType === "2") {
            member.addData(dataName, -val);
          } else {
            member.setData(dataName, val);
          }
        }
      }
    }
    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
