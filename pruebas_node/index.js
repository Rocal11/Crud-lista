const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.use(bodyParser.json())

const PUERTO = 3000

const conexion = mysql.createConnection(
    {
        host: 'localhost',
        database:'mi_base_de_datos',
        user: 'root',
        password: 'admin',
    }
)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
})

conexion.connect(error => {
    if(error) throw error
    console.log('Conexion con la base de datos mysql establecida');
})

app.get('/', (req, res) => {
    res.send('API')
})

app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios'
    conexion.query(query, (error, resultado) => {
      //llamar a funcion checar result
        if (error) return console.error(error.message)
        result=resultado
        if(result = ! null) {
            res.json(resultado)
            console.log(resultado);

        } else {
          
            res.send('No hay registros')
        }
    })
}
)

app.get('/usuarios/:id', (req, res) => {
    const {id} = req.params

    const query = `SELECT * FROM usuarios WHERE id = ${id} `
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)
//checar result
result=resultado       
if(result =! null) {
            res.json(resultado)

        } else {
            res.send('No hay registro con ese id')
        }
    })
})

app.post('/usuarios', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        email: req.body.email,
        city: req.body.city
    }

    const query = `INSERT INTO usuarios SET ?`
    conexion.query(query, usuario, (error, resultado) => {
        if (error) return console.error(error.message)
    
        res.send('Usuario creado')
    })
})

app.put('/usuarios/actualizar/:id', (req, res) => {
    const {id} = req.params
    const {nombre, email, city} = req.body

    const query = `UPDATE usuarios SET nombre = '${nombre}', email = '${email}', city = '${city}' WHERE id = ${id}`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)
    
        res.send('Usuario actualizado')
    })
})

app.delete('/usuarios/eliminar/:id', (req, res) => {
    const {id} = req.params

    const query = `DELETE FROM usuarios WHERE id = ${id}`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)
    
        res.send('Usuario eliminado')
    })
})