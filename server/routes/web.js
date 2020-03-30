const express = require('express');
const Joi     = require('@hapi/joi');
// model sequelize
const { User } = require('../models');


const router = express.Router();

// Get
router.get('/', (req, res) => {
    res.render('home/index', {layout: 'index-user', chave: 'valor', title: 'GET'});
});

// Post
router.post('/', (req, res) => {
    // usar a request com os parametros para criar o usuario
    // Passar pelo Joi para padronizar
    User.create({ name: 'Claudio', email: 'claudio@rocketseat.com.br', password: '123456' });
})

app.post('/register', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});
router.get('/users', (req, res) => {}); //Listar todos
router.post('/users', (req, res) => {}); // Criar
router.get('/users/:id', (req, res) => {}); //Buscar
router.put('/users/:id', (req, res) => {}); //Editar
router.delete('/users/:id', (req, res) => {}); //Deletar

module.exports = router;