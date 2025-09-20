import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GeckAvyProvider } from './hooks/useGeckAvy';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Cards from './components/Cards';
import Chatbot from './components/Chatbot';
import Profile from './components/Profile';
import Campaigns from './components/Campaigns';

function App() {
  return (
    <GeckAvyProvider>
      <div className="flex h-screen bg-brand-background text-brand-text-primary font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-background p-4 md:p-8">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
            </Routes>
          </main>
        </div>
        <Chatbot />
      </div>
    </GeckAvyProvider>
  );
}

export default App;