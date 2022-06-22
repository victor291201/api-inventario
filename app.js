const express = require('express');

const app = express();

const fileUpload = require('express-fileupload');
const cors = require('cors');

const usuarios = require('./routes/usuario');
const tiposEquipo = require('./routes/tipoEquipo');
const estados = require('./routes/estado');
const marcas = require('./routes/marca');

const inventarios = require('./routes/inventario');

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cors()); 

app.use('/usuarios',  require('./routes/usuario'));
app.use('/tiposequipo', require('./routes/tipoEquipo'));
app.use('/estados', require('./routes/estado'));
app.use('/marcas', require('./routes/marca'));
app.use('/inventarios', require('./routes/inventario'));

module.exports = app;