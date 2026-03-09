import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Code2, Trophy, BookOpen } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home', icon: <Database size={18} /> },
        { path: '/curriculum', label: 'Curriculum', icon: <BookOpen size={18} /> },
        { path: '/editor', label: 'SQL Editor', icon: <Code2 size={18} /> },
        { path: '/challenges', label: 'Challenges', icon: <Trophy size={18} /> },
    ];

    return (
        <nav className="navbar glass-panel">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <Database className="logo-icon" size={28} />
                    <span className="gradient-text">SQL Mastery</span>
                </Link>

                <div className="navbar-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>

                <div className="navbar-actions">
                    <div className="progress-badge">Level 1: Beginner</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
