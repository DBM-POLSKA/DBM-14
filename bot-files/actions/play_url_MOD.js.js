module.exports = {
  name: "Play URL",
  section: "Audio Control",
  requiresAudioLibraries: true,

  subtitle: function (data) {
    return "Play media from URL";
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadURL:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/play_url_MOD.js",
  },

  fields: ["url", "volume", "bitrate", "seek", "type", "channel", "varName"],

  html: function () {
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


    <div>
    <voice-channel-input dropdownLabel="Voice Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="45%" variableInputWidth="50%"></voice-channel-input>
</div>
<div style="margin-top: 70px;">
    <span class="dbminputlabel">Web URL</span><br>
    <input id="url" class="round" type="text" value="http://"><br>
</div>
<div style="float: left; width: calc(50% - 12px);">
    <span class="dbminputlabel">Volume (0 = min; 100 = max)</span><br>
    <input id="volume" class="round" type="text" placeholder="Leave blank for automatic..."><br>
    <span class="dbminputlabel">Bitrate</span><br>
    <input id="bitrate" class="round" type="text" placeholder="Leave blank for automatic...">
</div>
<div style="float: right; width: calc(50% - 12px);">
    <span class="dbminputlabel">Seek Position</span><br>
    <input id="seek" class="round" type="text" value="0"><br>
</div>

<br><br><br><br><br><br><br>

<div>
    <span class="dbminputlabel">Play Type</span><br>
    <select id="type" class="round" style="width: 90%;">
        <option value="0" selected>Add to Queue</option>
        <option value="1">Play Immediately</option>
    </select>
</div>
`;
  },

  init() {},

  action: async function (cache) {
    const {
      joinVoiceChannel,
      createAudioPlayer,
      createAudioResource,
      AudioPlayerStatus,
    } = require("@discordjs/voice");
    const { VoiceConnectionStatus } = require("@discordjs/voice");
    const data = cache.actions[cache.index];
    const { client } = cache;

    let guild = cache.guild || cache.server;
    if (!guild) return;

    let voiceChannel = await this.getVoiceChannelFromData(
      data.channel,
      data.varName,
      cache
    );
    if (!voiceChannel) return;

    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
      });

      connection.on(VoiceConnectionStatus.Ready, () => {});

      let volume = data.volume ? parseFloat(data.volume) / 100 : 1;

      const audioResource = createAudioResource(data.url, {
        inputType: data.bitrate ? "opus" : "webm",
        seek: parseFloat(data.seek) || 0,
        inlineVolume: true,
      });

      if (audioResource.volume) {
        audioResource.volume.setVolume(volume);
      }

      const audioPlayer = createAudioPlayer();
      audioPlayer.play(audioResource);

      connection.subscribe(audioPlayer);

      if (data.type !== "0") {
        audioPlayer.on(AudioPlayerStatus.Idle, () => {
          connection.destroy();
        });

        audioPlayer.on("error", (error) => {
          console.error("Error playing media:", error);
          connection.destroy();
        });
      }
    } catch (err) {
      console.error("Error joining voice channel:", err);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
