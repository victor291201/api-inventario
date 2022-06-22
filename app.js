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

app.use('/api/usuarios',  require('./routes/usuario'));
app.use('/api/tiposequipo', require('./routes/tipoEquipo'));
app.use('/api/estados', require('./routes/estado'));
app.use('/api/marcas', require('./routes/marca'));
app.use('/api/inventarios', require('./routes/inventario'));

module.exports = app;