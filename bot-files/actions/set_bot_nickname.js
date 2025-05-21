module.exports = {
  name: "Set Bot Nickname",

  section: "Bot Client Control",

  subtitle(data) {
    return `${data.nickname}`;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: null,
    authorUrl: null,
    downloadUrl: null,
  },

  fields: ["server", "varName", "nickname", "reason"],

  html(isEvent, data) {
    return `
      <server-input dropdownLabel="Server" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>

      <br><br><br>

      <div style="padding-top: 8px;">
        <span class="dbminputlabel">Nickname</span><br>
        <input id="nickname" class="round" type="text">
      </div>

      <br>

      <div>
        <span class="dbminputlabel">Reason</span>
        <input id="reason" placeholder="Optional" class="round" type="text">
      </div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const server = await this.getServerFromData(
      data.server,
      data.varName,
      cache
    );
    const nickname = this.evalMessage(data.nickname, cache) || null;
    const reason = this.evalMessage(data.reason, cache);
    const botMember = server.me;

    if (botMember?.setNickname) {
      try {
        // Set the bot's nickname without using .then()
        await botMember.setNickname(nickname, reason);
        this.callNextAction(cache); // Proceed to next action
      } catch (err) {
        this.displayError(data, cache, err);
      }
    } else {
      this.callNextAction(cache);
    }
  },

  mod() {},
};
