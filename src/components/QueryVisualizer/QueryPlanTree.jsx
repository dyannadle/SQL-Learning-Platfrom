import React from 'react';
import { Database, Search, ArrowRight, Zap, Target } from 'lucide-react';
import './QueryPlanTree.css';

/**
 * SQLite EXPLAIN QUERY PLAN returns rows with: id, parent, notused, detail
 * We convert this flat adjacency list to a nested tree.
 */
const buildTree = (rows) => {
    const nodeMap = {};
    const roots = [];

    rows.forEach(row => {
        // row is an array: [id, parent, notused, detail]
        nodeMap[row[0]] = {
            id: row[0],
            parentId: row[1],
            detail: row[3],
            children: []
        };
    });

    rows.forEach(row => {
        const node = nodeMap[row[0]];
        if (node.parentId === 0) {
            roots.push(node);
        } else {
            if (nodeMap[node.parentId]) {
                nodeMap[node.parentId].children.push(node);
            }
        }
    });

    return roots;
};

const PlanNode = ({ node, isLast }) => {
    // Simple heuristic to pick icons based on SQLite's output text
    let icon = <ArrowRight size={14} />;
    let typeClass = "plan-type-default";

    const detailUpper = node.detail.toUpperCase();
    if (detailUpper.includes('SCAN TABLE')) {
        icon = <Database size={14} />;
        typeClass = "plan-type-scan";
    } else if (detailUpper.includes('SEARCH TABLE')) {
        icon = <Search size={14} />;
        typeClass = "plan-type-search";
    } else if (detailUpper.includes('USE TEMP B-TREE')) {
        icon = <Zap size={14} />;
        typeClass = "plan-type-sort";
    } else if (detailUpper.includes('CORRELATED SCALAR')) {
        icon = <Target size={14} />;
        typeClass = "plan-type-subquery";
    }

    return (
        <div className="plan-node-container">
            <div className="plan-node glass-panel">
                <div className={`plan-node-icon ${typeClass}`}>
                    {icon}
                </div>
                <div className="plan-node-detail">
                    {node.detail}
                </div>
            </div>

            {node.children && node.children.length > 0 && (
                <div className="plan-children">
                    {node.children.map((child, idx) => (
                        <PlanNode
                            key={child.id}
                            node={child}
                            isLast={idx === node.children.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const QueryPlanTree = ({ planData }) => {
    if (!planData || planData.length === 0) {
        return <div className="text-muted p-4">No query plan data available.</div>;
    }

    const roots = buildTree(planData);

    return (
        <div className="query-plan-wrapper animate-fade-in">
            <div className="query-plan-header">
                <h3 className="flex items-center gap-2 m-0 p-0 text-cyan">
                    <Zap size={18} /> Query Execution Plan
                </h3>
                <p className="text-sm text-muted m-0 p-0 mt-2">
                    Visualizing how the SQLite engine intends to execute your statement.
                </p>
            </div>

            <div className="query-plan-tree">
                {roots.map((root, idx) => (
                    <PlanNode key={root.id} node={root} isLast={idx === roots.length - 1} />
                ))}
            </div>
        </div>
    );
};

export default QueryPlanTree;
