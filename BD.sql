CREATE TABLE discos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    artista VARCHAR(255) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    imagem TEXT NOT NULL
);

-- Vamos inserir os teus discos atuais para testar
INSERT INTO discos (titulo, artista, genero, preco, imagem) VALUES 
('HIT ME HARD AND SOFT', 'Billie Eilish', 'pop', 33.87, 'https://m.media-amazon.com/images/I/718N0vAn9tL._AC_SL1500_.jpg'),
('Kind of Blue', 'Miles Davis', 'jazz', 25.00, 'https://m.media-amazon.com/images/I/71dtYuD2+-L._SL1500_.jpg'),
('Happier Than Ever', 'Billie Eilish', 'pop', 25.00, 'https://upload.wikimedia.org/wikipedia/pt/e/e8/Happier_Than_Ever_%28%C3%A1lbum%29_-_Billie_Eilish.png');