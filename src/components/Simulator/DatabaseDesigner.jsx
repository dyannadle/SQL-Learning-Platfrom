import React, { useState } from 'react';
import { Plus, Trash2, Link as LinkIcon, Database, Move } from 'lucide-react';
import './DatabaseDesigner.css';

const DatabaseDesigner = () => {
    const [tables, setTables] = useState([
        { id: 1, name: 'users', columns: ['id', 'username', 'email'], x: 50, y: 50 },
        { id: 2, name: 'posts', columns: ['id', 'user_id', 'content'], x: 300, y: 150 }
    ]);
    const [activeTable, setActiveTable] = useState(null);

    const addTable = () => {
        const newTable = {
            id: Date.now(),
            name: 'new_table',
            columns: ['id'],
            x: 100,
            y: 100
        };
        setTables([...tables, newTable]);
    };

    const addColumn = (tableId) => {
        setTables(tables.map(t =>
            t.id === tableId ? { ...t, columns: [...t.columns, 'new_col'] } : t
        ));
    };

    const removeTable = (tableId) => {
        setTables(tables.filter(t => t.id !== tableId));
    };

    return (
        <div className="database-designer glass-panel p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Database size={20} className="text-accent-cyan" /> Visual Database Designer
                    </h2>
                    <p className="text-muted text-sm">Design your schema visually and export to SQL</p>
                </div>
                <button className="primary-btn flex items-center gap-2" onClick={addTable}>
                    <Plus size={16} /> Add Table
                </button>
            </div>

            <div className="designer-canvas border border-subtle bg-black/20 rounded-xl relative overflow-hidden" style={{ height: '500px' }}>
                {tables.map(table => (
                    <div
                        key={table.id}
                        className="designer-table glass-panel absolute"
                        style={{ left: table.x, top: table.y, width: '180px' }}
                    >
                        <div className="table-header p-2 bg-accent-cyan/10 border-b border-subtle flex justify-between items-center cursor-move">
                            <span className="font-bold text-xs uppercase tracking-wider">{table.name}</span>
                            <div className="flex gap-1">
                                <button onClick={() => addColumn(table.id)} className="text-muted hover:text-accent-cyan"><Plus size={12} /></button>
                                <button onClick={() => removeTable(table.id)} className="text-muted hover:text-accent-red"><Trash2 size={12} /></button>
                            </div>
                        </div>
                        <div className="table-columns p-2">
                            {table.columns.map((col, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs p-1 border-b border-white/5 last:border-0">
                                    <span>{col}</span>
                                    {col.includes('_id') && <LinkIcon size={10} className="text-accent-cyan" />}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Simplified Relationship Lines (SVG Placeholder) */}
                <svg className="absolute inset-0 pointer-events-none w-full h-full">
                    <line x1="230" y1="80" x2="300" y2="180" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="2" strokeDasharray="4" />
                </svg>
            </div>

            <div className="mt-6 p-4 bg-accent-cyan/5 border border-accent-cyan/20 rounded-lg">
                <h4 className="text-sm font-bold mb-2">Designer Tips:</h4>
                <ul className="text-xs text-muted list-disc pl-5 flex flex-col gap-1">
                    <li>Tables represent entities in your domain (Users, Orders, etc.)</li>
                    <li>Columns ending in <strong>_id</strong> are automatically suggested as Foreign Keys.</li>
                    <li>Keep your tables Nomalized to at least 3NF for efficiency.</li>
                </ul>
            </div>
        </div>
    );
};

export default DatabaseDesigner;
