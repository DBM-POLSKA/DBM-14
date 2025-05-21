module.exports = {
  name: "Server Ban List",
  section: "Other Stuff",

  subtitle(data) {
    return "Fetch the list of banned users from a server";
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/server_ban_list_MOD.js",
  },

  fields: ["server", "varName", "storage", "varName2", "format"],

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
  

        <server-input 
          dropdownLabel="Source Server" 
          selectId="server" 
          variableContainerId="varNameContainer" 
          variableInputId="varName">
        </server-input>

        <br><br><br>
  
        <div style="padding-top: 8px;">
          <span class="dbminputlabel">Format List</span>
          <select id="format" class="round">
            <option value="inline">Inline (comma-separated)</option>
            <option value="newline">New Line</option>
          </select>
        </div>

        <br><br><br>
  
        <store-in-variable 
          dropdownLabel="Store In" 
          selectId="storage" 
          variableContainerId="varNameContainer2" 
          variableInputId="varName2">
        </store-in-variable>
      `;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, "Text"];
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const server = await this.getServerFromData(
      data.server,
      data.varName,
      cache
    );
    const format = data.format || "inline";

    if (!server) {
      return this.callNextAction(cache);
    }

    try {
      const bans = await server.bans.fetch();
      let bannedUsers = bans.map((ban) => ban.user.username);

      if (format === "inline") {
        bannedUsers = bannedUsers.join(", ");
      } else {
        bannedUsers = bannedUsers.join("\n");
      }

      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName2, cache);
      this.storeValue(bannedUsers, storage, varName, cache);
    } catch (err) {
      console.error("[ERROR] Failed to fetch banned users:", err);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
