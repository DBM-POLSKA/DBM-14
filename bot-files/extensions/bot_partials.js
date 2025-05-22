const PARTIALS = [
  "USER",
  "CHANNEL",
  "GUILD_MEMBER",
  "MESSAGE",
  "REACTION",
  "GUILD_SCHEDULED_EVENT",
  "THREAD_MEMBER",
  "SOUNDBOARD_SOUND",
];

module.exports = {
  name: "Bot Partials",
  isEditorExtension: true,
  saveButtonText: "Save Partials",
  fields: [],
  defaultFields: {
    partials: [],
  },

  size: function () {
    return { width: 400, height: 200 };
  },

  html: function (data) {
    if (!data.partials) data.partials = [];
    const allChecked = data.partials.length === PARTIALS.length;

    let result = `
      <div style="padding: 24px 16px 16px 16px;">
        <div style="padding: 0 24px; text-align: left;">
          <div style="width: 33%; float: left;">
            <input type="radio" id="None" name="RatioButton" value="None" ${
              data.partials.length === 0 ? "checked" : ""
            }>
            <label for="None">No Partials</label>
          </div>
          <div style="width: 33%; float: left;">
            <input type="radio" id="All" name="RatioButton" value="All" ${
              allChecked ? "checked" : ""
            }>
            <label for="All">All Partials</label>
          </div>
          <div style="width: 33%; float: left;">
            <input type="radio" id="Custom" name="RatioButton" value="Custom" ${
              !allChecked && data.partials.length > 0 ? "checked" : ""
            }>
            <label for="Custom">Custom</label>
          </div>
        </div>
        <br><br><hr><br>
        <div style="padding: 0 24px;">
    `;

    const partialNames = [
      "User",
      "Channel (Enables DMs)",
      "Guild Member",
      "Message",
      "Reaction",
      "Guild Scheduled Event",
      "Thread Member",
      "Soundboard Sound",
    ];

    for (let i = 0; i < PARTIALS.length; i++) {
      const partial = PARTIALS[i];
      result += `
        <div style="width: 50%; float: left;">
          <input type="checkbox" id="${partial}" name="${partial}" value="${partial}" ${
        data.partials.includes(partial) ? "checked" : ""
      }>
          <label for="${partial}">${partialNames[i]}</label>
        </div>
        ${i % 2 === 1 ? '<div style="height: 24px;"><br></div>' : ""}
      `;
    }

    result += `</div><br></div>`;
    return result;
  },

  init: function (document) {
    function toggleAll(enable) {
      PARTIALS.forEach((id) => {
        const el = document.getElementById(id);
        el.disabled = !enable;
      });
    }

    document.getElementById("None").onclick = () => {
      toggleAll(false);
      PARTIALS.forEach((id) => (document.getElementById(id).checked = false));
    };
    document.getElementById("All").onclick = () => {
      toggleAll(false);
      PARTIALS.forEach((id) => (document.getElementById(id).checked = true));
    };
    document.getElementById("Custom").onclick = () => toggleAll(true);

    // Initialize state based on selection
    if (document.getElementById("All").checked) {
      document.getElementById("All").onclick();
    } else if (document.getElementById("Custom").checked) {
      document.getElementById("Custom").onclick();
    } else {
      document.getElementById("None").onclick();
    }
  },

  close: function (document, data) {
    let result = [];
    if (document.getElementById("All").checked) {
      result = [...PARTIALS];
    } else if (document.getElementById("Custom").checked) {
      PARTIALS.forEach((id) => {
        if (document.getElementById(id).checked) result.push(id);
      });
    }
    data.partials = result;
  },

  mod: function (DBM) {
    DBM.Bot.usePartials = function () {
      const partialData = DBM.Files?.data.settings?.["Bot Partials"];
      const arr = partialData?.customData?.["Bot Partials"]?.partials;
      return Array.isArray(arr) && arr.length > 0;
    };
    DBM.Bot.partials = function () {
      const partialData = DBM.Files?.data.settings?.["Bot Partials"];
      return partialData?.customData?.["Bot Partials"]?.partials || [];
    };
  },
};
