/**
 * Badges & Achievements logic.
 */

export const BADGES = [
    {
        id: 'first_query',
        name: 'First Query',
        description: 'Ran your first SQL query in the editor',
        icon: '🏃',
        color: 'var(--accent-cyan)'
    },
    {
        id: 'data_novice',
        name: 'Data Novice',
        description: 'Completed Level 0 Foundations',
        icon: '🥚',
        color: 'var(--accent-green)'
    },
    {
        id: 'join_master',
        name: 'Join Master',
        description: 'Solved all Join challenges',
        icon: '🔗',
        color: 'var(--accent-blue)'
    },
    {
        id: 'performer',
        name: 'Speed Demon',
        description: 'Successfully explained a query plan',
        icon: '⚡',
        color: 'var(--accent-purple)'
    },
    {
        id: 'grandmaster',
        name: 'SQL Grandmaster',
        description: 'Reached Level 12',
        icon: '👑',
        color: 'var(--accent-yellow)'
    }
];

export const checkEligibleBadges = (progress) => {
    const earned = [];

    // Simple criteria based on progress object
    if (progress.completedTopics.length > 0) earned.push('first_query');
    if (progress.completedTopics.filter(t => t.startsWith('level-0')).length >= 5) earned.push('data_novice');

    // Future: check challenge types, etc.

    return earned;
};
