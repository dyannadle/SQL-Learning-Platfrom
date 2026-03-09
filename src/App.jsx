import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Placeholder Pages
const Home = () => <div className="animate-slide-up"><h1>Home Page</h1></div>;
const Curriculum = () => <div className="animate-slide-up"><h1>Curriculum Overview</h1></div>;
const LevelDetail = () => <div className="animate-slide-up"><h1>Level Detail</h1></div>;
const ModuleDetail = () => <div className="animate-slide-up"><h1>Module Detail</h1></div>;
const TopicLesson = () => <div className="animate-slide-up"><h1>Topic Lesson</h1></div>;
const SQLEditor = () => <div className="animate-slide-up"><h1>SQL Editor Playground</h1></div>;
const Challenges = () => <div className="animate-slide-up"><h1>SQL Challenges</h1></div>;
const ChallengeDetail = () => <div className="animate-slide-up"><h1>Challenge Detail</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/curriculum/:levelId" element={<LevelDetail />} />
          <Route path="/curriculum/:levelId/:moduleId" element={<ModuleDetail />} />
          <Route path="/curriculum/:levelId/:moduleId/:topicId" element={<TopicLesson />} />
          <Route path="/editor" element={<SQLEditor />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenges/:challengeId" element={<ChallengeDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
