module.exports = {
  name: "Anty Invite",
  section: "Moderation",
  subtitle() {
    return "test";
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    const dataType = "test";
    return [data.varName, dataType];
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: null,
    authorUrl: null,
    downloadUrl: null,
  },

  fields: [
    "roleList",
    "channelList",
    "roleID",
    "roleName",
    "channelID",
    "channelName",
  ],

  html() {
    return `
        <tab-system>
          <tab label="General" icon="list alternate">
            <div style="display: flex; gap: 10px; padding: 8px;">
              
              <dialog-list
                id="roleList"
                fields='["info1", "roleID", "roleName", "varNameContainer", "varName"]'
                dialogTitle="Roles"
                dialogWidth="400"
                dialogHeight="300"
                listLabel="roles"
                listStyle="height: calc(100vh - 350px);"
                itemName="role"
                itemCols="1"
                itemHeight="40px"
                itemTextFunction="(() => {
                  const labelMap = {
                    followRole: 'Follow Role',
                    ignoreRole: 'Ignore Role',
                  };
                  const label = labelMap[data.info1] || data.info1;
  
                  if (data.roleID === '0') {
                    return \`\${label}: Variable (\${data.varName || 'Unknown'})\`;
                  }
  
                  if (data.roleName && data.roleID) {
                    return \`\${label}: \${data.roleName} (\${data.roleID})\`;
                  }
  
                  if (data.roleID) {
                    return \`\${label}: ID \${data.roleID}\`;
                  }
  
                  return \`\${label}: Unknown\`;
                })()"
                itemStyle="text-align: left; line-height: 40px;"
                style="flex: 1;"
              >
                <role-input
                  dropdownLabel="Source Role"
                  selectId="roleID"
                  variableContainerId="varNameContainer"
                  variableInputId="varName"
                  onchange="document.getElementById('roleName').value = this.selectedOptions[0]?.textContent"
                ></role-input>
                <input type="hidden" id="roleName" name="roleName">
                
                <div style="padding-top: 100px; margin-top: 10px;">
                  <span class="dbminputlabel">Select Option</span>
                  <select id="info1" class="round">
                    <option value="followRole">Follow the Role</option>
                    <option value="ignoreRole">Ignore the Role</option>
                  </select>
                </div>
              </dialog-list>
    
              <dialog-list
                id="channelList"
                fields='["info2", "channelID", "channelName", "varNameContainer", "varName"]'
                dialogTitle="Channels"
                dialogWidth="400"
                dialogHeight="300"
                listLabel="channels"
                listStyle="height: calc(100vh - 350px);"
                itemName="channel"
                itemCols="1"
                itemHeight="40px"
                itemTextFunction="(() => {
                  const labelMap = {
                    followChannel: 'Follow Channel',
                    ignoreChannel: 'Ignore Channel',
                  };
                  const label = labelMap[data.info2] || data.info2;
  
                  if (data.channelID === '0') {
                    return \`\${label}: Variable (\${data.varName || 'Unknown'})\`;
                  }
  
                  if (data.channelName && data.channelID) {
                    return \`\${label}: \${data.channelName} (\${data.channelID})\`;
                  }
  
                  if (data.channelID) {
                    return \`\${label}: ID \${data.channelID}\`;
                  }
  
                  return \`\${label}: Unknown\`;
                })()"
                itemStyle="text-align: left; line-height: 40px;"
                style="flex: 1;"
              >
                <channel-input
                  dropdownLabel="Source Channel"
                  selectId="channelID"
                  variableContainerId="varNameContainer"
                  variableInputId="varName"
                  onchange="document.getElementById('channelName').value = this.selectedOptions[0]?.textContent"
                ></channel-input>
                <input type="hidden" id="channelName" name="channelName">
                
                <div style="padding-top: 100px; margin-top: 10px;">
                  <span class="dbminputlabel">Select Option</span>
                  <select id="info2" class="round">
                    <option value="followChannel">Follow the Channel</option>
                    <option value="ignoreChannel">Ignore the Channel</option>
                  </select>
                </div>
              </dialog-list>
    
            </div>
          </tab>
        </tab-system>
      `;
  },

  init() {},

  async action(cache) {},

  mod() {},
};
