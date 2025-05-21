//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------
//////
////// New Region | Config
//////
//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------

let config = {
  ViewConsoleLog: true, // Display logs in console
  ViewConsoleError: true, // Display errors in console

  Bot1: {
    Path: "bot folder/bot.js", // Path to the bot startup file. (bot.js)

    CustomVersionNodeJs: false, // Use Local Node JS? (true / false)
    NodeJsPath: "NodeJS-22/node.exe", // Path to the Node JS executable. (windows "node.exe") (linux "node")

    AutoRestart: true, // Restart bot when it crashes? (true / false)
    RestartDelay: 5000, // Restart delay. (5000 = 5 second)
  },
};

//------------//
// End Region //
//------------//

//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------
//////
////// New Region | Help
//////
//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------

//   - Discord: https://discord.gg/9HYB4n3Dz4
//   - GitHub: https://github.com/DBM-POLSKA
//   - Node JS: https://nodejs.org/en

//   - Info:
// > Created by: Shadow (692734286276853760).
// > For help please join the discord server.
// > This script allows you to run multiple Discord bots in a single process. (limited only by system resources).
// > This script can be used to bypass the bot limit on your hosting, using a different version of Node JS (if your bot needs a newer version and your hosting doesn't have it).
// > Bots can be created by adding additional bot objects to the config.
// > By default, the first bot object is called (Bot1), you can name the bot objects whatever you want, but if there is a space in the bot object name, you should enclose the name in quotation marks ("Bot 2").
// > Each bot can use a local version of Node JS by setting the "CustomVersionNodeJs" property to true, however, if this property is set to false, the bot will use the version of Node JS that is installed globally in the system.

//------------//
// End Region //
//------------//

//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------
//////
////// New Region | Script
//////
//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------
//////------------------------------------------------------------------------------------------------------------------------------------------

const { spawn, spawnSync, execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const scriptVersion = "2.0";

function fixPermissions(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.X_OK);
  } catch (err) {
    console.log(`[SCRIPT.JS] Granting permissions to ${filePath}`);
    execSync(`chmod +x ${filePath}`);
  }
}

function log(message) {
  if (config.ViewConsoleLog) {
    console.log(message);
  }
}
function errorLog(message) {
  if (config.ViewConsoleError) {
    console.error(message);
  }
}

log(`[START.JS] VERSION: ${scriptVersion}`);
log(`[START.JS] Script run using system Node JS: ${process.version}`);

function startBot(botName, botConfig) {
  const originalDir = process.cwd();

  const fullBotScriptPath = path.join(originalDir, botConfig.Path);

  const botDir = path.dirname(fullBotScriptPath);

  function runBot() {
    let nodeExecutable = "node";
    if (botConfig.CustomVersionNodeJs) {
      nodeExecutable = path.join(originalDir, botConfig.NodeJsPath);
      fixPermissions(nodeExecutable);
    }

    const versionResult = spawnSync(nodeExecutable, ["--version"], {
      encoding: "utf8",
    });
    const usedNodeVersion = versionResult.stdout
      ? versionResult.stdout.trim()
      : "unknown";

    log(`[START.JS] The bot ${botName} uses Node JS: ${usedNodeVersion}`);

    const processInstance = spawn(nodeExecutable, [fullBotScriptPath], {
      cwd: botDir,
      stdio: "inherit",
    });

    processInstance.on("error", (err) => {
      errorLog(`[START.JS] Error starting bot "${botName}": ${err.message}`);
    });

    processInstance.on("close", (code) => {
      if (code === 0) {
        log(`[START.JS] Bot "${botName}" has finished.`);
      } else {
        errorLog(`[START.JS] Bot "${botName}" exited with code ${code}.`);
      }

      if (botConfig.AutoRestart) {
        log(
          `[START.JS] Restarting bot "${botName}" in ${
            botConfig.RestartDelay / 1000
          } second...`
        );
        setTimeout(runBot, botConfig.RestartDelay);
      }
    });
  }

  runBot();
}

for (let botName in config) {
  if (
    config.hasOwnProperty(botName) &&
    typeof config[botName] === "object" &&
    config[botName].Path
  ) {
    startBot(botName, config[botName]);
  }
}

//------------//
// End Region //
//------------//
