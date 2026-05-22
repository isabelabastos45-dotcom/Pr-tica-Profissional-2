const User = require("../models/User");

// Lista dos principais provedores de e-mail temporário/falso para bloquear
const dominiosBloqueados = [
    'mailinator.com', '10minutemail.com', 'yopmail.com', 'sharklasers.com', 
    'guerrillamail.com', 'dispostable.com', 'getairmail.com', 'tempmail.com',
    'boun.cr', 'trashmail.com', 'maildrop.cc', 'temp-mail.org'
];

const create = async (req, res) => {
    try {
        const { nome, username, email, senha } = req.body;

        // 1. Validação de campos obrigatórios
        if (!nome || !username || !email || !senha) {
            return res.status(400).send({
                msg: "Todos os campos são obrigatórios"
            });
        }

        // 2. Validação do tamanho mínimo da senha
        if (senha.length < 6) {
            return res.status(400).send({
                msg: "A senha deve ter no mínimo 6 caracteres"
            });
        }

        // 3. Validação do formato do e-mail (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({
                msg: "Por favor, insira um e-mail válido"
            });
        }

        // === PRECAUÇÃO: Barrar e-mails temporários/falsos conhecidos ===
        const dominioEmail = email.split('@')[1].toLowerCase();
        if (dominiosBloqueados.includes(dominioEmail)) {
            return res.status(400).send({
                msg: "Provedor de e-mail não permitido. Por favor, use um e-mail real (como Gmail, Outlook, etc.)."
            });
        }
        // =============================================================

        // 4. PRECAUÇÃO: Verificar se o username já existe no banco de dados
        const usernameExists = await User.findOne({ username: username });
        if (usernameExists) {
            return res.status(400).send({
                msg: "Este nome de usuário já está em uso"
            });
        }

        // 5. PRECAUÇÃO: Verificar se o e-mail já está cadastrado
        const emailExists = await User.findOne({ email: email });
        if (emailExists) {
            return res.status(400).send({
                msg: "Este e-mail já está cadastrado"
            });
        }

        // Se passou por todas as precauções, cria o usuário
        const newUser = await User.create({
            nome,
            username,
            email,
            senha
        });

        res.status(201).send({
            msg: "Usuário criado com sucesso!",
            user: newUser
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            msg: "Erro interno ao criar usuário"
        });
    }
};

module.exports = {
    create
};