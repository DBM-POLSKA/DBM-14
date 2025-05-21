module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  name: "Role Command Restriction",

  //---------------------------------------------------------------------
  // Action Section
  section: "Moderation",

  //---------------------------------------------------------------------
  // Action Subtitle
  subtitle(data) {
    return `Checking if user has Role ID: ${data.roleID}`;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadURL:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/role_command_restriction_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Fields
  fields: ["roleID", "comparison", "branch"],

  //---------------------------------------------------------------------
  // Command HTML
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
        >1.1</a
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
  

        </div><br>
        <div style="float: left; width: 35%;">
          <span class="dbminputlabel">Role ID</span><br>
          <input id="roleID" class="round" type="text" name="roleID">
        </div>
        <br><br><br>
        <div style="float: left; width: 35%;">
          <span class="dbminputlabel">Comparison Type</span><br>
          <select id="comparison" class="round">
            <option value="0">User has the role</option>
            <option value="1">User does not have the role</option>
          </select>
        </div>
        <br><br><br><br>
        <hr class="subtlebar">
        <br>
        <conditional-input id="branch" style="padding-top: 8px;"></conditional-input>`;
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  action(cache) {
    const data = cache.actions[cache.index];
    const roleID = this.evalMessage(data.roleID, cache);
    const comparison = parseInt(data.comparison, 10);

    let member = null;

    if (cache.msg) {
      // Komenda tekstowa
      member = cache.msg.member;
    } else if (cache.interaction) {
      // Komenda slash
      member = cache.interaction.member;
    } else if (cache.member) {
      // Event
      member = cache.member;
    }

    if (!member) {
      console.error("Role Check Restriction: Nie można pobrać obiektu member.");
      return this.callNextAction(cache);
    }

    const hasRole = member.roles.cache.has(roleID);
    let result = false;

    // Porównanie
    switch (comparison) {
      case 0: // User has the role
        result = hasRole;
        break;
      case 1: // User does not have the role
        result = !hasRole;
        break;
    }

    this.executeResults(result, data?.branch ?? data, cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  mod() {},
};
