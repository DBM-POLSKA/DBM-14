module.exports = {
  name: "Create Embed Message",

  section: "Embed Message",

  subtitle(data, presets) {
    return `${data.title}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName, "Embed Message Data"];
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: null,
    authorUrl: null,
    downloadUrl: null,
  },

  fields: [
    "title",
    "author",
    "color",
    "timestamp",
    "url",
    "authorIcon",
    "imageUrl",
    "thumbUrl",
    "storage",
    "varName",
  ],

  html(isEvent, data) {
    return `
    <div style="float: left; width: calc(50% - 12px);">
      <span class="dbminputlabel">Title</span><br>
      <input id="title" class="round" type="text"><br>
      <span class="dbminputlabel">Author</span><br>
      <input id="author" class="round" type="text" placeholder="Leave blank to disallow author!"><br>
      <span class="dbminputlabel">Color</span><br>
      <input id="color" class="round" type="text" placeholder="Leave blank for default!"><br>
      <span class="dbminputlabel">Use Timestamp</span><br>
      <select id="timestamp" class="round">
        <option value="true">Yes</option>
        <option value="false" selected>No</option>
      </select><br>
    </div>

    <div style="float: right; width: calc(50% - 12px);">
      <span class="dbminputlabel">URL</span><br>
      <input id="url" class="round" type="text" placeholder="Leave blank for none!"><br>
      <span class="dbminputlabel">Author Icon URL</span><br>
      <input id="authorIcon" class="round" type="text" placeholder="Leave blank for none!"><br>
      <span class="dbminputlabel">Image URL</span><br>
      <input id="imageUrl" class="round" type="text" placeholder="Leave blank for none!"><br>
      <span class="dbminputlabel">Thumbnail URL</span><br>
      <input id="thumbUrl" class="round" type="text" placeholder="Leave blank for none!"><br>
    </div>

    <br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    <hr class="subtlebar">

    <br>

    <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>`;
  },

  init() {},

  action(cache) {
    const data = cache.actions[cache.index];
    const { EmbedBuilder } = this.getDBM().DiscordJS;
    const embed = new EmbedBuilder();
    if (data.title) {
      embed.setTitle(this.evalMessage(data.title, cache));
    }
    if (data.url) {
      embed.setURL(this.evalMessage(data.url, cache));
    }
    if (data.author && data.authorIcon) {
      embed.setAuthor({
        name: this.evalMessage(data.author, cache),
        iconURL: this.evalMessage(data.authorIcon, cache),
      });
    }
    if (data.color) {
      embed.setColor(this.evalMessage(data.color, cache));
    }
    if (data.imageUrl) {
      embed.setImage(this.evalMessage(data.imageUrl, cache));
    }
    if (data.thumbUrl) {
      embed.setThumbnail(this.evalMessage(data.thumbUrl, cache));
    }
    if (data.timestamp === "true") {
      embed.setTimestamp();
    }
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(embed, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod(DBM) {},
};
