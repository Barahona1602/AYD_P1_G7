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
              const usuario = results[0]; // Tomar el primer resultado
              res.status(200).json({ mensaje: 'Acceso concedido', usuario });
          } else {
              // Usuario no autenticado
              res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
          }
      }
  });
});



app.post('/registrarUsuario', (req, res) => {
    // Obtener datos del formulario de registro
    const { nombre, apellido, telefono, correo, contraseña, fechaNacimiento } = req.body;
  
    // Validar la contraseña (mínimo 8 caracteres, incluir una mayúscula y números)
    const contraseñaValida = /^(?=.*\d)(?=.*[A-Z]).{8,}$/.test(contraseña);
  
    if (!contraseñaValida) {
      return res.status(400).json({ mensaje: 'La contraseña no cumple con los requisitos' }, );
    }
  
    // Query SQL para insertar un nuevo usuario
    const sql = 'INSERT INTO USUARIOS (nombre, apellido, numero_tel, correo, password, fecha_nac) VALUES (?, ?, ?, ?, ?, ?)';
  
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
  

  app.put('/editarUsuario/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const { nombre, apellido, numero_tel, correo, password, fecha_nac } = req.body;

    if (!nombre && !apellido && !numero_tel && !correo && !password && !fecha_nac) {
        return res.status(400).json({ mensaje: 'No se proporcionaron datos para actualizar el usuario' });
    }

    const updates = [];
    if (nombre) updates.push(`nombre = '${nombre}'`);
    if (apellido) updates.push(`apellido = '${apellido}'`);
    if (numero_tel) updates.push(`numero_tel = '${numero_tel}'`);
    if (correo) updates.push(`correo = '${correo}'`);
    if (password) updates.push(`password = '${password}'`);
    if (fecha_nac) updates.push(`fecha_nac = '${fecha_nac}'`);

    const sql = `UPDATE USUARIOS SET ${updates.join(', ')} WHERE id_usuario = ?`;

    const values = [idUsuario];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error al actualizar usuario en la base de datos:', err);
            res.status(500).json({ mensaje: 'Error al actualizar usuario' });
        } else {
            console.log('Usuario actualizado con éxito');
            res.json({ mensaje: 'Usuario actualizado con éxito', idUsuario });
        }
    });
});

app.post('/agregarLibro', (req, res) => {
  // Obtener datos del formulario para agregar libro
  const { titulo, sinopsis, precioCompra, precioRenta, autor, anoPublicacion, editorial, estado } = req.body;

  // Validar que los datos requeridos estén presentes
  if (!titulo || !sinopsis || !precioCompra || !autor || !anoPublicacion || !editorial || !estado) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos para agregar el libro' });
  }

  // Query SQL para insertar un nuevo libro con la columna "Titulo"
  const sql = 'INSERT INTO LIBROS (Titulo, sinopsis, precio_compra, precio_renta, autor, año_publicacion, editorial, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  // Parámetros para la consulta
  const values = [titulo, sinopsis, precioCompra, precioRenta, autor, anoPublicacion, editorial, estado];

  // Ejecutar la consulta
  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error al agregar libro en la base de datos:', err);
      res.status(500).json({ mensaje: 'Error al agregar libro' });
    } else {
      console.log('Libro agregado con éxito');
      res.json({ mensaje: 'Libro agregado con éxito', libro: { titulo, sinopsis, precioCompra, precioRenta, autor, anoPublicacion, editorial, estado } });
    }
  });
});


  
  app.put('/actualizarLibro/:idLibro', (req, res) => {
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
    const sql = `UPDATE LIBROS SET ${updates.join(', ')} WHERE id_libro = ?`;
  
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
  
  app.delete('/eliminarLibro/:idLibro', (req, res) => {
    const idLibro = req.params.idLibro;

    // Query SQL para eliminar rentas relacionadas con el libro
    const deleteRentasSql = 'DELETE FROM rentas WHERE id_libro = ?';

    // Ejecutar la consulta para eliminar rentas
    connection.query(deleteRentasSql, [idLibro], (err, rentasResults) => {
        if (err) {
            console.error('Error al eliminar rentas relacionadas:', err);
            res.status(500).json({ mensaje: 'Error al eliminar libro' });
        } else {
            // Después de eliminar rentas, ahora puedes eliminar el libro
            const deleteLibroSql = 'DELETE FROM libros WHERE id_libro = ?';
            connection.query(deleteLibroSql, [idLibro], (err, libroResults) => {
                if (err) {
                    console.error('Error al eliminar libro en la base de datos:', err);
                    res.status(500).json({ mensaje: 'Error al eliminar libro' });
                } else {
                    console.log('Libro eliminado con éxito');
                    res.json({ mensaje: 'Libro eliminado con éxito', idLibro });
                }
            });
        }
    });
});

  

  // Endpoint para eliminar un usuario
app.delete('/eliminarUsuario/:idUsuario', (req, res) => {
  const idUsuario = req.params.idUsuario;

  // Validar que el valor requerido esté presente
  if (!idUsuario) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos para eliminar el usuario' });
  }

  // Validar que el usuario exista en la tabla
  const validarUsuario = 'SELECT * FROM USUARIOS WHERE id_usuario = ?';

  connection.query(validarUsuario, [idUsuario], (errUsuario, resultsUsuario) => {
    if (errUsuario || resultsUsuario.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Realizar la eliminación del usuario
    const eliminarUsuario = 'DELETE FROM USUARIOS WHERE id_usuario = ?';
    connection.query(eliminarUsuario, [idUsuario], (errEliminar, resultsEliminar) => {
      if (errEliminar) {
        console.error('Error al eliminar el usuario en la base de datos:', errEliminar);
        res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
      } else {
        console.log('Usuario eliminado con éxito');
        res.json({ mensaje: 'Usuario eliminado con éxito', id_usuario: idUsuario });
      }
    });
  });
});


app.post('/venderLibro', (req, res) => {
  const { id_usuario, id_libro } = req.body;

  // Validar que los valores requeridos estén presentes
  if (!id_usuario || !id_libro) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos para vender el libro' });
  }

  // Validar que el usuario y el libro existan en las respectivas tablas
  const validarUsuario = 'SELECT * FROM USUARIOS WHERE id_usuario = ?';
  const validarLibro = 'SELECT * FROM LIBROS WHERE id_libro = ? AND estado = "Disponible"';

  connection.query(validarUsuario, [id_usuario], (errUsuario, resultsUsuario) => {
      if (errUsuario || resultsUsuario.length === 0) {
          return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      connection.query(validarLibro, [id_libro], (errLibro, resultsLibro) => {
          if (errLibro || resultsLibro.length === 0) {
              return res.status(404).json({ mensaje: 'Libro no encontrado o no disponible' });
          }

          // Realizar la venta del libro
          const insertarVenta = 'INSERT INTO VENTAS (id_usuario, id_libro) VALUES (?, ?)';
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


app.post('/rentarLibro', (req, res) => {
  const { id_usuario, id_libro, fecha_devolucion } = req.body;

  // Validar que los valores requeridos estén presentes
  if (!id_usuario || !id_libro || !fecha_devolucion) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos para rentar el libro' });
  }

  // Validar que el usuario y el libro existan en las respectivas tablas
  const validarUsuario = 'SELECT * FROM USUARIOS WHERE id_usuario = ?';
  const validarLibro = 'SELECT * FROM LIBROS WHERE id_libro = ? AND estado = "Disponible"';

  connection.query(validarUsuario, [id_usuario], (errUsuario, resultsUsuario) => {
      if (errUsuario || resultsUsuario.length === 0) {
          return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      connection.query(validarLibro, [id_libro], (errLibro, resultsLibro) => {
          if (errLibro || resultsLibro.length === 0) {
              return res.status(404).json({ mensaje: 'Libro no encontrado o no disponible' });
          }

          // Realizar la renta del libro
          const insertarRenta = 'INSERT INTO RENTAS (id_usuario, id_libro, fecha_devolucion) VALUES (?, ?, ?)';
          connection.query(insertarRenta, [id_usuario, id_libro, fecha_devolucion], (errRenta, resultsRenta) => {
              if (errRenta) {
                  console.error('Error al registrar la renta en la base de datos:', errRenta);
                  res.status(500).json({ mensaje: 'Error al registrar la renta' });
              } else {
                  // Actualizar el estado del libro a "Ocupado"
                  const actualizarEstadoLibro = 'UPDATE LIBROS SET estado = "Ocupado" WHERE id_libro = ?';
                  connection.query(actualizarEstadoLibro, [id_libro], (errEstadoLibro) => {
                      if (errEstadoLibro) {
                          console.error('Error al actualizar el estado del libro a rentado:', errEstadoLibro);
                          res.status(500).json({ mensaje: 'Error al rentar el libro' });
                      } else {
                          console.log('Renta registrada con éxito');
                          res.json({ mensaje: 'Libro rentado con éxito', id_usuario, id_libro, fecha_devolucion });
                      }
                  });
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


app.post('/devolverLibro/:idLibro', (req, res) => {
  const idLibro = req.params.idLibro;

  // Query SQL para actualizar el estado del libro a disponible
  const updateLibroSql = 'UPDATE libros SET estado = "disponible" WHERE id_libro = ?';

  // Ejecutar la consulta para actualizar el estado del libro
  connection.query(updateLibroSql, [idLibro], (err, results) => {
      if (err) {
          console.error('Error al actualizar el estado del libro en la base de datos:', err);
          res.status(500).json({ mensaje: 'Error al devolver el libro' });
      } else {
          console.log('Libro devuelto con éxito');
          res.json({ mensaje: 'Libro devuelto con éxito', idLibro });
      }
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


// GETS
app.get('/usuarios', (req, res) => {
  const query = 'SELECT * FROM USUARIOS';
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error al obtener usuarios:', error);
          res.status(500).json({ mensaje: 'Error al obtener usuarios' });
      } else {
          res.json({ usuarios: results });
      }
  });
});


app.get('/usuarios/:idUsuario', (req, res) => {
  const userId = req.params.idUsuario; // Obtener el parámetro de la URL
  const query = 'SELECT * FROM USUARIOS WHERE id_usuario = ?';

  connection.query(query, [userId], (error, results) => {
      if (error) {
          console.error('Error al obtener usuario:', error);
          res.status(500).json({ mensaje: 'Error al obtener usuario' });
      } else {
          res.json({ usuario: results[0] });
      }
  });
});



app.get('/libros', (req, res) => {
  const query = 'SELECT * FROM LIBROS';
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error al obtener libros:', error);
          res.status(500).json({ mensaje: 'Error al obtener libros' });
      } else {
          res.json({ libros: results });
      }
  });
});


app.get('/libros/:idLibro', (req, res) => {
  const libroId = req.params.idLibro; // Obtener el parámetro de la URL
  const query = 'SELECT * FROM LIBROS WHERE id_libro = ?';

  connection.query(query, [libroId], (error, results) => {
      if (error) {
          console.error('Error al obtener libro:', error);
          res.status(500).json({ mensaje: 'Error al obtener libro' });
      } else {
          res.json({ libro: results[0] });
      }
  });
});


app.get('/comentarios', (req, res) => {
  const query = `
      SELECT COMENTARIOS.id_comentario, COMENTARIOS.comentario, USUARIOS.nombre AS nombre_usuario, LIBROS.titulo AS titulo_libro
      FROM COMENTARIOS
      INNER JOIN USUARIOS ON COMENTARIOS.id_usuario = USUARIOS.id_usuario
      INNER JOIN LIBROS ON COMENTARIOS.id_libro = LIBROS.id_libro;
  `;
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error al obtener comentarios:', error);
          res.status(500).json({ mensaje: 'Error al obtener comentarios' });
      } else {
          res.json({ comentarios: results });
      }
  });
});


app.get('/libros/:idLibro/comentarios', (req, res) => {
  const libroId = req.params.idLibro; 

  const query = `
      SELECT COMENTARIOS.id_comentario, COMENTARIOS.comentario, USUARIOS.nombre AS nombre_usuario
      FROM COMENTARIOS
      INNER JOIN USUARIOS ON COMENTARIOS.id_usuario = USUARIOS.id_usuario
      WHERE COMENTARIOS.id_libro = ?`;

  connection.query(query, [libroId], (error, results) => {
      if (error) {
          console.error('Error al obtener comentarios del libro:', error);
          res.status(500).json({ mensaje: 'Error al obtener comentarios del libro' });
      } else {
          res.json({ comentarios: results });
      }
  });
});



app.get('/ventas', (req, res) => {
  const query = `
      SELECT VENTAS.id_venta, USUARIOS.nombre AS nombre_usuario, LIBROS.titulo AS titulo_libro
      FROM VENTAS
      INNER JOIN USUARIOS ON VENTAS.id_usuario = USUARIOS.id_usuario
      INNER JOIN LIBROS ON VENTAS.id_libro = LIBROS.id_libro;
  `;
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error al obtener ventas:', error);
          res.status(500).json({ mensaje: 'Error al obtener ventas' });
      } else {
          res.json({ ventas: results });
      }
  });
});


app.get('/ventas/usuario/:idUsuario', (req, res) => {
  const userId = req.params.idUsuario;

  // Query SQL para obtener las ventas de un usuario específico
  const query = `
      SELECT VENTAS.id_venta, LIBROS.titulo AS titulo_libro
      FROM VENTAS
      INNER JOIN LIBROS ON VENTAS.id_libro = LIBROS.id_libro
      WHERE VENTAS.id_usuario = ?`;

  connection.query(query, [userId], (error, results) => {
      if (error) {
          console.error('Error al obtener ventas del usuario:', error);
          res.status(500).json({ mensaje: 'Error al obtener ventas del usuario' });
      } else {
          res.json({ ventas: results });
      }
  });
});



app.get('/ventas/libro/:idLibro', (req, res) => {
  const libroId = req.params.idLibro;

  // Query SQL para obtener las ventas de un libro específico
  const query = `
      SELECT VENTAS.id_venta, USUARIOS.nombre AS nombre_usuario
      FROM VENTAS
      INNER JOIN USUARIOS ON VENTAS.id_usuario = USUARIOS.id_usuario
      WHERE VENTAS.id_libro = ?`;

  connection.query(query, [libroId], (error, results) => {
      if (error) {
          console.error('Error al obtener ventas del libro:', error);
          res.status(500).json({ mensaje: 'Error al obtener ventas del libro' });
      } else {
          res.json({ ventas: results });
      }
  });
});



app.get('/rentas', (req, res) => {
  const query = `
      SELECT RENTAS.id_renta, USUARIOS.nombre AS nombre_usuario, LIBROS.titulo AS titulo_libro, RENTAS.fecha_devolucion
      FROM RENTAS
      INNER JOIN USUARIOS ON RENTAS.id_usuario = USUARIOS.id_usuario
      INNER JOIN LIBROS ON RENTAS.id_libro = LIBROS.id_libro;
  `;
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error al obtener rentas:', error);
          res.status(500).json({ mensaje: 'Error al obtener rentas' });
      } else {
          res.json({ rentas: results });
      }
  });
});


app.get('/rentas/usuario/:idUsuario', (req, res) => {
  const userId = req.params.idUsuario;

  // Query SQL para obtener las rentas de un usuario específico
  const query = `
      SELECT RENTAS.id_renta, LIBROS.titulo AS titulo_libro, RENTAS.fecha_devolucion
      FROM RENTAS
      INNER JOIN LIBROS ON RENTAS.id_libro = LIBROS.id_libro
      WHERE RENTAS.id_usuario = ?`;

  connection.query(query, [userId], (error, results) => {
      if (error) {
          console.error('Error al obtener rentas del usuario:', error);
          res.status(500).json({ mensaje: 'Error al obtener rentas del usuario' });
      } else {
          res.json({ rentas: results });
      }
  });
});



app.get('/rentas/libro/:idLibro', (req, res) => {
  const libroId = req.params.idLibro;

  // Query SQL para obtener las rentas de un libro específico
  const query = `
      SELECT RENTAS.id_renta, USUARIOS.nombre AS nombre_usuario, RENTAS.fecha_devolucion
      FROM RENTAS
      INNER JOIN USUARIOS ON RENTAS.id_usuario = USUARIOS.id_usuario
      WHERE RENTAS.id_libro = ?`;

  connection.query(query, [libroId], (error, results) => {
      if (error) {
          console.error('Error al obtener rentas del libro:', error);
          res.status(500).json({ mensaje: 'Error al obtener rentas del libro' });
      } else {
          res.json({ rentas: results });
      }
  });
});



  // Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

  app.get('/HistorialUsuario/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;
  
    // Consulta SQL para obtener el historial de ventas y rentas de un usuario con información del libro y tipo de operación
    const historialQuery = `
      SELECT 
        u.nombre AS nombre_usuario,
        'venta' AS tipo_operacion,
        l.id_libro,
        l.sinopsis,
        l.precio_compra,
        l.precio_renta,
        v.fecha_venta AS fecha_operacion
      FROM ventas v
      JOIN libros l ON v.id_libro = l.id_libro
      JOIN usuarios u ON v.id_usuario = u.id_usuario
      WHERE v.id_usuario = ?
      
      UNION
      
      SELECT 
        u.nombre AS nombre_usuario,
        'renta' AS tipo_operacion,
        l.id_libro,
        l.sinopsis,
        l.precio_compra,
        l.precio_renta,
        r.fecha_renta AS fecha_operacion
      FROM rentas r
      JOIN libros l ON r.id_libro = l.id_libro
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      WHERE r.id_usuario = ?
    `;
  
    // Ejecutar la consulta
    connection.query(historialQuery, [idUsuario, idUsuario], (err, results) => {
      if (err) {
        console.error('Error al obtener el historial del usuario:', err);
        res.status(500).json({ mensaje: 'Error al obtener el historial del usuario' });
      } else {
        res.json(results);
      }
    });
  });
  


// Iniciar el servidor
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
