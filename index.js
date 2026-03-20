const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard-con");
const closeBtn = document.getElementById("close-btn");

let editBool = false;

addQuestion.addEventListener("click", () => {
    container.classList.add("hide");
    question.value = "";
    answer.value = "";
    addQuestionCard.classList.remove("hide");
});

closeBtn.addEventListener("click", () => {
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");

    if (editBool) {
        editBool = false;
        submitQuestion();
    }
});

function submitQuestion() {
    container.classList.remove("hide");
    editBool = false;

    let tempQuestion = question.value.trim();
    let tempAnswer = answer.value.trim();

    if (!tempQuestion || !tempAnswer) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");

        viewlist();

        question.value = "";
        answer.value = "";
    }
}

cardButton.addEventListener("click", submitQuestion);

function hideQuestion() {
    addQuestionCard.classList.add("hide");
    container.classList.remove("hide");
}

function viewlist() {
    var listCard = document.getElementsByClassName("card-list-container");
    var div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML += `<p class="question-div">${question.value}</p>`;
    var displayAnswer = document.createElement("p");
    displayAnswer.classList.add("answer-div", "hide");
    displayAnswer.innerText = answer.value;

    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "show-hide-btn");
    link.innerHTML = "Mostrar/Esconder";;
    link.addEventListener("click", () => {displayAnswer.classList.toggle("hide")});

    div.appendChild(link);
    div.appendChild(displayAnswer);

    let buttonsCon = document.createElement("div");
    buttonsCon.classList.add("buttons-con");
    var editButton = document.createElement("button");
    editButton.setAttribute("class", "edit");
    editButton.innerHTML = `<i class = "fa-solid fa-pen-to-square"></i>`;
    editButton.addEventListener("click",  () => {
        editBool = true;
        modifyElement(editButton, true);
        addQuestionCard.classList.remove("hide");
    })

    buttonsCon.appendChild(editButton);

    div.appendChild(buttonsCon);
    listCard[0].appendChild(div);
    hideQuestion();
}

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement.parentElement;
    let parentQuestion = parentDiv.querySelector(".question-div").innerText;
    if(edit){
        let parentAns = parentDiv.querySelector(".answer-div").innerText;
        answer.value = parentAns;
        question.value = parentQuestion;
        disableButtons(true);
    }
    parentDiv.remove();
}