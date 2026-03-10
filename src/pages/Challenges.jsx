import React from 'react';
import { Link } from 'react-router-dom';
import { challenges, challengeCategories } from '../data/challenges';
import { Search, Filter, Code } from 'lucide-react';
import './Challenges.css';

const PAGE_SIZE = 30;

const Challenges = () => {
    const [search, setSearch] = React.useState('');
    const [difficulty, setDifficulty] = React.useState('All');
    const [category, setCategory] = React.useState('All');
    const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);

    const filteredChallenges = challenges.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
        const matchesDifficulty = difficulty === 'All' || c.difficulty === difficulty;
        const matchesCategory = category === 'All' || c.category === category;
        return matchesSearch && matchesDifficulty && matchesCategory;
    });

    const shown = filteredChallenges.slice(0, visibleCount);

    React.useEffect(() => { setVisibleCount(PAGE_SIZE); }, [search, difficulty, category]);

    return (
        <div className="challenges-container animate-fade-in">
            <div className="challenges-header text-center">
                <h1 className="page-title">SQL <span className="gradient-text">Challenges</span></h1>
                <p className="page-subtitle">{challenges.length}+ problems across {challengeCategories.length} categories — beginner to expert.</p>
            </div>

            <div className="category-scroll-container mb-6 overflow-auto">
                <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
                    <button
                        className={`category-chip ${category === 'All' ? 'active' : ''}`}
                        onClick={() => setCategory('All')}
                    >All ({challenges.length})</button>
                    {challengeCategories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-chip ${category === cat.id ? 'active' : ''}`}
                            onClick={() => setCategory(cat.id)}
                        >
                            {cat.icon} {cat.title} ({cat.count})
                        </button>
                    ))}
                </div>
            </div>

            <div className="filter-bar glass-panel flex justify-between items-center">
                <div className="search-box flex items-center gap-2">
                    <Search size={18} className="text-muted" />
                    <input
                        type="text"
                        placeholder="Search problems..."
                        className="transparent-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="filter-controls flex items-center gap-4">
                    <Filter size={18} className="text-muted" />
                    <select
                        className="dataset-select"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="All">All Difficulties</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Expert">Expert</option>
                    </select>
                    <span className="text-muted text-sm">{filteredChallenges.length} results</span>
                </div>
            </div>

            <div className="challenges-list">
                {shown.length > 0 ? shown.map((chal, idx) => (
                    <Link key={chal.id} to={`/challenges/${chal.id}`} className="challenge-item glass-panel animate-slide-up" style={{ animationDelay: `${Math.min(idx, 10) * 0.03}s` }}>
                        <div className="chal-info flex items-center gap-4">
                            <div className="chal-status pending"><Code size={20} /></div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="chal-title">{chal.title}</h3>
                                    {chal.company && <span className="company-badge">{chal.company}</span>}
                                </div>
                                <div className="chal-tags gap-2 flex">
                                    {chal.tags.slice(0, 3).map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="chal-meta flex items-center gap-6">
                            <span className={`badge badge-${chal.difficulty.toLowerCase()}`}>{chal.difficulty}</span>
                            <span className="primary-btn sm-btn">Solve</span>
                        </div>
                    </Link>
                )) : (
                    <div className="text-center p-12 text-muted">No problems found for this filter.</div>
                )}
            </div>

            {visibleCount < filteredChallenges.length && (
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                    <button className="secondary-btn" onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}>
                        Load More ({filteredChallenges.length - visibleCount} remaining)
                    </button>
                </div>
            )}
        </div>
    );
};

export default Challenges;
