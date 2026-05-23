const express = require("express");
const router = express.Router();

const Flashcard = require("../models/Flashcard");

router.post("/", async (req, res) => {

    console.log(req.body);

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

        console.log(erro);

        res.status(500).json({
            erro: erro.message
        });

    }

});

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