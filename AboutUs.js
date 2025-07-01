const btn = document.getElementById("about-btn");
const cont = document.getElementById("infoCardContainer");
const cardCol = document.getElementById("cardCol");
const cardTitle = document.getElementsByClassName("card-title")[0];
const cardText = document.getElementsByClassName("card-text")[0];

let isExpanded = false;

btn.addEventListener("click", function () {
    const existingInfo = document.querySelector("#infoCardContainer .col-8");

    if(!isExpanded) {

        if (existingInfo) return;

        const list1 = document.createElement("ul");
        const list2 = document.createElement("ol");
        const item = document.createElement("li");
        const item2 = document.createElement("li");
        const item3 = document.createElement("li");
        const item4 = document.createElement("li");
        const item5 = document.createElement("li");
        const par2 = document.createElement("p");

        const newInfo = document.createElement("div");
        const par = document.createElement("p");
        const newText = document.createTextNode("Здравейте казвам се Мартин, роден и израстнал в град Варна");

        const programmingInfo = document.createTextNode("В университета се докознах до различни езици за програиране и технологии, като по разпространените от тях са С++, PHP, Java, HTML, CSS, JavaScript и за бази от данни MySQL. Носочил съм си вниманието главно към PHP, Java и JavaScript")
        // test
        list1.innerHTML = "Образование"
        item.innerHTML = "завършил 4-та езикова гимназия \"фредерик-Жолио-Кюри\"";
        item2.innerHTML = "учащ в Технически Университет Варна";
        list2.innerHTML = "Езици";
        item3.innerHTML = "Български";
        item4.innerHTML = "Английски";
        item5.innerHTML = "Френски";


        cont.style.marginTop = "50px";
        newInfo.classList.add("col-8");
        cardCol.setAttribute("class", "col-4");

        // test
        list1.appendChild(item);
        list1.appendChild(item2);
        list2.appendChild(item3);
        list2.appendChild(item4);
        list2.appendChild(item5);

        par2.appendChild(programmingInfo);


        par.appendChild(newText);
        newInfo.appendChild(par);
        newInfo.appendChild(par2);


        //test
        newInfo.appendChild(list1);
        newInfo.appendChild(list2);

        cont.appendChild(newInfo);

        cardTitle.innerHTML = "Мартин Стоянов";
        cardText.innerHTML = "Начинаещ в програмирането ;)";
        btn.innerHTML = "Скрии";

        isExpanded = true;
    } else{
        if (existingInfo) existingInfo.remove();

        cardTitle.innerHTML = "Малко за мен";
        cardText.innerHTML = "Казвам се Мартин на 21 години, завършил 4-та езикова гимназия \"фредерик-Жолио-Кюри\" в град Варна, уча в ТУ-Варна със специалност СИТ";
        btn.innerHTML = "Повече за мен"

        isExpanded = false;
    }


})




