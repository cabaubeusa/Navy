import React from 'react';
import { CATEGORIES } from '../utils/constants';
import { Link } from 'react-router-dom';
import * as Feather from 'react-feather';

function Home() {
  return (
    <div className="fade-in">
      <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '20px' }}>
        <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.8rem', opacity: 0.8 }}>Bem-vindo.</p>
      </div>
      <div className="categories-grid">
        {Object.entries(CATEGORIES).map(([key, cat]) => {
          const IconComponent = Feather[cat.icon.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')];

          return (
            <Link to={`/category/${key}`} key={key} className="cat-card">
              {IconComponent && <IconComponent className="cat-icon" size={24} strokeWidth={1} />}
              <span className="cat-name">{cat.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;