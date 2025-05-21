module.exports = {
  name: "Send Message to Console",
  section: "Other Stuff",
  eta: {
    version: "3.2.4",
    preciseCheck: false,
    author: "Shadow",
    authorUrl: null,
    downloadURL: null,
  },

  subtitle(data) {
    if (data.tosend?.length > 0) {
      return `<font color="${data.color}">${data.tosend}</font>`;
    }
    return "Please enter a message!";
  },

  fields: ["tosend", "color"],

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



    <div>
    <div style="float: left; width: 45%;">
      <span class="dbminputlabel">Color</span><br>
      <input type="color" id="color" class="round">
    </div>
    <div style="clear: both;"></div> <!-- To sprawia, że kolejne elementy będą wyświetlane pod poprzednimi -->
  </div>
<br>

<div style="padding-top: 8px;">
  <span class="dbminputlabel">Message To Send</span>
  <textarea id="tosend" rows="4" style="width: 99%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
</div>`;
  },

  init() {},

  async action(cache) {
    const { default: chalk } = await import("chalk");
    const data = cache.actions[cache.index];
    const send = this.evalMessage(data.tosend, cache);

    const color = this.evalMessage(data.color, cache);
    console.log(chalk.hex(color)(send));
    this.callNextAction(cache);
  },

  mod() {},
};
