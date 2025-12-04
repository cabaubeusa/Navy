import React, { useState, useRef, useEffect } from 'react';
import { CATEGORIES } from '../utils/constants';
import { Save } from 'react-feather';

function Create({ onSave, posts }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(Object.keys(CATEGORIES)[0]);
    const richEditorRef = useRef(null);

    useEffect(() => {
        const titleInput = document.getElementById('editor-title');
        if (category === 'post-its') {
            titleInput.setAttribute('disabled', 'true');
            titleInput.placeholder = "Título automático para post-its";
        } else {
            titleInput.removeAttribute('disabled');
            titleInput.placeholder = "Dê um nome ao sentimento...";
        }
    }, [category]);

    const handleTool = (command, value = null) => {
        document.execCommand(command, false, value);
        richEditorRef.current.focus();
    };

    const insertImage = () => {
        const url = prompt('URL da Imagem:');
        if (url) handleTool('insertImage', url);
    };

    const insertVideo = () => {
        const url = prompt('URL do YouTube:');
        if (url) {
            const embedUrl = url.replace('watch?v=', 'embed/');
            const embed = `<iframe width="100%" height="315" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
            document.execCommand('insertHTML', false, embed); 
        }
    };

    const handleSave = () => {
        const content = richEditorRef.current.innerHTML;
        let finalTitle = title;
        
        if (category === 'post-its') {
            const postItCount = posts.filter(p => p.categoria === 'post-its').length;
            finalTitle = `Post-it nº ${postItCount + 1}`;
        }

        onSave(finalTitle, content, category);
    };


    return (
        <div className="editor-wrapper fade-in">
            <input 
                id="editor-title" 
                type="text" 
                placeholder="Dê um nome ao sentimento..." 
                className="input-title"
                value={category === 'post-its' ? '' : title}
                onChange={(e) => setTitle(e.target.value)}
            />
            
            <select id="editor-category" className="category-select" onChange={(e) => setCategory(e.target.value)}>
                {Object.entries(CATEGORIES).map(([key, cat]) => (
                    <option key={key} value={key}>{cat.label}</option>
                ))}
            </select>

            <div className="toolbar">
                <button className="tool-btn" onClick={() => handleTool('bold')}>Negrito</button>
                <button className="tool-btn" onClick={() => handleTool('italic')}>Itálico</button>
                <button className="tool-btn" onClick={insertImage}>Imagem</button>
                <button className="tool-btn" onClick={insertVideo}>Vídeo</button>
            </div>

            <div 
                id="rich-editor"
                ref={richEditorRef}
                className="rich-editor" 
                contentEditable="true"
                data-placeholder="Escreva..."
                style={{ borderBottom: '1px solid #eee', marginBottom: '20px' }}
            ></div>

            <button id="save-post-btn" className="btn-primary" onClick={handleSave}>
                <Save size={16} /> Guardar na memória
            </button>
        </div>
    );
}

export default Create;