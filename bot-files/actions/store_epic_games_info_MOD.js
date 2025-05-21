const axios = require("axios");
module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Store Epic Free Games Info",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Other Stuff",

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `Get info for the selected game from the Epic Games Store`;
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
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-v14/actions/store_epic_games_info_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, "Epic Games Info"];
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["storage", "varName2", "infoType", "currency"],

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
  

      <div style="padding-top: 8px;">
        <span class="dbminputlabel">Select Information to Fetch</span><br>
        <select id="infoType" class="round">
          <option value="0" ${
            data.infoType == 0 ? "selected" : ""
          }>Game Title</option>
          <option value="1" ${
            data.infoType == 1 ? "selected" : ""
          }>Original Price</option>
          <option value="2" ${
            data.infoType == 2 ? "selected" : ""
          }>Discounted Price</option>
          <option value="3" ${
            data.infoType == 3 ? "selected" : ""
          }>Cover Image</option>
          <option value="4" ${
            data.infoType == 4 ? "selected" : ""
          }>Game Link</option>
          <option value="5" ${
            data.infoType == 5 ? "selected" : ""
          }>Game Description</option>
          <option value="6" ${
            data.infoType == 6 ? "selected" : ""
          }>Promotion End Timestamp</option>
        </select>
      </div>

      <div style="padding-top: 8px;">
        <span class="dbminputlabel">Select Currency</span><br>
        <select id="currency" class="round">
          <option value="USD" ${
            data.currency == "USD" ? "selected" : ""
          }>USD</option>
          <option value="EUR" ${
            data.currency == "EUR" ? "selected" : ""
          }>EUR</option>
          <option value="PLN" ${
            data.currency == "PLN" ? "selected" : ""
          }>PLN</option>
        </select>
      </div>
  
      <br><br>
  
      <div>
        <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>
      </div>
    `;
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];

    const gameData = await fetchSalesGameData();

    if (!gameData) {
      this.callNextAction(cache);
      return;
    }

    const infoType = parseInt(data.infoType, 10);
    const selectedCurrency = this.evalMessage(data.currency, cache);
    let selectedResult;

    if (infoType === 1) {
      const originalPrice = gameData.originalPrice;
      const originalCurrency = "USD";

      if (selectedCurrency && selectedCurrency !== originalCurrency) {
        selectedResult = await convertCurrency(
          originalPrice,
          originalCurrency,
          selectedCurrency
        );
      } else {
        selectedResult = originalPrice;
      }
    } else if (infoType === 2) {
      selectedResult = gameData.discountedPrice;
    } else {
      switch (infoType) {
        case 0:
          selectedResult = gameData.title;
          break;
        case 3:
          selectedResult = gameData.coverImage;
          break;
        case 4:
          selectedResult = gameData.gameLink;
          break;
        case 5:
          selectedResult = gameData.description;
          break;
        case 6:
          const promotionEndTimestamp = gameData.promotionEndTimestamp;
          if (promotionEndTimestamp !== "No end date") {
            selectedResult = `<t:${Math.floor(
              new Date(promotionEndTimestamp).getTime() / 1000
            )}:R>`;
          } else {
            selectedResult = "No promotion end date available";
          }
          break;
        default:
          selectedResult = "Information not available";
      }
    }

    const storage = parseInt(data.storage, 10);
    const varName2 = this.evalMessage(data.varName2, cache);

    this.storeValue(selectedResult, storage, varName2, cache);

    this.callNextAction(cache);
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
      platforms: game.platforms || ["No platforms available"],
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

async function convertCurrency(price, fromCurrency, toCurrency) {
  price = parseFloat(price.replace(/[^\d.-]/g, ""));

  if (isNaN(price)) {
    console.error("Incorrect price:", price);
    return "Incorrect price";
  }

  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  if (!exchangeRate) {
    return "Conversion error";
  }

  return (price * exchangeRate).toFixed(2);
}

async function getExchangeRate(fromCurrency, toCurrency) {
  try {
    const apiKey = "23da783f0cf0619caf488782";
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    const response = await axios.get(url);
    const rates = response.data.conversion_rates;

    if (!rates[toCurrency]) {
      console.error("Exchange rate for currency unknown");
      return null;
    }

    return rates[toCurrency];
  } catch (error) {
    console.error("Error downloading courses:", error);
    return null;
  }
}
