module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Edit Button",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Message Control",

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data) {
    if (data.sourceButton === "current") {
      return "Edit Current Button";
    } else if (data.sourceButton === "byId") {
      return `Edit Button by ID (${data.buttonId || "No ID"})`;
    } else {
      return "Edit button";
    }
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/edit_button_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: [
    "sourceButton",
    "buttonId",
    "newLabel",
    "newStyle",
    "newEmoji",
    "newURL",
    "disabled",
  ],

  //---------------------------------------------------------------------
  // Command HTML
  //---------------------------------------------------------------------

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
  

        <div>
          <div style="margin-top: 20px; display: flex; align-items: center; gap: 10px; width: 100%;">
            <div style="width: 200px;">
              <span class="dbminputlabel">Source Button</span>
              <select id="sourceButton" class="round" style="width: 100%;">
                <option value="current">Current Button</option>
                <option value="byId">Button by ID</option>
              </select>
            </div>
        
            <div id="buttonIdContainer" style="display: none; width: 300px;">
              <span class="dbminputlabel">Button ID</span>
              <input id="buttonId" class="round" type="text" style="width: 100%; padding: 5px;">
            </div>
          </div>
        
          <div style="margin-top: 20px; display: flex; gap: 10px;">
  <div style="flex: 1;">
    <span class="dbminputlabel">New Button Name</span>
    <input id="newLabel" class="round" type="text" style="width: 100%; padding: 5px;" placeholder="Leave blank for none...">
  </div>
  <div style="flex: 1;">
    <span class="dbminputlabel">New Button Emoji</span>
    <input id="newEmoji" class="round" type="text" style="width: 100%; padding: 5px;" placeholder="Leave blank for none...">
  </div>
</div>

        
          <div style="margin-top: 20px;">
            <span class="dbminputlabel">New Button Style</span>
            <select id="newStyle" class="round" style="width: 100%; padding: 5px;">
              <option value="PRIMARY">Primary</option>
              <option value="SECONDARY">Secondary</option>
              <option value="SUCCESS">Success</option>
              <option value="DANGER">Danger</option>
              <option value="LINK">Link</option>
            </select>
          </div>
        
          <div style="margin-top: 20px;">
            <span class="dbminputlabel">New Link button (optional, only for LINK style)</span>
            <input id="newURL" class="round" type="text" style="width: 100%; padding: 5px;" placeholder="https://example.com">
          </div>
          
          <div style="margin-top: 20px;">
            <span class="dbminputlabel">Enable/Disable Button</span>
            <select id="disabled" class="round" style="width: 100%; padding: 5px;">
              <option value="false" selected>Enable</option>
              <option value="true">Disable</option>
            </select>
          </div>
        </div>
      `;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //---------------------------------------------------------------------

  init() {
    const sourceButton = document.getElementById("sourceButton");
    const buttonIdContainer = document.getElementById("buttonIdContainer");

    function toggleButtonIdField() {
      if (sourceButton.value === "byId") {
        buttonIdContainer.style.display = "block";
      } else {
        buttonIdContainer.style.display = "none";
      }
    }

    sourceButton.addEventListener("change", toggleButtonIdField);
    toggleButtonIdField();
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const { ActionRowBuilder, ButtonBuilder } = require("discord.js");
    const data = cache.actions[cache.index];
    const sourceButton = this.evalMessage(data.sourceButton, cache);
    const buttonId = this.evalMessage(data.buttonId, cache);
    const newLabel = this.evalMessage(data.newLabel, cache);
    const newStyle = this.evalMessage(data.newStyle, cache);
    const newEmoji = this.evalMessage(data.newEmoji, cache);
    const newURL = this.evalMessage(data.newURL, cache);

    const disabled = this.evalMessage(data.disabled, cache);

    const interaction = cache.interaction;
    if (interaction) {
      await interaction.deferReply({ flags: 64 }).catch(() => {});
    }

    const guild = interaction?.guild || cache.message?.guild;
    if (!guild) {
      this.callNextAction(cache);
      return;
    }

    try {
      let foundMessage = null;

      if (sourceButton === "current" && interaction) {
        const message = interaction.message;
        const newComponents = message.components.map((row) => {
          return new ActionRowBuilder().addComponents(
            row.components.map((button) => {
              if (button.customId === interaction.customId) {
                const buttonBuilder = new ButtonBuilder().setLabel(
                  newLabel && newLabel.trim().length ? newLabel : button.label
                );

                const validStyles = {
                  PRIMARY: 1,
                  SECONDARY: 2,
                  SUCCESS: 3,
                  DANGER: 4,
                  LINK: 5,
                };

                if (validStyles[newStyle.toUpperCase()] !== undefined) {
                  buttonBuilder.setStyle(validStyles[newStyle.toUpperCase()]);
                } else {
                  buttonBuilder.setStyle(validStyles.PRIMARY);
                }

                if (newEmoji) {
                  buttonBuilder.setEmoji(newEmoji);
                }

                if (newStyle === "LINK" && newURL) {
                  buttonBuilder.setURL(newURL);
                } else {
                  buttonBuilder.setCustomId(button.customId);
                }

                buttonBuilder.setDisabled(disabled === "true");

                return buttonBuilder;
              }
              return ButtonBuilder.from(button);
            })
          );
        });

        await message.edit({ components: newComponents });
      } else if (sourceButton === "byId") {
        const channels = guild.channels.cache.filter((ch) => ch.isTextBased());
        for (const channel of channels.values()) {
          const messages = await channel.messages
            .fetch({ limit: 50 })
            .catch(() => null);
          if (!messages) continue;
          foundMessage = messages.find((msg) =>
            msg.components.some((row) =>
              row.components.some((button) => button.customId === buttonId)
            )
          );
          if (foundMessage) break;
        }
      }

      if (!foundMessage) {
        this.callNextAction(cache);
        return;
      }

      const newComponents = foundMessage.components.map((row) => {
        return new ActionRowBuilder().addComponents(
          row.components.map((button) => {
            if (button.customId === buttonId) {
              const buttonBuilder = new ButtonBuilder().setLabel(
                newLabel && newLabel.trim().length ? newLabel : button.label
              );

              const validStyles = {
                PRIMARY: 1,
                SECONDARY: 2,
                SUCCESS: 3,
                DANGER: 4,
                LINK: 5,
              };

              if (validStyles[newStyle.toUpperCase()] !== undefined) {
                buttonBuilder.setStyle(validStyles[newStyle.toUpperCase()]);
              } else {
                buttonBuilder.setStyle(validStyles.PRIMARY);
              }

              if (newEmoji) {
                buttonBuilder.setEmoji(newEmoji);
              }

              if (newStyle === "LINK" && newURL) {
                buttonBuilder.setURL(newURL);
              } else {
                buttonBuilder.setCustomId(button.customId);
              }

              buttonBuilder.setDisabled(disabled === "true");

              return buttonBuilder;
            }
            return ButtonBuilder.from(button);
          })
        );
      });

      await foundMessage.edit({ components: newComponents });

      this.callNextAction(cache);
    } catch (err) {
      if (err.message && err.message.includes("Link buttons must have a URL")) {
        console.error("[Edit Button] LINK buttons must have a URL set.");
      } else if (
        err.message &&
        (err.message.includes("expected to match a URL") ||
          err.message.includes("Invalid URL") ||
          err.message.includes("s.string().url()"))
      ) {
        console.error(
          "[Edit Button] The URL provided is incorrect. Please make sure you are entering the correct URL."
        );
      } else {
        console.error("[Edit Button] Error when editing button:", err);
      }

      this.callNextAction(cache);
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
