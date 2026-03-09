import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            textAlign: 'center',
            padding: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            fontSize: '0.875rem'
        }}>
            <div style={{ marginBottom: '1rem' }}>
                <span className="gradient-text" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>SQL Mastery</span>
                <p style={{ marginTop: '0.5rem' }}>From Zero to Senior Data Engineer</p>
            </div>
            <div>
                &copy; {new Date().getFullYear()} SQL Learning Platform. Built for absolute beginners and advanced professionals.
            </div>
        </footer>
    );
};

export default Footer;
