const express = require('express');
const pool = require('./db');
const cors = require('cors');
const { agregarCliente, obtenerClientes, modificarCliente, eliminarCliente } = require('./consultas');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, ()=>{console.log('Server started')});

app.get("/clientes", async (req, res) =>{    
    try {
        const result = await obtenerClientes();
        res.json(result.rows);
    } catch (error) {
        res.status(error.code).send(error.message)
    }
})

app.get("/clientes/:id", async (req,res) =>{
    const {id} = req.params;
    const consulta = `SELECT * FROM clientes WHERE id = $1`;
    const values = [id]
    const result = await pool.query(consulta, values);
    if(result.rowCount == 0){
        res.status(404).send("No se encontro el cliente con ese id")
    }else{
        res.json(result.rows);
    }
})

app.post("/clientes", async (req, res) =>{
    const {email, nombre} = req.body;
    try {
        await agregarCliente(email, nombre);
        res.send("Cliente creado con exito!")
    } catch (error) {
        if (error.code == "23502"){
            res.status(500).send("Debes completar todos los campos")
        }else{
            res.status(500).send("Error al crear cliente")
        }
    }
})

app.put("/clientes/:id", async (req, res) =>{
 const {id} = req.params;
 const {email, nombre} = req.body;
 try {
    await modificarCliente(email, nombre, id);
    res.send("Cliente modificado con exito!")
 } catch (error) {
     res.status(error.code).send(error.message)
    
 }
})

app.delete("/clientes/:id", async (req, res) =>{
    const {id} = req.params;
   try {
    await eliminarCliente(id);
    res.send("Cliente eliminado con exito!")
   } catch (error) {
       res.status(error.code).send(error.message)
   }

})