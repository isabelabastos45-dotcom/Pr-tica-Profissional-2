const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alencarlins07_db_user:TFp0HjTOfK0M9WUI@cluster0.crtpotu.mongodb.net/FixlyDB"
    );

    console.log("Banco de dados conectado com sucesso");
  } catch (err) {
    console.log("Erro ao tentar conectar ao banco de dados:", err);
  }
};

module.exports = connectDatabase;