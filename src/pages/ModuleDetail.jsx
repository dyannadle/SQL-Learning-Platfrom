import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculumData } from '../data/curriculum';
import { ArrowLeft, PlayCircle, Code2, CheckCircle } from 'lucide-react';
import './CurriculumDetail.css';

const ModuleDetail = () => {
    const { levelId, moduleId } = useParams();

    const level = curriculumData.find((l) => l.id === levelId);
    const module = level?.modules.find((m) => m.id === moduleId);

    if (!module) {
        return <div className="page-container"><h2>Module Not Found</h2></div>;
    }

    // Find module index to print module number
    const modIdx = level.modules.findIndex(m => m.id === moduleId);

    return (
        <div className="curriculum-detail-container animate-fade-in">
            <Link to={`/curriculum/${levelId}`} className="back-link">
                <ArrowLeft size={16} /> Back to {level.title}
            </Link>

            <div className="module-header glass-panel">
                <span className="badge badge-easy">Module {modIdx + 1}</span>
                <h1 className="level-title-large">{module.title}</h1>
                <p className="level-desc-large">Master the concepts of {module.title.toLowerCase()} inside this module.</p>

                <div className="module-actions" style={{ marginTop: '2rem' }}>
                    <Link to={`/curriculum/${levelId}/${moduleId}/topic-0`} className="primary-btn">
                        <PlayCircle size={18} /> Start First Topic
                    </Link>
                </div>
            </div>

            <div className="layout-sidebar-main" style={{ marginTop: '3rem' }}>
                <div className="sidebar list-glass-panel">
                    <h3 style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-subtle)', margin: 0 }}>Topics</h3>
                    <ul className="topic-nav-list">
                        {module.topics.map((topicStr, topicIdx) => (
                            <li key={topicIdx}>
                                <Link to={`/curriculum/${levelId}/${moduleId}/topic-${topicIdx}`} className="topic-nav-link">
                                    <div className="topic-icon-placeholder"></div>
                                    <span>{topicStr}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="main-content glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <div style={{ padding: '4rem 2rem' }}>
                        <Code2 size={48} color="var(--accent-blue)" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
                        <h2>Select a topic to begin learning</h2>
                        <p className="text-muted" style={{ marginTop: '1rem' }}>Or click "Start First Topic" above.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleDetail;
