document.getElementById("contactForm").addEventListener("submit", (e) => {

    const name    = document.getElementById("name").value.trim();
    const email   = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const errors = [];

    if (!name)    errors.push("Моля, въведете име.");
    if (!email)   errors.push("Моля, въведете имейл адрес.");
    if (!message) errors.push("Моля, въведете съобщение.");

    if (name && name.length < 3) {
        errors.push("Името трябва да е поне 3 символа.");
    }
    if (message && message.length < 10) {
        errors.push("Съобщението трябва да е поне 10 символа.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
        errors.push("Моля, въведете валиден имейл адрес.");
    }

    if (errors.length > 0) {
        e.preventDefault()
        alert(errors.join("\n"));
    } else {

    }
});