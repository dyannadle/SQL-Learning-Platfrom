import React from 'react';
import { Link } from 'react-router-dom';
import { challenges } from '../data/challenges';
import { Search, Filter, CheckCircle, Code } from 'lucide-react';
import './Challenges.css';

const Challenges = () => {
    return (
        <div className="challenges-container animate-fade-in">
            <div className="challenges-header text-center">
                <h1 className="page-title">SQL <span className="gradient-text">Challenges</span></h1>
                <p className="page-subtitle">Test your skills against real-world database problems.</p>
            </div>

            <div className="filter-bar glass-panel flex justify-between items-center">
                <div className="search-box flex items-center gap-2">
                    <Search size={18} className="text-muted" />
                    <input type="text" placeholder="Search challenges..." className="transparent-input" />
                </div>
                <div className="filter-controls flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-muted" />
                        <span className="text-muted text-sm">Difficulty:</span>
                    </div>
                    <select className="dataset-select">
                        <option value="All">All</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </div>

            <div className="challenges-list">
                {challenges.map((chal, idx) => (
                    <Link key={chal.id} to={`/challenges/${chal.id}`} className="challenge-item glass-panel animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                        <div className="chal-info flex items-center gap-4">
                            <div className="chal-status pending"><Code size={20} /></div>
                            <div>
                                <h3 className="chal-title">{chal.title}</h3>
                                <div className="chal-tags gap-2 flex">
                                    {chal.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="chal-meta flex items-center gap-6">
                            <span className={`badge badge-${chal.difficulty.toLowerCase()}`}>{chal.difficulty}</span>
                            <span className="primary-btn sm-btn">Solve</span>
                        </div>
                    </Link>
                ))}
            </div >
        </div >
    );
};

export default Challenges;
