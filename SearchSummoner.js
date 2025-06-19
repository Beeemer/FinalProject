const form = document.getElementById("summonerForm");
const errorBox = document.getElementById("errorBox");


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("summonerName").value.trim();
    const tag = document.getElementById("summonerTag").value.trim();

    const errors = [];

    if (!name)  errors.push("Name is required");
    if (!tag)  errors.push("Tag is required");

    if(name.length < 4){
        errors.push("Name is too short");
    }

    if(errors.length > 0){
        event.preventDefault();
        errorBox.innerHTML = errors.map(err => `<div>• ${err}</div>`).join("");
    }
    else {
        errorBox.innerHTML = "";
        form.submit();
    }

})