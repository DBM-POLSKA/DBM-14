module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Send Components V2",
  displayName: "Send Components V2",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Messaging",

  //---------------------------------------------------------------------
  // Action Size
  //---------------------------------------------------------------------

  size: function () {
    return { width: 640, height: 550 };
  },

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    let defaultText = "test components v2";

    return defaultText;
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, data.dontSend ? "Message Options" : "Message"];
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/DBM-POLSKA",
    downloadUrl:
      "https://github.com/DBM-POLSKA/DBM-14/blob/DBM-v14/actions/send_components_v2_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: [
    "channel",
    "varName",
    "varName2",
    "varNameContainer",
    "storage",
    "message",
    "buttons",
    "selectMenus",
    "attachments",
    "components",
    "reply",
    "dontReply",
    "ephemeral",
    "tts",
    "overwrite",
    "dontSend",
    "pinned",
    "selectMenuOnTop",
    "actionDescription",
    "actionDescriptionColor",
    "editMessage",
    "editMessageVarName",
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
        >Beta 1.0</a
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

<send-reply-target-input selectId="channel" variableInputId="varName"></send-reply-target-input>

<br><br>

<tab-system style="margin-top: 20px;">


  
  <tab label="Components" icon="book image">
    <div style="padding: 8px;">

      <dialog-list id="components" fields='["componentType", "message", "images", "files", "separators", "sectionMessage", "buttons", "selectMenus", "components", "containerComponents", "containerColor", "containerSpoiler", "useColor", "sectionComponents"]' saveButtonText="Save Component", dialogTitle="Component Info" dialogWidth="760" dialogHeight="560" listLabel="Components" listStyle="height: calc(100vh - 350px);" itemName="Component" itemCols="1" itemHeight="50px;" itemTextFunction="data.componentType" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px 16px 0px 16px;">

        <div style="padding-top: 8px;">
        <span class="dbminputlabel">Component Type</span><br>
        <select id="componentType" class="round">
          <option value="Content">Content</option>
          <option value="Section">Section</option>
          <option value="Container">Container</option>
          <option value="Images">Images</option>
          <option value="Files">Files</option>
          <option value="Separators">Separators</option>
          <option value="Buttons">Buttons</option>
          <option value="Select Menus">Select Menus</option>
        </select>
      </div>

      <tab-system style="margin-top: 20px;">



      <tab label="Message" icon="comment">
      <div style="width: 100%; padding:8px;height: calc(100vh - 270px);overflow:auto">
          <textarea id="message" class="dbm_monospace" rows="10" placeholder="Insert message here..." style="height: calc(100vh - 309px); white-space: nowrap;"></textarea>
          </div>
      </tab>


      <tab label="Section" icon="file image">
    <div style="padding: 8px;">

    <div style="width: 100%; padding:8px;height: calc(100vh - 290px);overflow:auto">
          <textarea id="sectionMessage" class="dbm_monospace" rows="10" placeholder="Insert message here..." style="height: calc(100vh - 309px); white-space: nowrap;"></textarea>
          </div>

      <dialog-list id="sectionComponents" fields='["accessoryType", "thumbnailUrl", "thumbnailSpoiler", "name", "type", "id", "row", "url", "emoji", "disabled", "mode", "time", "actions", "ButtonDisabled"]' saveButtonText="Save Accessory", dialogTitle="Accessory Info" dialogWidth="600" dialogHeight="800" listLabel="Accessory" listStyle="height: calc(100vh - 505px);" itemName="Image" itemCols="1" itemHeight="30px;" itemTextFunction="data.accessoryType" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px;">
          
        <div style="padding-top: 8px;">
        <span class="dbminputlabel">Accessory Type</span><br>
        <select id="accessoryType" class="round">
        <option value="thumbnail">Thumbnail</option>
          <option value="button">Button</option>
        </select>
      </div>

      <tab-system style="margin-top: 20px;">

      <tab label="Thumbnail" icon="file image">

      <div style="padding: 16px;">
      <span class="dbminputlabel">Thumbnail Local/Web URL</span>
      <input id="thumbnailUrl" class="round" type="text">

      <br>

      <div style="text-align: center; padding-top: 4px;">
        <dbm-checkbox id="thumbnailSpoiler" label="Make Thumbnail Spoiler"></dbm-checkbox>
      </div>
    </div>

      </tab>


      <tab label="Button" icon="file image">
      <div style="padding: 16px;">
          <div style="width: calc(50% - 12px); float: left;">
            <span class="dbminputlabel">Name</span>
            <input id="name" class="round" type="text" placeholder="Leave blank for none...">

            <br>

            <span class="dbminputlabel">Type</span><br>
            <select id="type" class="round">
              <option value="1" selected>Primary (Blurple)</option>
              <option value="2">Secondary (Grey)</option>
              <option value="3">Success (Green)</option>
              <option value="4">Danger (Red)</option>
              <option value="5">Link (Grey)</option>
            </select>

            <br>

            <span class="dbminputlabel">Link URL</span>
            <input id="url" placeholder="Leave blank for none..." class="round" type="text">

            <br>

            <span class="dbminputlabel">
              Action Response Mode
              <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
            </span><br>
            <select id="mode" class="round">
              <option value="PERSONAL">Once, Command User Only</option>
              <option value="PUBLIC">Once, Anyone Can Use</option>
              <option value="MULTIPERSONAL">Multi, Command User Only</option>
              <option value="MULTI" selected>Multi, Anyone Can Use</option>
              <option value="PERSISTENT">Persistent</option>
            </select>
          </div>
          <div style="width: calc(50% - 12px); float: right;">
            <span class="dbminputlabel">Unique ID</span>
            <input id="id" placeholder="Leave blank to auto-generate..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Action Row (1 - 5)</span>
            <input id="row" placeholder="Leave blank for default..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Emoji</span>
            <input id="emoji" placeholder="Leave blank for none..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Temporary Time-Limit (Miliseconds)</span>
            <input id="time" placeholder="60000" class="round" type="text">


            <div style="padding-top: 8px; margin-top: 10px;">
          <span class="dbminputlabel">Enable/Disable Button</span>
          <select id="ButtonDisabled" class="round">
            <option value="false">Enable</option>
            <option value="true">Disable</option>
          </select>
        </div>
           
          </div>

          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

          <action-list-input mode="BUTTON" id="actions" height="calc(100vh - 600px)"></action-list-input>

        </div>
      </tab>

      <tab-system>
        </div>
      </dialog-list>
    </div>
  </tab>


      <tab label="Container" icon="comment">

      <div style="display: flex; justify-content: space-between;">
      <div style="margin-bottom: 10px;">
      <span class="dbminputlabel">Color</span><br>
      <input type="color" id="containerColor" class="round" style="height: 30px;">
     </div>

        <dbm-checkbox id="useColor" label="Use Color"></dbm-checkbox>

        <dbm-checkbox id="containerSpoiler" label="Make Container Spoiler"></dbm-checkbox>
      </div>





      <dialog-list id="containerComponents" fields='["sectionMessage", "sectionComponents", "containerComponentType", "containerMessage", "containerImages", "containerFiles", "containerSeparators", "containerButtons", "containerSelectMenus"]' saveButtonText="Save Component", dialogTitle="Component Info" dialogWidth="740" dialogHeight="560" listLabel="Components" listStyle="height: calc(100vh - 350px);" itemName="Component" itemCols="1" itemHeight="50px;" itemTextFunction="data.containerComponentType" itemStyle="text-align: left; line-height: 30px;">
      <div style="padding: 16px 16px 0px 16px;">

      <div style="padding-top: 8px;">
      <span class="dbminputlabel">Component Type</span><br>
      <select id="containerComponentType" class="round">
        <option value="Content">Content</option>
        <option value="Section">Section</option>
        <option value="Images">Images</option>
        <option value="Files">Files</option>
        <option value="Separators">Separators</option>
        <option value="Buttons">Buttons</option>
        <option value="Select Menus">Select Menus</option>
      </select>
    </div>

    <tab-system style="margin-top: 20px;">



    <tab label="Message" icon="comment">
    <div style="width: 100%; padding:8px;height: calc(100vh - 270px);overflow:auto">
        <textarea id="containerMessage" class="dbm_monospace" rows="10" placeholder="Insert message here..." style="height: calc(100vh - 309px); white-space: nowrap;"></textarea>
        <div id="counter" style="float:right;text-align:right;position:relative;width:22%">characters: 0</div>
        </div>
    </tab>


    <tab label="Section" icon="file image">
    <div style="padding: 8px;">

    <div style="width: 100%; padding:8px;height: calc(100vh - 290px);overflow:auto">
          <textarea id="sectionMessage" class="dbm_monospace" rows="10" placeholder="Insert message here..." style="height: calc(100vh - 309px); white-space: nowrap;"></textarea>
          </div>

      <dialog-list id="sectionComponents" fields='["accessoryType", "thumbnailUrl", "thumbnailSpoiler", "name", "type", "id", "row", "url", "emoji", "disabled", "mode", "time", "actions", "ButtonDisabled"]' saveButtonText="Save Accessory", dialogTitle="Accessory Info" dialogWidth="600" dialogHeight="800" listLabel="Accessory" listStyle="height: calc(100vh - 505px);" itemName="Image" itemCols="1" itemHeight="30px;" itemTextFunction="data.accessoryType" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px;">
          
        <div style="padding-top: 8px;">
        <span class="dbminputlabel">Accessory Type</span><br>
        <select id="accessoryType" class="round">
        <option value="thumbnail">Thumbnail</option>
          <option value="button">Button</option>
        </select>
      </div>

      <tab-system style="margin-top: 20px;">

      <tab label="Thumbnail" icon="file image">

      <div style="padding: 16px;">
      <span class="dbminputlabel">Thumbnail Local/Web URL</span>
      <input id="thumbnailUrl" class="round" type="text">

      <br>

      <div style="text-align: center; padding-top: 4px;">
        <dbm-checkbox id="thumbnailSpoiler" label="Make Thumbnail Spoiler"></dbm-checkbox>
      </div>
    </div>

      </tab>


      <tab label="Button" icon="file image">
      <div style="padding: 16px;">
          <div style="width: calc(50% - 12px); float: left;">
            <span class="dbminputlabel">Name</span>
            <input id="name" class="round" type="text" placeholder="Leave blank for none...">

            <br>

            <span class="dbminputlabel">Type</span><br>
            <select id="type" class="round">
              <option value="1" selected>Primary (Blurple)</option>
              <option value="2">Secondary (Grey)</option>
              <option value="3">Success (Green)</option>
              <option value="4">Danger (Red)</option>
              <option value="5">Link (Grey)</option>
            </select>

            <br>

            <span class="dbminputlabel">Link URL</span>
            <input id="url" placeholder="Leave blank for none..." class="round" type="text">

            <br>

            <span class="dbminputlabel">
              Action Response Mode
              <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
            </span><br>
            <select id="mode" class="round">
              <option value="PERSONAL">Once, Command User Only</option>
              <option value="PUBLIC">Once, Anyone Can Use</option>
              <option value="MULTIPERSONAL">Multi, Command User Only</option>
              <option value="MULTI" selected>Multi, Anyone Can Use</option>
              <option value="PERSISTENT">Persistent</option>
            </select>
          </div>
          <div style="width: calc(50% - 12px); float: right;">
            <span class="dbminputlabel">Unique ID</span>
            <input id="id" placeholder="Leave blank to auto-generate..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Action Row (1 - 5)</span>
            <input id="row" placeholder="Leave blank for default..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Emoji</span>
            <input id="emoji" placeholder="Leave blank for none..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Temporary Time-Limit (Miliseconds)</span>
            <input id="time" placeholder="60000" class="round" type="text">


            <div style="padding-top: 8px; margin-top: 10px;">
          <span class="dbminputlabel">Enable/Disable Button</span>
          <select id="ButtonDisabled" class="round">
            <option value="false">Enable</option>
            <option value="true">Disable</option>
          </select>
        </div>
           
          </div>

          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

          <action-list-input mode="BUTTON" id="actions" height="calc(100vh - 600px)"></action-list-input>

        </div>
      </tab>

      <tab-system>
        </div>
      </dialog-list>
    </div>
  </tab>




    <tab label="Images" icon="file image">
  <div style="padding: 8px;">

    <dialog-list id="containerImages" fields='["containerImageUrl", "containerImageName", "containerImageSpoiler"]' saveButtonText="Save Image", dialogTitle="Image Info" dialogWidth="400" dialogHeight="280" listLabel="Images" listStyle="height: calc(100vh - 350px);" itemName="Image" itemCols="1" itemHeight="30px;" itemTextFunction="data.containerImageUrl" itemStyle="text-align: left; line-height: 30px;">
      <div style="padding: 16px;">
        <span class="dbminputlabel">Image Local/Web URL</span>
        <input id="containerImageUrl" class="round" type="text">

        <br>

        <span class="dbminputlabel">Image Name</span>
        <input id="containerImageName" class="round" type="text" placeholder="Leave blank for default...">

        <br>

        <div style="text-align: center; padding-top: 4px;">
          <dbm-checkbox id="containerImageSpoiler" label="Make Image Spoiler"></dbm-checkbox>
        </div>
      </div>
    </dialog-list>
  </div>
</tab>

<tab label="Files" icon="file image">
  <div style="padding: 8px;">

    <dialog-list id="containerFiles" fields='["containerFileUrl", "containerFileName", "containerFileSpoiler"]' saveButtonText="Save File", dialogTitle="File Info" dialogWidth="400" dialogHeight="280" listLabel="Files" listStyle="height: calc(100vh - 350px);" itemName="File" itemCols="1" itemHeight="30px;" itemTextFunction="data.containerFileUrl" itemStyle="text-align: left; line-height: 30px;">
      <div style="padding: 16px;">
        <span class="dbminputlabel">File Local/Web URL</span>
        <input id="containerFileUrl" class="round" type="text" value="resources/">

        <br>

        <span class="dbminputlabel">Attachment Name</span>
        <input id="containerFileName" class="round" type="text" placeholder="Leave blank for default...">

        <br>

        <div style="text-align: center; padding-top: 4px;">
          <dbm-checkbox id="containerFileSpoiler" label="Make Attachment Spoiler"></dbm-checkbox>
        </div>
      </div>
    </dialog-list>
  </div>
</tab>

<tab label="Separators" icon="file image">
  <div style="padding: 8px;">

    <dialog-list id="containerSeparators" fields='["containerSeparatorSize"]' saveButtonText="Save Separators", dialogTitle="Separator Info" dialogWidth="400" dialogHeight="280" listLabel="Separators" listStyle="height: calc(100vh - 350px);" itemName="Separator" itemCols="1" itemHeight="30px;" itemTextFunction="data.containerSeparatorSize" itemStyle="text-align: left; line-height: 30px;">
      <div style="padding: 16px;">
      <div style="padding-top: 8px;">
      <span class="dbminputlabel">size</span><br>
      <select id="containerSeparatorSize" class="round">
        <option value="Small">Small</option>
        <option value="Large">Large</option>
      </select>
    </div>
      </div>
    </dialog-list>
  </div>
</tab>

<tab label="Buttons" icon="clone">
  <div style="padding: 8px;">

    <dialog-list id="containerButtons" fields='["containerName", "containerType", "containerId", "containerRow", "containerUrl", "containerEmoji", "containerDisabled", "containerMode", "containerTime", "containerActions", "containerButtonDisabled"]' saveButtonText="Save Button", dialogTitle="Button Info" dialogWidth="600" dialogHeight="700" listLabel="Buttons" listStyle="height: calc(100vh - 350px);" itemName="Button" itemCols="5" itemHeight="40px;" itemTextFunction="data.containerName" itemStyle="text-align: center; line-height: 40px;">
      <div style="padding: 16px;">
        <div style="width: calc(50% - 12px); float: left;">
          <span class="dbminputlabel">Name</span>
          <input id="containerName" class="round" type="text" placeholder="Leave blank for none...">

          <br>

          <span class="dbminputlabel">Type</span><br>
          <select id="containerType" class="round">
            <option value="1" selected>Primary (Blurple)</option>
            <option value="2">Secondary (Grey)</option>
            <option value="3">Success (Green)</option>
            <option value="4">Danger (Red)</option>
            <option value="5">Link (Grey)</option>
          </select>

          <br>

          <span class="dbminputlabel">Link URL</span>
          <input id="containerUrl" placeholder="Leave blank for none..." class="round" type="text">

          <br>

          <span class="dbminputlabel">
            Action Response Mode
            <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
          </span><br>
          <select id="containerMode" class="round">
            <option value="PERSONAL">Once, Command User Only</option>
            <option value="PUBLIC">Once, Anyone Can Use</option>
            <option value="MULTIPERSONAL">Multi, Command User Only</option>
            <option value="MULTI" selected>Multi, Anyone Can Use</option>
            <option value="PERSISTENT">Persistent</option>
          </select>
        </div>
        <div style="width: calc(50% - 12px); float: right;">
          <span class="dbminputlabel">Unique ID</span>
          <input id="containerId" placeholder="Leave blank to auto-generate..." class="round" type="text">

          <br>

          <span class="dbminputlabel">Action Row (1 - 5)</span>
          <input id="containerRow" placeholder="Leave blank for default..." class="round" type="text">

          <br>

          <span class="dbminputlabel">Emoji</span>
          <input id="containerEmoji" placeholder="Leave blank for none..." class="round" type="text">

          <br>

          <span class="dbminputlabel">Temporary Time-Limit (Miliseconds)</span>
          <input id="containerTime" placeholder="60000" class="round" type="text">


          <div style="padding-top: 8px; margin-top: 10px;">
        <span class="dbminputlabel">Enable/Disable Button</span>
        <select id="containerButtonDisabled" class="round">
          <option value="false">Enable</option>
          <option value="true">Disable</option>
        </select>
      </div>
         
        </div>

        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <action-list-input mode="BUTTON" id="containerActions" height="calc(100vh - 460px)"></action-list-input>

      </div>
    </dialog-list>

  </div>
</tab>

<tab label="Selects" icon="list alternate">
<div style="padding: 8px;">

  <dialog-list id="containerSelectMenus" fields='["containerPlaceholder", "containerId", "containerTempVarName", "containerRow", "containerMin", "containerMax", "containerMode", "containerTime", "containerOptions", "containerActions", "containerSelectMenuType", "containerSelectMenuDisabled"]' saveButtonText="Save Select Menu", dialogTitle="Select Menu Info" dialogWidth="800" dialogHeight="700" listLabel="Select Menus" listStyle="height: calc(100vh - 350px);" itemName="Select Menu" itemCols="1" itemHeight="40px;" itemTextFunction="data.containerPlaceholder" itemStyle="text-align: left; line-height: 40px;">
    <div style="padding: 16px;">
      <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
        <span class="dbminputlabel">Placeholder</span>
        <input id="containerPlaceholder" class="round" type="text" placeholder="Leave blank for default...">

        <br>

        <span class="dbminputlabel">Temp Variable Name</span>
        <input id="containerTempVarName" placeholder="Stores selected value for actions..." class="round" type="text">

        <br>

        <span class="dbminputlabel">Minimum Select Number</span>
        <input id="containerMin" class="round" type="text" value="1">

        <br>

        <span class="dbminputlabel">
          Action Response Mode
          <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
        </span><br>
        <select id="containerMode" class="round">
          <option value="PERSONAL">Once, Command User Only</option>
          <option value="PUBLIC">Once, Anyone Can Use</option>
          <option value="MULTIPERSONAL">Multi, Command User Only</option>
          <option value="MULTI" selected>Multi, Anyone Can Use</option>
          <option value="PERSISTENT">Persistent</option>
        </select>

        <div style="padding-top: 8px; margin-top: 10px;">
        <span class="dbminputlabel">Select Menu Type</span>
        <select id="containerSelectMenuType" class="round">
        <optgroup label="Default Select Menu">
          <option value="StringSelectMenu">String Select Menu</option>
          <option value="UserSelectMenu">User Select Menu</option>
          <option value="RoleSelectMenu">Role Select Menu</option>
          <option value="MentionableSelectMenu">Mentionable Select Menu</option>
          <option value="ChannelSelectMenu">Channel Select Menu</option>
        </optgroup>
        <optgroup label="Specific Channel Select Menu">
        <option value="ChannelTextSelectMenu">Text Channel Select Menu</option>
        <option value="ChannelVoiceSelectMenu">Voice Channel Select Menu</option>
        <option value="CategorySelectMenu">Category Select Menu</option>
        <option value="ChannelStageSelectMenu">Stage Channel Select Menu</option>
        <option value="ChannelForumSelectMenu">Forum Channel Select Menu</option>
        </optgroup>
        <optgroup label="Other Channel Select Menu">
        <option value="ChannelTextAndVoiceSelectMenu">Text + Voice Select Menu</option>
        <option value="ChannelTextAndCategorySelectMenu">Text + Category Select Menu</option>
        <option value="ChannelTextAndStageSelectMenu">Text + Stage Select Menu</option>
        <option value="ChannelTextAndForumSelectMenu">Text + Forum Select Menu</option>
        <option value="ChannelVoiceAndCategorySelectMenu">Voice + Category Select Menu</option>
        <option value="ChannelVoiceAndStageSelectMenu">Voice + Stage Select Menu</option>
        <option value="ChannelVoiceAndForumSelectMenu">Voice + Forum Select Menu</option>
        <option value="ChannelCategoryAndStageSelectMenu">Category + Stage Select Menu</option>
        <option value="ChannelCategoryAndForumSelectMenu">Category + Forum Select Menu</option>
        <option value="ChannelStageAndForumSelectMenu">Stage + Forum Select Menu</option>
        </select>
      </div>
      </div>

      <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
        <span class="dbminputlabel">Unique ID</span>
        <input id="containerId" placeholder="Leave blank to auto-generate..." class="round" type="text">

        <br>

        <span class="dbminputlabel">Action Row (1 - 5)</span>
        <input id="containerRow" placeholder="Leave blank for default..." class="round" type="text">

        <br>

        <span class="dbminputlabel">Maximum Select Number</span>
        <input id="containerMax" class="round" type="text" value="1">

        <br>

        <span class="dbminputlabel">Temporary Time-Limit (Miliseconds)</span>
        <input id="containerTime" placeholder="60000" class="round" type="text">


        <div style="padding-top: 8px; margin-top: 10px;">
        <span class="dbminputlabel">Enable/Disable Select Menu</span>
        <select id="containerSelectMenuDisabled" class="round">
          <option value="false">Enable</option>
          <option value="true">Disable</option>
        </select>
      </div>
      

      </div>

      <div style="width: calc(34% - 8px); height: 300px; float: left; margin-left: 8px;">

        <dialog-list id="containerOptions" fields='["containerLabel", "containerDescription", "containerValue", "containerEmoji", "containerDefault"]' dialogTitle="Select Menu Option Info" dialogWidth="360" dialogHeight="440" listLabel="Options" listStyle="height: 210px;" itemName="Option" itemCols="1" itemHeight="20px;" itemTextFunction="data.containerLabel" itemStyle="text-align: left; line-height: 20px;">
          <div style="padding: 16px;">
            <span class="dbminputlabel">Name</span>
            <input id="containerLabel" class="round" type="text">

            <br>

            <span class="dbminputlabel">Description</span>
            <input id="containerDescription" class="round" type="text" placeholder="Leave blank for none...">

            <br>

            <span class="dbminputlabel">Value</span>
            <input id="containerValue" placeholder="The text passed to the temp variable..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Emoji</span>
            <input id="containerEmoji" placeholder="Leave blank for none..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Default Selected</span><br>
            <select id="containerDefault" class="round">
              <option value="true">Yes</option>
              <option value="false" selected>No</option>
            </select>
          </div>
        </dialog-list>

      </div>

      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

      <action-list-input mode="SELECT" id="containerActions" height="calc(100vh - 430px)">
        <script class="setupTempVars">
          const elem = document.getElementById("tempVarName");
          if(elem?.value) {
            tempVars.push([elem.value, "Text"]);
          }
        </script>
      </action-list-input>

    </div>
  </dialog-list>

</div>
</tab>
    </tab-system>
      </div>
    </dialog-list>

      </tab>

      <tab label="Images" icon="file image">
    <div style="padding: 8px;">

      <dialog-list id="images" fields='["imageUrl", "imageName", "imageSpoiler"]' saveButtonText="Save Image", dialogTitle="Image Info" dialogWidth="400" dialogHeight="280" listLabel="Images" listStyle="height: calc(100vh - 350px);" itemName="Image" itemCols="1" itemHeight="30px;" itemTextFunction="data.imageUrl" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px;">
          <span class="dbminputlabel">Image Local/Web URL</span>
          <input id="imageUrl" class="round" type="text">

          <br>

          <span class="dbminputlabel">Image Name</span>
          <input id="imageName" class="round" type="text" placeholder="Leave blank for default...">

          <br>

          <div style="text-align: center; padding-top: 4px;">
            <dbm-checkbox id="imageSpoiler" label="Make Image Spoiler"></dbm-checkbox>
          </div>
        </div>
      </dialog-list>
    </div>
  </tab>

  <tab label="Files" icon="file image">
    <div style="padding: 8px;">

      <dialog-list id="files" fields='["fileUrl", "fileName", "fileSpoiler"]' saveButtonText="Save File", dialogTitle="File Info" dialogWidth="400" dialogHeight="280" listLabel="Files" listStyle="height: calc(100vh - 350px);" itemName="File" itemCols="1" itemHeight="30px;" itemTextFunction="data.fileUrl" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px;">
          <span class="dbminputlabel">File Local/Web URL</span>
          <input id="fileUrl" class="round" type="text" value="resources/">

          <br>

          <span class="dbminputlabel">Attachment Name</span>
          <input id="fileName" class="round" type="text" placeholder="Leave blank for default...">

          <br>

          <div style="text-align: center; padding-top: 4px;">
            <dbm-checkbox id="fileSpoiler" label="Make Attachment Spoiler"></dbm-checkbox>
          </div>
        </div>
      </dialog-list>
    </div>
  </tab>

  <tab label="Separators" icon="file image">
    <div style="padding: 8px;">

      <dialog-list id="separators" fields='["separatorSize"]' saveButtonText="Save Separators", dialogTitle="Separator Info" dialogWidth="400" dialogHeight="280" listLabel="Separators" listStyle="height: calc(100vh - 350px);" itemName="Separator" itemCols="1" itemHeight="30px;" itemTextFunction="data.separatorSize" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px;">
        <div style="padding-top: 8px;">
        <span class="dbminputlabel">size</span><br>
        <select id="separatorSize" class="round">
          <option value="Small">Small</option>
          <option value="Large">Large</option>
        </select>
      </div>
        </div>
      </dialog-list>
    </div>
  </tab>

  <tab label="Buttons" icon="clone">
    <div style="padding: 8px;">

      <dialog-list id="buttons" fields='["name", "type", "id", "row", "url", "emoji", "disabled", "mode", "time", "actions", "ButtonDisabled"]' saveButtonText="Save Button", dialogTitle="Button Info" dialogWidth="600" dialogHeight="700" listLabel="Buttons" listStyle="height: calc(100vh - 350px);" itemName="Button" itemCols="5" itemHeight="40px;" itemTextFunction="data.name" itemStyle="text-align: center; line-height: 40px;">
        <div style="padding: 16px;">
          <div style="width: calc(50% - 12px); float: left;">
            <span class="dbminputlabel">Name</span>
            <input id="name" class="round" type="text" placeholder="Leave blank for none...">

            <br>

            <span class="dbminputlabel">Type</span><br>
            <select id="type" class="round">
              <option value="1" selected>Primary (Blurple)</option>
              <option value="2">Secondary (Grey)</option>
              <option value="3">Success (Green)</option>
              <option value="4">Danger (Red)</option>
              <option value="5">Link (Grey)</option>
            </select>

            <br>

            <span class="dbminputlabel">Link URL</span>
            <input id="url" placeholder="Leave blank for none..." class="round" type="text">

            <br>

            <span class="dbminputlabel">
              Action Response Mode
              <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
            </span><br>
            <select id="mode" class="round">
              <option value="PERSONAL">Once, Command User Only</option>
              <option value="PUBLIC">Once, Anyone Can Use</option>
              <option value="MULTIPERSONAL">Multi, Command User Only</option>
              <option value="MULTI" selected>Multi, Anyone Can Use</option>
              <option value="PERSISTENT">Persistent</option>
            </select>
          </div>
          <div style="width: calc(50% - 12px); float: right;">
            <span class="dbminputlabel">Unique ID</span>
            <input id="id" placeholder="Leave blank to auto-generate..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Action Row (1 - 5)</span>
            <input id="row" placeholder="Leave blank for default..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Emoji</span>
            <input id="emoji" placeholder="Leave blank for none..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Temporary Time-Limit (Miliseconds)</span>
            <input id="time" placeholder="60000" class="round" type="text">


            <div style="padding-top: 8px; margin-top: 10px;">
          <span class="dbminputlabel">Enable/Disable Button</span>
          <select id="ButtonDisabled" class="round">
            <option value="false">Enable</option>
            <option value="true">Disable</option>
          </select>
        </div>
           
          </div>

          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

          <action-list-input mode="BUTTON" id="actions" height="calc(100vh - 460px)"></action-list-input>

        </div>
      </dialog-list>

    </div>
  </tab>

  <tab label="Selects" icon="list alternate">
  <div style="padding: 8px;">

    <dialog-list id="selectMenus" fields='["placeholder", "id", "tempVarName", "row", "min", "max", "mode", "time", "options", "actions", "SelectMenuType", "SelectMenuDisabled"]' saveButtonText="Save Select Menu", dialogTitle="Select Menu Info" dialogWidth="800" dialogHeight="700" listLabel="Select Menus" listStyle="height: calc(100vh - 350px);" itemName="Select Menu" itemCols="1" itemHeight="40px;" itemTextFunction="data.placeholder" itemStyle="text-align: left; line-height: 40px;">
      <div style="padding: 16px;">
        <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
          <span class="dbminputlabel">Placeholder</span>
          <input id="placeholder" class="round" type="text" placeholder="Leave blank for default...">

          <br>

          <span class="dbminputlabel">Temp Variable Name</span>
          <input id="tempVarName" placeholder="Stores selected value for actions..." class="round" type="text">

          <br>

          <span class="dbminputlabel">Minimum Select Number</span>
          <input id="min" class="round" type="text" value="1">

          <br>

          <span class="dbminputlabel">
            Action Response Mode
            <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
          </span><br>
          <select id="mode" class="round">
            <option value="PERSONAL">Once, Command User Only</option>
            <option value="PUBLIC">Once, Anyone Can Use</option>
            <option value="MULTIPERSONAL">Multi, Command User Only</option>
            <option value="MULTI" selected>Multi, Anyone Can Use</option>
            <option value="PERSISTENT">Persistent</option>
          </select>

          <div style="padding-top: 8px; margin-top: 10px;">
          <span class="dbminputlabel">Select Menu Type</span>
          <select id="SelectMenuType" class="round">
          <optgroup label="Default Select Menu">
            <option value="StringSelectMenu">String Select Menu</option>
            <option value="UserSelectMenu">User Select Menu</option>
            <option value="RoleSelectMenu">Role Select Menu</option>
            <option value="MentionableSelectMenu">Mentionable Select Menu</option>
            <option value="ChannelSelectMenu">Channel Select Menu</option>
          </optgroup>
          <optgroup label="Specific Channel Select Menu">
          <option value="ChannelTextSelectMenu">Text Channel Select Menu</option>
          <option value="ChannelVoiceSelectMenu">Voice Channel Select Menu</option>
          <option value="CategorySelectMenu">Category Select Menu</option>
          <option value="ChannelStageSelectMenu">Stage Channel Select Menu</option>
          <option value="ChannelForumSelectMenu">Forum Channel Select Menu</option>
          </optgroup>
          <optgroup label="Other Channel Select Menu">
          <option value="ChannelTextAndVoiceSelectMenu">Text + Voice Select Menu</option>
          <option value="ChannelTextAndCategorySelectMenu">Text + Category Select Menu</option>
          <option value="ChannelTextAndStageSelectMenu">Text + Stage Select Menu</option>
          <option value="ChannelTextAndForumSelectMenu">Text + Forum Select Menu</option>
          <option value="ChannelVoiceAndCategorySelectMenu">Voice + Category Select Menu</option>
          <option value="ChannelVoiceAndStageSelectMenu">Voice + Stage Select Menu</option>
          <option value="ChannelVoiceAndForumSelectMenu">Voice + Forum Select Menu</option>
          <option value="ChannelCategoryAndStageSelectMenu">Category + Stage Select Menu</option>
          <option value="ChannelCategoryAndForumSelectMenu">Category + Forum Select Menu</option>
          <option value="ChannelStageAndForumSelectMenu">Stage + Forum Select Menu</option>
          </select>
        </div>
        </div>

        <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
          <span class="dbminputlabel">Unique ID</span>
          <input id="id" placeholder="Leave blank to auto-generate..." class="round" type="text">

          <br>

          <span class="dbminputlabel">Action Row (1 - 5)</span>
          <input id="row" placeholder="Leave blank for default..." class="round" type="text">

          <br>

          <span class="dbminputlabel">Maximum Select Number</span>
          <input id="max" class="round" type="text" value="1">

          <br>

          <span class="dbminputlabel">Temporary Time-Limit (Miliseconds)</span>
          <input id="time" placeholder="60000" class="round" type="text">


          <div style="padding-top: 8px; margin-top: 10px;">
          <span class="dbminputlabel">Enable/Disable Select Menu</span>
          <select id="SelectMenuDisabled" class="round">
            <option value="false">Enable</option>
            <option value="true">Disable</option>
          </select>
        </div>
        

        </div>

        <div style="width: calc(34% - 8px); height: 300px; float: left; margin-left: 8px;">

          <dialog-list id="options" fields='["label", "description", "value", "emoji", "default"]' dialogTitle="Select Menu Option Info" dialogWidth="360" dialogHeight="440" listLabel="Options" listStyle="height: 210px;" itemName="Option" itemCols="1" itemHeight="20px;" itemTextFunction="data.label" itemStyle="text-align: left; line-height: 20px;">
            <div style="padding: 16px;">
              <span class="dbminputlabel">Name</span>
              <input id="label" class="round" type="text">

              <br>

              <span class="dbminputlabel">Description</span>
              <input id="description" class="round" type="text" placeholder="Leave blank for none...">

              <br>

              <span class="dbminputlabel">Value</span>
              <input id="value" placeholder="The text passed to the temp variable..." class="round" type="text">

              <br>

              <span class="dbminputlabel">Emoji</span>
              <input id="emoji" placeholder="Leave blank for none..." class="round" type="text">

              <br>

              <span class="dbminputlabel">Default Selected</span><br>
              <select id="default" class="round">
                <option value="true">Yes</option>
                <option value="false" selected>No</option>
              </select>
            </div>
          </dialog-list>

        </div>

        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <action-list-input mode="SELECT" id="actions" height="calc(100vh - 430px)">
          <script class="setupTempVars">
            const elem = document.getElementById("tempVarName");
            if(elem?.value) {
              tempVars.push([elem.value, "Text"]);
            }
          </script>
        </action-list-input>

      </div>
    </dialog-list>

  </div>
 </tab>
      </tab-system>
        </div>
      </dialog-list>

    </div>
  </tab>


  <tab label="Settings" icon="cogs">
  <div style="width: 100%; padding:8px;height: calc(100vh - 260px);overflow-y: scroll;overflow-x: hidden;">

      <div style="display: flex; justify-content: space-between;">
         <dbm-checkbox style="float: left;" id="reply" label="Reply to Interaction if Possible" checked></dbm-checkbox>

         <dbm-checkbox style="float: middle;" id="ephemeral" label="Make Reply Private (ephemeral)"></dbm-checkbox>
      </div>

      <br>

      <div style="display: flex; justify-content: space-between;">
        <dbm-checkbox id="tts" label="Text to Speech"></dbm-checkbox>

        <dbm-checkbox id="overwrite" label="Overwrite Changes"></dbm-checkbox>

        <dbm-checkbox id="dontSend" label="Don't Send Message"></dbm-checkbox>

        <dbm-checkbox id="pinned" label="Pin Msg."></dbm-checkbox>
      </div>

      <br>

      <div style="display: flex; justify-content: space-between;">
        <dbm-checkbox id="selectMenuOnTop" label="Select Menu On Top" checked></dbm-checkbox>
      </div>

      <br>

      <div style="display: flex; justify-content: space-between;">
        
      </div>

      <br>
      <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px; width: 100%;">
      

      <table style="width:100%;"><tr>
      <td><span class="dbminputlabel">Action Description</span><br><input type="text" class="round" id="actionDescription" placeholder="Leave blank for default..."></td>
      <td style="padding:0px 0px 0px 10px;width:55px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"></div><br><input type="color" value="#ffffff" class="round" id="actionDescriptionColor"></td>
      </tr></table>

      <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px; width: 100%;">
      <br>
      

      <div style="padding-bottom: 12px;">
        <retrieve-from-variable allowNone dropdownLabel="Message/Options to Edit" selectId="editMessage" variableInputId="editMessageVarName" variableContainerId="editMessageVarNameContainer">
          <option value="intUpdate">Interaction Update</option>
        </retrieve-from-variable>
      </div>

      <br><br><br>

      <div style="padding-bottom: 12px;">
        <store-in-variable allowNone selectId="storage" variableInputId="varName2" variableContainerId="varNameContainer2"></store-in-variable>
      </div>

      <br><br>

      <div></div>
    </div>
  </tab>


</tab-system>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];
    const {
      MessageFlags,
      ActionRowBuilder,
      TextDisplayBuilder,
      SeparatorBuilder,
      MediaGalleryBuilder,
      AttachmentBuilder,
      FileBuilder,
      SeparatorSpacingSize,
      ContainerBuilder,
      SectionBuilder,
      ButtonStyle,
      ThumbnailBuilder,
      ButtonBuilder,
      StringSelectMenuBuilder,
      UserSelectMenuBuilder,
      RoleSelectMenuBuilder,
      MentionableSelectMenuBuilder,
      ChannelSelectMenuBuilder,
    } = this.getDBM().DiscordJS;
    const targetChannel = await this.getChannelFromData(
      data.channel,
      data.varName,
      cache
    );
    if (!targetChannel) {
      this.callNextAction(cache);
      return;
    }
    const path = require("path");
    const fs = require("fs/promises");

    const allComponents = Array.isArray(data.components)
      ? data.components.flat()
      : [];

    allComponents.forEach((component, index) => {
      console.log(`Components: ${index}:, ${component}`);
    });

    ///////////////////////////////////////////////////////
    // CREATING COMPONENTS
    ///////////////////////////////////////////////////////

    const attachments = [];
    const finalComponents = [];

    for (const c of allComponents) {
      // 1) CONTENT
      if (
        c.componentType === "Content" &&
        typeof c.message === "string" &&
        c.message.trim().length > 0
      ) {
        finalComponents.push(new TextDisplayBuilder().setContent(c.message));
        continue;
      }

      // 2) SEPARATORS
      if (
        c.componentType === "Separators" &&
        Array.isArray(c.separators) &&
        c.separators.length > 0
      ) {
        for (const separator of c.separators) {
          const sizeName = separator.separatorSize;
          const sizeEnum = SeparatorSpacingSize[sizeName];
          if (sizeEnum === undefined) continue;

          finalComponents.push(new SeparatorBuilder().setSpacing(sizeEnum));
        }
        continue;
      }

      // 3) Media Gallery
      if (
        c.componentType === "Images" &&
        Array.isArray(c.images) &&
        c.images.length > 0
      ) {
        const mediaItems = c.images
          .filter(
            (img) =>
              typeof img.imageUrl === "string" && img.imageUrl.trim().length > 0
          )
          .map((img) => ({
            media: {
              url: img.imageUrl,
            },
            spoiler: img.imageSpoiler === true,
          }));

        if (mediaItems.length > 0) {
          finalComponents.push(new MediaGalleryBuilder().addItems(mediaItems));
        }
        continue;
      }

      // 4) Files
      if (
        c.componentType === "Files" &&
        Array.isArray(c.files) &&
        c.files.length > 0
      ) {
        for (const file of c.files) {
          const filePath = path.resolve(file.fileUrl);
          const fileName = path.basename(file.fileName);
          try {
            const fileContent = await fs.readFile(filePath);
            const attachment = new AttachmentBuilder(Buffer.from(fileContent), {
              name: fileName,
            });
            attachments.push(attachment);

            finalComponents.push(
              new FileBuilder()
                .setURL(`attachment://${fileName}`)
                .setSpoiler(file.fileSpoiler)
            );
          } catch (err) {
            console.error(`Błąd odczytu pliku ${filePath}:`, err);
          }
        }
        continue;
      }

      // 4) Buttons
      if (Array.isArray(c.buttons) && c.buttons.length > 0) {
        const row = new ActionRowBuilder();

        for (const btn of c.buttons) {
          let button;

          const style = Number(btn.type) || 1;

          if (style === 5) {
            if (
              !btn.url ||
              typeof btn.url !== "string" ||
              btn.url.trim() === ""
            ) {
              console.warn("Pominięto przycisk typu LINK bez poprawnego URL!");
              continue;
            }

            button = new ButtonBuilder()
              .setStyle(5)
              .setLabel(btn.name || "Link")
              .setURL(btn.url);
          } else {
            button = new ButtonBuilder()
              .setStyle(style)
              .setLabel(btn.name || "Button")
              .setCustomId(
                btn.id || `btn_${Math.random().toString(36).substring(2, 10)}`
              );

            if (typeof btn.ButtonDisabled === "string") {
              button.setDisabled(btn.ButtonDisabled === "true");
            } else if (typeof btn.ButtonDisabled === "boolean") {
              button.setDisabled(btn.ButtonDisabled);
            }
          }

          if (btn.emoji) button.setEmoji(btn.emoji);

          row.addComponents(button);
        }

        finalComponents.push(row);
        continue;
      }

      // 5) Select Menus
      if (c.componentType === "Select Menus" && Array.isArray(c.selectMenus)) {
        for (const menu of c.selectMenus) {
          const BuilderMap = {
            StringSelectMenu: StringSelectMenuBuilder,
            UserSelectMenu: UserSelectMenuBuilder,
            RoleSelectMenu: RoleSelectMenuBuilder,
            MentionableSelectMenu: MentionableSelectMenuBuilder,
            ChannelSelectMenu: ChannelSelectMenuBuilder,
          };

          const Builder = BuilderMap[menu.SelectMenuType];
          if (!Builder) continue;

          const selectMenu = new Builder()
            .setCustomId(menu.id)
            .setDisabled(menu.SelectMenuDisabled === "true")
            .setPlaceholder(menu.placeholder)
            .setMinValues(Number(menu.min) || 1)
            .setMaxValues(Number(menu.max) || 1);

          if (
            Array.isArray(menu.options) &&
            Builder === StringSelectMenuBuilder
          ) {
            selectMenu.addOptions(
              menu.options.map((opt) => ({
                label: opt.label || "ㅤ",
                value: opt.value || "",
                description: opt.description || undefined,
                emoji: opt.emoji || undefined,
              }))
            );
          }

          finalComponents.push(
            new ActionRowBuilder().addComponents(selectMenu)
          );
        }
        continue;
      }

      // 6) Sections
      if (c.componentType === "Section" && Array.isArray(c.sectionComponents)) {
        const content = c.sectionMessage?.trim() || "\u200B";

        for (const sec of c.sectionComponents) {
          // 1) text display
          const textComp = new TextDisplayBuilder().setContent(content);

          // 2) SectionBuilder
          const section = new SectionBuilder().addTextDisplayComponents(
            textComp
          );

          // 3) thumbnail accessory
          if (sec.accessoryType === "thumbnail" && sec.thumbnailUrl) {
            section.setThumbnailAccessory(
              new ThumbnailBuilder({
                media: { url: sec.thumbnailUrl },
                spoiler: sec.thumbnailSpoiler === true,
              })
            );
          }

          // 4) button accessory
          if (sec.accessoryType === "button") {
            const btn = new ButtonBuilder()
              .setLabel(sec.name || "Button")
              .setCustomId(sec.id || `sec_btn_${Date.now()}`)
              .setStyle(
                sec.type === "link"
                  ? ButtonStyle.Link
                  : Number(sec.type) || ButtonStyle.Primary
              )
              .setDisabled(
                sec.ButtonDisabled === true || sec.ButtonDisabled === "true"
              );
            if (sec.url && sec.type === "link") btn.setURL(sec.url);
            if (sec.emoji) btn.setEmoji(sec.emoji);

            section.setButtonAccessory(btn);
          }

          finalComponents.push(section);
        }
        continue;
      }

      // 7) Container
      if (
        c.componentType === "Container" &&
        Array.isArray(c.containerComponents) &&
        c.containerComponents.length > 0
      ) {
        const container = new ContainerBuilder()
          .setAccentColor(
            c.useColor && typeof c.containerColor === "string"
              ? parseInt(c.containerColor.replace("#", ""), 16)
              : undefined
          )
          .setSpoiler(c.containerSpoiler);

        for (const child of c.containerComponents) {
          // — Content
          if (
            child.containerComponentType === "Content" &&
            typeof child.containerMessage === "string" &&
            child.containerMessage.trim().length > 0
          ) {
            container.addTextDisplayComponents(
              new TextDisplayBuilder().setContent(child.containerMessage)
            );
          }

          // — Separators
          if (
            child.containerComponentType === "Separators" &&
            Array.isArray(child.containerSeparators)
          ) {
            for (const sep of child.containerSeparators) {
              const sizeEnum = SeparatorSpacingSize[sep.containerSeparatorSize];
              if (sizeEnum != null) {
                container.addSeparatorComponents(
                  new SeparatorBuilder().setSpacing(sizeEnum)
                );
              }
            }
          }

          // — Images
          if (
            child.containerComponentType === "Images" &&
            Array.isArray(child.containerImages)
          ) {
            const items = child.containerImages
              .filter(
                (i) =>
                  typeof i.containerImageUrl === "string" &&
                  i.containerImageUrl.trim().length > 0
              )
              .map((i) => ({
                media: { url: i.containerImageUrl },
                spoiler: i.containerImageSpoiler === true,
              }));
            if (items.length > 0) {
              container.addMediaGalleryComponents(
                new MediaGalleryBuilder().addItems(items)
              );
            }
          }

          // — Files
          if (
            child.containerComponentType === "Files" &&
            Array.isArray(child.containerFiles)
          ) {
            for (const f of child.containerFiles) {
              const filePath = path.resolve(f.containerFileUrl);
              const fileName = f.containerFileName || path.basename(filePath);
              try {
                const buf = await fs.readFile(filePath);
                const attachment = new AttachmentBuilder(Buffer.from(buf), {
                  name: fileName,
                });
                attachments.push(attachment);
                container.addFileComponents(
                  new FileBuilder()
                    .setURL(`attachment://${fileName}`)
                    .setSpoiler(f.containerFileSpoiler === true)
                );
              } catch (err) {
                console.error(`Błąd odczytu pliku ${filePath}:`, err);
              }
            }
          }

          // — Buttons
          if (
            child.containerComponentType === "Buttons" &&
            Array.isArray(child.containerButtons)
          ) {
            const row = new ActionRowBuilder();
            for (const btn of child.containerButtons) {
              let button;
              const style = Number(btn.containerType) || 1;
              if (style === 5) {
                if (!btn.containerUrl?.trim()) continue;
                button = new ButtonBuilder()
                  .setStyle(5)
                  .setLabel(btn.containerName || "Link")
                  .setURL(btn.containerUrl);
              } else {
                button = new ButtonBuilder()
                  .setStyle(style)
                  .setLabel(btn.containerName || "Button")
                  .setCustomId(
                    btn.containerId ||
                      `btn_${Math.random().toString(36).substring(2, 10)}`
                  );
                if (typeof btn.containerButtonDisabled === "string") {
                  button.setDisabled(btn.containerButtonDisabled === "true");
                } else if (typeof btn.containerButtonDisabled === "boolean") {
                  button.setDisabled(btn.containerButtonDisabled);
                }
              }
              if (btn.containerEmoji) button.setEmoji(btn.containerEmoji);
              row.addComponents(button);
            }
            container.addActionRowComponents(row);
          }

          // — Select Menus
          if (
            child.containerComponentType === "Select Menus" &&
            Array.isArray(child.containerSelectMenus)
          ) {
            for (const menu of child.containerSelectMenus) {
              const BuilderMap = {
                StringSelectMenu: StringSelectMenuBuilder,
                UserSelectMenu: UserSelectMenuBuilder,
                RoleSelectMenu: RoleSelectMenuBuilder,
                MentionableSelectMenu: MentionableSelectMenuBuilder,
                ChannelSelectMenu: ChannelSelectMenuBuilder,
              };
              const Builder = BuilderMap[menu.containerSelectMenuType];
              if (!Builder) continue;

              const selectMenu = new Builder()
                .setCustomId(menu.containerId)
                .setDisabled(menu.containerSelectMenuDisabled === "true")
                .setPlaceholder(menu.containerPlaceholder)
                .setMinValues(Number(menu.containerMin) || 1)
                .setMaxValues(Number(menu.containerMax) || 1);

              if (
                Array.isArray(menu.containerOptions) &&
                Builder === StringSelectMenuBuilder
              ) {
                selectMenu.addOptions(
                  menu.containerOptions.map((opt) => ({
                    label: opt.containerLabel || "ㅤ",
                    value: opt.containerValue || "",
                    description: opt.containerDescription || undefined,
                    emoji: opt.containerEmoji || undefined,
                    default: opt.containerDefault === true,
                  }))
                );
              }

              const row = new ActionRowBuilder().addComponents(selectMenu);
              container.addActionRowComponents(row);
            }
          }

          if (
            child.containerComponentType === "Section" &&
            Array.isArray(child.sectionComponents) &&
            child.sectionComponents.length > 0
          ) {
            const content = child.sectionMessage?.trim() || "\u200B";

            for (const sec of child.sectionComponents) {
              const textComp = new TextDisplayBuilder().setContent(content);

              const section = new SectionBuilder().addTextDisplayComponents(
                textComp
              );

              if (sec.accessoryType === "thumbnail" && sec.thumbnailUrl) {
                section.setThumbnailAccessory(
                  new ThumbnailBuilder({
                    media: { url: sec.thumbnailUrl },
                    spoiler: sec.thumbnailSpoiler === true,
                  })
                );
              }

              if (sec.accessoryType === "button") {
                const style =
                  sec.type === "link"
                    ? ButtonStyle.Link
                    : Number(sec.type) || ButtonStyle.Primary;

                const btnBuilder = new ButtonBuilder()
                  .setLabel(sec.name || "Button")
                  .setStyle(style)
                  .setDisabled(
                    sec.ButtonDisabled === true || sec.ButtonDisabled === "true"
                  );

                if (style === ButtonStyle.Link) {
                  if (sec.url?.trim()) {
                    btnBuilder.setURL(sec.url);
                  } else {
                    continue;
                  }
                } else {
                  btnBuilder.setCustomId(
                    sec.id || `cont_sec_btn_${Date.now()}`
                  );
                }

                if (sec.emoji) btnBuilder.setEmoji(sec.emoji);

                section.setButtonAccessory(btnBuilder);
              }

              container.addSectionComponents(section);
            }

            continue;
          }
        }

        finalComponents.push(container);
        continue;
      }
    }

    ///////////////////////////////////////////////////////
    // SENDING A MESSAGE
    ///////////////////////////////////////////////////////

    await targetChannel.send({
      flags: MessageFlags.IsComponentsV2,
      components: finalComponents,
      files: attachments,
    });

    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod Init
  //---------------------------------------------------------------------

  modInit(data) {},

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
