/* ==========================================================================
   SELETORES PRINCIPAIS (Elementos do DOM)
   ========================================================================== */
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

/* ==========================================================================
   POPUPS (Abertura e Fechamento)
   ========================================================================== */
if (openFolderPopup && folderPopup) {
    openFolderPopup.onclick = () => {
        folderPopup.classList.remove("hide");
    };
}

if (closeFolder && folderPopup) {
    closeFolder.onclick = () => {
        folderPopup.classList.add("hide");
    };
}

/* ==========================================================================
   SALVAR PASTA
   ========================================================================== */
if (saveFolder && folderNameInput && folderCategory && folderPopup) {
    saveFolder.onclick = () => {
        const name = folderNameInput.value.trim();
        const category = folderCategory.value;

        if (!name) {
            return alert("Digite um nome!");
        }

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
}

/* ==========================================================================
   RENDER PASTAS
   ========================================================================== */
function renderFolders() {
    if (!folderList) return;

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

/* ==========================================================================
   ABRIR PASTA
   ========================================================================== */
function openFolder(index) {
    if (!folders[index]) return;
    
    currentFolder = folders[index];

    if (folderTitle) {
        folderTitle.innerText = currentFolder.name;
    }

    renderCards();

    if (flashcardPopup) {
        flashcardPopup.classList.remove("hide");
    }
}

/* ==========================================================================
   FECHAR FLASHCARDS
   ========================================================================== */
if (closeFlashcards && flashcardPopup && flashcardForm) {
    closeFlashcards.onclick = () => {
        flashcardPopup.classList.add("hide");
        flashcardForm.classList.add("hide");

        if (question) question.value = "";
        if (answer) answer.value = "";
    };
}

/* ==========================================================================
   MOSTRAR FORMULÁRIO DE CARD
   ========================================================================== */
if (addFlashcard && flashcardForm) {
    addFlashcard.onclick = () => {
        flashcardForm.classList.remove("hide");
    };
}

/* ==========================================================================
   SALVAR FLASHCARD (Integração com o Servidor)
   ========================================================================== */
if (saveCard) {
    saveCard.onclick = async () => {
        if (!question || !answer || !flashcardForm) return;

        const q = question.value.trim();
        const a = answer.value.trim();

        if (!q || !a) {
            return alert("Preencha tudo!");
        }

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!usuario) {
            return alert("Você precisa estar logado!");
        }

        try {
            const respostaServidor = await fetch("/flashcards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pergunta: q,
                    resposta: a,
                    usuarioId: usuario.id
                })
            });

            const data = await respostaServidor.json();
            alert(data.msg);

            if (currentFolder) {
                currentFolder.cards.push({ q, a });
                renderCards();
            }

            question.value = "";
            answer.value = "";
            flashcardForm.classList.add("hide");

        } catch (erro) {
            console.log(erro);
            alert("Erro ao salvar flashcard");
        }
    };
}

/* ==========================================================================
   RENDER FLASHCARDS
   ========================================================================== */
function renderCards() {
    if (!cardList || !currentFolder) return;

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

/* ==========================================================================
   SISTEMA DE FILTROS
   ========================================================================== */
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

/* ==========================================================================
   INICIALIZAÇÃO DA PÁGINA
   ========================================================================== */
window.onload = () => {
    filterElements("Geral");
};