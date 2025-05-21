module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Create Json File",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Json Control",

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    const fileName = data.fileName || "file";
    const finalFileName = fileName.toLowerCase().endsWith(".json")
      ? fileName
      : `${fileName}.json`;
    return `Create ${finalFileName}`;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl: null,
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName, "File Path"];
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["fileName", "filePath", "storage", "varName"],

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


    <!-- General -->

    <span class="dbminputlabel">File Name</span>
    <input id="fileName" class="round" type="text">

    <br>

    <span class="dbminputlabel">File Path</span>
    <input id="filePath" class="round" type="text" value="resources/">

    <br>

    <store-in-variable dropdownLabel="Store Result In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>

    `;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const fs = require("fs");
    const path = require("path");
    const data = cache.actions[cache.index];

    let fileName = this.evalMessage(data.fileName, cache);
    if (!fileName) fileName = "file";

    const finalFileName = fileName.toLowerCase().endsWith(".json")
      ? fileName
      : `${fileName}.json`;

    const filePath = this.evalMessage(data.filePath, cache);
    const fullPath = path.join(filePath, finalFileName);

    const directoryPath = path.dirname(fullPath);
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, JSON.stringify({}, null, 2), "utf8");
    }

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(fullPath, storage, varName, cache);

    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
