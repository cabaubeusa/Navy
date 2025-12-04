import React from 'react';

function Footer() {
    const footerStyle = {
        padding: '20px 0',
        textAlign: 'center',
        marginTop: '40px',
        borderTop: '1px dashed rgba(0, 0, 0, 0.1)',
        fontSize: '0.8rem',
        opacity: 0.6,
        fontFamily: 'var(--font-ui)'
    };

    return (
        <footer style={footerStyle}>
            &copy; {new Date().getFullYear()} Navy. Todos os direitos reservados.
            <br/>
            Construído com React e uma xícara de café.
        </footer>
    );
}

export default Footer;