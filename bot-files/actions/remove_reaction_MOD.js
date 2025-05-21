module.exports = {
  name: "Remove Reaction",
  section: "Reaction Control",
  meta: {
    version: "3.2.4",
    preciseCheck: false,
    author: "DBM Mods",
    authorUrl: "https://github.com/dbm-network/mods",
    downloadURL:
      "https://github.com/dbm-network/mods/blob/master/actions/remove_reaction_MOD.js",
  },

  subtitle(data, presets) {
    return presets.getMemberText(data.member, data.varName);
  },

  fields: ["reaction", "varName", "member", "varName2"],

  html() {
    return `
<div>
  <store-in-variable dropdownLabel="Source Reaction" selectId="reaction" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
</div>
<br><br><br><br>
<div>
  <member-input dropdownLabel="Source Member" selectId="member" variableContainerId="varNameContainer2" variableInputId="varName2"></member-input>
</div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];

    const emoji = this.evalMessage(data.reaction, cache); // reaction emoji or identifier
    const message = await this.getMessageFromData(
      data.storage,
      data.varName,
      cache
    );
    const member = await this.getMemberFromData(
      data.member,
      data.varName2,
      cache
    );

    if (!message) return this.callNextAction(cache);

    const reaction = message.reactions.cache.get(emoji); // Get the reaction by emoji

    if (!reaction) return this.callNextAction(cache); // If no reaction found, exit

    // Remove the reaction from the member
    if (member) {
      reaction.users
        .remove(member)
        .catch((err) => this.displayError(data, cache, err));
    }

    this.callNextAction(cache);
  },

  mod() {},
};
