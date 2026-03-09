import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Terminal, GitMerge, Layout, BarChart, Server } from 'lucide-react';
import './Home.css';

const Home = () => {
    const features = [
        { icon: <Terminal size={24} />, title: 'Interactive SQL Editor', desc: 'Write and execute real SQL queries directly in your browser with SQLite WASM.' },
        { icon: <GitMerge size={24} />, title: 'LeetCode-style Challenges', desc: 'Practice with 15+ graded SQL challenges ranging from Easy to Hard with automated testing.' },
        { icon: <Layout size={24} />, title: 'Visual DB Builder', desc: 'Understand relationships visually. Drag and drop entity relationship diagrams.' },
        { icon: <BarChart size={24} />, title: 'Query Visualizer', desc: 'See under the hood with EXPLAIN visualizers to understand query performance.' },
        { icon: <Database size={24} />, title: 'Real Datasets', desc: 'Practice your skills on realistic datasets: E-commerce, Employees, and Movie databases.' },
        { icon: <Server size={24} />, title: 'Certification Path', desc: 'Progress through 12 structured levels to go from zero to Data Engineer.' },
    ];

    return (
        <div className="home-container animate-fade-in">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="badge badge-medium animate-slide-up" style={{ animationDelay: '0.1s', marginBottom: '1.5rem' }}>
                        V1.0 Early Access
                    </div>
                    <h1 className="hero-title animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Master SQL from <span className="gradient-text">Zero to Senior</span>
                    </h1>
                    <p className="hero-subtitle animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        The ultimate interactive learning platform combining the structure of Coursera, the practice of LeetCode, and the depth of DataCamp.
                    </p>
                    <div className="hero-cta animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <Link to="/curriculum" className="primary-btn hero-btn">
                            Start Learning Path
                        </Link>
                        <Link to="/editor" className="secondary-btn hero-btn">
                            Open SQL Editor
                        </Link>
                    </div>
                </div>

                <div className="hero-visual animate-slide-up" style={{ animationDelay: '0.5s' }}>
                    <div className="mock-editor glass-panel">
                        <div className="editor-header">
                            <span className="dot dot-red"></span>
                            <span className="dot dot-yellow"></span>
                            <span className="dot dot-green"></span>
                            <span className="editor-title">postgres@localhost</span>
                        </div>
                        <pre className="editor-code">
                            <code><span className="sql-keyword">SELECT</span> department, <span className="sql-func">AVG</span>(salary)
                                <span className="sql-keyword">FROM</span> employees
                                <span className="sql-keyword">WHERE</span> hire_date <span className="sql-op">&gt;</span> <span className="sql-string">'2020-01-01'</span>
                                <span className="sql-keyword">GROUP BY</span> department
                                <span className="sql-keyword">ORDER BY</span> <span className="sql-func">AVG</span>(salary) <span className="sql-keyword">DESC</span>;
                            </code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stat-box glass-panel">
                    <h3 className="stat-number gradient-text">12</h3>
                    <p className="stat-label">Detailed Levels</p>
                </div>
                <div className="stat-box glass-panel">
                    <h3 className="stat-number gradient-text">60</h3>
                    <p className="stat-label">Learning Modules</p>
                </div>
                <div className="stat-box glass-panel">
                    <h3 className="stat-number gradient-text">15+</h3>
                    <p className="stat-label">Coding Challenges</p>
                </div>
                <div className="stat-box glass-panel">
                    <h3 className="stat-number gradient-text">3</h3>
                    <p className="stat-label">Real-world DBs</p>
                </div>
            </section>

            {/* Learning Path Preview */}
            <section className="path-section text-center">
                <h2 className="section-title">Your Journey to <span className="gradient-text">Mastery</span></h2>
                <p className="section-subtitle">A meticulously crafted curriculum structured into 12 distinct levels.</p>

                <div className="timeline-preview">
                    <div className="timeline-track"></div>
                    <div className="timeline-node completed">
                        <div className="node-content">
                            <h4>L0-L2</h4>
                            <p>SQL Basics</p>
                        </div>
                    </div>
                    <div className="timeline-node active">
                        <div className="node-content">
                            <h4>L3-L5</h4>
                            <p>Advanced & Design</p>
                        </div>
                    </div>
                    <div className="timeline-node">
                        <div className="node-content">
                            <h4>L6-L8</h4>
                            <p>DB Engines (PG/Mongo)</p>
                        </div>
                    </div>
                    <div className="timeline-node">
                        <div className="node-content">
                            <h4>L9-L12</h4>
                            <p>Data Engineering</p>
                        </div>
                    </div>
                </div>

                <Link to="/curriculum" className="primary-btn" style={{ marginTop: '3rem' }}>
                    Explore Full Curriculum
                </Link>
            </section>

            {/* Features Grid */}
            <section className="features-section">
                <h2 className="section-title text-center">Platform <span className="gradient-text">Features</span></h2>
                <p className="section-subtitle text-center">Everything you need to master databases without installing anything locally.</p>

                <div className="features-grid">
                    {features.map((feat, idx) => (
                        <div key={idx} className="feature-card glass-panel animate-slide-up" style={{ animationDelay: `${0.1 * idx}s` }}>
                            <div className="feature-icon-wrapper">
                                {feat.icon}
                            </div>
                            <h3 className="feature-title">{feat.title}</h3>
                            <p className="feature-desc">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Ready CTA */}
            <section className="cta-section text-center glass-panel">
                <h2 className="section-title">Ready to write better queries?</h2>
                <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Join the learning platform built for the modern data stack. No credit card required.
                </p>
                <Link to="/curriculum/level-0" className="primary-btn" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
                    Start First Lesson
                </Link>
            </section>
        </div>
    );
};

export default Home;
