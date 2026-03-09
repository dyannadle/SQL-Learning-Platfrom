const PROGRESS_KEY = 'sql_mastery_progress';

export const getProgress = () => {
    try {
        const data = localStorage.getItem(PROGRESS_KEY);
        if (!data) return { completedTopics: [], solvedChallenges: [] };
        return JSON.parse(data);
    } catch (err) {
        return { completedTopics: [], solvedChallenges: [] };
    }
};

const saveProgress = (data) => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
};

export const markTopicComplete = (topicPathId) => {
    const p = getProgress();
    if (!p.completedTopics.includes(topicPathId)) {
        p.completedTopics.push(topicPathId);
        saveProgress(p);
        return true;
    }
    return false;
};

export const isTopicComplete = (topicPathId) => {
    const p = getProgress();
    return p.completedTopics.includes(topicPathId);
};

export const markChallengeSolved = (challengeId) => {
    const p = getProgress();
    if (!p.solvedChallenges.includes(challengeId)) {
        p.solvedChallenges.push(challengeId);
        saveProgress(p);
        return true;
    }
    return false;
};

export const isChallengeSolved = (challengeId) => {
    const p = getProgress();
    return p.solvedChallenges.includes(challengeId);
};

export const calculateXP = () => {
    const p = getProgress();
    const topicXP = p.completedTopics.length * 20;
    const challengeXP = p.solvedChallenges.length * 100;
    return topicXP + challengeXP;
};

export const getLevelInfo = (xp) => {
    if (xp < 500) return { title: 'SQL Novice', next: 500, level: 1 };
    if (xp < 1500) return { title: 'Query Specialist', next: 1500, level: 2 };
    if (xp < 3500) return { title: 'Data Engineer', next: 3500, level: 3 };
    if (xp < 7000) return { title: 'DB Architect', next: 7000, level: 4 };
    return { title: 'SQL Grandmaster', next: Infinity, level: 5 };
};

export const calculateOverallProgress = (totalTopics) => {
    const p = getProgress();
    if (totalTopics === 0) return 0;
    return Math.round((p.completedTopics.length / totalTopics) * 100);
};
