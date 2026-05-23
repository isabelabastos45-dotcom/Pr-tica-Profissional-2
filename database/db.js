const mongoose = require("mongoose");
require("dns").setDefaultResultOrder("ipv4first");

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alencarlins07_db_user:kIBniPGeQJAJI9s5@cluster0.crtpotu.mongodb.net/FixlyDB?retryWrites=true&w=majority"
    );

    console.log("Banco de dados conectado com sucesso");
  } catch (err) {
    console.log("Erro ao tentar conectar ao banco de dados:", err);
  }
};

module.exports = connectDatabase;