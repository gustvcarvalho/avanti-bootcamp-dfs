const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

const usuarioRoutes = require('./routes/usuarioRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/itens', itemRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API Achados & Perdidos está rodando com sucesso!')
});


app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    } catch (error) {
        console.error('Erro ao conectar no banco de dados:', error);
        process.exit(1);
    }
});
