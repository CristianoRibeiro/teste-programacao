const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const { Op } = require('sequelize');

const Cliente = require('./models/cliente');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())

app.use(bodyParser.json());

// Rotas CRUD para clientes
app.post('/clientes', async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        res.status(201).json({ message: 'Cliente criada com sucesso!', data: cliente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/clientes', async (req, res) => {
    try {
        const { searchTerm, page = 1, pageSize = 5 } = req.query;

        const offset = (page - 1) * pageSize;
        const limit = parseInt(pageSize, 10);

        const cliente = await Cliente.findAndCountAll({
            where: {
                email: {
                    [Op.iLike]: `%${searchTerm}%`, // Op.iLike para pesquisa case-insensitive
                },
            },
            offset,
            limit,
        });

        res.json({
            data: cliente.rows,
            totalItems: cliente.count,
            totalPages: Math.ceil(cliente.count / limit),
            currentPage: parseInt(page, 10),
        });

    } catch (error) {
        console.error('Erro ao pesquisar o cliente:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updatedRowsCount, updatedRows] = await Cliente.update(req.body, {
            returning: true,
            where: { id },
        });
        if (updatedRowsCount === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
        } else {
            res.status(200).json(updatedRows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Cliente.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Sincronizar o modelo com o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});



