const express   = require('express');
const path      = require('path');
const hbs       = require('express-handlebars');
const Sequelize = require('sequelize');
const app       = express();

app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mssql'
});

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'index-home'
}));
app.set('view engine', 'hbs');



// ROUTES
const routesWeb = require('./routes/web');
app.use('', routesWeb);



// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Ouvindo na porta ${port}...`));