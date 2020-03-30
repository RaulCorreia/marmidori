const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const pratos = [
    { id: 1, name: 'arroz' },
    { id: 2, name: 'feijão' },
    { id: 3, name: 'farinha' }
]


app.get('/', (req, res) => {
    res.send('Teste');
});


app.get('/api/pratos', (req, res) => {
    res.send(pratos);
});

app.post('/api/pratos', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const prato = {
        id: pratos.length + 1,
        name: req.body.name
    };

    pratos.push(prato);
    res.send(prato);
});

app.put('/api/pratos/:id', (req, res) => {

    // se existe
    const prato = pratos.find(c => c.id === parseInt(req.params.id));
    if(!prato) res.status(404).send('Prato não encontrado');

    // validação
    const { error } = validatePrato(req.body); // result.error
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    // update
    prato.name = req.body.name;

    res.send(prato);
});


function validatePrato(prato){
    // validação
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(prato, schema);
}



app.get('/api/pratos/:id', (req, res) => {
    const prato = pratos.find(c => c.id === parseInt(req.params.id));

    if(!prato) res.status(404).send('Prato não encontrado');
    else res.send(prato);

});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Ouvindo na porta ${port}...`));