const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// CADASTRO
router.post("/register", async (req, res) => {
    try {

        const { nome, username, email, senha } = req.body;

        const usuarioExiste = await User.findOne({ email });

        if (usuarioExiste) {
            return res.status(400).json({
                msg: "Usuário já existe"
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

       const novoUsuario = new User({
            nome,
            username,
            email,
            senha: senhaCriptografada
     
        });
        await novoUsuario.save();

        res.json({
            msg: "Usuário criado com sucesso"
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, senha } = req.body;

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                msg: "Usuário não encontrado"
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(400).json({
                msg: "Senha inválida"
            });
        }

        const token = jwt.sign(
            { id: usuario._id },
            "segredo",
            { expiresIn: "7d" }
        );

        res.json({
    token,
    usuario: {
        id: usuario._id,
        nome: usuario.nome,
        username: usuario.username,
        email: usuario.email
    }
});
    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});

module.exports = router;