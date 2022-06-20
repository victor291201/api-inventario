
const { request, response } = require('express');
const Marca = require('../models/marca');

/**
 * Consultar todas marcas activos
 */
const getMarcas = async (req, res = response) => {
    try{
        const query = { estado: true};
        const marcasBD = await Marca.find(query);
        res.json(marcasBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar una marca por Id
 */
const getMarcaById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const query = { estado: true, _id: id}; 
        const marcaBD = await Marca.findOne(query);
        res.json(marcaBD);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * crea una marca
 */
 const createMarca = async (req = request, res = response) => {
    try{
        const nombre = req.body.nombre.toUpperCase();
        const marcaBD = await Marca.findOne({ nombre });
        if(marcaBD){
            return res.status(400).json({msg: 'Ya existe marca'});
        }
        const datos = {
            nombre
        };
        const marca = new Marca(datos); 
        await marca.save();
        res.status(201).json(marca);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * Actualiza una marca por su ID
 */
const updateMarcaById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const { nombre, ...data } = req.body;// destructuring, spread (...)
    
        const marcaBD = await Marca.findOne({ _id: id });
    
        if(!marcaBD){
            return res.status(404).json({
                msj: 'No existe marca'
            });
        }
        data.fechaCreacion = marcaBD.fechaCreacion;
        data.fechaActualizacion = new Date();
        const marca = await Marca.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(marca);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}


module.exports = { getMarcas, getMarcaById, createMarca, updateMarcaById};