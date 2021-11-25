const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//MYSQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cine'
});

app.get('/', (req, res)=>{
    res.send('welcome');
});

//all customers
app.get('/customers',(req, res)=>{
    const sql = 'SELECT * FROM reservaciones';

    connection.query(sql, (error, results)=>{
        if (error) throw error;
        if (results.length >0){
            res.json(results);
        } else {
            res.send('Not results');
        }
    })
});

app.get('/customers/:id',(req, res)=>{
    const { id } = req.params
    const sql = `SELECT * FROM reservaciones WHERE id = ${id}`;
    connection.query(sql, (error, results)=>{
        if (error) throw error;
        if (results.length >0){
            res.json(results);
        } else {
            res.send('Not results');
        }
    })
});

app.post('/add', (req, res)=>{
    const sql = 'INSERT INTO reservaciones SET ?';

    const cineObj = {
        id: req.body.id,
        nombre: req.body.nombre,
        boletos: req.body.boletos
    }


    connection.query(sql, cineObj, error =>{
        if (error) throw error;
            res.send('Compra registrada');
    })
    
})

app.put('/update/:id', (req, res)=>{
  const { id } = req.params;
  const {nombre, boletos} = req.body;
  const sql = ` UPDATE reservaciones SET nombre='${nombre}',ciudad='${boletos}' WHERE id = '${id}'`;
 
  connection.query(sql, error =>{
    if (error) throw error;
        res.send('Actualizacion correcta');
});

});

app.delete('/delete/:id', (req, res)=>{
    const { id } = req.params;
    const sql = `DELETE FROM reservaciones WHERE id= ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Delete customers');
    })
})



connection.connect(error => {
    if (error) throw error;
    console.log('Database server runing');
});


app.listen(PORT, () => console.log(`server running on port ${PORT}`));