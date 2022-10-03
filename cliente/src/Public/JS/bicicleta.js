const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
    o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    });
});


const selected2 = document.querySelector(".selected2");
const options2Container = document.querySelector(".options-container-2");

const options2List = document.querySelectorAll(".option2");

selected2.addEventListener("click", () => {
    options2Container.classList.toggle("active");
});

options2List.forEach(o => {
    o.addEventListener("click", () => {
        selected2.innerHTML = o.querySelector("label").innerHTML;
        options2Container.classList.remove("active");
    });
});

const selected3 = document.querySelector(".selected3");
const options3Container = document.querySelector(".options-container-3");

const options3List = document.querySelectorAll(".option3");

selected3.addEventListener("click", () => {
    options3Container.classList.toggle("active");
});

options3List.forEach(o => {
    o.addEventListener("click", () => {
        selected3.innerHTML = o.querySelector("label").innerHTML;
        options3Container.classList.remove("active");
    });
});