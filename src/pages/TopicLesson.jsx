import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculumData } from '../data/curriculum';
import { ArrowLeft, Terminal, Check, BookOpen, Microscope, MessageSquare, HelpCircle } from 'lucide-react';
import { markTopicComplete, isTopicComplete } from '../lib/progress';
import JoinVisualizer from '../components/Simulator/JoinVisualizer';
import IndexVisualizer from '../components/Simulator/IndexVisualizer';
import VisualQueryBuilder from '../components/Simulator/VisualQueryBuilder';
import DatabaseDesigner from '../components/Simulator/DatabaseDesigner';
import QuizComponent from '../components/Quiz/QuizComponent';
import { notifyAchievement } from '../components/NotificationToast';
import { getLessonBody } from '../data/lessonContent';
import { getAiResponse } from '../lib/aiService';
import ReactMarkdown from 'react-markdown';
import { Sparkles, X, Send, Loader2, Play } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { sqlEngine } from '../lib/sqlEngine';
import './CurriculumDetail.css';

const TopicLesson = () => {
    const { levelId, moduleId, topicId } = useParams();

    const level = curriculumData.find((l) => l.id === levelId);
    const module = level?.modules.find((m) => m.id === moduleId);

    // topicId format is 'topic-0', 'topic-1', etc.
    const tIdx = parseInt(topicId.split('-')[1]);
    const topicTitle = module?.topics[tIdx];
    const topicPathId = `${levelId}-${moduleId}-${tIdx}`;
    const [completed, setCompleted] = React.useState(isTopicComplete(topicPathId));
    const [activeTab, setActiveTab] = React.useState('theory'); // theory, lab, interview, quiz
    const [isAiOpen, setIsAiOpen] = React.useState(false);
    const [aiInput, setAiInput] = React.useState('');
    const [chat, setChat] = React.useState([{ role: 'ai', msg: "Hi! I'm your SQL tutor. Ask me anything about this lesson!" }]);
    const [isThinking, setIsThinking] = React.useState(false);
    const [lessonQuery, setLessonQuery] = React.useState('SELECT * FROM products LIMIT 5;');
    const [lessonResults, setLessonResults] = React.useState(null);
    const [lessonError, setLessonError] = React.useState(null);
    const content = getLessonBody(topicPathId);

    const handleSend = async () => {
        if (!aiInput.trim()) return;
        const userMsg = aiInput;
        setChat(prev => [...prev, { role: 'user', msg: userMsg }]);
        setAiInput('');
        setIsThinking(true);
        const response = await getAiResponse(userMsg);
        setChat(prev => [...prev, { role: 'ai', msg: response }]);
        setIsThinking(false);
    };

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
                    <div className="lesson-tabs flex gap-4 mb-6 border-b border-subtle">
                        <button
                            className={`lesson-tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
                            onClick={() => setActiveTab('theory')}
                        >
                            <BookOpen size={16} /> Theory
                        </button>
                        <button
                            className={`lesson-tab-btn ${activeTab === 'lab' ? 'active' : ''}`}
                            onClick={() => setActiveTab('lab')}
                        >
                            <Microscope size={16} /> Hands-on Lab
                        </button>
                        <button
                            className={`lesson-tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('interview')}
                        >
                            <MessageSquare size={16} /> Interview Questions
                        </button>
                        <button
                            className={`lesson-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
                            onClick={() => setActiveTab('quiz')}
                        >
                            <HelpCircle size={16} /> Quiz
                        </button>
                    </div>

                    <h1 className="lesson-title">{topicTitle}</h1>

                    <div className="tab-content animate-fade-in">
                        {activeTab === 'theory' && (
                            <div className="markdown-content">
                                <ReactMarkdown>
                                    {content.theory}
                                </ReactMarkdown>
                            </div>
                        )}

                        {activeTab === 'lab' && (
                            <div className="markdown-content">
                                {levelId === 'level-4' && <JoinVisualizer />}
                                {levelId === 'level-8' && <IndexVisualizer />}
                                {levelId === 'level-1' && <VisualQueryBuilder />}
                                {levelId === 'level-7' && <DatabaseDesigner />}

                                <p className="mt-6">{content.lab.mission}</p>
                                <ul className="lab-tasks">
                                    {content.lab.tasks.map((t, i) => <li key={i}>{t}</li>)}
                                </ul>
                                <div className="callout-box warning">
                                    <strong>Lab Mission:</strong> Complete the tasks using the interactive editor.
                                </div>
                            </div>
                        )}

                        {activeTab === 'interview' && (
                            <div className="markdown-content">
                                <p>Be prepared for your next technical interview with these target questions:</p>
                                <div className="interview-q">
                                    <strong>Q1: How would you explain {topicTitle} to a non-technical stakeholder?</strong>
                                    <p className="ans-hint">Hint: Focus on the business value of structured data access.</p>
                                </div>
                                <div className="interview-q">
                                    <strong>Q2: What are the performance trade-offs associated with {topicTitle}?</strong>
                                    <p className="ans-hint">Hint: Mention index usage and CPU vs I/O balance.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'quiz' && (
                            <div className="markdown-content">
                                <p>Test your knowledge before moving on:</p>
                                <QuizComponent
                                    question={`Which of the following is true about ${topicTitle}?`}
                                    options={[
                                        'It is a fundamental part of relational modeling',
                                        'It should only be used in NoSQL databases',
                                        'It has been deprecated in modern SQL'
                                    ]}
                                    correctAnswer={0}
                                    explanation={`${topicTitle} remains a core principle in SQL for managing complex data relationships and performance.`}
                                />
                            </div>
                        )}
                    </div>

                    <div className="lesson-actions" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            className={`secondary-btn ${completed ? 'completed' : ''}`}
                            onClick={() => {
                                if (!completed) {
                                    markTopicComplete(topicPathId);
                                    setCompleted(true);
                                    notifyAchievement('Topic Mastered!', `You've completed ${topicTitle}. +20 XP`, 'badge');
                                }
                            }}
                        >
                            <Check size={18} /> {completed ? 'Completed' : 'Mark Complete'}
                        </button>
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
                    {/* Interactive Practice */}
                    <div className="mini-editor-wrapper glass-panel">
                        <div className="editor-header flex justify-between items-center p-2 px-4 border-b border-subtle">
                            <span className="editor-title flex items-center gap-2"><Terminal size={14} /> Interactive Practice</span>
                            <div className="flex gap-2">
                                <button
                                    className="primary-btn sm-btn"
                                    onClick={async () => {
                                        try {
                                            await sqlEngine.init();
                                            sqlEngine.loadDataset('ecommerce');
                                            const res = sqlEngine.execute(lessonQuery);
                                            setLessonResults(res);
                                            setLessonError(null);
                                        } catch (err) {
                                            setLessonError(err.message);
                                            setLessonResults(null);
                                        }
                                    }}
                                >
                                    <Play size={10} fill="white" /> Run
                                </button>
                            </div>
                        </div>
                        <div style={{ height: '220px', borderBottom: '1px solid var(--border-subtle)' }}>
                            <CodeMirror
                                value={lessonQuery}
                                height="220px"
                                extensions={[sql()]}
                                theme="dark"
                                onChange={(val) => setLessonQuery(val)}
                                basicSetup={{
                                    lineNumbers: true,
                                    autocompletion: true,
                                    bracketMatching: true
                                }}
                            />
                        </div>
                        <div className="mini-results overflow-auto text-xs" style={{ maxHeight: '250px', minHeight: '100px' }}>
                            {lessonError ? (
                                <div className="text-accent-red p-3">{lessonError}</div>
                            ) : lessonResults ? (
                                <table className="results-table mini">
                                    <thead>
                                        <tr>{lessonResults.columns.map((c, i) => <th key={i}>{c}</th>)}</tr>
                                    </thead>
                                    <tbody>
                                        {lessonResults.values.slice(0, 5).map((row, i) => (
                                            <tr key={i}>{row.map((v, j) => <td key={j}>{v?.toString()}</td>)}</tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-muted p-3">Results will appear here...</div>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <Link to="/editor" className="secondary-btn sm-btn">Open Full Playground</Link>
                    </div>

                    {/* AI Assistant — inline, no overlap */}
                    <div className="ai-inline-panel glass-panel" style={{ marginTop: '1rem' }}>
                        <div
                            className="ai-toggle-bar flex justify-between items-center p-3 px-4 cursor-pointer"
                            onClick={() => setIsAiOpen(!isAiOpen)}
                            style={{ borderBottom: isAiOpen ? '1px solid var(--border-subtle)' : 'none' }}
                        >
                            <span className="flex items-center gap-2 font-bold text-sm" style={{ color: 'var(--accent-cyan)' }}>
                                <Sparkles size={16} /> AI SQL Assistant
                            </span>
                            <span className="text-muted text-xs">{isAiOpen ? 'Collapse' : 'Expand'}</span>
                        </div>

                        {isAiOpen && (
                            <div className="ai-panel-body animate-fade-in" style={{ padding: '1rem' }}>
                                <div className="ai-chat-messages" style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                                    {chat.map((c, i) => (
                                        <div key={i} className={`ai-msg glass-panel p-3 text-sm ${c.role === 'user' ? 'user-msg' : ''}`}>
                                            {c.msg}
                                        </div>
                                    ))}
                                    {isThinking && <Loader2 className="animate-spin text-accent-cyan mx-auto" size={16} />}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Ask about this topic..."
                                        className="dataset-select"
                                        style={{ flex: 1 }}
                                        value={aiInput}
                                        onChange={e => setAiInput(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                                    />
                                    <button className="primary-btn sm-btn" onClick={handleSend}><Send size={14} /></button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicLesson;
