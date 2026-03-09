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
    }
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
    }
};

export const isChallengeSolved = (challengeId) => {
    const p = getProgress();
    return p.solvedChallenges.includes(challengeId);
};

export const calculateOverallProgress = (totalTopics) => {
    const p = getProgress();
    if (totalTopics === 0) return 0;
    return Math.round((p.completedTopics.length / totalTopics) * 100);
};
