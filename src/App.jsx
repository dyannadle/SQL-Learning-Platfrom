import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import Home from './pages/Home';
import Curriculum from './pages/Curriculum';
import LevelDetail from './pages/LevelDetail';
import ModuleDetail from './pages/ModuleDetail';
import TopicLesson from './pages/TopicLesson';
import SQLEditor from './pages/SQLEditor';
import Challenges from './pages/Challenges';
import ChallengeDetail from './pages/ChallengeDetail';
import NotificationToast from './components/NotificationToast';

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
        <NotificationToast />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
