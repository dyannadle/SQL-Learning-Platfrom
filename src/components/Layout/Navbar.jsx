import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Code2, Trophy, BookOpen, Star } from 'lucide-react';
import { calculateXP, getLevelInfo } from '../../lib/progress';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [xp, setXp] = React.useState(calculateXP());
    const levelInfo = getLevelInfo(xp);

    // Refresh XP on navigation (basic polling/trigger)
    React.useEffect(() => {
        setXp(calculateXP());
    }, [location]);

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
                    <div className="xp-container flex-col items-end">
                        <div className="flex items-center gap-2 mb-1">
                            <Star size={14} className="text-accent-yellow" fill="var(--accent-yellow)" />
                            <span className="xp-text">{xp} XP</span>
                            <span className="level-badge">{levelInfo.title}</span>
                        </div>
                        <div className="xp-bar-bg">
                            <div
                                className="xp-bar-fill"
                                style={{ width: `\${(xp / levelInfo.next) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
