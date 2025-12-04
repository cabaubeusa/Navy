const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const Post = require('./models/Post'); 

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; 

app.use(cors());
app.use(express.json()); 

mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB Atlas!'))
    .catch(err => console.error('Erro de conexão com MongoDB:', err));

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ dataCriacao: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar posts" });
    }
});

app.post('/posts', async (req, res) => {
    const { titulo, conteudo, categoria } = req.body;
    
    const finalTitle = categoria === 'post-its' ? `Post-it nº ${await Post.countDocuments({ categoria: 'post-its' }) + 1}` : titulo;

    try {
        const newPost = await Post.create({
            titulo: finalTitle,
            conteudo: conteudo,
            categoria: categoria,
        });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Post.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Post não encontrado" });
        }
        res.json({ message: "Post deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});