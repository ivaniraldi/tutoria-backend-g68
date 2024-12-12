const pool = require('./db');

const agregarCliente = async (req, res) =>{
    const {email, nombre} = req.body;
    const consulta = `INSERT INTO clientes (email, nombre) VALUES ($1, $2)`;
    const values = [nombre, email]
    const result = await pool.query(consulta, values);
    res.send("Cliente creado con exito!")
}
const obtenerClientes = async(req, res)=>{
    const consulta = "SELECT * FROM clientes";
    const result = await pool.query(consulta);
    res.json(result.rows);
}
    

module.exports = {
    agregarCliente,
    obtenerClientes
}