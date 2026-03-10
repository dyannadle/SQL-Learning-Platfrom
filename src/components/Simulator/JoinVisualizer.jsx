import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowRight } from 'lucide-react';
import './JoinVisualizer.css';

const JoinVisualizer = () => {
    const [algo, setAlgo] = useState('nested'); // nested, hash
    const [isPlaying, setIsPlaying] = useState(false);
    const [step, setStep] = useState(0);
    const [leftPointer, setLeftPointer] = useState(-1);
    const [rightPointer, setRightPointer] = useState(-1);

    const leftTable = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ];

    const rightTable = [
        { userId: 2, city: 'NY' },
        { userId: 1, city: 'LDN' },
        { userId: 4, city: 'TOK' }
    ];

    const [results, setResults] = useState([]);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                nextStep();
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isPlaying, step, algo]);

    const reset = () => {
        setIsPlaying(false);
        setStep(0);
        setLeftPointer(-1);
        setRightPointer(-1);
        setResults([]);
    };

    const nextStep = () => {
        if (algo === 'nested') {
            const totalSteps = leftTable.length * rightTable.length;
            if (step >= totalSteps) {
                setIsPlaying(false);
                return;
            }

            const lIdx = Math.floor(step / rightTable.length);
            const rIdx = step % rightTable.length;

            setLeftPointer(lIdx);
            setRightPointer(rIdx);

            if (leftTable[lIdx].id === rightTable[rIdx].userId) {
                setResults(prev => [...prev, { ...leftTable[lIdx], ...rightTable[rIdx] }]);
            }

            setStep(prev => prev + 1);
        }
    };

    return (
        <div className="join-visualizer glass-panel p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold mb-1">Interactive Join Simulator</h2>
                    <p className="text-muted text-sm">Visualizing how the database engine executes joins</p>
                </div>
                <div className="flex gap-4">
                    <select
                        className="secondary-btn"
                        value={algo}
                        onChange={(e) => { setAlgo(e.target.value); reset(); }}
                    >
                        <option value="nested">Nested Loop Join</option>
                        <option value="hash">Hash Join (Coming Soon)</option>
                    </select>
                    <button className="primary-btn flex items-center gap-2" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        {isPlaying ? 'Pause' : 'Start Simulation'}
                    </button>
                    <button className="secondary-btn" onClick={reset}>
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            <div className="simulator-grid">
                {/* Left Table */}
                <div className="sim-table-container">
                    <h4 className="flex items-center gap-2 mb-2 text-blue-400">
                        <ArrowRight size={14} /> Table A (Outer)
                    </h4>
                    <div className="sim-table glass-panel">
                        <div className="sim-row header">
                            <span>ID</span><span>Name</span>
                        </div>
                        {leftTable.map((row, i) => (
                            <div key={i} className={`sim-row ${leftPointer === i ? 'active-pointer' : ''}`}>
                                <span>{row.id}</span><span>{row.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Animation Connection */}
                <div className="sim-connector flex items-center justify-center">
                    <div className="pulse-circle"></div>
                </div>

                {/* Right Table */}
                <div className="sim-table-container">
                    <h4 className="flex items-center gap-2 mb-2 text-purple-400">
                        <ArrowRight size={14} /> Table B (Inner)
                    </h4>
                    <div className="sim-table glass-panel">
                        <div className="sim-row header">
                            <span>UID</span><span>City</span>
                        </div>
                        {rightTable.map((row, i) => (
                            <div key={i} className={`sim-row ${rightPointer === i ? 'active-pointer' : ''}`}>
                                <span>{row.userId}</span><span>{row.city}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h4 className="mb-2">Execution Results</h4>
                <div className="sim-results glass-panel">
                    <div className="sim-row header">
                        <span>ID</span><span>Name</span><span>City</span>
                    </div>
                    {results.length === 0 ? (
                        <div className="p-4 text-center text-muted text-sm">Waiting for matches...</div>
                    ) : (
                        results.map((row, i) => (
                            <div key={i} className="sim-row animate-fade-in">
                                <span>{row.id}</span><span>{row.name}</span><span>{row.city}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="mt-6 p-4 bg-muted-subtle rounded-lg border border-subtle">
                <p className="text-sm font-code">
                    <strong>Step {step}:</strong> {algo === 'nested' ? `Comparing Table A ID ${leftTable[Math.floor(step / rightTable.length)]?.id || '-'} with Table B UserID ${rightTable[step % rightTable.length]?.userId || '-'}` : 'Hashing Table A...'}
                </p>
            </div>
        </div>
    );
};

export default JoinVisualizer;
