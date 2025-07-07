const form = document.getElementById("summonerForm");
const errorBox = document.getElementById("errorBox");


form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("summonerName").value.trim();
    const tag = document.getElementById("summonerTag").value.trim();
    const region = document.getElementById("region");
    const selectedRegion = region.value;

    const errors = [];

    if (!name) errors.push("Name is required");
    if (!tag) errors.push("Tag is required");
    if (!region) errors.push("Region is required");
    if (name.length < 4) errors.push("Name is too short");

    if (errors.length > 0) {
        errorBox.innerHTML = errors.map(err => `<div>• ${err}</div>`).join("");
        return;
    }

    errorBox.innerHTML = "";
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("tag", tag);

    setDisplay();

    await searchSummoner(name, tag, selectedRegion);

    form.reset();
})

async function searchSummoner(name, tag, selectedRegion) {
    try {
        const resultPuiid = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(tag)}?api_key=RGAPI-c9b4a69c-93ff-4591-87cc-dde44a585c44`);
        const dataPuiid = await resultPuiid.json();

        const puuid = dataPuiid.puuid;


        const resultRank = await fetch(`https://${selectedRegion}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}?api_key=RGAPI-c9b4a69c-93ff-4591-87cc-dde44a585c44`)
        const dataRank = await resultRank.json();

        console.log(dataRank);

        displaySummonerStats(dataRank);
    } catch (error) {
        console.error(error);
        errorBox.innerHTML = "⚠️ Грешка при заявката към Riot API.";
    }
}

function displaySummonerStats(data) {
    const soloCol = document.getElementById("soloQ");
    const flexCol = document.getElementById("flexQ");
    const title = document.getElementById("accountTitle");

    const name = sessionStorage.getItem("name");
    const tag = sessionStorage.getItem("tag");
    title.innerHTML += " " + name + "#" + tag;

    let soloData = data.find(q => q.queueType === "RANKED_SOLO_5x5");
    let flexData = data.find(q => q.queueType === "RANKED_FLEX_SR");

    if (soloData) {
        const soloQRank = document.createElement("p");
        const soloQPoints = document.createElement("p");
        const soloQWins = document.createElement("p");
        const soloQLosses = document.createElement("p");
        const soloQWR = document.createElement("p");

        soloQRank.textContent = soloData.tier + " " + soloData.rank;
        soloQPoints.textContent = soloData.leaguePoints + " LP";
        soloQWins.textContent = "Wins: " + soloData.wins;
        soloQLosses.textContent = "Losses: " + soloData.losses;
        soloQWR.textContent = "WR: " + Math.round((soloData.wins / (soloData.wins + soloData.losses)) * 100).toFixed(1) + "%";

        soloCol.append(soloQRank, soloQPoints, soloQWins, soloQLosses, soloQWR);
    }

    if (flexData) {
        const flexQRank = document.createElement("p");
        const flexQPoints = document.createElement("p");
        const flexQWins = document.createElement("p");
        const flexQLosses = document.createElement("p");
        const flexQWR = document.createElement("p");

        flexQRank.textContent = flexData.tier + " " + flexData.rank;
        flexQPoints.textContent = flexData.leaguePoints + " LP";
        flexQWins.textContent = "Wins: " + flexData.wins;
        flexQLosses.textContent = "Losses: " + flexData.losses;
        flexQWR.textContent = "WR: " + Math.round((flexData.wins / (flexData.wins + flexData.losses)) * 100).toFixed(1) + "%";

        flexCol.append(flexQRank, flexQPoints, flexQWins, flexQLosses, flexQWR);
    }

    if (!soloData && !flexData) {
        soloCol.innerHTML = "<p>Няма намерени рангове.</p>";
        flexCol.innerHTML = "";
    }
}


function setDisplay() {
    const errorBox = document.getElementById("errorBox");
    if (errorBox) errorBox.remove();

    const existingDisplay = document.getElementById("displayInfo");
    if (existingDisplay) {
        existingDisplay.remove();
    }

    const formDiv = document.getElementById("formDiv");
    formDiv.setAttribute("class", "col-12 col-lg-4 mb-4");
    formDiv.style.minWidth = "300px";

    const displayInfo = document.createElement("div");
    displayInfo.setAttribute("id", "displayInfo");
    displayInfo.setAttribute("class", "col-lg-8");

    const card = document.createElement("div");
    card.setAttribute("class", "card shadow-sm");

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.setAttribute("id", "accountTitle");
    title.textContent = "Account Info:";

    const infoRow = document.createElement("div");
    infoRow.setAttribute("class", "row");
    infoRow.setAttribute("id", "infoRow");

    const soloCol = document.createElement("div");
    soloCol.setAttribute("class", "col-md-6 mb-3");
    soloCol.setAttribute("id", "soloQ");

    const soloBox = document.createElement("div");
    soloBox.setAttribute("class", "p-3 bg-secondary bg-opacity-10 rounded text-center");
    const soloTitle = document.createElement("h6");
    soloTitle.textContent = "SOLO QUEUE";
    soloBox.appendChild(soloTitle);
    soloCol.appendChild(soloBox);

    const flexCol = document.createElement("div");
    flexCol.setAttribute("class", "col-md-6 mb-3");
    flexCol.setAttribute("id", "flexQ");

    const flexBox = document.createElement("div");
    flexBox.setAttribute("class", "p-3 bg-secondary bg-opacity-10 rounded text-center");
    const flexTitle = document.createElement("h6");
    flexTitle.textContent = "FLEX QUEUE";
    flexBox.appendChild(flexTitle);
    flexCol.appendChild(flexBox);

    infoRow.appendChild(soloCol);
    infoRow.appendChild(flexCol);

    cardBody.appendChild(title);
    cardBody.appendChild(infoRow);
    card.appendChild(cardBody);
    displayInfo.appendChild(card);

    document.getElementById("formRow").appendChild(displayInfo);
}




