import { BrowserRouter as Router, useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import SignUpPage from './components/SignUp.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './components/LoginPage.jsx';
import CreateContactPage from './components/CreateContactPage.jsx';
import ContactsListPage from './components/ContactListPage.jsx';
import EditContactPage from './components/EditContactPage.jsx';
import ContactDetailsPage from './components/ContactDetailsPage.jsx';
import Sidebar from './components/SideBar';
import SettingsPage from './components/SettingsPage.jsx';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  useEffect(() => {
    if (location.pathname === '/') {
      return;
    }

    const publicRoutes = ['/signin', '/signup'];

    if (isAuthenticated()) {
      if (publicRoutes.includes(location.pathname)) {
        navigate('/contacts');
      }
    } else {
      if (!publicRoutes.includes(location.pathname)) {
        navigate('/signin');
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className="App">
      {isAuthenticated() && <Sidebar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/signin" element={<LoginPage />} />
        {isAuthenticated() && (
          <>
            <Route path="/create-contact" element={<CreateContactPage />} />
            <Route path="/contacts" element={<ContactsListPage />} />
            <Route path="/contacts/:id" element={<ContactDetailsPage />} />
            <Route path="/edit-contact/:id" element={<EditContactPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;