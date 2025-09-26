const express = require('express');
const app = express();
const PORT = 8001;

// token rahasia (hardcode, bisa juga dari .env)
const TOKEN = "mysecrettoken";

// middleware sederhana untuk cek bearer token
function authBearer(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'token tidak ditemukan'});
    }

    if (token !== TOKEN) {
        return res.status(403).json({ error: 'token salah atau tidak valid'});
    }

    next();
}



app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/about', (req, res) => {
    res.json([
        { id:1, name: 'Andi', job: 'Senior Programmer'},
        { id:2, name: 'Bima', job: 'Technical Report'},
        { id:3, name: 'Caca', job: 'Front-End Programmer'},
        { id:4, name: 'Deli', job: 'UI/UX Designer'},
        { id:5, name: 'Erlang', job: 'Marketing'}
    ]);
});

app.get('/api/payments', authBearer, (req, res) => {
    res.json([
        { id: 101, user: 'andi', amount: 150000, status: 'success', method: 'bank transfer'},
        { id: 102, user: 'bima', amount: 250000, status: 'pending', method: 'bank credit'},
        { id: 103, user: 'caca', amount: 50000, status: 'failed', method: 'e-wallet'}
    ]);
});