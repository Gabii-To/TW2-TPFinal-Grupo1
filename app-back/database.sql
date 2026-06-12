# CREATE DATABASE prismaDB;
USE prismaDB;

CREATE TABLE Usuario (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          email VARCHAR(100) NOT NULL UNIQUE,
                          password VARCHAR(255) NOT NULL,
                          nombre VARCHAR(50) NOT NULL,
                          apellido VARCHAR(50) NOT NULL,
                          direccion VARCHAR(150) NOT NULL
);

CREATE TABLE Producto (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           nombre VARCHAR(100) NOT NULL,
                           descripcion TEXT NOT NULL,
                           clasificacion VARCHAR(50) NOT NULL,
                           precio DECIMAL(10,2) NOT NULL,
                           usuario_id INT NOT NULL,

                           CONSTRAINT fk_producto_usuario
                               FOREIGN KEY (usuario_id)
                                   REFERENCES Usuario(id)
);

#Password 1234 hasheado
INSERT INTO Usuario (email, password, nombre, apellido, direccion)
VALUES
    ('juan@gmail.com', '$2b$10$P5j/SVqb8auccms0jjiHv.I3MZ2H3v6uO2n8.mh47Xdd8a15PQFLe', 'Juan', 'Perez', 'Av. Corrientes 1234'),
    ('maria@gmail.com', '$2b$10$P5j/SVqb8auccms0jjiHv.I3MZ2H3v6uO2n8.mh47Xdd8a15PQFLe', 'Maria', 'Gomez', 'Av. Rivadavia 2500'),
    ('carlos@gmail.com', '$2b$10$P5j/SVqb8auccms0jjiHv.I3MZ2H3v6uO2n8.mh47Xdd8a15PQFLe', 'Carlos', 'Lopez', 'San Martin 456');

INSERT INTO Producto
(nombre, descripcion, clasificacion, precio, usuario_id)
VALUES
    (
        'Notebook Lenovo',
        'Notebook Lenovo IdeaPad 15 pulgadas',
        'Tecnologia',
        750000,
        1
    ),
    (
        'Mouse Logitech',
        'Mouse inalámbrico Logitech M170',
        'Tecnologia',
        25000,
        1
    ),
    (
        'Bicicleta Mountain Bike',
        'Rodado 29 con cambios Shimano',
        'Deportes',
        320000,
        2
    ),
    (
        'Mesa de Comedor',
        'Mesa de madera para 6 personas',
        'Hogar',
        180000,
        3
    );

