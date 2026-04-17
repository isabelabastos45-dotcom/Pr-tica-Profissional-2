const openFolderPopup = document.getElementById("openFolderPopup");
const folderPopup = document.getElementById("folderPopup");
const flashcardPopup = document.getElementById("flashcardPopup");

const saveFolder = document.getElementById("saveFolder");
const closeFolder = document.getElementById("closeFolder");
const folderNameInput = document.getElementById("folderName");
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

openFolderPopup.onclick = () => folderPopup.classList.remove("hide");

closeFolder.onclick = () => folderPopup.classList.add("hide");

saveFolder.onclick = () => {
    const name = folderNameInput.value.trim();
    if (!name) return alert("Digite um nome!");

    const folder = { name, cards: [] };
    folders.push(folder);
    renderFolders();

    folderNameInput.value = "";
    folderPopup.classList.add("hide");
};

function renderFolders() {
    folderList.innerHTML = "";
    folders.forEach((f, i) => {
        const div = document.createElement("div");
        div.classList.add("folder-item");
       const img = document.createElement("img");
       img.src = "https://i.imgur.com/pECxvXy.png";
       img.classList.add("folder-icon");
       
       const name = document.createElement("p");
       name.innerText = f.name;
       name.classList.add("folder-name");
       
       div.appendChild(img);
       div.appendChild(name);
       div.onclick = () => openFolder(i);
       folderList.appendChild(div);
    });
}

function openFolder(index) {
    currentFolder = folders[index];
    folderTitle.innerText = currentFolder.name;
    renderCards();
    flashcardPopup.classList.remove("hide");
}

closeFlashcards.onclick = () => {
    flashcardPopup.classList.add("hide");
    flashcardForm.classList.add("hide");
    question.value = "";
    answer.value = "";
};

addFlashcard.onclick = () => flashcardForm.classList.remove("hide");

saveCard.onclick = () => {
    const q = question.value.trim();
    const a = answer.value.trim();
    if (!q || !a) return alert("Preencha tudo!");

    const card = { q, a };
    currentFolder.cards.push(card);
    renderCards();

    question.value = "";
    answer.value = "";
    flashcardForm.classList.add("hide");
};

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
        toggleBtn.style.color = "#000000";

        toggleBtn.addEventListener("click", () => {
            answerEl.classList.toggle("hide");
            toggleBtn.innerText = answerEl.classList.contains("hide")
                ? "Mostrar resposta"
                : "Ocultar resposta";
        });

        div.appendChild(questionEl);
        div.appendChild(toggleBtn);
        div.appendChild(answerEl);

        cardList.appendChild(div);
    });
}
