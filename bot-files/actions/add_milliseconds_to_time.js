module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Add Milliseconds To Time",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Discord",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = "New Time";
    return [data.varName2, dataType];
  },

  subtitle(data, presets) {
    return `Added ${data.addtime} to new time!`;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Gotowka",
    authorUrl: "https://github.com/Gotowka",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-v14/actions/add_milliseconds_to_time.js",
  },
  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["addtime", "storage", "varName2"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
      <div>
  </div><br>
  <div style="padding-top: 8px; width: 100%;">
  <span class="dbminputlabel">Time to add</span>
  <input id="addtime" class="round" placeholder="example: 1s/1m/1h/1d" type="text">  
  </div>
  <br>
  <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
      `;
  },

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {
    console.log(
      "\x1b[30m[\x1b[35mACTION\x1b[30m]: \x1b[33madd_milliseconds_to_time; \x1b[30m[\x1b[32mv1.0\x1b[30m] \x1b[30m(\x1b[36mv2.1.9\x1b[30m)\x1b[0m"
    );
    const data = cache.actions[cache.index];
    let duration = this.evalMessage(data.addtime, cache);

    if (duration.includes("s")) {
      duration = duration.split("s")[0] * 1000;
    } else if (duration.includes("m")) {
      duration = duration.split("m")[0] * 60000;
    } else if (duration.includes("h")) {
      duration = duration.split("h")[0] * 3600000;
    } else if (duration.includes("d")) {
      duration = duration.split("d")[0] * 86400000;
    } else {
      duration = duration * 1000;
    }
    const result = new Date().getTime() + duration;
    const storage = parseInt(data.storage, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    this.storeValue(result, storage, varName2, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
