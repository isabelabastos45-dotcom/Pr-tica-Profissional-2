const express = require("express");
const router = express.Router();

const Flashcard = require("../models/Flashcard");


// SALVAR FLASHCARD
router.post("/", async (req, res) => {

    try {

        const {
            pergunta,
            resposta,
            usuarioId
        } = req.body;

        const novoFlashcard = new Flashcard({
            pergunta,
            resposta,
            usuarioId
        });

        await novoFlashcard.save();

        res.json({
            msg: "Flashcard salvo!"
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});


// LISTAR FLASHCARDS DO USUÁRIO
router.get("/:usuarioId", async (req, res) => {

    try {

        const flashcards = await Flashcard.find({
            usuarioId: req.params.usuarioId
        });

        res.json(flashcards);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});

module.exports = router;