const request = require('supertest');
const { app } = require('./index.js');

describe('Ruta de login', () => {
    it('Debería devolver "Acceso concedido" si las credenciales son correctas', async () => {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: 'pablo@gmail.com', password: '123' }),
      });
  
      expect(response.status).toBe(200);
      expect(await response.text()).toBe('{\"mensaje\":\"Acceso concedido\"}');
    });
  
    it('Debería devolver "Usuario o contraseña incorrectos" si las credenciales son incorrectas', async () => {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: 'usuario@example.com', password: 'incorrecta' }),
      });
  
      expect(response.status).toBe(401);
      expect(await response.text()).toBe('{\"mensaje\":\"Usuario o contraseña incorrectos\"}');
    });
  });


  describe('Ruta de comentar un libro', () => {
    it('Debería devolver "Faltan datos requeridos para comentar el libro" si los datos requeridos no están presentes', async () => {
        const response = await fetch('http://localhost:3000/comentarLibro/1/2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
      });
  
      expect(response.status).toBe(400);
      expect(await response.text()).toBe('{\"mensaje\":\"Faltan datos requeridos para comentar el libro\"}');
    });
  
    it('Debería devolver "Usuario no encontrado" si el usuario no existe', async () => {
        const response = await fetch('http://localhost:3000/comentarLibro/2/1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ comentario: 'Este es un comentario' }),
      });
  
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('{\"mensaje\":\"Usuario no encontrado\"}');
    });
  
    it('Debería devolver "Libro no encontrado" si el libro no existe', async () => {
        const response = await fetch('http://localhost:3000/comentarLibro/1/10', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ comentario: 'Este es un comentario' }),
      });
  
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('{\"mensaje\":\"Libro no encontrado\"}');
    });
  
    it('Debería devolver "Comentario registrado con éxito" si el comentario se registra correctamente', async () => {
        const response = await fetch('http://localhost:3000/comentarLibro/1/1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ comentario: 'C0M3NT4RI0 D3 T3ST' }),
      });
  
      expect(response.status).toBe(200);
      expect(await response.text()).toBe(
        '{\"mensaje\":\"Comentario registrado con éxito\",\"id_usuario\":\"1\",\"id_libro\":\"1\",\"comentario\":\"C0M3NT4RI0 D3 T3ST\"}'
      );
    });
  });


  describe('Ruta de eliminar comentario', () => {
    it('Debería devolver "Faltan datos requeridos para eliminar el comentario" si los datos requeridos no están presentes', async () => {
      const response = await fetch('http://localhost:3000/eliminarComentario/1/2', {
      method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
      });
      expect(response.status).toBe(404);
    });
  
    it('Debería devolver "Usuario no encontrado" si el usuario no existe', async () => {
      const response = await fetch('http://localhost:3000/eliminarComentario/200/1/3', {
      method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
      });
  
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('{"mensaje":"Usuario no encontrado"}');
    });
  
    it('Debería devolver "Libro no encontrado" si el libro no existe', async () => {
      const response = await fetch('http://localhost:3000/eliminarComentario/1/100/3', {
      method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
      });
  
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('{"mensaje":"Libro no encontrado"}');
    });
  
    it('Debería devolver "Comentario no encontrado" si el comentario no existe', async () => {
      const response = await fetch('http://localhost:3000/eliminarComentario/1/1/100', {
      method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
      });
  
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('{"mensaje":"Comentario no encontrado"}');
    });
  
    //SIEMPRE DEBE DE EXISTIR UN COMENTARIO EN EL USUARIO 1, LIBRO 1 Y COMENTARIO 1 
    it('Debería devolver "Comentario eliminado con éxito" si el comentario se elimina correctamente', async () => {
      const response = await fetch('http://localhost:3000/eliminarComentario/1/1/1', {
      method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
      });
  
      expect(response.status).toBe(200);
      expect(await response.text()).toBe(
        '{\"mensaje\":\"Comentario eliminado con éxito\",\"id_usuario\":\"1\",\"id_libro\":\"1\",\"id_comentario\":\"1\"}'
      );
    });
  });