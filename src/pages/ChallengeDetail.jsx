import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { ArrowLeft, Play, LayoutList, CheckCircle, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { challenges } from '../data/challenges';
import { sqlEngine } from '../lib/sqlEngine';
import './Challenges.css';

const ChallengeDetail = () => {
    const { challengeId } = useParams();
    const challenge = challenges.find((c) => c.id === challengeId);
    const [query, setQuery] = useState('-- Write your SQL query here\n');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, running, pass, fail
    const [showHints, setShowHints] = useState(false);
    const [aiFeedback, setAiFeedback] = useState('');

    useEffect(() => {
        const setupEnv = async () => {
            try {
                await sqlEngine.init();
                // Clear state
                setResults(null);
                setError(null);
                setAiFeedback('');
                setStatus('idle');

                // Cleanup and setup
                const tables = ['employees', 'departments', 'logins', 'orders', 'search_logs', 'watch_history'];
                tables.forEach(t => {
                    try { sqlEngine.db.run(`DROP TABLE IF EXISTS ${t};`); } catch (e) { }
                });

                if (challenge?.setupSQL) {
                    sqlEngine.db.run(challenge.setupSQL);
                }
            } catch (err) {
                console.error("Env setup failure", err);
            }
        };
        if (challenge) setupEnv();
    }, [challenge]);

    if (!challenge) {
        return <div className="page-container"><h2>Challenge Not Found</h2></div>;
    }

    const runTest = async () => {
        if (!query.trim()) return;
        setStatus('running');
        setError(null);
        setResults(null);
        setAiFeedback('');

        try {
            // 1. Run User Query
            const userRes = sqlEngine.execute(query);

            // 2. Run Solution Query
            const expectedRes = sqlEngine.execute(challenge.solution);

            setResults(userRes);

            // 3. Compare JSON representation (MVP validation)
            const userJSON = JSON.stringify(userRes);
            const expectedJSON = JSON.stringify(expectedRes);

            if (userJSON === expectedJSON) {
                setStatus('pass');
                setAiFeedback("Great job! Your solution is correct and matches the expected output.");
            } else {
                setStatus('fail');
                setError("Output mismatch. Check your logic or sort order.");
            }
        } catch (err) {
            setStatus('fail');
            setError(err.message);
        }
    };

    return (
        <div className="challenge-detail-container animate-fade-in">
            <div className="chal-nav flex justify-between items-center" style={{ padding: '0 1rem', marginBottom: '1rem' }}>
                <Link to="/challenges" className="back-link" style={{ margin: 0 }}>
                    <ArrowLeft size={16} /> Back to Challenges
                </Link>
                <div className="status-indicator">
                    {status === 'pass' && <span className="text-green flex items-center gap-2"><CheckCircle size={18} /> Accepted</span>}
                    {status === 'fail' && <span className="text-red flex items-center gap-2"><XCircle size={18} /> Wrong Answer</span>}
                </div>
            </div>

            <div className="chal-split-pane">
                <div className="chal-prompt-side glass-panel p-6">
                    <div className="prompt-header mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold">{challenge.title}</h1>
                                {challenge.company && (
                                    <div className="mt-2">
                                        <span className="company-badge-large">{challenge.company} Interview Problem</span>
                                    </div>
                                )}
                            </div>
                            <span className={`badge badge-${challenge.difficulty.toLowerCase()}`}>{challenge.difficulty}</span>
                        </div>
                    </div>

                    <div className="prompt-body">
                        <div className="markdown-content text-secondary leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {challenge.description}
                            </ReactMarkdown>
                        </div>

                        {challenge.hints && (
                            <div className="mt-8 border-t border-subtle pt-6">
                                <button
                                    className="secondary-btn w-full flex justify-between items-center"
                                    onClick={() => setShowHints(!showHints)}
                                >
                                    <span>{showHints ? 'Hide Hints' : 'Need a Hint?'}</span>
                                    <LayoutList size={16} />
                                </button>
                                {showHints && (
                                    <div className="mt-4 p-4 bg-muted-subtle rounded-lg border border-subtle animate-fade-in">
                                        <ul className="list-disc pl-5 text-sm text-muted">
                                            {challenge.hints.map((h, i) => <li key={i} className="mb-2">{h}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="chal-editor-side flex flex-col">
                    <div className="chal-editor-wrapper glass-panel flex flex-col" style={{ flex: 1, marginBottom: '1rem' }}>
                        <div className="editor-tab flex justify-between items-center">
                            <span className="flex items-center gap-2 font-code text-sm text-cyan"><LayoutList size={16} /> solution.sql</span>
                            <div className="flex gap-2">
                                <button className="primary-btn sm-btn flex items-center gap-2" onClick={runTest} disabled={status === 'running'}>
                                    {status === 'running' ? 'Checking...' : <><Play size={14} fill="currentColor" /> Submit Query</>}
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <CodeMirror
                                value={query}
                                height="100%"
                                extensions={[sql()]}
                                onChange={(val) => setQuery(val)}
                                theme="dark"
                                basicSetup={{ lineNumbers: true, highlightActiveLineGutter: true }}
                            />
                        </div>
                    </div>

                    <div className="chal-output-area flex gap-4" style={{ height: '40%' }}>
                        <div className="chal-results-wrapper glass-panel flex-1 flex flex-col">
                            <div className="editor-tab">
                                <span className="text-sm font-bold text-muted">Test Results</span>
                            </div>
                            <div className="flex-1 overflow-auto p-4">
                                {error && <div className="error-message p-3 mb-4 bg-red-900/20 text-red-400 rounded-lg">{error}</div>}
                                {results && results.columns && (
                                    <div className="overflow-x-auto">
                                        <table className="results-table w-full">
                                            <thead><tr>{results.columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
                                            <tbody>
                                                {results.values.map((row, r) => <tr key={r}>{row.map((v, c) => <td key={c} className="p-2 border-t border-subtle">{v !== null ? v.toString() : 'NULL'}</td>)}</tr>)}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                {status === 'idle' && !results && <div className="text-muted text-center mt-10">Submit your query to see output.</div>}
                            </div>
                        </div>

                        <div className="chal-ai-judge glass-panel w-1/3 flex flex-col">
                            <div className="editor-tab flex items-center justify-between">
                                <span className="text-sm font-bold text-accent-cyan">AI SQL Judge</span>
                                <div className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse"></div>
                            </div>
                            <div className="flex-1 p-4 overflow-auto">
                                {aiFeedback ? (
                                    <div className="text-sm text-secondary leading-relaxed animate-fade-in">
                                        <p className="font-bold text-accent-cyan mb-2">Analysis:</p>
                                        {aiFeedback}
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted italic">Waiting for submission to analyze performance and logic...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeDetail;
