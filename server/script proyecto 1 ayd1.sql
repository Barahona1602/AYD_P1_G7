-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS mylibrary;

-- Seleccionar la base de datos
USE mylibrary;

-- Crear la tabla USUARIOS
CREATE TABLE IF NOT EXISTS USUARIOS (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(250),
    apellido VARCHAR(250),
    numero_tel VARCHAR(8),
    correo VARCHAR(250),
    password VARCHAR(250),
    fecha_nac DATE
);

-- Crear la tabla LIBROS
CREATE TABLE IF NOT EXISTS LIBROS (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(250),
    sinopsis TEXT,
    precio_compra DECIMAL(10, 2),
    precio_renta DECIMAL(10, 2),
    autor VARCHAR(250),
    año_publicacion INT,
    editorial VARCHAR(250),
    estado ENUM('Ocupado', 'Disponible', 'Vendido')
);

-- Crear la tabla RENTAS
CREATE TABLE IF NOT EXISTS RENTAS (
	id_renta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_libro INT,
    devuelto BOOLEAN DEFAULT false,
    fecha_renta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion DATE,
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_libro) REFERENCES LIBROS(id_libro) ON DELETE CASCADE
   
);

-- Crear la tabla VENTAS
CREATE TABLE IF NOT EXISTS VENTAS (
	id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_libro INT,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_libro) REFERENCES LIBROS(id_libro) ON DELETE CASCADE
 
);

-- Crear la tabla COMENTARIOS
CREATE TABLE IF NOT EXISTS COMENTARIOS (
	id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_libro INT,
    comentario TEXT,
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_libro) REFERENCES LIBROS(id_libro) ON DELETE CASCADE
);
