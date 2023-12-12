-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS mylibrary;

-- Seleccionar la base de datos
USE mylibrary;

-- Crear la tabla USUARIOS
CREATE TABLE IF NOT EXISTS USUARIOS (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150),
    apellido VARCHAR(150),
    numero_tel VARCHAR(8),
    correo VARCHAR(150),
    password VARCHAR(30),
    fecha_nac DATE
);

-- Crear la tabla LIBROS
CREATE TABLE IF NOT EXISTS LIBROS (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150),
    sinopsis TEXT,
    precio_compra DECIMAL(10, 2),
    precio_renta DECIMAL(10, 2),
    autor VARCHAR(150),
    año_publicacion INT,
    editorial VARCHAR(150),
    estado ENUM('Ocupado', 'Disponible','Vendido')
);

-- Crear la tabla RENTAS
CREATE TABLE IF NOT EXISTS RENTAS (
	id_renta INT,
    id_usuario INT,
    id_libro INT,
    fecha_devolucion DATE,
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario),
    FOREIGN KEY (id_libro) REFERENCES LIBROS(id_libro),
    PRIMARY KEY (id_renta)
);

-- Crear la tabla VENTAS
CREATE TABLE IF NOT EXISTS VENTAS (
	id_venta INT,
    id_usuario INT,
    id_libro INT,
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario),
    FOREIGN KEY (id_libro) REFERENCES LIBROS(id_libro),
    PRIMARY KEY (id_venta)
);

-- Crear la tabla COMENTARIOS
CREATE TABLE IF NOT EXISTS COMENTARIOS (
	id_comentario INT,
    id_usuario INT,
    id_libro INT,
    comentario TEXT,
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_libro) REFERENCES LIBROS(id_libro) ON DELETE CASCADE,
    PRIMARY KEY (id_comentario)
);
