import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2, ChevronLeft } from 'react-feather';
import { CATEGORIES } from '../utils/constants';

function Post({ posts, onDelete }) {
    const { postId, categoryId } = useParams();
    const navigate = useNavigate();
    
    const currentPost = posts.find(p => p.id === postId);

    if (!currentPost) return <div>Post não encontrado.</div>;

    let containerClass = 'post-container';
    if (currentPost.categoria === 'senhor-ninguem') containerClass += ' theme-old-letter';
    if (currentPost.categoria === 'cartas') containerClass += ' theme-romantic';
    if (currentPost.categoria === 'post-its') containerClass += ' theme-sticky';
    if (currentPost.categoria === 'poesias') containerClass += ' theme-poetry';
    if (currentPost.categoria === 'composicoes') containerClass += ' theme-minimal';

    const formattedDate = new Date(currentPost.dataCriacao).toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const handleDeleteClick = () => {
        onDelete(currentPost.id);
    };

    return (
        <div>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => navigate(`/category/${categoryId}`)} className="nav-btn">
                    <ChevronLeft size={20} /> Voltar
                </button>
            </div>
            <div className={`single-post-wrapper fade-in ${containerClass}`}>
                <div className="post-content-area">
                    <div className="post-header">
                        <h1>{currentPost.titulo}</h1>
                        <span className="meta">{formattedDate}</span>
                    </div>
                    <div className="post-body" dangerouslySetInnerHTML={{ __html: currentPost.conteudo }}></div>
                    
                    <div className="post-actions">
                        <button onClick={handleDeleteClick} className="btn-icon">
                            <Trash2 size={16} /> Apagar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;