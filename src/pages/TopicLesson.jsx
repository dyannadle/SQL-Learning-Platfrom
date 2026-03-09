import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculumData } from '../data/curriculum';
import { ArrowLeft, Terminal, Check } from 'lucide-react';
import './CurriculumDetail.css';

const TopicLesson = () => {
    const { levelId, moduleId, topicId } = useParams();

    const level = curriculumData.find((l) => l.id === levelId);
    const module = level?.modules.find((m) => m.id === moduleId);

    // topicId format is 'topic-0', 'topic-1', etc.
    const tIdx = parseInt(topicId.split('-')[1]);
    const topicTitle = module?.topics[tIdx];

    if (!topicTitle) {
        return <div className="page-container"><h2>Topic Not Found</h2></div>;
    }

    const isNextTopic = tIdx < module.topics.length - 1;

    return (
        <div className="topic-lesson-container animate-fade-in" style={{ paddingBottom: '5rem' }}>
            <div className="lesson-nav-top">
                <Link to={`/curriculum/${levelId}/${moduleId}`} className="back-link">
                    <ArrowLeft size={16} /> Back to {module.title}
                </Link>
            </div>

            <div className="lesson-grid">
                <div className="lesson-content glass-panel">
                    <h1 className="lesson-title">{topicTitle}</h1>
                    <div className="lesson-badge-row">
                        <span className="badge badge-medium">Theory</span>
                        <span className="badge badge-easy">Interactive</span>
                    </div>

                    <div className="markdown-content">
                        <p>Welcome to <strong>{topicTitle}</strong>. This section covers the fundamental concepts required to advance to the next stage.</p>

                        <h3>Understanding {topicTitle}</h3>
                        <p>In relational databases, it is extremely important to grasp how data transitions from raw storage to queryable views.</p>

                        <div className="callout-box info">
                            <strong>Note:</strong> This is a dynamic placeholder for the lesson content. In a production environment, this text would be fetched from a markdown file stored in the backend or local assets.
                        </div>

                        <h3>Code Example</h3>
                        <pre><code><span className="sql-keyword">SELECT</span> * <span className="sql-keyword">FROM</span> users <span className="sql-keyword">WHERE</span> active = <span className="sql-op">true</span>;</code></pre>

                        <p>Try running a similar query in the interactive editor to the right to see how it performs against the sample database.</p>
                    </div>

                    <div className="lesson-actions" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                        <button className="secondary-btn"><Check size={18} /> Mark Complete</button>
                        {isNextTopic ? (
                            <Link to={`/curriculum/${levelId}/${moduleId}/topic-${tIdx + 1}`} className="primary-btn">
                                Next Topic
                            </Link>
                        ) : (
                            <Link to={`/curriculum/${levelId}`} className="primary-btn">
                                Finish Module
                            </Link>
                        )}
                    </div>
                </div>

                <div className="lesson-editor-side">
                    <div className="mini-editor-wrapper glass-panel">
                        <div className="editor-header">
                            <span className="editor-title"><Terminal size={14} /> Interactive Practice</span>
                        </div>
                        <div className="mini-editor-body">
                            <div className="placeholder-editor">
                                <p>CodeMirror SQL Sandbox loads here</p>
                                <Link to="/editor" className="secondary-btn" style={{ marginTop: '1rem' }}>Open Full Editor</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicLesson;
