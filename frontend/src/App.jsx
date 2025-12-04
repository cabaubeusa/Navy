import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import * as Feather from 'react-feather';

import Home from './pages/Home';
import Category from './pages/Category';
import Post from './pages/Post';
import Create from './pages/Create';
import Header from './components/Header';
import Footer from './components/Footer';
import { API_URL, CATEGORIES } from './utils/constants';

const AppHeader = () => {
    const navigate = useNavigate();
    const currentPath = window.location.pathname;
    
    const showHome = currentPath !== '/';
    const showCreate = currentPath !== '/create';

    return (
        <header>
            <div id="logo" className="logo" onClick={() => navigate('/')}>Navy.</div>
            <div style={{ display: 'flex', gap: '10px' }}>
                {showHome && (
                    <button id="home-btn" className="nav-btn" onClick={() => navigate('/')}>
                        <Feather.Home size={20} />
                    </button>
                )}
                {showCreate && (
                    <button id="create-btn" className="nav-btn" onClick={() => navigate('/create')}>
                        <Feather.Plus size={20} />
                    </button>
                )}
            </div>
        </header>
    );
};

function App() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await fetch(API_URL);
            let fetchedPosts = await response.json();
            fetchedPosts.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    
    const handleSavePost = async (titulo, conteudo, categoria) => {
        if (!conteudo || (!titulo && categoria !== 'post-its')) {
            alert('O vazio não pode ser publicado.');
            return;
        }
    
        const postData = {
            titulo: titulo,
            conteudo: conteudo,
            categoria: categoria,
            dataCriacao: new Date().toISOString()
        };
    
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });
            await fetchPosts(); 
            window.location.href = '/'; 
        } catch (error) {
            console.error("Erro ao salvar post:", error);
            alert("Falha ao salvar a memória.");
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Deseja apagar esta memória?')) return;
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            await fetchPosts();
            window.location.href = '/'; 
        } catch (error) {
            console.error("Erro ao deletar post:", error);
            alert("Falha ao apagar a memória.");
        }
    }


    if (isLoading) {
        return (
            <div className="loading-screen">
                <h1 className="logo-text">Navy</h1>
                <p>respirando...</p>
            </div>
        );
    }

return (
        <div className="app-container" id="app">
            <Header /> 
            
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create onSave={handleSavePost} posts={posts} />} />
                    <Route path="/category/:categoryId" element={<Category posts={posts} />} />
                    <Route path="/post/:categoryId/:postId" element={<Post posts={posts} onDelete={handleDelete} />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);
export default AppWrapper;