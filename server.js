const dotenv = require('dotenv').config();
const app = require('./app');
const {  mongoConn } = require('./databases/configuration');

// configuraciones
app.set('port', process.env.PORT || 3000);

const conn = mongoConn()
// escucha
app.listen(app.get('port'), () => {
    console.log(`Arranca el servidor en el puerto: ${app.get('port')}`)
});