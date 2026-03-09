import React from 'react';
import './ProgressRing.css';

const ProgressRing = ({ radius, stroke, progress, color, label }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="progress-ring-container flex-col items-center">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="progress-ring-svg"
            >
                <circle
                    stroke="rgba(255,255,255,0.1)"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={color || 'var(--accent-cyan)'}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="progress-ring-circle animate-pulse-glow"
                />
            </svg>
            {label && <span className="progress-label">{progress}%</span>}
        </div>
    );
};

export default ProgressRing;
