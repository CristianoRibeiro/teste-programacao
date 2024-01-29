// controllers/ClienteController.js
const { Op } = require('sequelize');
const Cliente = require('../models/cliente');

class ClienteController {
    async create(req, res, next) {
        try {
            const cliente = await Cliente.create(req.body);
            res.status(201).json({ message: 'Cliente criado com sucesso!', data: cliente });
        } catch (error) {
            next(error);
        }
    }

    async list(req, res, next) {
        try {
            const { searchTerm, page = 1, pageSize = 5 } = req.query;
            const offset = (page - 1) * pageSize;
            const limit = parseInt(pageSize, 10);

            const cliente = await Cliente.findAndCountAll({
                where: {
                    email: {
                        [Op.iLike]: `%${searchTerm}%`,
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
            next(error);
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        try {
            const [updatedRowsCount, [updatedRow]] = await Cliente.update(req.body, {
                returning: true,
                where: { id },
            });

            if (updatedRowsCount === 0) {
                res.status(404).json({ error: 'Cliente não encontrado' });
            } else {
                res.status(200).json(updatedRow);
            }
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const deletedRowCount = await Cliente.destroy({ where: { id } });

            if (deletedRowCount === 0) {
                res.status(404).json({ error: 'Cliente não encontrado' });
            } else {
                res.status(204).send();
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ClienteController();
