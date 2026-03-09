import React from 'react';
import { Link } from 'react-router-dom';
import { curriculumData } from '../data/curriculum';
import './Curriculum.css';

const Curriculum = () => {
    return (
        <div className="curriculum-container animate-fade-in">
            <div className="curriculum-header text-center">
                <h1 className="page-title">SQL <span className="gradient-text">Mastery Curriculum</span></h1>
                <p className="page-subtitle">The complete 13-stage journey from zero knowledge to Data Engineer.</p>
            </div>

            <div className="levels-grid">
                {curriculumData.map((level, index) => (
                    <div key={level.id} className="level-card glass-panel animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                        <div className="level-badge">Level {level.level}</div>
                        <h2 className="level-title">{level.title}</h2>
                        <h3 className="level-subtitle">{level.subtitle}</h3>
                        <p className="level-desc">{level.description}</p>

                        <div className="level-stats">
                            <span className="stat-pill">{level.modules.length} Modules</span>
                            <span className="stat-pill">
                                {level.modules.reduce((acc, curr) => acc + curr.topics.length, 0)} Topics
                            </span>
                        </div>

                        <Link to={`/curriculum/${level.id}`} className="primary-btn w-full text-center" style={{ marginTop: 'auto' }}>
                            View Level
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Curriculum;
