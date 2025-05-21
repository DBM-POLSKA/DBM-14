module.exports = {
  name: "Create Forum Channel",
  section: "Channel Control",
  meta: {
    version: "3.2.4",
    preciseCheck: false,
    author: "DBM Mods",
    authorUrl: "https://github.com/dbm-network/mods",
    downloadURL:
      "https://github.com/dbm-network/mods/blob/master/actions/create_forum_channel_MOD.js",
  },

  subtitle(data) {
    return `${data.channelName}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName, "Channel"];
  },

  fields: [
    "channelName",
    "topic",
    "position",
    "storage",
    "varName",
    "categoryID",
    "slowmodepost",
    "reason",
  ],

  html() {
    return `
<div style="height: 350px; overflow-y: scroll; overflow-x: hidden;">
  <div style="float: left; width: 100%; padding-top: 8px;">
    <span class="dbminputlabel">Name</span>
    <input id="channelName" class="round" type="text">
  </div>
  <div style="float: left; width: 100%; padding-top: 16px;">
    <span class="dbminputlabel">Guidelines</span>
    <textarea id="topic" rows="3" style="font-family: monospace; white-space: nowrap;"></textarea>
  </div>
  
  <div style="float: left; width: 100%;">
    <div style="float: left; width: 60%; padding-top: 16px;">
      <span class="dbminputlabel">Category ID</span>
      <input id="categoryID" class="round" type="text" placeholder="Leave blank for no category">
    </div>
    <div style="float: right; width: 35%; padding-top: 16px;">
      <span class="dbminputlabel">Position</span>
      <input id="position" class="round" type="text" placeholder="Leave blank for default">
    </div>
  </div>
  <div style="float: left; width: 100%; padding-top: 16px;">
    <span class="dbminputlabel">Slowmode</span><br>
    <input id="slowmodepost" class="round" type="text" placeholder="Leave blank to disable">
  </div>
  <div style="float: left; width: 100%; padding-top: 16px;">
    <span class="dbminputlabel">Reason</span>
    <input id="reason" placeholder="Optional" class="round" type="text">
  </div>
  <div style="float: left; width: 100%; padding-top: 16px;">
    <store-in-variable allowNone dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
  </div>
</div>
`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const { server } = cache;
    const name = this.evalMessage(data.channelName, cache);

    if (!name || name.trim() === "") {
      this.displayError("Channel name is required!", data, cache);
      return;
    }

    const channelData = {
      name: name,
      type: 15, // Forum channel
      reason: this.evalMessage(data.reason, cache),
      topic: this.evalMessage(data.topic, cache),
      position: parseInt(this.evalMessage(data.position, cache)) || undefined,
      parent: this.evalMessage(data.categoryID, cache) || undefined,
      rateLimitPerUser:
        parseInt(this.evalMessage(data.slowmodepost, cache)) || undefined,
      defaultSortOrder: 0, // Domyślny układ
      defaultForumLayout: 0, // Lista wątków
    };

    try {
      const channel = await server.channels.create(channelData);
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(channel, storage, varName, cache);
      this.callNextAction(cache);
    } catch (error) {
      console.error("Error creating forum channel:", error);
      this.displayError(data, cache, error);
    }
  },

  mod() {},
};
