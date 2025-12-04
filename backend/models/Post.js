const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: function() { return this.categoria !== 'post-its'; } 
    },
    conteudo: { type: String, required: true },
    categoria: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;