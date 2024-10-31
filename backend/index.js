import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'surveydb' 
});


db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});


db.query(`
    CREATE TABLE IF NOT EXISTS surveys (
        id INT AUTO_INCREMENT PRIMARY KEY,
        satisfaction VARCHAR(255),
        comments TEXT
    )
`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela:', err);
    }
});


app.post('/api/survey', (req, res) => {
    const { satisfaction, comments } = req.body;

    db.query(`INSERT INTO surveys (satisfaction, comments) VALUES (?, ?)`, [satisfaction, comments], (err, results) => {
        if (err) {
            console.error('Erro ao inserir no banco de dados:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId });
    });
});


app.get('/api/surveys', (req, res) => {
    db.query(`SELECT * FROM surveys`, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar pesquisas:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
