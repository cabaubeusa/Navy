import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CATEGORIES } from '../utils/constants';
import { ChevronLeft } from 'react-feather';

const PostItem = ({ post, categoryKey }) => {
    const isPostIt = categoryKey === 'post-its';
    const navigate = useNavigate();
    const date = new Date(post.dataCriacao).toLocaleDateString('pt-BR');

    const handleClick = () => {
        navigate(`/post/${categoryKey}/${post.id}`);
    };

    if (isPostIt) {
        const idx = post.id.charCodeAt(0) % 3; 
        const bgColor = ['#fff7d1', '#ffdee1', '#e2f7cb'][idx];
        const rotateClass = `rotate-${idx}`;

        return (
            <div
                onClick={handleClick}
                className={`post-it-card ${rotateClass}`}
                style={{ backgroundColor: bgColor }}
            >
                <h3>{post.titulo}</h3>
                <div dangerouslySetInnerHTML={{ __html: post.conteudo.substring(0, 100) }} style={{ overflow: 'hidden', flexGrow: 1 }} />
            </div>
        );
    }

    return (
        <div onClick={handleClick} className="post-row">
            <span className="post-date">{date}</span>
            <span className="post-title">{post.titulo}</span>
        </div>
    );
};

function Category({ posts }) {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const categoryInfo = CATEGORIES[categoryId];
    const filteredPosts = posts.filter(p => p.categoria === categoryId);

    if (!categoryInfo) return <div>Categoria não encontrada.</div>;

    const isPostIt = categoryId === 'post-its';

    return (
        <div>
            <div style={{ padding: '20px' }}>
                <button onClick={() => navigate('/')} className="nav-btn">
                    <ChevronLeft size={20} /> Voltar
                </button>
            </div>
            
            {!isPostIt && (
                <div className="standard-list fade-in">
                    <h2 className="category-title">{categoryInfo.label}</h2>
                    <p className="category-desc">{categoryInfo.desc}</p>
                    <div className="list-separator"></div>
                    {filteredPosts.length === 0 ? (
                        <p className="empty-msg">Ainda não há nada aqui.</p>
                    ) : (
                        filteredPosts.map(post => (
                            <PostItem key={post.id} post={post} categoryKey={categoryId} />
                        ))
                    )}
                </div>
            )}

            {isPostIt && (
                <div className="post-it-grid fade-in">
                    {filteredPosts.map(post => (
                         <PostItem key={post.id} post={post} categoryKey={categoryId} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Category;