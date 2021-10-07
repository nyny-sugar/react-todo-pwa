import React from 'react';
import { AuthProvider } from './providers/AuthProvider';
import './App.css';
import './service/firebase';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Dashboard />
      {/* フッター */}
    </AuthProvider>
  );
}

export default App;
