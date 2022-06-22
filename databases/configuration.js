const mongoose = require('mongoose');

const mongoConn = async () => {
    try{
        await mongoose.connect( "mongodb+srv://Monik:OABMHjNuwHMjSDLI@cluster0.eq2xz.mongodb.net/test", {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('Conexión Mongo OK!');  
    }catch(e){
        console.log('Error de conexión a Mongo', e);
        throw new Error('Error de conexión');
    }    
};

module.exports = { mongoConn };