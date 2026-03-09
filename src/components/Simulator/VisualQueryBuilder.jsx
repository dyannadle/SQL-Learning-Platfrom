import React, { useState } from 'react';
import { Database, Plus, Trash2, Code, ArrowRight } from 'lucide-react';
import './VisualQueryBuilder.css';

const VisualQueryBuilder = () => {
    const [selectedTable, setSelectedTable] = useState('orders');
    const [selectedColumns, setSelectedColumns] = useState(['order_id', 'total']);
    const [filter, setFilter] = useState({ column: 'total', op: '>', value: '100' });

    const tables = {
        orders: ['order_id', 'customer_id', 'total', 'order_date'],
        products: ['product_id', 'name', 'price', 'category'],
        employees: ['employee_id', 'first_name', 'last_name', 'salary']
    };

    const toggleColumn = (col) => {
        if (selectedColumns.includes(col)) {
            setSelectedColumns(selectedColumns.filter(c => c !== col));
        } else {
            setSelectedColumns([...selectedColumns, col]);
        }
    };

    const generatedSql = `SELECT \${selectedColumns.join(', ') || '*'} \nFROM \${selectedTable}\nWHERE \${filter.column} \${filter.op} \${filter.value};`;

    return (
        <div className="visual-query-builder glass-panel p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Database size={20} className="text-accent-cyan" /> Visual Query Builder
                </h2>
                <div className="badge badge-easy">BETA: Drag & Drop Placeholder</div>
            </div>

            <div className="builder-layout grid grid-cols-2 gap-8">
                <div className="builder-controls flex flex-col gap-6">
                    {/* Table Select */}
                    <div>
                        <label className="text-sm text-muted mb-2 block font-bold">1. Select Base Table</label>
                        <select
                            className="dataset-select w-full"
                            value={selectedTable}
                            onChange={(e) => { setSelectedTable(e.target.value); setSelectedColumns([]); }}
                        >
                            {Object.keys(tables).map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    {/* Column Multi-select */}
                    <div>
                        <label className="text-sm text-muted mb-2 block font-bold">2. Choose Columns</label>
                        <div className="flex flex-wrap gap-2">
                            {tables[selectedTable].map(col => (
                                <button
                                    key={col}
                                    className={`tag-pill \${selectedColumns.includes(col) ? 'active-tag' : ''}`}
                                    onClick={() => toggleColumn(col)}
                                >
                                    {col}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filter Mock */}
                    <div>
                        <label className="text-sm text-muted mb-2 block font-bold">3. Add Filter</label>
                        <div className="flex gap-2">
                            <select className="dataset-select flex-1" value={filter.column} onChange={e => setFilter({ ...filter, column: e.target.value })}>
                                {tables[selectedTable].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <select className="dataset-select w-20" value={filter.op} onChange={e => setFilter({ ...filter, op: e.target.value })}>
                                <option value=">">&gt;</option>
                                <option value="<">&lt;</option>
                                <option value="=">=</option>
                            </select>
                            <input
                                type="text"
                                className="dataset-select w-24"
                                value={filter.value}
                                onChange={e => setFilter({ ...filter, value: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="builder-preview flex flex-col gap-4">
                    <label className="text-sm text-muted block font-bold">Generated SQL</label>
                    <div className="sql-preview-box glass-panel p-4 h-full relative">
                        <pre className="text-sm font-code text-accent-cyan m-0">
                            {generatedSql}
                        </pre>
                        <button className="copy-btn absolute top-2 right-2 secondary-btn sm-btn">
                            <Code size={12} /> Use SQL
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-subtle flex justify-end">
                <button className="primary-btn flex items-center gap-2">
                    Execute Query <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default VisualQueryBuilder;
