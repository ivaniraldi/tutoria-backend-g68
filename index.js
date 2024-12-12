const express = require('express');
const pool = require('./db');
const cors = require('cors');
const { agregarCliente, obtenerClientes } = require('./consultas');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, ()=>{console.log('Server started')});

app.get("/clientes", obtenerClientes)

app.get("/clientes/:id", async (req,res) =>{
    const {id} = req.params;
    const consulta = `SELECT * FROM clientes WHERE id = $1`;
    const values = [id]
    const result = await pool.query(consulta, values);
    res.json(result.rows);
})

app.post("/clientes", agregarCliente)