const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.json());

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mylibrary',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Endpoint de login
app.post('/login', (req, res) => {
    const { correo, password } = req.body;
    
    // Consulta SQL para verificar las credenciales
    const query = 'SELECT * FROM USUARIOS WHERE correo = ? AND password = ?';

    connection.query(query, [correo, password], (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            res.status(500).send('Error en el servidor');
        } else {
            if (results.length > 0) {
                // Usuario autenticado
                res.status(200).send('Acceso concedido');
            } else {
                // Usuario no autenticado
                res.status(401).send('Usuario o contraseña incorrectos');
            }
        }
    });
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
