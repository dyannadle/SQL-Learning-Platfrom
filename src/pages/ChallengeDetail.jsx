import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { ArrowLeft, Play, LayoutList, CheckCircle, XCircle } from 'lucide-react';
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

    const customTheme = {
        "&": { backgroundColor: "transparent", color: "#e2e8f0", height: "100%" },
        ".cm-content": { fontFamily: "var(--font-code)", fontSize: "15px" },
        ".cm-gutters": { backgroundColor: "transparent", border: "none", color: "#64748b" }
    };

    useEffect(() => {
        // We isolate challenge environments by resetting db every time component loads
        const setupEnv = async () => {
            try {
                await sqlEngine.init();
                // Since sql.js `Database` creates an in-memory db, to isolate we can just instantiate a new one
                // For simplicity with our singleton `sqlEngine`, we just run setupSQL inside a transaction or load it.
                // In a real application we would drop tables or recreate `new SQL.Database()`

                // For V1 MVP, we just execute setup directly and catch "already exists" if any
                try {
                    // crude table reset for MVP
                    const tables = ['employees', 'departments', 'logins'];
                    tables.forEach(t => {
                        try { sqlEngine.db.run(`DROP TABLE IF EXISTS ${t};`); } catch (e) { }
                    });
                    sqlEngine.db.run(challenge.setupSQL);
                } catch (e) {
                    console.error("Setup error", e);
                }
            } catch (err) {
                console.error(err);
            }
        };
        if (challenge) setupEnv();
    }, [challenge]);

    if (!challenge) {
        return <div className="page-container"><h2>Challenge Not Found</h2></div>;
    }

    const runTest = () => {
        if (!query.trim()) return;
        setStatus('running');
        setError(null);
        setResults(null);

        try {
            // 1. Run User Query
            const userRes = sqlEngine.execute(query);

            // 2. Run Solution Query
            const expectedRes = sqlEngine.execute(challenge.solution);

            // 3. Compare JSON representation (MVP validation)
            const userJSON = JSON.stringify(userRes);
            const expectedJSON = JSON.stringify(expectedRes);

            setResults(userRes);

            if (userJSON === expectedJSON) {
                setStatus('pass');
            } else {
                setStatus('fail');
                setError("Your output doesn't match the expected output.");
            }
        } catch (err) {
            setStatus('fail');
            setError(err.message);
        }
    };

    return (
        <div className="challenge-detail-container animate-fade-in">
            <div className="chal-nav flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                <Link to="/challenges" className="back-link" style={{ margin: 0 }}>
                    <ArrowLeft size={16} /> Back to Challenges
                </Link>
                <div className="status-indicator">
                    {status === 'pass' && <span className="text-green flex items-center gap-2"><CheckCircle size={18} /> Accepted</span>}
                    {status === 'fail' && <span className="text-red flex items-center gap-2"><XCircle size={18} /> Wrong Answer</span>}
                </div>
            </div>

            <div className="chal-split-pane">
                <div className="chal-prompt-side glass-panel">
                    <div className="prompt-header">
                        <h2>{challenge.title}</h2>
                        <div className="flex items-center gap-4" style={{ marginTop: '0.5rem' }}>
                            <span className={`badge badge-${challenge.difficulty.toLowerCase()}`}>{challenge.difficulty}</span>
                        </div>
                    </div>

                    <div className="prompt-body">
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                            {challenge.description}
                        </pre>

                        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Expected Output Schema</h3>
                        <p className="text-muted">See the solution requirements for columns mapping.</p>
                    </div>
                </div>

                <div className="chal-editor-side flex-col">
                    <div className="chal-editor-wrapper glass-panel flex-col" style={{ flex: 1, marginBottom: '1rem', display: 'flex' }}>
                        <div className="editor-tab flex justify-between items-center">
                            <span className="flex items-center gap-2 font-code text-sm text-cyan"><LayoutList size={16} /> editor.sql</span>
                            <button className="primary-btn sm-btn" onClick={runTest}>
                                <Play size={14} fill="white" /> Submit Logic
                            </button>
                        </div>
                        <div style={{ flex: 1, overflow: 'auto' }}>
                            <CodeMirror
                                value={query}
                                height="100%"
                                extensions={[sql()]}
                                onChange={(val) => setQuery(val)}
                                theme={customTheme}
                                basicSetup={{ lineNumbers: true, highlightActiveLineGutter: true }}
                            />
                        </div>
                    </div>

                    <div className="chal-results-wrapper glass-panel" style={{ height: '35%', display: 'flex', flexDirection: 'column' }}>
                        <div className="editor-tab">
                            <span className="flex items-center gap-2 font-code text-sm text-muted">Execution Results</span>
                        </div>
                        <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
                            {error && <div className="error-message">{error}</div>}
                            {results && results.columns && (
                                <table className="results-table">
                                    <thead><tr>{results.columns.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
                                    <tbody>
                                        {results.values.map((row, r) => <tr key={r}>{row.map((v, c) => <td key={c}>{v !== null ? v.toString() : 'NULL'}</td>)}</tr>)}
                                    </tbody>
                                </table>
                            )}
                            {status === 'idle' && !results && <div className="text-muted text-center" style={{ marginTop: '2rem' }}>Run your code to see results here.</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeDetail;
