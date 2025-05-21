const { spawn } = require("child_process");
const path = require("path");

const autoRestart = true; // Restart bot when it crashes? (true / false)

const restartDelay = 5000; // Restart delay. (5000 = 5 second)

function startBot(botFolder) {
  const originalDir = process.cwd();
  const botPath = path.join(originalDir, botFolder);

  function runBot() {
    const processInstance = spawn("node", ["bot.js"], {
      cwd: botPath,
      stdio: "inherit",
    });

    processInstance.on("error", (error) => {
      console.error(`Error starting bot  ${botFolder}:`, error.message);
    });

    processInstance.on("close", (code) => {
      if (code === 0) {
        console.log(`Bot ${botFolder} has exited.`);
      } else {
        console.error(`Bot ${botFolder} exited with code  ${code}.`);
      }

      if (autoRestart) {
        console.log(
          `Restarting bot ${botFolder} in ${restartDelay / 1000} second...`
        );
        setTimeout(runBot, restartDelay);
      }
    });
  }

  runBot();
}

// You can add more bots here (remember to use the correct folder name)
startBot("Planeta Vipów v14");
startBot("DBM POLSKA v14");
