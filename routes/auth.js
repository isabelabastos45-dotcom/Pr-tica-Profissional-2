const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* =========================
   🔐 REGISTER
========================= */
router.post("/register", async (req, res) => {
    try {
        const { nome, username, email, senha } = req.body;

        if (!nome || !username || !email || !senha) {
            return res.status(400).json({
                msg: "Todos os campos são obrigatórios"
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                msg: "Senha deve ter no mínimo 6 caracteres"
            });
        }

        const emailExiste = await User.findOne({ email });
        if (emailExiste) {
            return res.status(400).json({
                msg: "E-mail já cadastrado"
            });
        }

        const usernameExiste = await User.findOne({ username });
        if (usernameExiste) {
            return res.status(400).json({
                msg: "Username já está em uso"
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = new User({
            nome,
            username,
            email,
            senha: senhaHash
        });

        await novoUsuario.save();

        return res.json({
            msg: "Usuário criado com sucesso!"
        });

    } catch (err) {
        return res.status(500).json({
            erro: err.message
        });
    }
});

/* =========================
   🔑 LOGIN (SEM JWT)
========================= */
router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                msg: "Usuário não encontrado"
            });
        }

        const senhaOk = await bcrypt.compare(senha, usuario.senha);

        if (!senhaOk) {
            return res.status(400).json({
                msg: "Senha inválida"
            });
        }

        return res.json({
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                username: usuario.username,
                email: usuario.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            erro: err.message
        });
    }
});

module.exports = router;