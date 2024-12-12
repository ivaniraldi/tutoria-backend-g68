const pool = require('./db');

const agregarCliente = async (email, nombre) =>{
    const consulta = `INSERT INTO clientes (email, nombre) VALUES ($1, $2)`;
    const values = [nombre, email]
    const result = await pool.query(consulta, values);
    res.send("Cliente creado con exito!")
}
const obtenerClientes = async(req, res)=>{
    const consulta = "SELECT * FROM clientes";
    const result = await pool.query(consulta);
    if(result.rowCount == 0){
        throw { code: 404, message: "No hay clientes en la base de datos"}
    }
    return result
}

const modificarCliente = async (email, nombre, id) =>{

    const consulta = `UPDATE clientes SET email = $1, nombre = $2 WHERE id = $3`;
    const values = [email, nombre, id]
    const result = await pool.query(consulta, values);
    if(result.rowCount == 0){
        throw { code: 404, message: "No se encontro el cliente con ese id"}
    }
    console.log(result)
    
}

const eliminarCliente = async (id) =>{
    const consulta = `DELETE FROM clientes WHERE id = $1`;
    const result = await pool.query(consulta,[id]);
    if(result.rowCount == 0){
        throw { code: 404, message: "No se encontro el cliente con ese id"}
    }

}
    

module.exports = {
    agregarCliente,
    obtenerClientes,
    modificarCliente,
    eliminarCliente
}