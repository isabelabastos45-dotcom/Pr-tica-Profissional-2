const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Lista de provedores de e-mail temporário/falso para bloquear na hora
const dominiosBloqueados = [
    'mailinator.com', '10minutemail.com', 'yopmail.com', 'sharklasers.com', 
    'guerrillamail.com', 'dispostable.com', 'getairmail.com', 'tempmail.com',
    'temp-mail.org', 'trashmail.com'
];

// CADASTRO
router.post("/register", async (req, res) => {
    try {
        const { nome, username, email, senha } = req.body;

        // 1. PRECAUÇÃO: Verificar se todos os campos vieram preenchidos
        if (!nome || !username || !email || !senha) {
            return res.status(400).json({
                msg: "Todos os campos são obrigatórios"
            });
        }

        // 2. PRECAUÇÃO: Validar tamanho mínimo da senha
        if (senha.length < 6) {
            return res.status(400).json({
                msg: "A senha deve ter no mínimo 6 caracteres"
            });
        }

        // 3. PRECAUÇÃO: Validar formato básico do e-mail (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                msg: "Por favor, insira um e-mail válido"
            });
        }

        // 4. PRECAUÇÃO: Barrar domínios de e-mails descartáveis/falsos
        const dominioEmail = email.split('@')[1].toLowerCase();
        if (dominiosBloqueados.includes(dominioEmail)) {
            return res.status(400).json({
                msg: "Provedor de e-mail não permitido. Use um e-mail real (Gmail, Outlook, etc.)."
            });
        }

        // 5. PRECAUÇÃO: Verificar se o E-mail já está cadastrado
        const emailExiste = await User.findOne({ email });
        if (emailExiste) {
            return res.status(400).json({
                msg: "Este e-mail já está cadastrado"
            });
        }

        // 6. PRECAUÇÃO: Verificar se o Username já está em uso
        const usernameExiste = await User.findOne({ username });
        if (usernameExiste) {
            return res.status(400).json({
                msg: "Este nome de usuário já está em uso"
            });
        }

        // Se passar por todos os filtros, criptografa a senha e salva
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = new User({
            nome,
            username,
            email,
            senha: senhaCriptografada
        });
        
        await novoUsuario.save();

        res.json({
            msg: "Usuário criado com sucesso!"
        });

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
});


// LOGIN (Pode continuar igual, já está certinho!)
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