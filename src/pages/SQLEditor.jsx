import React, { useState, useEffect, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { sqlEngine } from '../lib/sqlEngine';
import { Database, Table, Play, Plus, ChevronDown, RotateCcw } from 'lucide-react';
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
    const [query, setQuery] = useState('SELECT * FROM ecommerce;');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [tables, setTables] = useState([]);
    const [tableSchemas, setTableSchemas] = useState({});
    const [availableDatasets, setAvailableDatasets] = useState(['ecommerce']);
    const [activeDataset, setActiveDataset] = useState('ecommerce');
    const [planData, setPlanData] = useState(null);
    const [activeTab, setActiveTab] = useState('results');
    const [showTemplates, setShowTemplates] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

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
        const fetchDatasets = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/datasets');
                const data = await res.json();
                if (data.datasets && data.datasets.length > 0) {
                    setAvailableDatasets(data.datasets);
                    setActiveDataset(data.datasets[0]); // Set the first dataset as active
                    setQuery(`SELECT * FROM ${data.datasets[0]};`);
                }
            } catch (err) {
                console.error("Failed to fetch datasets", err);
            }
        };
        fetchDatasets();
    }, []);

    useEffect(() => {
        const loadSchema = async () => {
            try {
                await sqlEngine.init();
                sqlEngine.loadDataset(activeDataset);
                await refreshSchema();
            } catch (err) {
                setError("Failed to initialize database: " + err.message);
            }
        };
        loadSchema();
    }, [activeDataset, refreshSchema]);

    const handleRunQuery = async () => {
        if (!query.trim()) return;
        const trimmed = query.trim();
        const isDDL = /^\s*(CREATE|DROP|ALTER|INSERT|UPDATE|DELETE|TRUNCATE)/i.test(trimmed);

        try {
            setError(null);
            setPlanData(null); // Clear plan data on new query run
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
            setResults(null); // Clear results on explain
            setStatusMsg('Explaining...');
            const res = await sqlEngine.execute(query, true); // true for includePlan
            if (res && res.queryPlan) {
                setPlanData(res.queryPlan.plan_rows);
                setActiveTab('plan');
                setStatusMsg('Query plan generated.');
            } else {
                setError("Could not generate query plan.");
                setPlanData(null);
                setStatusMsg('');
            }
        } catch (err) {
            setError("EXPLAIN failed: " + err.message);
            setPlanData(null);
            setStatusMsg('');
        }
    };

    const loadDataset = async (e) => {
        const ds = e.target.value;
        setActiveDataset(ds);
        setQuery(`SELECT * FROM ${ds} LIMIT 20;`);
        setResults(null);
        setError(null);
        setStatusMsg(`Loading ${ds}...`);
        
        await sqlEngine.init();
        sqlEngine.loadDataset(ds);
        refreshSchema();
        setStatusMsg(`${ds.charAt(0).toUpperCase() + ds.slice(1)} DB Loaded.`);
    };

    return (
        <div className="sql-editor-container animate-fade-in">
            <div className="editor-header-bar glass-panel flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Database className="text-accent-cyan" size={20} />
                    <h1 className="editor-title">SQL Playground</h1>
                    <select className="dataset-select" value={activeDataset} onChange={loadDataset}>
                        {availableDatasets.map(ds => (
                            <option key={ds} value={ds}>{ds.charAt(0).toUpperCase() + ds.slice(1)} DB</option>
                        ))}
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
                    <button className="secondary-btn" onClick={handleExplainQuery} disabled={!activeDataset}>
                        Explain
                    </button>
                    <button 
                        className="secondary-btn" 
                        style={{ borderColor: 'rgba(239, 68, 68, 0.3)', color: 'var(--accent-red)' }}
                        onClick={async () => {
                            if (window.confirm("This will permanently wipe your playground data and reset to the default template. Continue?")) {
                                await sqlEngine.resetSession();
                                await refreshSchema();
                                setResults(null);
                                setQuery(`SELECT * FROM ${activeDataset} LIMIT 20;`);
                                setStatusMsg("Sandbox Reset Successfully.");
                            }
                        }}
                    >
                        Reset DB
                    </button>
                    <button className="primary-btn run-btn" onClick={handleRunQuery} disabled={!activeDataset}>
                        <Play size={16} fill="white" /> {activeDataset ? 'Run' : 'Loading...'}
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
                            <div className="empty-schema p-4 text-center opacity-60">
                                <Database size={32} className="mx-auto mb-2 opacity-20" />
                                <p className="text-xs">No tables found.</p>
                                <button className="secondary-btn sm-btn mt-2" onClick={refreshSchema}>Retry</button>
                            </div>
                        ) : tables.map(tableName => (
                            <div key={tableName} className="schema-table-group">
                                <div
                                    className="table-item flex items-center justify-between"
                                    onClick={() => setQuery(`SELECT * FROM ${tableName} LIMIT 50;`)}
                                >
                                    <div className="flex items-center gap-2">
                                        <Table size={14} className="text-accent-cyan" />
                                        <span className="table-name-text">{tableName}</span>
                                    </div>
                                    <span className="row-count-badge">{(tableSchemas[tableName] || []).length} cols</span>
                                </div>
                                <div className="column-list">
                                    {(tableSchemas[tableName] || []).map(col => (
                                        <div key={col.name} className="column-entry flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className={`col-indicator ${col.pk ? 'pk' : ''}`}></div>
                                                <span className={`col-name ${col.pk ? 'is-pk' : ''}`}>
                                                    {col.name}
                                                </span>
                                            </div>
                                            <span className="col-datatype">{col.type.toLowerCase() || 'any'}</span>
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
                                <div className="error-state p-6 animate-shake">
                                    <div className="error-card glass-panel flex items-start gap-4 p-4 border-accent-red">
                                        <XCircle className="text-accent-red mt-1" size={20} />
                                        <div className="error-text">
                                            <h4 className="m-0 text-accent-red">Syntax Error</h4>
                                            <p className="m-0 mt-1 text-sm opacity-80">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : activeTab === 'plan' && planData ? (
                                <div className="p-4 h-full overflow-auto">
                                    <QueryPlanTree planData={planData} />
                                </div>
                            ) : activeTab === 'results' && results ? (
                                <div className="results-wrapper h-full flex flex-col">
                                    <div className="results-scroll flex-1 overflow-auto">
                                        <table className="results-table">
                                            <thead className="sticky top-0">
                                                <tr>
                                                    {results.columns.map((col, i) => <th key={i}>{col}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {results.values.length > 0 ? (
                                                    results.values.map((row, i) => (
                                                        <tr key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.02}s` }}>
                                                            {row.map((val, j) => (
                                                                <td key={j}>{val === null ? <em className="text-muted">NULL</em> : val.toString()}</td>
                                                            ))}
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={results.columns.length} className="empty-state py-10 text-center text-muted">
                                                            Query executed successfully but returned no rows.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="empty-results flex flex-col items-center justify-center h-full text-muted opacity-40">
                                    <Terminal size={48} className="mb-4" />
                                    <p className="text-lg">Run a query to view results here</p>
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
