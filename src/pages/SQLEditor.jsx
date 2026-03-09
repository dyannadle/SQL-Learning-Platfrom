import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { Play, RotateCcw, Database, Table, AlertCircle } from 'lucide-react';
import { sqlEngine } from '../lib/sqlEngine';
import QueryPlanTree from '../components/QueryVisualizer/QueryPlanTree';
import './SQLEditor.css';

const SQLEditor = () => {
    const [query, setQuery] = useState('SELECT * FROM employees;');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [isDbLoaded, setIsDbLoaded] = useState(false);
    const [tables, setTables] = useState([]);
    const [activeDataset, setActiveDataset] = useState('employees');
    const [planData, setPlanData] = useState(null);
    const [activeTab, setActiveTab] = useState('results'); // results, plan

    // Custom dark theme for CodeMirror to match our design system
    const customTheme = {
        "&": {
            backgroundColor: "transparent",
            color: "#e2e8f0",
            height: "100%",
        },
        ".cm-content": {
            caretColor: "#6366f1",
            fontFamily: "var(--font-code)",
            fontSize: "15px",
        },
        "&.cm-focused .cm-cursor": {
            borderLeftColor: "#6366f1"
        },
        "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
            backgroundColor: "rgba(99, 102, 241, 0.3)"
        },
        ".cm-gutters": {
            backgroundColor: "rgba(10, 14, 39, 0.5)",
            color: "#64748b",
            border: "none",
        }
    };

    useEffect(() => {
        const initDb = async () => {
            try {
                await sqlEngine.init();
                sqlEngine.loadDataset(activeDataset);
                setTables(sqlEngine.getTables());
                setIsDbLoaded(true);
            } catch (err) {
                setError("Failed to initialize database: " + err.message);
            }
        };
        initDb();
    }, [activeDataset]);

    const handleRunQuery = () => {
        if (!query.trim()) return;

        try {
            setError(null);
            setActiveTab('results');
            const res = sqlEngine.execute(query);
            if (!res.columns) {
                setResults({ columns: ['Result'], values: [['Success / No matching rows.']] });
            } else {
                setResults(res);
            }
        } catch (err) {
            setError(err.message);
            setResults(null);
        }
    };

    const handleExplainQuery = () => {
        if (!query.trim()) return;
        try {
            setError(null);
            const res = sqlEngine.execute(`EXPLAIN QUERY PLAN \${query}`);
            if (res && res.values) {
                setPlanData(res.values);
                setActiveTab('plan');
            } else {
                setError("Could not generate query plan.");
            }
        } catch (err) {
            setError("EXPLAIN failed: " + err.message);
            setPlanData(null);
        }
    };

    const loadDataset = (e) => {
        const ds = e.target.value;
        setActiveDataset(ds);
        setQuery(ds === 'employees' ? 'SELECT * FROM employees;' : 'SELECT * FROM products;');
        setResults(null);
        setError(null);
    };

    return (
        <div className="sql-editor-container animate-fade-in">
            <div className="editor-header-bar glass-panel flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Database className="text-accent-cyan" size={20} />
                    <h1 className="editor-title">SQL Sandbox</h1>

                    <select
                        className="dataset-select"
                        value={activeDataset}
                        onChange={loadDataset}
                    >
                        <option value="employees">Employees DB</option>
                        <option value="ecommerce">E-Commerce DB</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <button className="secondary-btn" onClick={() => setQuery('')}>
                        <RotateCcw size={16} /> Clear
                    </button>
                    <button className="secondary-btn" onClick={handleExplainQuery} disabled={!isDbLoaded}>
                        Explain Query
                    </button>
                    <button className="primary-btn run-btn" onClick={handleRunQuery} disabled={!isDbLoaded}>
                        <Play size={16} fill="white" /> {isDbLoaded ? 'Run Query' : 'Loading...'}
                    </button>
                </div>
            </div>

            <div className="editor-layout">
                <div className="editor-sidebar glass-panel">
                    <h3 className="sidebar-title flex items-center gap-2">
                        <Database size={16} /> Schema browser
                    </h3>

                    <div className="schema-tree">
                        {tables.map(tableName => (
                            <div key={tableName} className="schema-table">
                                <div className="table-name flex items-center gap-2">
                                    <Table size={14} className="text-muted" />
                                    <span>{tableName}</span>
                                </div>
                                <div className="table-columns">
                                    {sqlEngine.getSchema(tableName).map(col => (
                                        <div key={col.name} className="column-item flex justify-between">
                                            <span className="col-name">{col.name}</span>
                                            <span className="col-type">{col.type}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="editor-main">
                    <div className="code-editor-panel glass-panel">
                        <CodeMirror
                            value={query}
                            height="100%"
                            extensions={[sql()]}
                            onChange={(val) => setQuery(val)}
                            theme={customTheme}
                            className="codemirror-wrapper"
                            basicSetup={{
                                lineNumbers: true,
                                highlightActiveLineGutter: true,
                                foldGutter: true,
                                dropCursor: true,
                                allowMultipleSelections: true,
                                indentOnInput: true,
                                bracketMatching: true,
                                closeBrackets: true,
                                autocompletion: true,
                                highlightActiveLine: true,
                                highlightSelectionMatches: true
                            }}
                        />
                    </div>

                    <div className="results-panel glass-panel">
                        <div className="results-tabs" style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(10,14,39,0.5)' }}>
                            <button
                                style={{ padding: '12px 16px', background: 'none', border: 'none', color: activeTab === 'results' ? 'var(--accent-cyan)' : 'var(--text-muted)', borderBottom: activeTab === 'results' ? '2px solid var(--accent-cyan)' : '2px solid transparent', cursor: 'pointer', fontWeight: 600 }}
                                onClick={() => setActiveTab('results')}
                            >
                                Data Results
                            </button>
                            <button
                                style={{ padding: '12px 16px', background: 'none', border: 'none', color: activeTab === 'plan' ? 'var(--accent-cyan)' : 'var(--text-muted)', borderBottom: activeTab === 'plan' ? '2px solid var(--accent-cyan)' : '2px solid transparent', cursor: planData ? 'pointer' : 'not-allowed', opacity: planData ? 1 : 0.5, fontWeight: 600 }}
                                onClick={() => setActiveTab('plan')}
                                disabled={!planData}
                            >
                                Query Plan
                            </button>
                        </div>

                        <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
                            {error ? (
                                <div className="error-message flex items-center gap-2 m-4" style={{ margin: '1rem' }}>
                                    <AlertCircle size={18} color="var(--accent-red)" />
                                    {error}
                                </div>
                            ) : activeTab === 'plan' && planData ? (
                                <QueryPlanTree planData={planData} />
                            ) : activeTab === 'results' && results ? (
                                <div className="table-responsive">
                                    <table className="results-table">
                                        <thead>
                                            <tr>
                                                {results.columns.map((col, i) => <th key={i}>{col}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.values.map((row, rIdx) => (
                                                <tr key={rIdx}>
                                                    {row.map((val, cIdx) => <td key={cIdx}>{val !== null ? val.toString() : 'NULL'}</td>)}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="empty-results text-center text-muted mt-8" style={{ marginTop: '2rem' }}>
                                    Run a query to see results or click Explain to view plan.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SQLEditor;
