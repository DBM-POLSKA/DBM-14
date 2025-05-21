module.exports = {
  name: "Create Transcript",
  section: "Moderation",
  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadURL:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/transcript_MOD.js",
  },

  subtitle(data, presets) {
    return `${presets.getChannelText(data.channel, data.varName)}`;
  },

  fields: [
    "channel",
    "folder",
    "filename",
    "save",
    "thumbnails",
    "footer",
    "dateFormat",
    "textChannelsOnly",
    "embed",
    "timeLimit",
    "varName",
    "varName2",
    "storage",
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
      >1.1</a
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



    <html>
      <style>
        .input-group {
          display: flex;
          gap: 10px; /* Odstęp między polami */
          flex-wrap: wrap; /* Umożliwia zawijanie, gdy okno jest za wąskie */
        }
        .input-group > div {
          flex: 1; /* Każde pole zajmuje równą szerokość */
        }
      </style>
      <channel-input dropdownLabel="Source Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
      <br><br><br>
      <div class="input-group">
        <div>
          <span class="dbminputlabel">Folder Path</span><br>
          <input id="folder" class="round" type="text" placeholder="Enter folder path" value="${
            data.folder || "transcripts"
          }">
        </div>
        <div>
          <span class="dbminputlabel">File Name</span><br>
          <input id="filename" class="round" type="text" placeholder="Enter file name" value="${
            data.filename || "transcript"
          }">
        </div>
        <div>
          <span class="dbminputlabel">Send Attachment</span><br>
          <select id="save" class="round">
            <option value="True" ${
              data.save === "True" ? "selected" : ""
            }>True</option>
            <option value="False" ${
              data.save === "False" ? "selected" : ""
            }>False</option>
          </select>
        </div>
      </div>

      <hr class="subtlebar" style="width: 100%; margin-top: 30px; margin-bottom: 30px;">
      
    <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
    `;
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const DiscordJS = this.getDBM().DiscordJS;
    const transcript = require("shadow-transcripts");
    const { ChannelType } = require("discord.js");
    const fs = require("fs");
    const path = require("path");

    let folder = data.folder || "transcripts";
    if (!folder.startsWith("./") && !folder.startsWith("/")) {
      folder = `./${folder}`;
    }

    const filename = `${data.filename}.html` || `${channel.id}.html`;
    const filePath = path.join(folder, filename);

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    const channel = await this.getChannelFromData(
      data.channel,
      data.varName,
      cache
    );
    if (!channel) {
      this.displayError(data, cache, "Channel not found.");
      return;
    }

    if (channel.type !== DiscordJS.ChannelType.GuildText) {
      this.displayError(
        data,
        cache,
        "The specified channel is not a valid text channel."
      );
      return;
    }

    if (cache.interaction) {
      await cache.interaction.deferReply();
    } else {
    }

    const options = {
      folder: data.folder || "./transcripts",
      filename: `${data.filename}.html` || `${channel.id}.html`,
      save: data.save === "True",
      thumbnails: data.thumbnails === "True",
      footer: data.footer || "",
      dateFormat: data.dateFormat || "YYYY-MM-DD HH:mm:ss",
      textChannelsOnly: data.textChannelsOnly === "True",
      embed: data.embed === "True",
      timeLimit: parseInt(data.timeLimit) || 1440,
    };

    try {
      const transcriptHTML = await transcript.createTranscript(
        channel,
        options
      );

      const buffer = transcriptHTML.attachment;
      fs.writeFileSync(filePath, buffer);

      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);

      const relativePath = path.join(folder, filename).replace(/\\/g, "/");
      this.storeValue(relativePath, storage, varName2, cache);

      if (data.save === "False") {
        if (cache.interaction) {
          try {
            const message = await cache.interaction.editReply({
              content: "Transcript generated successfully!",
            });
            cache.messageId = message.id;

            await message.delete();
          } catch (error) {
            console.error("Error deleting message:", error);
          }
        }
      } else {
        if (cache.interaction) {
          await cache.interaction.editReply({
            content: "",
            files: [
              {
                attachment: buffer,
                name: `${data.filename}.html`,
              },
            ],
          });
        }
      }

      this.callNextAction(cache);
    } catch (error) {
      console.error("Error generating transcript:", error);
      this.callNextAction(cache);
    }
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, data.dontSend ? "Message Options" : "File Location"];
  },

  mod() {},
};
