import React, { useState } from 'react';
import { Search, ChevronDown, CheckCircle2, MoreHorizontal } from 'lucide-react';
import './IndexVisualizer.css';

const IndexVisualizer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [path, setPath] = useState([]);
    const [found, setFound] = useState(null);

    // Simplified B-Tree Structure (Level 0: Root, Level 1: Nodes, Level 2: Leaves)
    const bTree = {
        value: '50',
        id: 'root',
        children: [
            {
                value: '25',
                id: 'n1',
                children: [
                    { value: '10', id: 'l1', leaf: true },
                    { value: '25', id: 'l2', leaf: true },
                    { value: '40', id: 'l3', leaf: true }
                ]
            },
            {
                value: '75',
                id: 'n2',
                children: [
                    { value: '60', id: 'l4', leaf: true },
                    { value: '75', id: 'l5', leaf: true },
                    { value: '90', id: 'l6', leaf: true }
                ]
            }
        ]
    };

    const simulateSearch = (target) => {
        if (!target) return;
        const num = parseInt(target);
        const searchPath = ['root'];
        let currentFound = null;

        // Simplified logic for simulation matches
        if (num <= 50) {
            searchPath.push('n1');
            if (num <= 15) searchPath.push('l1');
            else if (num <= 30) searchPath.push('l2');
            else searchPath.push('l3');
        } else {
            searchPath.push('n2');
            if (num <= 65) searchPath.push('l4');
            else if (num <= 80) searchPath.push('l5');
            else searchPath.push('l6');
        }

        setPath(searchPath);
        setFound(target);
    };

    const Node = ({ node, level }) => {
        const isActive = path.includes(node.id);

        return (
            <div className={`btree-node-wrapper level-\${level}`}>
                <div className={`btree-node glass-panel \${isActive ? 'active-node' : ''}`}>
                    <span className="node-val">{node.value}</span>
                    {isActive && <div className="scan-indicator">Scanning...</div>}
                </div>
                {node.children && (
                    <div className="btree-children">
                        {node.children.map(child => <Node key={child.id} node={child} level={level + 1} />)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="index-visualizer glass-panel p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold mb-1">B-Tree Index Simulator</h2>
                    <p className="text-muted text-sm">How databases find data in O(log N) time</p>
                </div>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Search ID (1-100)"
                        className="dataset-select"
                        style={{ width: '160px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="primary-btn" onClick={() => simulateSearch(searchTerm)}>
                        <Search size={16} /> Locate
                    </button>
                    <button className="secondary-btn" onClick={() => { setPath([]); setFound(null); setSearchTerm(''); }}>
                        Reset
                    </button>
                </div>
            </div>

            <div className="btree-container">
                <Node node={bTree} level={0} />
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="glass-panel p-4 border border-subtle">
                    <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                        <MoreHorizontal size={14} /> Execution Trace
                    </h4>
                    <div className="flex flex-col gap-2">
                        {path.map((pId, idx) => (
                            <div key={pId} className="trace-item flex items-center gap-2 text-sm">
                                <span className="step-num">{idx + 1}</span>
                                <span className="text-muted">Probing node</span>
                                <span className="text-accent-cyan font-code">{pId}</span>
                                <ArrowRight size={12} className="text-muted" />
                            </div>
                        ))}
                        {found && (
                            <div className="trace-item flex items-center gap-2 text-sm text-accent-green font-bold">
                                <CheckCircle2 size={14} /> Found Record {found}!
                            </div>
                        )}
                    </div>
                </div>
                <div className="glass-panel p-4 border border-subtle bg-blue-900/10">
                    <h4 className="text-sm font-bold mb-2">Efficiency Gain</h4>
                    <p className="text-xs text-muted mb-4">Comparison with Full Table Scan</p>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="text-xs w-24">Index Scan:</div>
                        <div className="flex-1 h-2 bg-accent-cyan rounded-full" style={{ width: '10%' }}></div>
                        <div className="text-xs font-bold">{path.length} lookups</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-xs w-24">Table Scan:</div>
                        <div className="flex-1 h-2 bg-accent-red rounded-full" style={{ width: '100%' }}></div>
                        <div className="text-xs font-bold text-accent-red">100 lookups</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArrowRight = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
    </svg>
);

export default IndexVisualizer;
