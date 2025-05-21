module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Translate",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Other Stuff",

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadURL:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-v14/actions/translate_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data) {
    return `Translate to [${data.translateTo}]`;
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, "Translated Text"];
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["translateTo", "translateMessage", "storage", "varName"],

  //---------------------------------------------------------------------
  // Command HTML
  //---------------------------------------------------------------------

  html() {
    return `
    <div>
      <div style="float: left; width: 35%">
        <span class="dbminputlabel">Translate to</span>
        <input id="translateTo" placeholder="2 Letter ISO Code" class="round" type="text" maxlength="2">
      </div>
      <div style="float: right; width: 60%; padding-top: 22px;">
        <p>Find ISO Codes <a target="_blank" href="https://phyrok.github.io/iso_codes.html">Here</a></p>
      </div>
    </div>
    <br><br><br>

    <div style="padding-top: 16px;">
      <div>
        <span class="dbminputlabel">Translate Message</span>
        <textarea id="translateMessage" rows="9" placeholder="Insert message that you want to translate here..." style="font-family: monospace; white-space: nowrap; resize: none;"></textarea>
      </div>
    </div>

    <div style="padding-top: 16px;">
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
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
    process.emitWarning = (message, type, code, ctor) => {
      if (type === "DeprecationWarning" && message.includes("punycode")) {
        return;
      }

      return process.__emitWarning(message, type, code, ctor);
    };

    const data = cache.actions[cache.index];
    const translateTo = this.evalMessage(data.translateTo, cache);
    const translateMessage = this.evalMessage(data.translateMessage, cache);
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);

    const translate = require("translate").default;

    translate.engine = "google";

    if (!translateTo || translateTo.length > 2) return;
    if (!translateMessage) return;

    let result;
    try {
      result = await translate(translateMessage, { to: translateTo });
    } catch (error) {
      console.error("[Translate] Translation error:", error);
      result = null;
    }

    if (result) this.storeValue(result, storage, varName, cache);
    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
