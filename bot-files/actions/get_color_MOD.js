module.exports = {
  name: "Get Color",
  section: "Other Stuff",
  eta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadURL:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/get_color_MOD.js",
  },

  subtitle(data) {
    return `Get color: <font color="${data.color || "#000000"}">${
      data.color || "No Color Selected"
    }</font>`;
  },

  fields: ["color", "storage", "varName2"],

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
  

  <div style="margin-bottom: 10px;">
  <span class="dbminputlabel">Color</span><br>
  <input type="color" id="color" class="round" style="height: 50px;">
</div>

  
        <hr class="subtlebar" style="width: 100%; margin-top: 30px; margin-bottom: 30px;">

        <store-in-variable 
          dropdownLabel="Store In" 
          selectId="storage" 
          variableContainerId="varNameContainer2" 
          variableInputId="varName2">
        </store-in-variable>
      `;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const color = this.evalMessage(data.color, cache);
    const storage = parseInt(data.storage, 10);
    const varName2 = this.evalMessage(data.varName2, cache);

    if (color) {
      this.storeValue(color, storage, varName2, cache);
    }

    this.callNextAction(cache);
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, "Color HEX"];
  },

  mod() {},
};
