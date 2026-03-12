import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculumData } from '../data/curriculum';
import { ArrowLeft, Terminal, Check, BookOpen, Microscope, MessageSquare, HelpCircle, Play, RotateCcw } from 'lucide-react'; 
import { markTopicComplete, isTopicComplete } from '../lib/progress';
import JoinVisualizer from '../components/Simulator/JoinVisualizer';
import IndexVisualizer from '../components/Simulator/IndexVisualizer';
import VisualQueryBuilder from '../components/Simulator/VisualQueryBuilder';
import DatabaseDesigner from '../components/Simulator/DatabaseDesigner';
import QuizComponent from '../components/Quiz/QuizComponent';
import { notifyAchievement } from '../components/NotificationToast';
import { getLessonBody } from '../data/lessonContent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { sqlEngine } from '../lib/sqlEngine';
import './CurriculumDetail.css';

// ─── Interview Questions Data ───────────────────────────
const interviewBank = {
    default: [
        { q: 'What is the difference between SQL and NoSQL?', a: 'SQL databases are relational (tables with fixed schemas) while NoSQL databases are non-relational (documents, key-value, graph) with flexible schemas. SQL uses ACID transactions; NoSQL often uses eventual consistency for scalability.' },
        { q: 'Explain the difference between WHERE and HAVING.', a: 'WHERE filters individual rows before GROUP BY. HAVING filters groups after aggregation. HAVING can use aggregate functions like COUNT(), AVG(); WHERE cannot.' },
        { q: 'What is a Primary Key vs a Unique Key?', a: 'Primary Key: unique + NOT NULL + only one per table. Unique Key: unique but allows NULLs + multiple per table.' },
        { q: 'What is normalization? Name the first three normal forms.', a: '1NF: No repeating groups, atomic values. 2NF: 1NF + no partial dependencies. 3NF: 2NF + no transitive dependencies. Purpose: reduce redundancy.' },
        { q: 'What happens if you run UPDATE without WHERE?', a: 'It updates EVERY row in the table. This is one of the most dangerous SQL mistakes in production.' },
        { q: 'What is a Foreign Key and why is it important?', a: 'A Foreign Key is a column that links to a Primary Key in another table. It enforces "Referential Integrity," ensuring that relationships between tables stay consistent.' },
        { q: 'What is an Index? How does it improve performance?', a: 'An index is a data structure (usually a B-Tree) that speeds up data retrieval. It allows the database to find rows without scanning the entire table, at the cost of slightly slower writes.' },
    ],
    'level-0': [
        { q: 'What is a database? How is it different from a spreadsheet?', a: 'A database is a structured collection of data managed by a DBMS. Unlike spreadsheets, databases support concurrent access, ACID transactions, indexing for fast queries, and can handle millions of rows efficiently.' },
        { q: 'Name 3 popular relational databases and their use cases.', a: 'PostgreSQL (complex queries, analytics), MySQL (web apps, WordPress), SQLite (mobile apps, embedded systems). Oracle and SQL Server are also popular in enterprise.' },
        { q: 'What does ACID stand for?', a: 'Atomicity (all or nothing), Consistency (data stays valid), Isolation (concurrent transactions don\'t interfere), Durability (committed data survives crashes).' },
        { q: 'Explain structured vs unstructured data with examples.', a: 'Structured: employee records, financial transactions (fits in tables). Unstructured: images, videos, emails (no fixed schema). Semi-structured: JSON, XML (has some organization).' },
        { q: 'When would you choose NoSQL over SQL?', a: 'When you need: flexible schemas (rapidly changing data models), horizontal scaling (massive distributed data), high write throughput (real-time logging), or document storage (content management).' },
        { q: 'What is a Relational Database Management System (RDBMS)?', a: 'An RDBMS is software that manages relational databases using SQL. Examples include MySQL, PostgreSQL, and SQL Server.' },
        { q: 'Why is data integrity critical in a production database?', a: 'Data integrity ensures accuracy and reliability. Constraints like NOT NULL and UNIQUE prevent garbage data from breaking application logic.' },
    ],
    'level-1': [
        { q: 'What is the execution order of a SQL query?', a: 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. This is why you can\'t use a column alias in WHERE — SELECT hasn\'t run yet!' },
        { q: 'What is the difference between INNER JOIN and LEFT JOIN?', a: 'INNER JOIN returns only matching rows from both tables. LEFT JOIN returns ALL rows from the left table plus matching rows from the right (NULLs for non-matches).' },
        { q: 'Explain NULL in SQL. Why is NULL = NULL false?', a: 'NULL means "unknown value." Since two unknowns aren\'t necessarily equal, NULL = NULL evaluates to NULL (not TRUE). Use IS NULL to check for NULLs.' },
        { q: 'What is the difference between DELETE, TRUNCATE, and DROP?', a: 'DELETE: removes specific rows (can use WHERE, logged, can rollback). TRUNCATE: removes all rows (faster, can\'t rollback in most DBs). DROP: removes the entire table structure.' },
        { q: 'How do you paginate results in SQL?', a: 'Use LIMIT and OFFSET: SELECT * FROM users LIMIT 10 OFFSET 20; returns rows 21-30. For large datasets, prefer keyset pagination (WHERE id > last_id LIMIT 10).' },
        { q: 'What is the difference between UNION and UNION ALL?', a: 'UNION removes duplicates (slower, sorts results). UNION ALL keeps all rows including duplicates (faster). Use UNION ALL when you know there won\'t be duplicates.' },
        { q: 'Predict the result: SELECT COUNT(*) FROM table WHERE col = NULL;', a: 'The result will be 0. Comparison with NULL using "=" always returns UNKNOWN/NULL, which WHERE treats as false. You must use IS NULL.' },
        { q: 'Explain the LIKE operator and the wildcards % and _.', a: '% represents zero or more characters. _ represents a single character. Example: "A%" matches anything starting with A, while "A_" matches 2-letter words starting with A.' },
    ],
    'level-2': [
        { q: 'What is a transaction? When would you use one?', a: 'A transaction groups multiple SQL statements into one atomic unit. Use BEGIN/COMMIT/ROLLBACK. Essential when transferring money (debit + credit must both succeed or both fail).' },
        { q: 'Explain the difference between a clustered and non-clustered index.', a: 'Clustered index determines the physical order of data (one per table, usually the PK). Non-clustered index is a separate structure with pointers to data (multiple per table).' },
        { q: 'What is a deadlock and how do you prevent it?', a: 'A deadlock occurs when two transactions wait for each other\'s locks. Prevent by: consistent lock ordering, short transactions, using timeouts, and avoiding unnecessary locks.' },
        { q: 'Explain the concept of database denormalization.', a: 'Intentionally adding redundancy to improve read performance. Trade-off: faster reads but slower writes and risk of data inconsistency. Used in data warehouses and read-heavy systems.' },
        { q: 'What are window functions? Give an example.', a: 'Functions that operate on a set of rows related to the current row without collapsing them. Example: SELECT name, salary, RANK() OVER (ORDER BY salary DESC) FROM employees;' },
        { q: 'What is an "Index Scan" vs an "Index Seek"?', a: 'Index Scan: The database reads the entire index (slower). Index Seek: The database navigates directly to a specific value in the index tree (much faster).' },
        { q: 'Explain the purpose of the EXPLAIN command.', a: 'EXPLAIN shows the execution plan of a query, revealing whether the database will use indexes or full table scans. It is the primary tool for query optimization.' },
        { q: 'What is a Common Table Expression (CTE) and why use it?', a: 'A CTE is a temporary named result set (using the WITH keyword). It improves query readability and allows for recursive queries (like traversing folder hierarchies).' },
    ],
};

const TopicLesson = () => {
    const { levelId, moduleId, topicId } = useParams();

    const level = curriculumData.find((l) => l.id === levelId);
    const module = level?.modules.find((m) => m.id === moduleId);

    const tIdx = parseInt(topicId.split('-')[1]);
    const topicTitle = module?.topics[tIdx];
    const topicPathId = `${levelId}-${moduleId}-${tIdx}`;
    const [completed, setCompleted] = React.useState(isTopicComplete(topicPathId));
    const [activeTab, setActiveTab] = React.useState('theory');
    const [lessonQuery, setLessonQuery] = React.useState('SELECT * FROM products LIMIT 5;');
    const [lessonResults, setLessonResults] = React.useState(null);
    const [lessonError, setLessonError] = React.useState(null);
    const [statusMsg, setStatusMsg] = React.useState('');
    const [showAnswer, setShowAnswer] = React.useState({});
    const content = getLessonBody(topicPathId);

    const handleRunLesson = async () => {
        if (!lessonQuery.trim()) return;
        try {
            await sqlEngine.init();
            sqlEngine.loadDataset('ecommerce');
            const trimmed = lessonQuery.trim();

            // Multi-statement support
            const stmts = trimmed.split(';').filter(s => s.trim());
            let lastRes = null;
            let totalAffected = 0;
            let timeTaken = 0;

            for (const s of stmts) {
                const full = s.trim() + ';';
                const res = await sqlEngine.execute(full);
                if (res && res.columns && res.columns.length > 0) lastRes = res;
                totalAffected += (res.affected_rows || 0);
                timeTaken += (res.execution_time_ms || 0);
            }

            if (lastRes && lastRes.columns.length > 0) {
                setLessonResults(lastRes);
                setStatusMsg(`${lastRes.values.length} row(s) | ${timeTaken.toFixed(1)}ms`);
            } else {
                setLessonResults({ columns: ['Status'], values: [['✓ Executed successfully']] });
                setStatusMsg(totalAffected > 0 ? `${totalAffected} row(s) affected | ${timeTaken.toFixed(1)}ms` : `Done | ${timeTaken.toFixed(1)}ms`);
            }
            setLessonError(null);
        } catch (err) {
            setLessonError(err.message);
            setLessonResults(null);
            setStatusMsg('');
        }
    };

    if (!topicTitle) {
        return <div className="page-container"><h2>Topic Not Found</h2></div>;
    }

    const isNextTopic = tIdx < module.topics.length - 1;
    const questions = interviewBank[levelId] || interviewBank.default;

    return (
        <div className="topic-lesson-container animate-fade-in" style={{ paddingBottom: '5rem' }}>
            <div className="lesson-nav-top">
                <Link to={`/curriculum/${levelId}/${moduleId}`} className="back-link">
                    <ArrowLeft size={16} /> Back to {module.title}
                </Link>
            </div>

            <div className="lesson-grid two-col">
                <div className="lesson-content glass-panel depth-high">
                    <div className="lesson-tabs flex gap-4 mb-6 border-b border-subtle">
                        <button className={`lesson-tab-btn ${activeTab === 'theory' ? 'active' : ''}`} onClick={() => setActiveTab('theory')}>
                            <BookOpen size={16} /> Theory
                        </button>
                        <button className={`lesson-tab-btn ${activeTab === 'lab' ? 'active' : ''}`} onClick={() => setActiveTab('lab')}>
                            <Microscope size={16} /> Hands-on Lab
                        </button>
                        <button className={`lesson-tab-btn ${activeTab === 'interview' ? 'active' : ''}`} onClick={() => setActiveTab('interview')}>
                            <MessageSquare size={16} /> Interview Questions
                        </button>
                        <button className={`lesson-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>
                            <HelpCircle size={16} /> Quiz
                        </button>
                    </div>

                    <h1 className="lesson-title">{topicTitle}</h1>

                    <div className="tab-content animate-fade-in">
                        {activeTab === 'theory' && (
                            <div className="markdown-content">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
                                    <strong>Lab Mission:</strong> Complete the tasks using the interactive editor on the right.
                                </div>
                            </div>
                        )}

                        {activeTab === 'interview' && (
                            <div className="markdown-content">
                                <p style={{ marginBottom: '2rem', fontSize: '1.05rem' }}>
                                    Practice these real interview questions. Click "Show Answer" to reveal the model answer.
                                </p>
                                <div className="interview-grid">
                                    {questions.map((item, i) => (
                                        <div key={i} className="interview-q-card glass-panel flex flex-col">
                                            <strong className="q-title">Q{i + 1}: {item.q}</strong>
                                            <div className="q-action-area mt-auto pt-4">
                                                {showAnswer[i] ? (
                                                    <div className="ans-hint animate-fade-in">
                                                        <strong className="ans-label">Model Answer:</strong>
                                                        <p className="ans-text">{item.a}</p>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="secondary-btn sm-btn w-full"
                                                        onClick={() => setShowAnswer(prev => ({ ...prev, [i]: true }))}
                                                    >
                                                        Show Answer
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
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

                {/* ─── Right Side: Interactive Practice ─── */}
                <div className="lesson-editor-side">
                    <div className="mini-editor-wrapper glass-panel">
                        <div className="editor-header flex justify-between items-center p-2 px-4 border-b border-subtle">
                            <span className="editor-title flex items-center gap-2"><Terminal size={14} /> Interactive Practice</span>
                            <div className="flex gap-2 items-center">
                                {statusMsg && <span style={{ fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: 600 }}>{statusMsg}</span>}
                                <button className="secondary-btn sm-btn" onClick={() => { setLessonQuery(''); setLessonResults(null); setLessonError(null); setStatusMsg(''); }} style={{ padding: '4px 8px' }}>
                                    <RotateCcw size={10} />
                                </button>
                                <button className="primary-btn sm-btn" onClick={handleRunLesson}>
                                    <Play size={10} fill="white" /> Run
                                </button>
                            </div>
                        </div>
                        <div style={{ flex: 1, minHeight: '200px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column' }}>
                            <CodeMirror
                                value={lessonQuery}
                                height="100%"
                                style={{ flex: 1, overflow: 'auto' }}
                                extensions={[sql()]}
                                theme="dark"
                                onChange={(val) => setLessonQuery(val)}
                                basicSetup={{ lineNumbers: true, autocompletion: true, bracketMatching: true }}
                            />
                        </div>
                        <div className="mini-results overflow-auto text-xs" style={{ maxHeight: '300px', minHeight: '80px' }}>
                            {lessonError ? (
                                <div style={{ color: 'var(--accent-red)', padding: '0.75rem', whiteSpace: 'pre-wrap' }}>{lessonError}</div>
                            ) : lessonResults ? (
                                <table className="results-table mini">
                                    <thead><tr>{lessonResults.columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
                                    <tbody>
                                        {lessonResults.values.slice(0, 10).map((row, i) => (
                                            <tr key={i}>{row.map((v, j) => <td key={j}>{v !== null && v !== undefined ? v.toString() : <em style={{ opacity: 0.4 }}>NULL</em>}</td>)}</tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-muted" style={{ padding: '1rem', textAlign: 'center' }}>Run a query to see results</div>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                        <Link to="/editor" className="secondary-btn sm-btn">Open Full Playground</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TopicLesson;
