import React, { useState, useEffect, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { sqlEngine } from '../lib/sqlEngine';
import QueryPlanTree from '../components/QueryVisualizer/QueryPlanTree';
import './SQLEditor.css';

const SQL_TEMPLATES = [
    { label: 'Create Table', sql: `CREATE TABLE my_table (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE,\n  age INTEGER DEFAULT 0,\n  created_at TEXT DEFAULT CURRENT_TIMESTAMP\n);` },
    { label: 'Insert Rows', sql: `INSERT INTO my_table (name, email, age) VALUES\n  ('Alice Smith', 'alice@example.com', 28),\n  ('Bob Jones', 'bob@example.com', 35),\n  ('Carol White', 'carol@example.com', 22);` },
    { label: 'Select All', sql: `SELECT * FROM my_table;` },
    { label: 'Update Row', sql: `UPDATE my_table\nSET age = 29\nWHERE name = 'Alice Smith';` },
    { label: 'Delete Row', sql: `DELETE FROM my_table\nWHERE id = 1;` },
    { label: 'Alter Table', sql: `ALTER TABLE my_table\nADD COLUMN phone TEXT;` },
    { label: 'Drop Table', sql: `DROP TABLE IF EXISTS my_table;` },
    { label: 'Join Query', sql: `SELECT e.name, d.department_name\nFROM employees e\nINNER JOIN departments d\n  ON e.department_id = d.id;` },
];

const SQLEditor = () => {
    const [query, setQuery] = useState('SELECT * FROM employees;');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [isDbLoaded, setIsDbLoaded] = useState(false);
    const [tables, setTables] = useState([]);
    const [activeDataset, setActiveDataset] = useState('employees');
    const [planData, setPlanData] = useState(null);
    const [activeTab, setActiveTab] = useState('results');
    const [showTemplates, setShowTemplates] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const [tableSchemas, setTableSchemas] = useState({});

    const refreshSchema = useCallback(async () => {
        const tableList = await sqlEngine.getTables();
        setTables(tableList);

        // Fetch schemas for all tables asynchronously
        const schemas = {};
        for (const t of tableList) {
            schemas[t] = await sqlEngine.getSchema(t);
        }
        setTableSchemas(schemas);
    }, []);

    useEffect(() => {
        const initDb = async () => {
            try {
                await sqlEngine.init();
                sqlEngine.loadDataset(activeDataset);
                await refreshSchema();
                setIsDbLoaded(true);
            } catch (err) {
                setError("Failed to initialize database: " + err.message);
            }
        };
        initDb();
    }, [activeDataset, refreshSchema]);

    const handleRunQuery = async () => {
        if (!query.trim()) return;
        const trimmed = query.trim();
        const isDDL = /^\s*(CREATE|DROP|ALTER|INSERT|UPDATE|DELETE|TRUNCATE)/i.test(trimmed);

        try {
            setError(null);
            setStatusMsg('Running...');
            setActiveTab('results');

            // Multi-statement support
            const statements = trimmed.split(';').filter(s => s.trim());
            let lastResult = null;
            let totalAffected = 0;
            let totalTime = 0;

            for (const stmt of statements) {
                const fullStmt = stmt.trim() + ';';
                try {
                    const res = await sqlEngine.execute(fullStmt);
                    if (res && res.columns && res.columns.length > 0) {
                        lastResult = res;
                    }
                    totalAffected += (res.affected_rows || 0);
                    totalTime += (res.execution_time_ms || 0);
                } catch (err) {
                    throw new Error(`Error in: ${fullStmt.substring(0, 60)}...\n${err.message}`);
                }
            }

            if (lastResult && lastResult.columns && lastResult.columns.length > 0) {
                setResults(lastResult);
                setStatusMsg(`${lastResult.values.length} row(s) | ${totalTime.toFixed(1)}ms`);
            } else {
                setResults({ columns: ['Status'], values: [['✓ Statement(s) executed successfully.']] });
                setStatusMsg(totalAffected > 0 ? `${totalAffected} row(s) affected | ${totalTime.toFixed(1)}ms` : `Executed in ${totalTime.toFixed(1)}ms`);
            }

            if (isDDL) await refreshSchema();
        } catch (err) {
            setError(err.message);
            setResults(null);
            setStatusMsg('');
        }
    };

    const handleExplainQuery = async () => {
        if (!query.trim()) return;
        try {
            setError(null);
            const res = await sqlEngine.execute(query, true); // true for includePlan
            if (res && res.queryPlan) {
                setPlanData(res.queryPlan.plan_rows);
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
        setStatusMsg('');
    };

    return (
        <div className="sql-editor-container animate-fade-in">
            <div className="editor-header-bar glass-panel flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Database className="text-accent-cyan" size={20} />
                    <h1 className="editor-title">SQL Playground</h1>
                    <select className="dataset-select" value={activeDataset} onChange={loadDataset}>
                        <option value="employees">Employees DB</option>
                        <option value="ecommerce">E-Commerce DB</option>
                    </select>
                </div>

                <div className="flex gap-2 items-center">
                    {/* SQL Templates Dropdown */}
                    <div style={{ position: 'relative' }}>
                        <button
                            className="secondary-btn flex items-center gap-1"
                            onClick={() => setShowTemplates(!showTemplates)}
                        >
                            <Plus size={14} /> Templates <ChevronDown size={12} />
                        </button>
                        {showTemplates && (
                            <div className="template-dropdown glass-panel" style={{
                                position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem',
                                minWidth: '200px', zIndex: 50, borderRadius: '8px', overflow: 'hidden',
                                border: '1px solid var(--border-subtle)'
                            }}>
                                {SQL_TEMPLATES.map((t, i) => (
                                    <button
                                        key={i}
                                        className="template-item"
                                        style={{
                                            display: 'block', width: '100%', textAlign: 'left',
                                            padding: '10px 16px', background: 'none', border: 'none',
                                            color: 'var(--text-secondary)', fontSize: '0.85rem',
                                            cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.03)',
                                            transition: 'background 0.15s', fontFamily: 'inherit'
                                        }}
                                        onMouseEnter={e => e.target.style.background = 'rgba(99,102,241,0.1)'}
                                        onMouseLeave={e => e.target.style.background = 'none'}
                                        onClick={() => { setQuery(t.sql); setShowTemplates(false); }}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="secondary-btn" onClick={() => { setQuery(''); setStatusMsg(''); }}>
                        <RotateCcw size={16} /> Clear
                    </button>
                    <button className="secondary-btn" onClick={handleExplainQuery} disabled={!isDbLoaded}>
                        Explain
                    </button>
                    <button className="primary-btn run-btn" onClick={handleRunQuery} disabled={!isDbLoaded}>
                        <Play size={16} fill="white" /> {isDbLoaded ? 'Run' : 'Loading...'}
                    </button>
                </div>
            </div>

            <div className="editor-layout two-col-layout">
                <div className="editor-sidebar glass-panel">
                    <h3 className="sidebar-title flex items-center gap-2">
                        <Database size={16} /> Schema Browser
                    </h3>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0 1rem 0.5rem', margin: 0 }}>
                        Click a table to query it
                    </p>
                    <div className="schema-tree">
                        {tables.length === 0 ? (
                            <p className="text-muted text-sm" style={{ padding: '1rem' }}>
                                No tables yet. Use <strong>Templates → Create Table</strong> to get started!
                            </p>
                        ) : tables.map(tableName => (
                            <div key={tableName} className="schema-table">
                                <div
                                    className="table-name flex items-center gap-2"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setQuery(`SELECT * FROM ${tableName} LIMIT 20;`)}
                                    title={`Click to query ${tableName}`}
                                >
                                    <Table size={14} className="text-muted" />
                                    <span>{tableName}</span>
                                </div>
                                <div className="table-columns">
                                    {(tableSchemas[tableName] || []).map(col => (
                                        <div key={col.name} className="column-item flex justify-between">
                                            <span className="col-name">
                                                {col.pk ? '🔑 ' : ''}{col.name}
                                            </span>
                                            <span className="col-type">{col.type || 'ANY'}</span>
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
                            theme="dark"
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
                        <div className="results-tabs" style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(10,14,39,0.5)'
                        }}>
                            <div style={{ display: 'flex' }}>
                                <button
                                    style={{
                                        padding: '12px 16px', background: 'none', border: 'none',
                                        color: activeTab === 'results' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                                        borderBottom: activeTab === 'results' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                                        cursor: 'pointer', fontWeight: 600
                                    }}
                                    onClick={() => setActiveTab('results')}
                                >
                                    Results
                                </button>
                                <button
                                    style={{
                                        padding: '12px 16px', background: 'none', border: 'none',
                                        color: activeTab === 'plan' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                                        borderBottom: activeTab === 'plan' ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                                        cursor: planData ? 'pointer' : 'not-allowed', opacity: planData ? 1 : 0.5, fontWeight: 600
                                    }}
                                    onClick={() => setActiveTab('plan')}
                                    disabled={!planData}
                                >
                                    Query Plan
                                </button>
                            </div>
                            {statusMsg && (
                                <span style={{ padding: '0 16px', fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                                    {statusMsg}
                                </span>
                            )}
                        </div>

                        <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
                            {error ? (
                                <div className="error-message flex items-center gap-2" style={{ margin: '1rem', whiteSpace: 'pre-wrap' }}>
                                    <AlertCircle size={18} color="var(--accent-red)" style={{ flexShrink: 0 }} />
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
                                                    {row.map((val, cIdx) => (
                                                        <td key={cIdx}>{val !== null ? val.toString() : <em style={{ color: 'var(--text-muted)' }}>NULL</em>}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="empty-results text-center text-muted" style={{ marginTop: '3rem' }}>
                                    <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Write SQL and click Run</p>
                                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                                        Full CRUD: CREATE, INSERT, SELECT, UPDATE, DELETE, ALTER, DROP
                                    </p>
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
