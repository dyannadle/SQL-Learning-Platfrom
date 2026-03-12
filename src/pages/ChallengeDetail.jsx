import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { ArrowLeft, Play, LayoutList, CheckCircle, XCircle, Sparkles, Send, Loader2 } from 'lucide-react'; 
import { getAiResponse } from '../lib/aiService';
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
    const [aiInput, setAiInput] = useState('');
    const [chat, setChat] = useState([{ role: 'ai', msg: "I'm your SQL Judge. Submit your query, and I'll analyze your logic, performance, and accuracy!" }]);
    const [isThinking, setIsThinking] = useState(false);

    useEffect(() => {
        const setupEnv = async () => {
            try {
                await sqlEngine.init();
                // 1. Reset any existing session for a clean slate
                await sqlEngine.resetSession();

                // Clear state
                setResults(null);
                setError(null);
                setAiFeedback('');
                setStatus('idle');

                // 2. Load dataset template (usually 'basic' or 'standard')
                const template = challenge?.dataset || (challenge?.id.startsWith('j-') ? 'advanced' : 'basic');
                sqlEngine.loadDataset(template);

                // 3. Run specific challenge setup SQL if provided
                if (challenge?.setupSQL) {
                    await sqlEngine.execute(challenge.setupSQL);
                }
            } catch (err) {
                console.error("Env setup failure", err);
                setError("Failed to setup challenge environment: " + err.message);
            }
        };
        if (challenge) setupEnv();
    }, [challenge]);

    if (!challenge) {
        return <div className="page-container"><h2>Challenge Not Found</h2></div>;
    }

    const handleSend = async () => {
        if (!aiInput.trim()) return;
        const msg = aiInput;
        setChat(prev => [...prev, { role: 'user', msg }]);
        setAiInput('');
        setIsThinking(true);
        const response = await getAiResponse(msg, `Challenge: ${challenge.title}. Description: ${challenge.description}. Current User Query: ${query}`);
        setChat(prev => [...prev, { role: 'ai', msg: response }]);
        setIsThinking(false);
    };

    const runTest = async () => {
        if (!query.trim()) return;
        setStatus('running');
        setError(null);
        setResults(null);
        setAiFeedback('');

        try {
            const userRes = await sqlEngine.execute(query);
            const expectedRes = await sqlEngine.execute(challenge.solution);
            setResults(userRes);

            const userJSON = JSON.stringify({ columns: userRes.columns, values: userRes.values });
            const expectedJSON = JSON.stringify({ columns: expectedRes.columns, values: expectedRes.values });

            if (userJSON === expectedJSON) {
                setStatus('pass');
                const feedback = "Correct! Your query produces the exact expected output. Logic is sound.";
                setAiFeedback(feedback);
                setChat(prev => [...prev, { role: 'ai', msg: "✓ ACCEPTED: " + feedback }]);
            } else {
                setStatus('fail');
                const feedback = "Output mismatch. Check your JOIN conditions or filtering logic.";
                setError(feedback);
                setChat(prev => [...prev, { role: 'ai', msg: "✗ WRONG ANSWER: " + feedback }]);
            }
        } catch (err) {
            setStatus('fail');
            setError(err.message);
            setChat(prev => [...prev, { role: 'ai', msg: "⚠️ ERROR: " + err.message }]);
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

            <div className="chal-split-pane three-col-layout">
                <div className="chal-prompt-side glass-panel depth-high p-6">
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

                    <div className="chal-output-area glass-panel flex flex-col" style={{ height: '40%' }}>
                        <div className="editor-tab border-b border-subtle">
                            <span className="text-sm font-bold text-muted">Test Results Output</span>
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
                </div>

                {/* ─── Column 3: AI SQL Judge Sidebar ─── */}
                <div className="ai-sidebar-col">
                    <div className="ai-sticky-panel glass-panel depth-high">
                        <div className="ai-header flex justify-between items-center p-4 border-b border-subtle">
                            <span className="flex items-center gap-2 font-bold text-sm" style={{ color: 'var(--accent-cyan)' }}>
                                <Sparkles size={18} /> AI SQL Judge
                            </span>
                        </div>
                        <div className="ai-chat-body">
                            <div className="ai-chat-messages custom-scrollbar">
                                {chat.map((c, i) => (
                                    <div key={i} className={`ai-msg-bubble ${c.role === 'user' ? 'user' : 'ai'}`}>
                                        <div className="msg-content">{c.msg}</div>
                                    </div>
                                ))}
                                {isThinking && (
                                    <div className="ai-msg-bubble ai">
                                        <div className="msg-content thinking">
                                            <Loader2 className="animate-spin" size={14} /> Judge is analyzing...
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="ai-input-area border-t border-subtle">
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Ask about this problem..." 
                                        className="ai-input-field"
                                        value={aiInput} 
                                        onChange={e => setAiInput(e.target.value)} 
                                        onKeyPress={e => e.key === 'Enter' && handleSend()} 
                                    />
                                    <button className="primary-btn sm-btn ai-send-btn" onClick={handleSend}>
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="ai-footer p-3 text-center text-[10px] text-muted uppercase tracking-widest border-t border-subtle">
                            Instant Query Validation
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeDetail;
