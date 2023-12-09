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
            res.status(500).json({ mensaje: 'Error en el servidor' });
        } else {
            if (results.length > 0) {
                // Usuario autenticado
                res.status(200).json({ mensaje: 'Acceso concedido' });
            } else {
                // Usuario no autenticado
                res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
            }
        }
    });
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
  

  app.post('/VenderLibro', (req, res) => {
    const { id_usuario, id_libro } = req.body;
  
    // Validar que los valores requeridos estén presentes
    if (!id_usuario || !id_libro) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos para vender el libro' });
    }
  
    // Validar que el usuario y el libro existan en las respectivas tablas
    const validarUsuario = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    const validarLibro = 'SELECT * FROM libros WHERE id_libro = ?';
  
    connection.query(validarUsuario, [id_usuario], (errUsuario, resultsUsuario) => {
      if (errUsuario || resultsUsuario.length === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      connection.query(validarLibro, [id_libro], (errLibro, resultsLibro) => {
        if (errLibro || resultsLibro.length === 0) {
          return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }
  
        // Realizar la venta del libro
        const insertarVenta = 'INSERT INTO ventas (id_usuario, id_libro) VALUES (?, ?)';
        connection.query(insertarVenta, [id_usuario, id_libro], (errVenta, resultsVenta) => {
          if (errVenta) {
            console.error('Error al registrar la venta en la base de datos:', errVenta);
            res.status(500).json({ mensaje: 'Error al registrar la venta' });
          } else {
            console.log('Venta registrada con éxito');
            res.json({ mensaje: 'Libro vendido con éxito', id_usuario, id_libro });
          }
        });
      });
    });
  });
  

  app.post('/RentarLibro', (req, res) => {
    const { id_usuario, id_libro, fecha_devolucion } = req.body;
  
    // Validar que los valores requeridos estén presentes
    if (!id_usuario || !id_libro || !fecha_devolucion) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos para rentar el libro' });
    }
  
    // Validar que el usuario y el libro existan en las respectivas tablas
    const validarUsuario = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    const validarLibro = 'SELECT * FROM libros WHERE id_libro = ?';
  
    connection.query(validarUsuario, [id_usuario], (errUsuario, resultsUsuario) => {
      if (errUsuario || resultsUsuario.length === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      connection.query(validarLibro, [id_libro], (errLibro, resultsLibro) => {
        if (errLibro || resultsLibro.length === 0) {
          return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }
  
        // Realizar la renta del libro
        const insertarRenta = 'INSERT INTO rentas (id_usuario, id_libro, fecha_devolucion) VALUES (?, ?, ?)';
        connection.query(insertarRenta, [id_usuario, id_libro, fecha_devolucion], (errRenta, resultsRenta) => {
          if (errRenta) {
            console.error('Error al registrar la renta en la base de datos:', errRenta);
            res.status(500).json({ mensaje: 'Error al registrar la renta' });
          } else {
            console.log('Renta registrada con éxito');
            res.json({ mensaje: 'Libro rentado con éxito', id_usuario, id_libro, fecha_devolucion });
          }
        });
      });
    });
  });
  

  // Endpoint para comentar un libro
app.post('/comentarLibro/:idUsuario/:idLibro', (req, res) => {
  const idUsuario = req.params.idUsuario;
  const idLibro = req.params.idLibro;
  const { comentario } = req.body;

  // Validar que los valores requeridos estén presentes
  if (!idUsuario || !idLibro || !comentario) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos para comentar el libro' });
  }

  // Validar que el usuario y el libro existan en las respectivas tablas
  const validarUsuario = 'SELECT * FROM USUARIOS WHERE id_usuario = ?';
  const validarLibro = 'SELECT * FROM LIBROS WHERE id_libro = ?';

  connection.query(validarUsuario, [idUsuario], (errUsuario, resultsUsuario) => {
      if (errUsuario || resultsUsuario.length === 0) {
          return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      connection.query(validarLibro, [idLibro], (errLibro, resultsLibro) => {
          if (errLibro || resultsLibro.length === 0) {
              return res.status(404).json({ mensaje: 'Libro no encontrado' });
          }

          // Realizar el comentario del libro
          const insertarComentario = 'INSERT INTO COMENTARIOS (id_usuario, id_libro, comentario) VALUES (?, ?, ?)';
          connection.query(insertarComentario, [idUsuario, idLibro, comentario], (errComentario, resultsComentario) => {
              if (errComentario) {
                  console.error('Error al registrar el comentario en la base de datos:', errComentario);
                  res.status(500).json({ mensaje: 'Error al registrar el comentario' });
              } else {
                  console.log('Comentario registrado con éxito');
                  res.json({ mensaje: 'Comentario registrado con éxito', id_usuario: idUsuario, id_libro: idLibro, comentario });
              }
          });
      });
  });
});


// Endpoint para eliminar un comentario
app.delete('/eliminarComentario/:idUsuario/:idLibro/:idComentario', (req, res) => {
  const idUsuario = req.params.idUsuario;
  const idLibro = req.params.idLibro;
  const idComentario = req.params.idComentario;

  // Validar que los valores requeridos estén presentes
  if (!idUsuario || !idLibro || !idComentario) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos para eliminar el comentario' });
  }

  // Validar que el usuario, el libro y el comentario existan en las respectivas tablas
  const validarUsuario = 'SELECT * FROM USUARIOS WHERE id_usuario = ?';
  const validarLibro = 'SELECT * FROM LIBROS WHERE id_libro = ?';
  const validarComentario = 'SELECT * FROM COMENTARIOS WHERE id_usuario = ? AND id_libro = ? AND id_comentario = ?';

  connection.query(validarUsuario, [idUsuario], (errUsuario, resultsUsuario) => {
    if (errUsuario || resultsUsuario.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    connection.query(validarLibro, [idLibro], (errLibro, resultsLibro) => {
      if (errLibro || resultsLibro.length === 0) {
        return res.status(404).json({ mensaje: 'Libro no encontrado' });
      }

      connection.query(validarComentario, [idUsuario, idLibro, idComentario], (errComentario, resultsComentario) => {
        if (errComentario || resultsComentario.length === 0) {
          return res.status(404).json({ mensaje: 'Comentario no encontrado' });
        }

        // Realizar la eliminación del comentario
        const eliminarComentario = 'DELETE FROM COMENTARIOS WHERE id_usuario = ? AND id_libro = ? AND id_comentario = ?';
        connection.query(eliminarComentario, [idUsuario, idLibro, idComentario], (errEliminar, resultsEliminar) => {
          if (errEliminar) {
            console.error('Error al eliminar el comentario en la base de datos:', errEliminar);
            res.status(500).json({ mensaje: 'Error al eliminar el comentario' });
          } else {
            console.log('Comentario eliminado con éxito');
            res.json({ mensaje: 'Comentario eliminado con éxito', id_usuario: idUsuario, id_libro: idLibro, id_comentario: idComentario });
          }
        });
      });
    });
  });
});



  // Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});



// Iniciar el servidor
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
