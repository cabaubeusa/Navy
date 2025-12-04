import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Feather from 'react-feather';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname;
    
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
}

export default Header;