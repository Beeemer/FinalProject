const form = document.getElementById("summonerForm");
const errorBox = document.getElementById("errorBox");


form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("summonerName").value.trim();
    const tag = document.getElementById("summonerTag").value.trim();

    const errors = [];

    if (!name) errors.push("Name is required");
    if (!tag) errors.push("Tag is required");
    if (name.length < 4) errors.push("Name is too short");

    if (errors.length > 0) {
        errorBox.innerHTML = errors.map(err => `<div>• ${err}</div>`).join("");
        return;
    }

    errorBox.innerHTML = "";
    sessionStorage.setItem("gameName", name);
    sessionStorage.setItem("gameTag", tag);

    await searchSummoner(name, tag);
})

async function searchSummoner(name, tag) {
    try {
        const result = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(tag)}?api_key=RGAPI-c9b4a69c-93ff-4591-87cc-dde44a585c44`);
        const data = await result.json();

        displaySummonerStats(data);
    } catch (error) {
        console.error(error);
        errorBox.innerHTML = "⚠️ Грешка при заявката към Riot API.";
    }
}

function displaySummonerStats(data) {
    form.remove();
    errorBox.remove();

    const newP = document.createElement("p");
    newP.innerText = `Summoner ID: ${data.puuid || "Не е намерен"}`;
    document.body.appendChild(newP);
}

