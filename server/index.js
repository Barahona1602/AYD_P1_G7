const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Conexión a db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'notasdb',
    port: 3306
});


connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


//Endpoint de login
app.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;

    const usuarioValido = 'admin';
    const contraseñaValida = 'admin';

    if (usuario === usuarioValido && contraseña === contraseñaValida) {
        res.status(200).send('Acceso concedido');
    } else {
        res.status(401).send('Usuario o contraseña incorrectos');
    }
});


// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
