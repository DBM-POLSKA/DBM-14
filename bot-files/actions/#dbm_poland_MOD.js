module.exports = {
  name: "Info",
  section: "#DBM POLAND",

  subtitle(data, presets) {
    return `Mods Version 3.2.4`;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/#dbm_poland_MOD.js",
  },

  fields: [],

  html(isEvent, data) {
    return `
<tab-system>


<tab label="General" icon="cogs"> 
  <div style="padding: 10px; font-family: Arial, sans-serif; color: #ddd; height: 300px; overflow-y: auto; position: relative;">
    <h1 style="text-align: center; color: #fff;">Welcome!</h1>
    <p>Thank you for using the DBM Mod Collection!</p>
    <p>If you want to tell us something, join the guild Discord below. And if something doesn't work, join our discord and create a post on a special channel.</p>

    <!-- Napis "Discord" w lewym dolnym rogu tabelki, wyglądający jak wersja -->
    <div style="position: absolute; bottom: 10px; left: 10px;">
      <a href="https://discord.gg/9HYB4n3Dz4" target="_blank" style="background-color: #23272a; color: #0077ff; display: inline-block; padding: 5px 10px; border-radius: 5px; text-decoration: none; font-size: 14px;">Discord</a>
    </div>

    <!-- Wersja w prawym dolnym rogu tabelki -->
    <div style="position: absolute; bottom: 10px; right: 10px;">
      <a href="https://github.com/Shadow64gg/DBM-14" target="_blank" style="background-color: #23272a; color: #0077ff; display: inline-block; padding: 5px 10px; border-radius: 5px; text-decoration: none; font-size: 14px;">3.2.4</a>
    </div>
 </div>
</tab>



<tab label="GitHub" icon="sliders">  
<div style="padding: 10px; font-family: Arial, sans-serif; color: #ddd; height: 300px; overflow-y: auto; position: relative;">
<h1 style="text-align: center; color: #fff;">GitHub:</h1>
      <p>Visit us on GitHub! The whole mod collection is on GitHub and everyone is invited to join us developing new mods!</p>
      <p>Copy and paste the link to view the site in your browser.</p>
      <p><a href="https://github.com/Shadow64gg/DBM-14" target="_blank" style="color: #7289da; text-decoration: none;">https://github.com/Shadow64gg/DBM-14</a></p>
      </div>
  </tab>
  


  <tab label="Mod Creators" icon="sliders">
  <div style="padding: 10px; font-family: Arial, sans-serif; color: #ddd; height: 300px; overflow-y: auto; position: relative;">
    <h1 style="text-align: center; color: #fff;">Mod Creators:</h1>
    <div style="background-color: #2c2f33; padding: 15px; border-left: 4px solid #ff4500; border-radius: 10px; color: #ddd; display: inline-block; width: 100%; max-height: 210px; overflow-y: auto;">
      
      <p style="margin: 4px 0; padding: 4px 0; font-size: 16px; transition: background-color 0.3s; border-radius: 5px; cursor: pointer; padding-left: 10px;">
        <a href="https://github.com/Shadow64gg/DBM-14" target="_blank" style="background-color: #23272a; color: #0077ff; display: inline-block; padding: 5px 10px; border-radius: 5px; text-decoration: none; font-size: 14px; margin-left: 10px;">Shadow</a>
      </p>
      <div style="border-top: 1px solid #444; margin: 2px 0;"></div>
      
      <p style="margin: 4px 0; padding: 4px 0; font-size: 16px; transition: background-color 0.3s; border-radius: 5px; cursor: pointer; padding-left: 10px;">
        <a href="https://github.com/DarkXenei" target="_blank" style="background-color: #23272a; color: #0077ff; display: inline-block; padding: 5px 10px; border-radius: 5px; text-decoration: none; font-size: 14px; margin-left: 10px;">DarkXenei</a>
      </p>
      
    </div>
  </div>
</tab>



<tab label="List of Mods" icon="sliders">  
<div style="padding: 10px; font-family: Arial, sans-serif; color: #ddd; height: 300px; overflow-y: auto; position: relative;">
    <h1 style="text-align: center; color: #fff;">List of Mods:</h1>

<div style="background-color: #2c2f33; border-radius: 5px; overflow-y: auto; max-height: 210px; margin-bottom: 20px;">
  <table style="width: 100%; border-collapse: collapse; color: #ddd; font-size: 14px; table-layout: fixed;">
    <thead>
      <tr style="color: #fff; text-align: left; position: sticky; top: 0; background-color: #23272a; z-index: 2;">
        <th style="padding: 10px; border-bottom: 1px solid #444; width: 33%;">Name</th>
        <th style="padding: 10px; border-bottom: 1px solid #444; width: 33%;">Section</th>
        <th style="padding: 10px; border-bottom: 1px solid #444; width: 33%;">Author(s)</th>
      </tr>
    </thead>
    <tbody>

    <tr style="border-bottom: 20px solid #003ab8;">
    </tr>
    <tr style="border-bottom: 10px solid #003ab8;">
     <td style="padding: 10px;"></td>
     <td style="padding: 20px;">ACTIONS</td>
     <td style="padding: 10px;"></td>
    </tr>



      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Generate</td>
        <td style="padding: 10px;">Economy</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Level System</td>
        <td style="padding: 10px;">Economy</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Check Member Level</td>
        <td style="padding: 10px;">Economy</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Control Member Level</td>
        <td style="padding: 10px;">Economy</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Delete Member Level</td>
        <td style="padding: 10px;">Economy</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Store Member Level</td>
        <td style="padding: 10px;">Economy</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Top Members</td>
        <td style="padding: 10px;">Economy</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>
      
      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Giveaway Check If Member</td>
        <td style="padding: 10px;">Giveaway</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Giveaway Create</td>
        <td style="padding: 10px;">Giveaway</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Giveaway Delete</td>
        <td style="padding: 10px;">Giveaway</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Giveaway End</td>
        <td style="padding: 10px;">Giveaway</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Giveaway Info</td>
        <td style="padding: 10px;">Giveaway</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Giveaway Join</td>
        <td style="padding: 10px;">Giveaway</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Giveaway Leave</td>
        <td style="padding: 10px;">Giveaway</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Giveaway Reroll</td>
        <td style="padding: 10px;">Giveaway</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Play URL</td>
        <td style="padding: 10px;">Audio Control</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Play File</td>
        <td style="padding: 10px;">Audio Control</td>
        <td style="padding: 10px;">DarkXenei</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Play Music</td>
        <td style="padding: 10px;">Music</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Control Music</td>
        <td style="padding: 10px;">Music</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Store Music Info</td>
        <td style="padding: 10px;">Music</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Set Bot Activity</td>
        <td style="padding: 10px;">Bot Client Control</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Set Channel Permissions</td>
        <td style="padding: 10px;">Channel Control</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Set Role Channel Perms</td>
        <td style="padding: 10px;">Channel Control</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Set Member Channel Perms</td>
        <td style="padding: 10px;">Channel Control</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Check Role Permissions</td>
        <td style="padding: 10px;">Conditions</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Check Member Permissions</td>
        <td style="padding: 10px;">Conditions</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Channel Command Restriction</td>
        <td style="padding: 10px;">Moderation</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Role Command Restriction</td>
        <td style="padding: 10px;">Moderation</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Server Command Restriction</td>
        <td style="padding: 10px;">Moderation</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Create Transcript</td>
        <td style="padding: 10px;">Moderation</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Send Poll</td>
        <td style="padding: 10px;">Messaging</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Send Message</td>
        <td style="padding: 10px;">Messaging</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Edit Button</td>
        <td style="padding: 10px;">Message Control</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Create Json File</td>
        <td style="padding: 10px;">Json Control</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Delete Json File</td>
        <td style="padding: 10px;">Json Control</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Check If Json File Exists</td>
        <td style="padding: 10px;">Json Control</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Write In Json File</td>
        <td style="padding: 10px;">Json Control</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Comment</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Convert Secounds To Timestamp</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Get Color</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Server Ban List</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Send Message to Console</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Set Rich Presence</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Invite Logger Join</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Invite Logger Leave</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Store Invite Info</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Translate</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Monitoring Epic Games API</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">Store Epic Free Games Info</td>
        <td style="padding: 10px;">Other Stuff</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Store YouTube Info</td>
        <td style="padding: 10px;">YouTube Tools</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 5px solid #444;">
        <td style="padding: 10px;">YouTube Search</td>
        <td style="padding: 10px;">YouTube Tools</td>
        <td style="padding: 10px;">Shadow</td>
      </tr>









      
      <tr style="border-bottom: 10px solid #003ab8;">
    </tr>
    <tr style="border-bottom: 10px solid #003ab8;">
     <td style="padding: 10px;"></td>
     <td style="padding: 20px;">EVENTS</td>
     <td style="padding: 10px;"></td>
    </tr>
      
    



      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Invite Logger</td>
        <td style="padding: 10px;"></td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Command Execute</td>
        <td style="padding: 10px;"></td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

      <tr style="border-bottom: 1px solid #444;">
        <td style="padding: 10px;">Interaction Create</td>
        <td style="padding: 10px;"></td>
        <td style="padding: 10px;">Shadow</td>
      </tr>

    </tbody>
  </table>
</div>
</tab>


</tab-system>
    `;
  },

  variableStorage(data, varType) {
    const storageType = parseInt(data.storage, 10);
    if (storageType !== varType) return;
    return [data.varName, "Text"];
  },

  async action(cache) {
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(response, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
