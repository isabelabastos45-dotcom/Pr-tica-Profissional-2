const User = require('../models/user.js');

const create = async (req, res) => {
    try {
        const { nome, username, email, senha } = req.body;

        if (!nome || !username || !email || !senha) {
            return res.status(400).send({
                message: "Todos os campos são obrigatórios"
            });
        }

        const newUser = await User.create({
            nome,
            username,
            email,
            senha
        });

        res.status(201).send({
            message: "Usuário criado com sucesso",
            user: newUser
        });

    } catch (err) {
        console.log(err);

        res.status(500).send({
            message: "Erro ao criar usuário"
        });
    }
};

module.exports = {
    create
};