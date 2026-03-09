import React, { useState, useEffect } from 'react';
import { Trophy, Star, X } from 'lucide-react';
import './NotificationToast.css';

const NotificationToast = () => {
    const [notification, setNotification] = useState(null);

    // This would ideally listen to a global event or store
    useEffect(() => {
        const handleNotify = (e) => {
            setNotification(e.detail);
            setTimeout(() => setNotification(null), 5000);
        };

        window.addEventListener('sql_achievement', handleNotify);
        return () => window.removeEventListener('sql_achievement', handleNotify);
    }, []);

    if (!notification) return null;

    return (
        <div className="achievement-toast-container">
            <div className="achievement-toast glass-panel animate-slide-in-up">
                <div className="toast-icon">
                    {notification.type === 'level' ? <Star className="text-accent-yellow" /> : <Trophy className="text-accent-blue" />}
                </div>
                <div className="toast-content">
                    <p className="toast-title">{notification.title}</p>
                    <p className="toast-desc">{notification.message}</p>
                </div>
                <button className="toast-close" onClick={() => setNotification(null)}>
                    <X size={14} />
                </button>
            </div>
        </div>
    );
};

// Global helper to trigger notifications
export const notifyAchievement = (title, message, type = 'badge') => {
    const event = new CustomEvent('sql_achievement', {
        detail: { title, message, type }
    });
    window.dispatchEvent(event);
};

export default NotificationToast;
