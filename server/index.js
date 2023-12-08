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
    password: '12345',
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


// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});



app.post('/RegistrarUsuario', (req, res) => {
    // Obtener datos del formulario de registro
    const { nombre, apellido, telefono, correo, contraseña, fechaNacimiento } = req.body;
  
    // Validar la contraseña (mínimo 8 caracteres, incluir una mayúscula y números)
    const contraseñaValida = /^(?=.*\d)(?=.*[A-Z]).{8,}$/.test(contraseña);
  
    if (!contraseñaValida) {
      return res.status(400).json({ mensaje: 'La contraseña no cumple con los requisitos' });
    }
  
    // Query SQL para insertar un nuevo usuario
    const sql = 'INSERT INTO usuarios (nombre, apellido, numero_tel, correo, password, fecha_nac) VALUES (?, ?, ?, ?, ?, ?)';
  
    // Parámetros para la consulta
    const values = [nombre, apellido, telefono, correo, contraseña, fechaNacimiento];
  
    // Ejecutar la consulta
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error al registrar usuario en la base de datos:', err);
        res.status(500).json({ mensaje: 'Error al registrar usuario' });
      } else {
        console.log('Usuario registrado con éxito');
        res.json({ mensaje: 'Usuario registrado con éxito', usuario: { nombre, apellido, telefono, correo, fechaNacimiento } });
      }
    });
  });
  

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
