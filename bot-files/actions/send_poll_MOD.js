module.exports = {
  name: "Send Poll",

  section: "Messaging",

  subtitle(data) {
    const question = data.pollQuestion || "No question set";
    return `Send poll: "${
      question.length > 50 ? question.slice(0, 47) + "..." : question
    }"`;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/DBM-POLSKA",
    downloadUrl:
      "https://github.com/DBM-POLSKA/DBM-14/blob/DBM-v14/actions/send_poll_MOD.js",
  },

  fields: [
    "channel",
    "varNameContainer",
    "varName",
    "pollQuestion",
    "pollAnswers",
    "pollAnswer",
    "pollEmoji",
    "pollAllowMultipleAnswers",
    "pollDuration",
  ],

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




    <channel-input dropdownLabel="Source Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>

    <br><br><br><br><br>

  <div style="padding: 3px 30px 1px;">

    
    <span class="dbminputlabel">Question</span>
    <input id="pollQuestion" class="round" type="text" placeholder="Leave blank for default..." style="width: 100%;">

    <br>
    
    <dialog-list id="pollAnswers" fields='["pollAnswer", "pollEmoji"]' dialogTitle="Create Answer" dialogWidth="400" dialogHeight="280" listLabel="Answers (min 1 - max 10)" listStyle="height: calc(100vh - 450px);" itemName="Answer" itemCols="1" itemHeight="30px;" itemTextFunction="data.pollAnswer" itemStyle="text-align: left; line-height: 30px;">
      <div style="padding: 16px;">
        <span class="dbminputlabel">Answer</span>
        <input id="pollAnswer" class="round" type="text" placeholder="Type your answer" style="width: 100%;">

        <br>

        <span class="dbminputlabel">Emoji</span>
        <input id="pollEmoji" class="round" type="text" placeholder="Leave blank for none..." style="width: 100%;">

        <br>
      </div>
    </dialog-list>

    
    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 20px; margin-bottom: 0;">
     
      <div style="flex: 1; text-align: left;">
        <dbm-checkbox id="pollAllowMultipleAnswers" label="Allow Multiple Answers"></dbm-checkbox>
      </div>
      

      <div style="flex: 1; text-align: left;">
      <span class="dbminputlabel">Duration (in hours 1/2/3...)</span>
      <input id="pollDuration" class="round" type="text" placeholder="Leave blank for 24h..." style="width: 100%;">
    </div>

  </div>
    `;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const pollQuestion =
      this.evalMessage(data.pollQuestion, cache) || "Question";
    const pollDuration = this.evalMessage(data.pollDuration, cache) || "24";
    const pollAllowMultipleAnswers = data.pollAllowMultipleAnswers
      ? true
      : false;

    const pollAnswers = data.pollAnswers.map((answerData) => {
      return {
        text: this.evalMessage(answerData.pollAnswer, cache),
        emoji: this.evalMessage(answerData.pollEmoji, cache) || undefined,
      };
    });

    const targetChannel = await this.getChannelFromData(
      data.channel,
      data.varName,
      cache
    );

    if (!targetChannel) {
      this.callNextAction(cache);
      return;
    }

    try {
      await targetChannel.send({
        poll: {
          question: { text: pollQuestion },
          answers: pollAnswers,
          allowMultiselect: pollAllowMultipleAnswers,
          duration: pollDuration,
        },
      });
    } catch (err) {
      console.error("[Send Poll] Error sending survey:", err);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
