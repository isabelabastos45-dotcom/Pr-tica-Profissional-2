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
        question.value = "";
        answer.value = "";
    }
}

cardButton.addEventListener("click", submitQuestion);