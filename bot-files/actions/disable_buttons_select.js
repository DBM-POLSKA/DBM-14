module.exports = {
  name: "Disable Buttons and Selects",

  section: "Messaging",

  subtitle(data, presets) {
    return `${presets.getMessageText(data.storage, data.varName)}`;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: null,
    authorUrl: null,
    downloadUrl: null,
  },

  fields: ["storage", "varName", "type", "disable", "searchValue"],

  html(isEvent, data) {
    return `
<message-input dropdownLabel="Source Message" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></message-input>

<br><br><br><br>

<div style="float: left; width: calc(50% - 12px);">
  <span class="dbminputlabel">Components to Disable</span><br>
  <select id="type" class="round" onchange="glob.onButtonSelectTypeChange(this)">
    <option value="all" selected>All Buttons and Select Menus</option>
    <option value="allButtons">All Buttons</option>
    <option value="allSelects">All Select Menus</option>
    <option value="sourceButton">Source Button</option>
    <option value="sourceSelect">Source Select Menu</option>
    <option value="findButton">Specific Button</option>
    <option value="findSelect">Specific Select Menu</option>
  </select>
</div>

<div style="float: right; width: calc(50% - 12px);">
  <span class="dbminputlabel">Disable or Re-enable</span><br>
  <select id="disable" class="round">
    <option value="disable" selected>Disable</option>
    <option value="reenable">Re-Enable</option>
  </select>
</div>

<br><br><br><br>

<div id="nameContainer" style="width: calc(50% - 12px)">
  <span class="dbminputlabel">Component Label/ID</span><br>
  <input id="searchValue" class="round" type="text">
</div>`;
  },

  init() {
    const { glob } = this;

    glob.onButtonSelectTypeChange = function (event) {
      const input = document.getElementById("nameContainer");
      input.style.display =
        event.value === "findButton" || event.value === "findSelect"
          ? null
          : "none";
    };

    glob.onButtonSelectTypeChange(document.getElementById("type"));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const message = await this.getMessageFromData(
      data.storage,
      data.varName,
      cache
    );

    const type = data.type;

    let sourceButton = null;
    if (cache.interaction && cache.interaction.isButton()) {
      sourceButton = cache.interaction.customId;
    }

    let sourceSelect = null;
    if (cache.interaction && cache.interaction.isStringSelectMenu()) {
      sourceSelect = cache.interaction.customId;
    }

    const disable = (data.disable ?? "disable") === "disable";
    let components = null;
    let searchValue = null;

    if (message?.components) {
      const { ActionRowBuilder } = require("discord.js"); // Używamy ActionRowBuilder w wersji 14.x
      const oldComponents = message.components;
      const newComponents = [];

      for (let i = 0; i < oldComponents.length; i++) {
        const compData = oldComponents[i];
        const comps =
          compData instanceof ActionRowBuilder ? compData.toJSON() : compData;

        for (let j = 0; j < comps.components.length; j++) {
          const comp = comps.components[j];
          const id = comp.custom_id ?? comp.customId;

          switch (type) {
            case "all": {
              comp.disabled = disable;
              break;
            }
            case "allButtons": {
              if (comp.type === 2 || comp.type === "BUTTON")
                comp.disabled = disable;
              break;
            }
            case "allSelects": {
              if (comp.type === 3 || comp.type === "SELECT_MENU")
                comp.disabled = disable;
              break;
            }
            case "sourceButton": {
              if (id === sourceButton) comp.disabled = disable;
              break;
            }
            case "sourceSelect": {
              if (id === sourceSelect) comp.disabled = disable;
              break;
            }
            case "findButton":
            case "findSelect": {
              if (searchValue === null)
                searchValue = this.evalMessage(data.searchValue, cache);
              if (id === searchValue || comp.label === searchValue)
                comp.disabled = disable;
              break;
            }
          }
        }

        newComponents.push(comps);
      }

      components = newComponents;
    }

    if (components) {
      if (Array.isArray(message)) {
        this.callListFunc(message, "edit", [{ components }]).then(() =>
          this.callNextAction(cache)
        );
      } else if (
        cache.interaction?.message?.id === message?.id &&
        cache.interaction?.update &&
        !cache.interaction?.replied
      ) {
        cache.interaction
          .update({ components })
          .then(() => this.callNextAction(cache))
          .catch((err) => this.displayError(data, cache, err));
      } else if (message?.edit) {
        message
          .edit({ components })
          .then(() => this.callNextAction(cache))
          .catch((err) => this.displayError(data, cache, err));
      } else {
        if (message.components) {
          message.components = components;
        }
        this.callNextAction(cache);
      }
    } else {
      this.callNextAction(cache);
    }
  },

  mod() {},
};
