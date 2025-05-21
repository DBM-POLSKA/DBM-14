module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Send Message",
  displayName: "Send Message",

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
    let defaultText = "";
    if (data.message) {
      defaultText = `"${data.message.replace(/[\n\r]+/, " ↲ ")}"`;
    } else if (data.embeds?.length > 0) {
      defaultText = `${data.embeds.length} Embeds`;
    } else if (data.attachments?.length > 0) {
      defaultText = `${data.attachments.length} Attachments`;
    } else if (data.buttons?.length > 0 || data.selectMenus?.length > 0) {
      defaultText = `${data.buttons.length} Buttons and ${data.selectMenus.length} Select Menus`;
    } else if (data.editMessage && data.editMessage !== "0") {
      defaultText = `Message Options - ${presets.getVariableText(
        data.editMessage,
        data.editMessageVarName
      )}`;
    } else {
      defaultText = `Nothing (might cause error)`;
    }
    if (data.dontReply) {
      defaultText = `Store Data: ${defaultText}`;
    } else {
      defaultText = `${presets.getSendReplyTargetText(
        data.channel,
        data.varName
      )}: ${defaultText}`;
    }

    const userDesc = data.actionDescription?.toString().trim();
    if (userDesc) {
      const color = data.actionDescriptionColor || "#ffffff";

      return `<span style="color: ${color};">${userDesc}</span>`;
    }

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
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/send_message.js",
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: [
    "channel",
    "varName",
    "message",
    "buttons",
    "selectMenus",
    "attachments",
    "embeds",
    "reply",
    "ephemeral",
    "dontReply",
    "tts",
    "overwrite",
    "dontSend",
    "editMessage",
    "editMessageVarName",
    "storage",
    "varName2",
    "pinned",
    "channel",
    "varNameContainer",
    "varName",
    "pollQuestion",
    "pollAnswers",
    "pollAnswer",
    "pollEmoji",
    "pollAllowMultipleAnswers",
    "pollDuration",
    "actionDescription",
    "actionDescriptionColor",
    "selectMenuOnTop",
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
        >3.2</a
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


  <tab label="Message" icon="comment">
  <div style="width: 100%; padding:8px;height: calc(100vh - 270px);overflow:auto">
      <textarea id="message" class="dbm_monospace" rows="10" placeholder="Insert message here..." style="height: calc(100vh - 309px); white-space: nowrap;"></textarea>
      <div id="counter" style="float:right;text-align:right;position:relative;width:22%">characters: 0</div>
      </div>
  </tab>


  <tab label="Embeds" icon="book image">
    <div style="padding: 8px;">

      <dialog-list id="embeds" fields='["title", "url", "color", "timestamp", "imageUrl", "thumbUrl", "description", "fields", "author", "authorUrl", "authorIcon", "footerText", "footerIconUrl"]' saveButtonText="Save Embed", dialogTitle="Embed Info" dialogWidth="540" dialogHeight="460" listLabel="Embeds" listStyle="height: calc(100vh - 350px);" itemName="Embed" itemCols="2" itemHeight="80px;" itemTextFunction="glob.formatItemEmbed(data)" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px 16px 0px 16px;">

          <tab-system>

            <tab label="General" icon="certificate">
              <div style="padding: 8px">
                <div style="float: left; width: calc(50% - 12px);">
                  <span class="dbminputlabel">Title</span><br>
                  <input id="title" class="round" type="text" placeholder="Leave blank for none...">

                  <br>

                  <span class="dbminputlabel">Color</span><br>
                  <input id="color" class="round" type="text" placeholder="Leave blank for black...">
                </div>

                <div style="float: right; width: calc(50% - 12px);">
                  <span class="dbminputlabel">Tittle URL</span><br>
                  <input id="url" class="round" type="text" placeholder="Leave blank for none...">

                  <br>

                  <span class="dbminputlabel">Use Timestamp</span><br>
                  <select id="timestamp" class="round">
                    <option value="true">Yes</option>
                    <option value="false" selected>No</option>
                  </select>
                </div>

                <br><br><br><br><br><br><br>

                <hr class="subtlebar">

                <br>

                <span class="dbminputlabel">Image URL</span><br>
                <input id="imageUrl" class="round" type="text" placeholder="Leave blank for none...">

                <br>

                <span class="dbminputlabel">Thumbnail URL</span><br>
                <input id="thumbUrl" class="round" type="text" placeholder="Leave blank for none...">
              </div>
            </tab>

            <tab label="Description" icon="file image">
              <div style="padding: 8px">
                <textarea id="description" class="dbm_monospace" rows="10" placeholder="Insert description here..." style="height: calc(100vh - 149px); white-space: nowrap; resize: none;"></textarea>
                </div>
            </tab>

            <tab label="Fields" icon="list">
              <div style="padding: 8px">
                <dialog-list id="fields" fields='["name", "value", "inline"]' saveButtonText="Save Field", dialogTitle="Field Info" dialogWidth="540" dialogHeight="300" listLabel="Fields" listStyle="height: calc(100vh - 190px);" itemName="Field" itemCols="1" itemHeight="30px;" itemTextFunction="data.name + '<br>' + data.value" itemStyle="text-align: left; line-height: 30px;">
                  <div style="padding: 16px;">
                    <div style="float: left; width: calc(50% - 12px);">
                      <span class="dbminputlabel">Field Name</span><br>
                      <input id="name" class="round" type="text">
                    </div>

                    <div style="float: right; width: calc(50% - 12px);">
                      <span class="dbminputlabel">Inline?</span><br>
                      <select id="inline" class="round">
                        <option value="true">Yes</option>
                        <option value="false" selected>No</option>
                      </select>
                    </div>

                    <br><br><br><br>

                    <span class="dbminputlabel">Field Value</span><br>
                    <textarea id="value" class="dbm_monospace" rows="10" placeholder="Insert field text here..." style="height: calc(100vh - 190px); white-space: nowrap; resize: none;"></textarea>

                  </div>
                </dialog-list>
              </div>
            </tab>

            <tab label="Author" icon="user circle">
              <div style="padding: 8px">
                <span class="dbminputlabel">Author Text</span><br>
                <input id="author" class="round" type="text" placeholder="Leave blank to disallow...">

                <br>

                <span class="dbminputlabel">Author URL</span><br>
                <input id="authorUrl" class="round" type="text" placeholder="Leave blank for none...">

                <br>

                <span class="dbminputlabel">Author Icon URL</span><br>
                <input id="authorIcon" class="round" type="text" placeholder="Leave blank for none...">
              </div>
            </tab>

            <tab label="Footer" icon="map outline">
              <div style="padding: 8px;">
                <span class="dbminputlabel">Footer Icon URL</span><br>
                <input id="footerIconUrl" class="round" type="text" placeholder="Leave blank for none...">

                <br>

                <span class="dbminputlabel">Footer Text</span><br>
                <textarea id="footerText" class="dbm_monospace" rows="10" placeholder="Leave blank to disallow..." style="height: calc(100vh - 234px); white-space: nowrap; resize: none;"></textarea>
              </div>
            </tab>

          </tab-system>

        </div>
      </dialog-list>

    </div>
  </tab>

  <tab label="Poll" icon="chart bar">
    <div style="padding: 8px 50px;">

    <span class="dbminputlabel">Question</span>
    <input id="pollQuestion" class="round" type="text" placeholder="Leave blank for disable poll..." style="width: 100%;">

    <dialog-list id="pollAnswers" fields='["pollAnswer", "pollEmoji"]' saveButtonText="Save Answer", dialogTitle="Create Answer" dialogWidth="400" dialogHeight="280" listLabel="Answers (min 1 - max 10)" listStyle="height: calc(100vh - 450px);" itemName="Answer" itemCols="1" itemHeight="30px;" itemTextFunction="data.pollEmoji + data.pollAnswer" itemStyle="text-align: left; line-height: 30px;">
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
    </div>
  </tab>


  <tab label="Buttons" icon="clone">
    <div style="padding: 8px;">

      <dialog-list id="buttons" fields='["name", "type", "id", "row", "url", "emoji", "disabled", "mode", "time", "actions", "ButtonDisabled"]' saveButtonText="Save Button", dialogTitle="Button Info" dialogWidth="600" dialogHeight="700" listLabel="Buttons" listStyle="height: calc(100vh - 350px);" itemName="Button" itemCols="5" itemHeight="40px;" itemTextFunction="glob.formatItemButton(data)" itemStyle="text-align: center; line-height: 40px;">
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

    <dialog-list id="selectMenus" fields='["placeholder", "id", "tempVarName", "row", "min", "max", "mode", "time", "options", "actions", "SelectMenuType", "SelectMenuDisabled"]' saveButtonText="Save Select Menu", dialogTitle="Select Menu Info" dialogWidth="800" dialogHeight="700" listLabel="Select Menus" listStyle="height: calc(100vh - 350px);" itemName="Select Menu" itemCols="1" itemHeight="40px;" itemTextFunction="glob.formatItemSelectMenu(data)" itemStyle="text-align: left; line-height: 40px;">
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

  
  <tab label="Files" icon="file image">
    <div style="padding: 8px;">

      <dialog-list id="attachments" fields='["url", "name", "spoiler"]' saveButtonText="Save File", dialogTitle="Attachment Info" dialogWidth="400" dialogHeight="280" listLabel="Files" listStyle="height: calc(100vh - 350px);" itemName="File" itemCols="1" itemHeight="30px;" itemTextFunction="data.url" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px;">
          <span class="dbminputlabel">Attachment Local/Web URL</span>
          <input id="url" class="round" type="text" value="resources/">

          <br>

          <span class="dbminputlabel">Attachment Name</span>
          <input id="name" class="round" type="text" placeholder="Leave blank for default...">

          <br>

          <div style="text-align: center; padding-top: 4px;">
            <dbm-checkbox id="spoiler" label="Make Attachment Spoiler"></dbm-checkbox>
          </div>
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

  init() {
    const { document, glob } = this;

    const textarea = document.getElementById("message");
    const counter = document.getElementById("counter");
    const textLength = textarea.value.length;
    counter.textContent = `characters: ${textLength}`;
    textarea.addEventListener("input", () => {
      const textLength = textarea.value.length;
      counter.textContent = `characters: ${textLength}`;
    });

    glob.formatItemButton = function (data) {
      let setcor = "";
      if (data.type == "1") {
        setcor = "rgb(88,101,242)";
      }
      if (data.type == "2" || data.type == "5") {
        setcor = "rgb(78,80,88)";
      }
      if (data.type == "3") {
        setcor = "rgb(36,128,70)";
      }
      if (data.type == "4") {
        setcor = "rgb(218,55,60)";
      }
      let result =
        '<div style="display: inline-block; width: 100%;"><div style="width:10px;background:' +
        setcor +
        ';float:left;margin-left:-10px"><br></div><table style="margin-left:10px"><tr><td style="width:100%">';
      const comp = "0";
      switch (comp) {
        case "0":
          result += data.emoji + " " + data.name;
          break;
      }

      return result;
    };

    glob.formatItemSelectMenu = function (data) {
      const selectMenuType = data.SelectMenuType;

      let result =
        '<div style="display: inline-block; width: 100%; padding-left: 8px">' +
        '<div style="float:left;width: calc(100% - 200px);overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">';

      result += data.placeholder;

      result +=
        "</div><div style='float:right;width:190px;text-align:right;padding:0px 10px 0px 0px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>";

      if (selectMenuType === "StringSelectMenu") {
        result += "Options: " + data.options.length + " / 25";
      } else {
        result += selectMenuType.replace(/([A-Z])/g, " $1").trim();
      }

      result += "</div></div>";

      return result;
    };

    glob.formatItemEmbed = function (data) {
      const maxLength = 30;
      const firstLine = data.description.substring(0, maxLength);
      const secondLine =
        data.description.length > maxLength
          ? data.description.substring(maxLength, maxLength * 2)
          : "";

      const result =
        '<div style="margin-left:-10px; background:' +
        data.color +
        '; float:left; width:10px; overflow:hidden; height:80px;"><br></div>' +
        '<div style="float:left; width:70%; overflow:hidden; margin-left:5px; white-space: normal; line-height: 1.2;">' +
        "<br>" +
        "<strong style='font-weight: bolder;'>" +
        data.title +
        "</strong>" +
        "<br>" +
        firstLine +
        "<br>" +
        secondLine +
        "</div>" +
        '<div style="float:right; width:19%; text-align:right; overflow:hidden;">' +
        (data.formula == 1 || data.formula == 2
          ? '<span style="float:right;" title="Condition enabled"> 🔘 </span>'
          : "") +
        "</div>";

      return result;
    };
  },

  //---------------------------------------------------------------------
  // Action Editor On Save
  //---------------------------------------------------------------------

  onSave(data, helpers) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        if (!data.buttons[i].id) {
          data.buttons[i].id =
            "msg-button-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        if (!data.selectMenus[i].id) {
          data.selectMenus[i].id =
            "msg-select-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    return data;
  },

  //---------------------------------------------------------------------
  // Action Editor On Paste
  //---------------------------------------------------------------------

  onPaste(data, helpers) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        const id = data.buttons[i].id;
        if (!id || id.startsWith("msg-button-")) {
          data.buttons[i].id =
            "msg-button-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const id = data.selectMenus[i].id;
        if (!id || id.startsWith("msg-select-")) {
          data.selectMenus[i].id =
            "msg-select-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    return data;
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];

    //---------------------------------------------------------------------
    // Pobieranie i przekazywanie wiadomości
    //---------------------------------------------------------------------

    function message() {
      const content = this.evalMessage(data.message, cache);
      return content;
    }

    //---------------------------------------------------------------------
    // Pobieranie i przekazywanie embedów
    //---------------------------------------------------------------------

    function embeds() {
      const embedBuilders = [];
      if (!Array.isArray(data.embeds)) return embedBuilders;

      const { EmbedBuilder, Colors } = this.getDBM().DiscordJS;

      for (const e of data.embeds) {
        const emb = new EmbedBuilder();

        if (e.title) emb.setTitle(this.evalMessage(e.title, cache));
        if (e.description)
          emb.setDescription(this.evalMessage(e.description, cache));
        if (e.url) emb.setURL(this.evalMessage(e.url, cache));

        if (e.color) {
          const raw = this.evalMessage(e.color, cache).trim();

          const key = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
          let resolved = Colors[key];

          const custom = {
            lavender: "#E6E6FA",
            salmon: "#FA8072",
            teal: "#008080",
            maroon: "#800000",
            navy: "#000080",
            darkblue: "#0000ff",
            lightpink: "#ff76f1",
            pink: "#ff00cc",
            darkpink: "#a80086",
          };
          if (!resolved && custom[raw.toLowerCase()]) {
            resolved = custom[raw.toLowerCase()];
          }

          if (!resolved) resolved = raw;

          emb.setColor(resolved);
        }

        if (e.timestamp === "true") emb.setTimestamp();

        if (e.author) {
          emb.setAuthor({
            name: this.evalMessage(e.author, cache),
            iconURL: e.authorIcon
              ? this.evalMessage(e.authorIcon, cache)
              : undefined,
            url: e.authorUrl ? this.evalMessage(e.authorUrl, cache) : undefined,
          });
        }

        if (e.footerText) {
          emb.setFooter({
            text: this.evalMessage(e.footerText, cache),
            iconURL: e.footerIconUrl
              ? this.evalMessage(e.footerIconUrl, cache)
              : undefined,
          });
        }

        if (e.imageUrl) emb.setImage(this.evalMessage(e.imageUrl, cache));
        if (e.thumbUrl) emb.setThumbnail(this.evalMessage(e.thumbUrl, cache));

        if (Array.isArray(e.fields)) {
          for (const f of e.fields) {
            emb.addFields({
              name: this.evalMessage(f.name, cache),
              value: this.evalMessage(f.value, cache),
              inline: f.inline === "true",
            });
          }
        }

        embedBuilders.push(emb);
      }

      return embedBuilders;
    }

    //---------------------------------------------------------------------
    // Pobieranie i przekazywanie ankiet
    //---------------------------------------------------------------------

    function polls() {
      const pollQuestion = this.evalMessage(data.pollQuestion, cache);
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

      if (!pollQuestion || pollAnswers.length === 0) {
        return undefined;
      }

      return {
        question: { text: pollQuestion },
        answers: pollAnswers,
        allowMultiselect: pollAllowMultipleAnswers,
        duration: pollDuration,
      };
    }

    //---------------------------------------------------------------------
    // Pobieranie i przekazywanie przycisków
    //---------------------------------------------------------------------

    function buttons() {
      const rows = [];
      const { ButtonBuilder, ButtonStyle, ActionRowBuilder } =
        this.getDBM().DiscordJS;

      if (!Array.isArray(data.buttons)) return rows;

      let currentRow = new ActionRowBuilder();

      for (const b of data.buttons) {
        const btn = new ButtonBuilder();

        const style = this.evalMessage(b.type, cache);

        if (ButtonStyle[style]) btn.setStyle(ButtonStyle[style]);
        else btn.setStyle(parseInt(style, 10));

        const label = this.evalMessage(b.name, cache);
        if (label) btn.setLabel(label);
        if (b.emoji) btn.setEmoji(this.evalMessage(b.emoji, cache));

        if (b.ButtonDisabled === "true") btn.setDisabled(true);

        if (style === ButtonStyle.Link || b.type === "5") {
          const url = this.evalMessage(b.url, cache);
          btn.setURL(url);
        } else {
          btn.setCustomId(b.id);
        }

        if (currentRow.components.length >= 5) {
          rows.push(currentRow);
          currentRow = new ActionRowBuilder();
        }
        currentRow.addComponents(btn);
      }

      if (currentRow.components.length > 0) rows.push(currentRow);
      return rows;
    }

    //---------------------------------------------------------------------
    // Pobieranie i przekazywanie select menu
    //---------------------------------------------------------------------

    function selects() {
      const rows = [];
      const {
        StringSelectMenuBuilder,
        UserSelectMenuBuilder,
        RoleSelectMenuBuilder,
        MentionableSelectMenuBuilder,
        ChannelSelectMenuBuilder,
        ChannelType,
        ActionRowBuilder,
      } = this.getDBM().DiscordJS;

      if (!Array.isArray(data.selectMenus)) return rows;

      let currentRow = new ActionRowBuilder();

      for (const menu of data.selectMenus) {
        const type = this.evalMessage(menu.SelectMenuType, cache);
        const customId = menu.id;
        const disabled = menu.SelectMenuDisabled === "true";
        const placeholder = this.evalMessage(menu.placeholder, cache);
        const min = parseInt(this.evalMessage(menu.min, cache)) || 1;
        const max = parseInt(this.evalMessage(menu.max, cache)) || 1;

        let builder;

        switch (type) {
          case "StringSelectMenu": {
            builder = new StringSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max);

            if (Array.isArray(menu.options)) {
              const options = menu.options.map((opt) => {
                return {
                  label: this.evalMessage(opt.label, cache),
                  value: this.evalMessage(opt.value, cache),
                  description: opt.description
                    ? this.evalMessage(opt.description, cache)
                    : undefined,
                  emoji: opt.emoji
                    ? this.evalMessage(opt.emoji, cache)
                    : undefined,
                  default: opt.default === "true",
                };
              });
              builder.addOptions(options);
            }
            break;
          }

          case "UserSelectMenu":
            builder = new UserSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max);
            break;

          case "RoleSelectMenu":
            builder = new RoleSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max);
            break;

          case "MentionableSelectMenu":
            builder = new MentionableSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max);
            break;

          case "ChannelSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max);
            break;

          case "ChannelTextSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(ChannelType.GuildText);
            break;

          case "ChannelVoiceSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(ChannelType.GuildVoice);
            break;

          case "CategorySelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(ChannelType.GuildCategory);
            break;

          case "ChannelStageSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(ChannelType.GuildStageVoice);
            break;

          case "ChannelForumSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(ChannelType.GuildForum);
            break;

          case "ChannelTextAndVoiceSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(ChannelType.GuildText, ChannelType.GuildVoice);
            break;

          case "ChannelTextAndCategorySelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(
                ChannelType.GuildText,
                ChannelType.GuildCategory
              );
            break;

          case "ChannelTextAndStageSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(
                ChannelType.GuildText,
                ChannelType.GuildStageVoice
              );
            break;

          case "ChannelTextAndForumSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(ChannelType.GuildText, ChannelType.GuildForum);
            break;

          case "ChannelVoiceAndCategorySelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(
                ChannelType.GuildVoice,
                ChannelType.GuildCategory
              );
            break;

          case "ChannelVoiceAndStageSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(
                ChannelType.GuildVoice,
                ChannelType.GuildStageVoice
              );
            break;

          case "ChannelVoiceAndForumSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(ChannelType.GuildVoice, ChannelType.GuildForum);
            break;

          case "ChannelCategoryAndStageSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(
                ChannelType.GuildCategory,
                ChannelType.GuildStageVoice
              );
            break;

          case "ChannelCategoryAndForumSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(
                ChannelType.GuildCategory,
                ChannelType.GuildForum
              );
            break;

          case "ChannelStageAndForumSelectMenu":
            builder = new ChannelSelectMenuBuilder()
              .setCustomId(customId)
              .setDisabled(disabled)
              .setPlaceholder(placeholder)
              .setMinValues(min)
              .setMaxValues(max)
              .addChannelTypes(
                ChannelType.GuildStageVoice,
                ChannelType.GuildForum
              );
            break;

          default:
            continue;
        }

        const componentType = builder.data.type;
        const isSelectMenu = [3, 5, 6, 7, 8].includes(componentType);

        if (isSelectMenu) {
          if (currentRow.components.length > 0) {
            rows.push(currentRow);
          }
          currentRow = new ActionRowBuilder().addComponents(builder);
          rows.push(currentRow);
          currentRow = new ActionRowBuilder();
        } else {
          if (currentRow.components.length >= 5) {
            rows.push(currentRow);
            currentRow = new ActionRowBuilder();
          }
          currentRow.addComponents(builder);
        }
      }

      if (currentRow.components.length > 0) rows.push(currentRow);
      return rows;
    }

    //---------------------------------------------------------------------
    // Pobieranie i przekazywanie plików
    //---------------------------------------------------------------------

    function files() {
      const out = [];
      const { basename, AttachmentBuilder } = this.getDBM().DiscordJS;
      if (!Array.isArray(data.attachments)) return out;

      for (const a of data.attachments) {
        const url = this.evalMessage(a.url, cache);
        if (!url) continue;

        const name = a.name ? this.evalMessage(a.name, cache) : basename(url);

        const attach = new AttachmentBuilder(url, { name });
        if (a.spoiler === true || a.spoiler === "true") {
          attach.setSpoiler(true);
        }

        out.push(attach);
      }
      return out;
    }

    //---------------------------------------------------------------------
    // Wysyłanie wiadomości
    //---------------------------------------------------------------------

    async function sendMessage(messageContent, messageEmbeds) {
      const time = parseFloat(this.evalMessage(data.time, cache)) || 60000;
      const userId = cache.interaction?.user?.id || cache.user?.id;

      const bot = this;

      const interaction =
        cache.interaction ?? cache.msg?.interaction ?? cache.msg;
      const channel = parseInt(data.channel, 10);
      const message = data.message;
      const replyEnabled = data.reply === true || data.reply === "true";
      const tts = data.tts === true || data.tts === "true";
      const ephemeral = data.ephemeral === true || data.ephemeral === "true";
      const dontSend = data.dontSend === true || data.dontSend === "true";
      const pinned = data.pinned === true || data.pinned === "true";
      const overwrite = data.overwrite === true || data.overwrite === "true";
      const selectMenuOnTop =
        data.selectMenuOnTop === true || data.selectMenuOnTop === "true";
      if (data.channel === undefined || message === undefined) return;
      const targetChannel = await this.getSendReplyTarget(
        channel,
        this.evalMessage(data.varName, cache),
        cache
      );

      if (dontSend) {
        return;
      }

      const awaitResponses = [];

      if (Array.isArray(data.buttons)) {
        for (const b of data.buttons) {
          const id = this.evalMessage(b.id, cache);
          const mode = b.mode ?? "MULTI";
          const timeB = b.time
            ? parseInt(this.evalMessage(b.time, cache), 10) || time
            : time;
          if (mode !== "PERSISTENT") {
            awaitResponses.push({
              type: "BUTTON",
              time: timeB,
              id,
              user: mode.endsWith("PERSONAL") ? userId : null,
              multi: mode.startsWith("MULTI"),
              data: b,
            });
          }
        }
      }

      if (Array.isArray(data.selectMenus)) {
        for (const s of data.selectMenus) {
          const id = this.evalMessage(s.id, cache);
          const mode = s.mode ?? "MULTI";
          const timeS = s.time
            ? parseInt(this.evalMessage(s.time, cache), 10) || time
            : time;
          if (mode !== "PERSISTENT") {
            awaitResponses.push({
              type: "SELECT",
              time: timeS,
              id,
              user: mode.endsWith("PERSONAL") ? userId : null,
              multi: mode.startsWith("MULTI"),
              data: s,
            });
          }
        }
      }

      const buttonsArray = buttons.call(this);
      const selectsArray = selects.call(this);
      const filesArray = files.call(this);
      const pollData = polls.call(this);

      const componentsArray = selectMenuOnTop
        ? [...selectsArray, ...buttonsArray]
        : [...buttonsArray, ...selectsArray];

      const payload = {
        content: messageContent,
        tts: tts,
        embeds: messageEmbeds,
        components: componentsArray,
        files: filesArray,
        flags: ephemeral === true || ephemeral === "true" ? 64 : undefined,
        ...(pollData ? { poll: pollData } : {}),
      };

      let sentMessage;

      let isEdit = 0;
      let target;
      let messageOptions;

      const editMessageOption = this.evalMessage(data.editMessage, cache);
      if (editMessageOption === "intUpdate") {
        isEdit = 2;
      } else {
        const editMessage = parseInt(editMessageOption, 10);
        if (typeof editMessage === "number" && editMessage >= 0) {
          const editVarName = this.evalMessage(data.editMessageVarName, cache);
          const editObject = this.getVariable(editMessage, editVarName, cache);
          const { Message } = this.getDBM().DiscordJS;
          if (editObject) {
            if (editObject instanceof Message) {
              target = editObject;
              isEdit = 1;
            } else {
              messageOptions = editObject;
            }
          }
        }
      }

      const isSame = parseInt(data.channel, 10) === 0;

      try {
        if (isEdit === 2 && interaction?.update) {
          if (overwrite) {
            await interaction.update(payload);
          } else {
            const original = await interaction.message.fetch();
            await interaction.update({
              content: payload.content || original.content,
              embeds: [...(original.embeds || []), ...(payload.embeds || [])],
              components: [
                ...(original.components || []),
                ...(payload.components || []),
              ],
              files: [
                ...(original.attachments?.map((a) => ({ attachment: a.url })) ??
                  []),
                ...(payload.files || []),
              ],
            });
          }
          sentMessage = await interaction.fetchReply();
        } else if (isEdit === 1 && target?.edit) {
          if (overwrite) {
            await target.edit(payload);
          } else {
            const original = (await target.fetch?.()) ?? target;
            await target.edit({
              content: payload.content || original.content,
              embeds: [...(original.embeds || []), ...(payload.embeds || [])],
              components: [
                ...(original.components || []),
                ...(payload.components || []),
              ],
              files: [
                ...(original.attachments?.map((a) => ({ attachment: a.url })) ??
                  []),
                ...(payload.files || []),
              ],
            });
          }
          sentMessage = target;
        } else {
          if (
            isSame &&
            replyEnabled &&
            typeof interaction?.reply === "function" &&
            !interaction.replied &&
            !interaction.deferred
          ) {
            sentMessage = await interaction.reply({
              ...payload,
              withResponse: true,
            });
          } else {
            sentMessage = await targetChannel.send(payload);
          }
        }
      } catch (err) {
        if (err.code === 10062) {
          console.warn("[Send Message] Reply expired, fallback to send");
          sentMessage = await targetChannel.send(payload);
        } else {
          throw err;
        }
      }

      const multi = true;

      const allComponents = [...buttonsArray, ...selectsArray];

      for (let i = 0; i < awaitResponses.length; i++) {
        const response = awaitResponses[i];
        this.registerTemporaryInteraction(
          sentMessage.id,
          response.time,
          response.id,
          response.user,
          response.multi,
          (interaction) => {
            interaction.__originalInteraction = cache.interaction;
            if (response.type === "BUTTON") {
              this.preformActionsFromInteraction(
                interaction,
                response.data,
                cache.meta,
                cache.temp
              );
            } else {
              this.preformActionsFromSelectInteraction(
                interaction,
                response.data,
                cache.meta,
                cache.temp
              );
            }
          }
        );
      }

      if (interaction && typeof interaction.fetchReply === "function") {
        sentMessage = await interaction.fetchReply();
      } else if (cache.msg && typeof cache.msg.channel?.send === "function") {
        sentMessage = cache.msg;
      } else {
        console.warn("[Send Message] No messages to process.");
      }

      if (sentMessage) {
        if (pinned && !ephemeral) {
          try {
            await sentMessage.pin();
          } catch (e) {
            console.warn("[Send Message] Error pinning message:", e);
          }
        }

        const varName2 = this.evalMessage(data.varName2, cache);
        const storage = parseInt(data.storage, 10);
        this.storeValue(sentMessage, storage, varName2, cache);
      } else {
        console.warn("[Send Message] No message object to save.");
      }
    }

    //---------------------------------------------------------------------
    // Dalszy kod
    //---------------------------------------------------------------------

    const msgContent = message.call(this);
    const msgEmbeds = embeds.call(this);
    await sendMessage.call(this, msgContent, msgEmbeds);

    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod Init
  //---------------------------------------------------------------------

  modInit(data) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        const button = data.buttons[i];
        if (button.mode === "PERSISTENT") {
          this.registerButtonInteraction(button.id, button);
        }
        this.prepareActions(button.actions);
      }
    }

    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const select = data.selectMenus[i];

        if (select.mode === "PERSISTENT") {
          this.registerSelectMenuInteraction(select.id, select);
        }

        this.prepareActions(select.actions);
      }
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
