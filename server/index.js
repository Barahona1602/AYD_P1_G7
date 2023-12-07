const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

  // Puedes agregar más validaciones según tus necesidades


  // Aquí deberías guardar la información en tu base de datos o realizar cualquier otra acción necesaria


  
  // Respuesta exitosa
  res.json({ mensaje: 'Usuario registrado con éxito', usuario: { nombre, apellido, telefono, correo, fechaNacimiento } });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
