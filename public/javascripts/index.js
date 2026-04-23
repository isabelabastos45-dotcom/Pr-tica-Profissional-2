const openFolderPopup = document.getElementById("openFolderPopup");
const folderPopup = document.getElementById("folderPopup");
const flashcardPopup = document.getElementById("flashcardPopup");

const saveFolder = document.getElementById("saveFolder");
const closeFolder = document.getElementById("closeFolder");
const folderNameInput = document.getElementById("folderName");
const folderCategory = document.getElementById("folderCategory");
const folderList = document.getElementById("folderList");

const folderTitle = document.getElementById("folderTitle");
const addFlashcard = document.getElementById("addFlashcard");
const flashcardForm = document.getElementById("flashcardForm");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const saveCard = document.getElementById("saveCard");
const cardList = document.querySelector(".card-list-container");
const closeFlashcards = document.getElementById("closeFlashcards");

let folders = [];
let currentFolder = null;

/*popups*/
openFolderPopup.onclick = () => folderPopup.classList.remove("hide");
closeFolder.onclick = () => folderPopup.classList.add("hide");

/*salvar a pasta*/
saveFolder.onclick = () => {
    const name = folderNameInput.value.trim();
    const category = folderCategory.value;

    if (!name) return alert("Digite um nome!");

    folders.push({
        name,
        category,
        cards: []
    });

    renderFolders();
    filterElements("Geral");

    folderNameInput.value = "";
    folderPopup.classList.add("hide");
};

/*render da pasta*/
function renderFolders() {
    folderList.innerHTML = "";

    folders.forEach((f, i) => {
        const div = document.createElement("div");

        div.classList.add("folder-item");
        div.dataset.category = f.category;

        const name = document.createElement("p");
        name.innerText = f.name;
        name.classList.add("folder-name");

        div.appendChild(name);

        div.onclick = () => openFolder(i);

        folderList.appendChild(div);
    });
}

/*abrir pasta*/
function openFolder(index) {
    currentFolder = folders[index];
    folderTitle.innerText = currentFolder.name;

    renderCards();
    flashcardPopup.classList.remove("hide");
}

/*fechar flashcard*/
closeFlashcards.onclick = () => {
    flashcardPopup.classList.add("hide");
    flashcardForm.classList.add("hide");
    question.value = "";
    answer.value = "";
};

/*mostrar o form*/
addFlashcard.onclick = () => {
    flashcardForm.classList.remove("hide");
};

/*salvar flashcard*/
saveCard.onclick = () => {
    const q = question.value.trim();
    const a = answer.value.trim();

    if (!q || !a) return alert("Preencha tudo!");

    currentFolder.cards.push({ q, a });

    renderCards();

    question.value = "";
    answer.value = "";
    flashcardForm.classList.add("hide");
};

/*render do card*/
function renderCards() {
    cardList.innerHTML = "";

    currentFolder.cards.forEach(c => {
        const div = document.createElement("div");
        div.classList.add("card");

        const questionEl = document.createElement("p");
        questionEl.innerHTML = `<strong>${c.q}</strong>`;

        const answerEl = document.createElement("p");
        answerEl.innerText = c.a;
        answerEl.classList.add("hide", "answer");

        const toggleBtn = document.createElement("a");
        toggleBtn.innerText = "Mostrar resposta";
        toggleBtn.style.cursor = "pointer";

        toggleBtn.onclick = () => {
            answerEl.classList.toggle("hide");

            toggleBtn.innerText = answerEl.classList.contains("hide")
                ? "Mostrar resposta"
                : "Ocultar resposta";
        };

        div.appendChild(questionEl);
        div.appendChild(toggleBtn);
        div.appendChild(answerEl);

        cardList.appendChild(div);
    });
}

/*filtro*/
function filterElements(category) {
    const elements = document.querySelectorAll(".folder-item");

    elements.forEach(el => {
        const elCategory = el.dataset.category;

        el.classList.remove("show");

        if (category === "Geral" || elCategory === category) {
            el.classList.add("show");
        }
    });
}

/*iniciar*/
window.onload = () => {
    filterElements("Geral");
};