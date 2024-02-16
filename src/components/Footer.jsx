import React from 'react';

const Footer = () => {
    return (
        <footer style={{ 
            backgroundColor: '#171b37',  
            textAlign: 'left', 
            padding: '0 1rem', 
            left: '0', 
            bottom: '0', 
            width: '100%',
        }}
        >
            <hr />
            <p style={{ padding: '0 5rem', color: '#b4cbff' }}>
                Step into Conspiracy Corner, the ultimate destination for those who dare to question the narrative and uncover the secrets lurking just out of sight. Craft and share your own conspiracy theories, and peel back the layers of reality one story at a time. Conspiracy Corner: where every shadow holds a story and no truth is too outlandish to consider. <br />
                <span style={{ color: '#fff' }}>Conspiracy Corner © {new Date().getFullYear()}</span>
            </p>
        </footer>
    )
}

export default Footer;