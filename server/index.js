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
  

  app.post('/AgregarLibro', (req, res) => {
    // Obtener datos del formulario para agregar libro
    const { sinopsis, precioCompra, precioRenta, autor, anoPublicacion, editorial, estado } = req.body;
  
    // Validar que los datos requeridos estén presentes
    if (!sinopsis || !precioCompra || !autor || !anoPublicacion || !editorial || !estado) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos para agregar el libro' });
    }
  
    // Query SQL para insertar un nuevo libro
    const sql = 'INSERT INTO libros (sinopsis, precio_compra, precio_renta, autor, año_publicacion, editorial, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
    // Parámetros para la consulta
    const values = [sinopsis, precioCompra, precioRenta, autor, anoPublicacion, editorial, estado];
  
    // Ejecutar la consulta
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error al agregar libro en la base de datos:', err);
        res.status(500).json({ mensaje: 'Error al agregar libro' });
      } else {
        console.log('Libro agregado con éxito');
        res.json({ mensaje: 'Libro agregado con éxito', libro: { sinopsis, precioCompra, precioRenta, autor, anoPublicacion, editorial, estado } });
      }
    });
  });

  
  app.put('/ActualizarLibro/:idLibro', (req, res) => {
    const idLibro = req.params.idLibro;
  
    // Obtener datos del formulario para actualizar libro
    const { sinopsis, precioCompra, precioRenta, autor, anoPublicacion, editorial, estado } = req.body;
  
    // Validar que los datos requeridos estén presentes
    if (!sinopsis && !precioCompra && !precioRenta && !autor && !anoPublicacion && !editorial && !estado) {
      return res.status(400).json({ mensaje: 'No se proporcionaron datos para actualizar el libro' });
    }
  
    // Construir la parte dinámica de la consulta SQL
    const updates = [];
    if (sinopsis) updates.push(`sinopsis = '${sinopsis}'`);
    if (precioCompra) updates.push(`precio_compra = ${precioCompra}`);
    if (precioRenta) updates.push(`precio_renta = ${precioRenta}`);
    if (autor) updates.push(`autor = '${autor}'`);
    if (anoPublicacion) updates.push(`año_publicacion = ${anoPublicacion}`);
    if (editorial) updates.push(`editorial = '${editorial}'`);
    if (estado) updates.push(`estado = '${estado}'`);
  
    // Query SQL para actualizar un libro por su ID
    const sql = `UPDATE libros SET ${updates.join(', ')} WHERE id_libro = ?`;
  
    // Parámetros para la consulta
    const values = [idLibro];
  
    // Ejecutar la consulta
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error al actualizar libro en la base de datos:', err);
        res.status(500).json({ mensaje: 'Error al actualizar libro' });
      } else {
        console.log('Libro actualizado con éxito');
        res.json({ mensaje: 'Libro actualizado con éxito', idLibro });
      }
    });
  });
  
  app.delete('/EliminarLibro/:idLibro', (req, res) => {
    const idLibro = req.params.idLibro;
  
    // Query SQL para eliminar un libro por su ID
    const sql = 'DELETE FROM libros WHERE id_libro = ?';
  
    // Parámetros para la consulta
    const values = [idLibro];
  
    // Ejecutar la consulta
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error al eliminar libro en la base de datos:', err);
        res.status(500).json({ mensaje: 'Error al eliminar libro' });
      } else {
        console.log('Libro eliminado con éxito');
        res.json({ mensaje: 'Libro eliminado con éxito', idLibro });
      }
    });
  });
  

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
