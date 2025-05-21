const axios = require("axios");
module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Monitoring Epic Games API",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Other Stuff",

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `Monitoring Epic Games Promotions`;
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
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-v14/actions/monitoring_epic_games_api_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, "Game Data"];
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["storage", "varName2"],

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
        >1.2</a
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
  

      <br>this action monitors the epic games API, if it detects any new promotions, it continues the action<br>
    `;
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName2 = this.evalMessage(data.varName2, cache);

    let lastCheckedData = await fetchSalesGameData();

    while (true) {
      const currentData = await fetchSalesGameData();

      if (!currentData) {
        return;
      }

      if (JSON.stringify(currentData) !== JSON.stringify(lastCheckedData)) {
        this.storeValue(currentData, storage, varName2, cache);

        lastCheckedData = currentData;
      }

      await new Promise((resolve) => setTimeout(resolve, 30000));
    }
  },
};

async function fetchSalesGameData() {
  try {
    const response = await axios.get(
      "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US"
    );

    if (
      !response.data ||
      !response.data.data ||
      !response.data.data.Catalog.searchStore.elements
    ) {
      console.error("No games found in API response");
      return null;
    }

    const games = response.data.data.Catalog.searchStore.elements;

    const game = games[5];

    if (!game) {
      console.error("Game not found");
      return null;
    }

    return {
      title: game.title,
      originalPrice:
        game.price?.totalPrice?.fmtPrice?.originalPrice || "Not available",
      discountedPrice:
        game.price?.totalPrice?.fmtPrice?.discountPrice || "Free",
      coverImage:
        game.keyImages.find((image) => image.type === "OfferImageWide")?.url ||
        "No image available",
      gameLink: `https://store.epicgames.com/pl/p/${
        game.catalogNs?.mappings[0]?.pageSlug || "default-slug"
      }`,
      description: game.description || "No description available",
      promotionEndTimestamp:
        game.promotions?.promotionalOffers?.[0]?.promotionalOffers?.[0]
          ?.endDate || "No end date",
    };
  } catch (error) {
    console.error("Error fetching data from Epic Games API:", error);
    return null;
  }
}
