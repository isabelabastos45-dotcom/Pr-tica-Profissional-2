const mongoose = require("mongoose");

const FlashcardSchema = new mongoose.Schema({

    pergunta: {
        type: String,
        required: true
    },

    resposta: {
        type: String,
        required: true
    },

    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});

module.exports =
    mongoose.models.Flashcard ||
    mongoose.model("Flashcard", FlashcardSchema);