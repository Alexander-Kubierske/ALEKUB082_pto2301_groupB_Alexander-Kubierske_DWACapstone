import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, SearchPage } from '../pages/1pageIndex';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

// import { HomePage, LoginPage, ProfilePage, SearchPage } from '../pages/1pageIndex';
//         <Route path="/profile" element={<ProfilePage />} />