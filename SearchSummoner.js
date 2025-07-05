const form = document.getElementById("summonerForm");
const errorBox = document.getElementById("errorBox");
const formDiv = document.getElementById("formDiv");


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
    sessionStorage.setItem("gameName", name);
    sessionStorage.setItem("gameTag", tag);
    sessionStorage.setItem("gameRegion", selectedRegion);

    setDisplay();

    await searchSummoner(name, tag, selectedRegion);
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
    //  тук ще показваме статовете на акаунта
    // form.remove();
    // errorBox.remove();

    // const newP = document.createElement("p");
    // newP.innerText = `Summoner ID: ${data[0].queueType || "Не е намерен"}`;
    // document.body.appendChild(newP);
}

function setDisplay() {
    const errorBox = document.getElementById("errorBox");
    if (errorBox) errorBox.remove();

    if (document.getElementById("displayInfo")) return;

    const formDiv = document.getElementById("formDiv");
    formDiv.setAttribute("class", "col-12 col-lg-4 mb-4");
    formDiv.style.minWidth = "300px";

    // displayInfo с нормален grid, без flex
    const displayInfo = document.createElement("div");
    displayInfo.setAttribute("id", "displayInfo");
    displayInfo.setAttribute("class", "col-lg-8");

    // Вътрешна карта
    const card = document.createElement("div");
    card.setAttribute("class", "card shadow-sm");

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.textContent = "Account Info";

    // Ред за двете колони
    const infoRow = document.createElement("div");
    infoRow.setAttribute("class", "row");
    infoRow.setAttribute("id", "infoRow");

    // SOLO QUEUE
    const soloCol = document.createElement("div");
    soloCol.setAttribute("class", "col-md-6 mb-3");
    soloCol.setAttribute("id", "soloQ");

    const soloBox = document.createElement("div");
    soloBox.setAttribute("class", "p-3 bg-secondary bg-opacity-10 rounded text-center");
    const soloTitle = document.createElement("h6");
    soloTitle.textContent = "SOLO QUEUE";
    soloBox.appendChild(soloTitle);
    soloCol.appendChild(soloBox);

    // FLEX QUEUE
    const flexCol = document.createElement("div");
    flexCol.setAttribute("class", "col-md-6 mb-3");
    flexCol.setAttribute("id", "flexQ");

    const flexBox = document.createElement("div");
    flexBox.setAttribute("class", "p-3 bg-secondary bg-opacity-10 rounded text-center");
    const flexTitle = document.createElement("h6");
    flexTitle.textContent = "FLEX QUEUE";
    flexBox.appendChild(flexTitle);
    flexCol.appendChild(flexBox);

    // Добавяме колони в реда
    infoRow.appendChild(soloCol);
    infoRow.appendChild(flexCol);

    // Сглобяваме всичко
    cardBody.appendChild(title);
    cardBody.appendChild(infoRow);
    card.appendChild(cardBody);
    displayInfo.appendChild(card);

    // Добавяме в formRow
    document.getElementById("formRow").appendChild(displayInfo);
}




