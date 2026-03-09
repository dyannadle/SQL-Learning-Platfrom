import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculumData } from '../data/curriculum';
import './CurriculumDetail.css';
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';

const LevelDetail = () => {
    const { levelId } = useParams();
    const level = curriculumData.find((l) => l.id === levelId);

    if (!level) {
        return <div className="page-container"><h2>Level Not Found</h2></div>;
    }

    return (
        <div className="curriculum-detail-container animate-fade-in">
            <Link to="/curriculum" className="back-link">
                <ArrowLeft size={16} /> Back to Curriculum
            </Link>

            <div className="level-header glass-panel">
                <span className="level-badge-large">Level {level.level}</span>
                <h1 className="level-title-large">{level.title}</h1>
                <p className="level-desc-large">{level.description}</p>

                <div className="progress-container">
                    <div className="progress-info">
                        <span>Overall Progress</span>
                        <span>0%</span>
                    </div>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: '0%' }}></div>
                    </div>
                </div>
            </div>

            <h2 className="section-title" style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Modules ({level.modules.length})</h2>

            <div className="modules-list">
                {level.modules.map((module, idx) => (
                    <div key={module.id} className="module-card glass-panel flex justify-between items-center animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="module-info">
                            <div className="module-number">Module {idx + 1}</div>
                            <h3 className="module-title">{module.title}</h3>
                            <p className="module-meta flex items-center gap-4">
                                <span className="flex items-center gap-2 text-muted"><BookOpen size={14} /> {module.topics.length} topics</span>
                            </p>
                        </div>
                        <div className="module-action">
                            <Link to={`/curriculum/${level.id}/${module.id}`} className="secondary-btn">
                                Start Module
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LevelDetail;
