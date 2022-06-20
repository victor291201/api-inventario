
const { request, response } = require('express');
const Inventario = require('../models/inventario');
const Usuario = require('../models/usuario');

const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

/**
 * Consultar todos inventarios
 */
const getInventarios = async (req, res = response) => {
    try{
        const query = {};
        const inventariosBD = await Inventario.find(query);
        res.json(inventariosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar todos inventarios
 */
 const getInventarioByID = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const query = { _id: id};
        const inventarioBD = await Inventario.findOne(query);
        // TODO: personalizar error de no encontrado
        res.json(inventarioBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * crea un inventario
 */
 const createInventario = async (req = request, res = response) => {
    try{
        const { serial, modelo, usuario, marca, estado, tipoEquipo } = req.body;

        const inventarioBD = await Inventario.findOne({
            $or: [
                {serial}, {modelo}
            ]
        });
        if(inventarioBD){
            return res.status(400).json({
                msj: 'Ya existe serial o modelo'
            })
        }
        const usuarioBD = await Usuario.findOne({
            _id: usuario, estado: true
        })
        if(!usuarioBD){
            return res.status(400).json({
                msj: 'No existe usuario'
            })
        }
        // TAREA: Validar que marca, estado y tipo existan y estén activos

        const data = req.body;

        const inventario = new Inventario(data);
        await inventario.save();
        res.status(201).json(inventario);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

const updateInventario = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const data = req.body;// destructuring, spread (...)
    
        const inventarioBD = await Inventario.findOne({ _id: id});
       // TODO: VALIDAR QUE EXISTEN Y ESTAN ACTIVOS: ESTADO, USUARIO, MARCA, ...
       if(!inventarioBD){
        return res.status(400).json({
            msj: 'No existe este inventario'
        });
       } 
        const inventario = await Inventario.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(inventario);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * Sube foto del inventario
 */
const uploadImage = async (req = request, res = response) => {
    const { id } = req.params;
    const invBD = await Inventario.findOne({ _id: id});
    if(!invBD){
        return res.status(400).json({
            msj: 'No existe en inventario'
        });
    }
    if(!req.files || Object.keys(req.files) == 0 || !req.files.foto){
        return res.status(400).json({
            msj: 'No se está subiendo una foto'
        });
    }
    const foto = req.files.foto;
    // validamos extensiones
    const extensionesAceptadas = ['jpg', 'jpeg', 'png', 'gif'];
    const arrayExtension = foto.name.split('.');
    const extension = arrayExtension[arrayExtension.length - 1];
    if(!extensionesAceptadas.includes(extension)){
        return res.status(400).json({
            msj: 'Extension no aceptada'
        });
    }
    const nombreTemp = `${uuidv4()}.${extension}`;
    const rutaSubida = path.join(__dirname, '../uploads', nombreTemp);
    //uploads/dadasdasdada.jpg
    foto.mv(rutaSubida, e => {
        if(e){
            return res.status(500).json({ error: e});
        }
    });
    const data = {};
    data.foto = nombreTemp;
    const inv = await Inventario.findByIdAndUpdate(id, data, {new : true});
    if(!inv){
        return res.status(400).json({ error: 'Error al actualizar'});
    }
    res.status(201).json({msj: 'Se subió la foto'});
}

/**
 * Lee la foto del inventario por Id
 */
const getFotoById =  async (req = request, res = response) => {
    const { id } = req.params;
    const inventarioBD = await Inventario.findOne({ _id: id });
    if(!inventarioBD){
        return res.status(400).json({ error: 'No existe en inventario'});
    }
    const nombreFoto = inventarioBD.foto;
    const rutaImg = path.join(__dirname, '../uploads', nombreFoto);
    if(fs.existsSync(rutaImg)){
        res.sendFile(rutaImg);
    }
}

module.exports = { getInventarios, getInventarioByID, createInventario, updateInventario, uploadImage, getFotoById };