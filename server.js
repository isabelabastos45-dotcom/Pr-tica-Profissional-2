const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const uri = "mongodb+srv://alencarlins07_db_user:TFp0HjTOfK0M9WUI@cluster0.crtpotu.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

let db;

async function iniciar() {
    await client.connect();
    db = client.db("FixlyDB");

    app.post("/users", async (req, res) => {
        const dados = req.body;
        const resultado = await db.collection("users").insertOne(dados);
        res.json({ mensagem: "Usuário criado!", resultado });
    });
    
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });
}

iniciar();