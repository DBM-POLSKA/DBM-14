module.exports = {
  name: "Add Member to Thread",
  section: "Channel Control",
  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "DBM Mods",
    authorUrl: "https://github.com/dbm-network/mods",
    downloadURL:
      "https://github.com/DBM-POLSKA/DBM-14/blob/DBM-v14/actions/add_member_to_thread_MOD.js",
  },

  subtitle(data, presets) {
    const storeTypes = presets.variables;

    return `${storeTypes[parseInt(data.storage, 10)]} (${data.varName})`;
  },

  fields: ["storage", "varName", "member", "varName2"],

  html() {
    return `
      <retrieve-from-variable dropdownLabel="Source Thread" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>
      <br><br><br>

      <member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer2" variableInputId="varName2"></member-input>
    `;
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const thread = this.getVariable(storage, varName, cache);
    const member = await this.getMemberFromData(
      data.member,
      data.varName2,
      cache
    );

    try {
      await thread.members.add(member);
      this.callNextAction(cache);
    } catch {
      this.executeResults(false, data, cache);
    }
  },

  mod() {},
};
