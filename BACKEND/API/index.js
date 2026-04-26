// Importa o framework Express, usado para criar o servidor web
const express = require('express');

// Cria a aplicação servidor
const app = express();

// Middleware global para CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Middleware para converter o corpo da requisição em JSON
app.use(express.json());

// Define a porta (Render usa process.env.PORT)
const PORT = process.env.PORT || 3000;

// Importa e registra as rotas
const routes = require('./routes/routes');
app.use('/api', routes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});

// --- CONFIGURAÇÃO DO MONGODB (VIA VARIÁVEL DE AMBIENTE) ---
const mongoURL = process.env.DATABASE_URL;
const mongoose = require('mongoose');

if (mongoURL) {
    mongoose.connect(mongoURL);
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;

    db.on('error', (error) => {
        console.log("Erro na conexão com MongoDB:", error);
    });

    db.once('connected', () => {
        console.log('Database Connected Successfully');
    });
} else {
    console.error("ERRO: A variável DATABASE_URL não foi definida no painel da Render!");
}
