import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const mobileDropdownRef = useRef(null);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileNav = () => {
    setIsMobileActive(!isMobileActive);
  };

  const handleNavigation = (path) => {
    setIsVisible(false);
    setIsMobileActive(false);
    setTimeout(() => {
      navigate(path);
      setIsVisible(true);
    }, 300);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    handleNavigation('/');
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileActive(false);
      }
    };

    const handleClickOutside = (event) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileActive(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isHomePage = location.pathname === '/';
  const hideSidebar = ['/', '/signin', '', '/signup', '/contactUs'].includes(location.pathname);

  if (hideSidebar) {
    return null;
  }

  const renderUserSidebar = () => (
    <>
      <li>
        <Link onClick={() => handleNavigation('/contacts')} className={location.pathname === '/contacts' ? 'active' : ''}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M3 3h18v2H3V3zm2 14h10v-2H5v2zm10-7H5v2h10v-2zm-5-7v2h10V3H10zm2 18h10v-2H12v2z" />
          </svg>
          <span>Contacts</span>
        </Link>
      </li>
      <li>
        <Link onClick={() => handleNavigation('/create-contact')} className={location.pathname === '/create-contact' ? 'active' : ''}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 2l-5.5 9h11L12 2zm0 20l-5.5-9h11L12 22z" />
          </svg>
          <span>Add Contact</span>
        </Link>
      </li>
      <li>
        <Link onClick={() => handleNavigation('/settings')} className={location.pathname === '/settings' ? 'active' : ''}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.6c.18-.14.22-.39.12-.59l-1.92-3.32c-.1-.18-.33-.25-.52-.19l-2.39.96c-.5-.38-1.05-.7-1.66-.93L14.5 2.9c-.03-.19-.19-.34-.38-.34h-4.24c-.19 0-.35.15-.38.34L8.17 6.19c-.61.23-1.16.54-1.66.93l-2.39-.96c-.19-.08-.42.01-.52.19l-1.92 3.32c-.1.18-.06.44.12.59l2.03 1.6c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.6c-.18.14-.22.39-.12.59l1.92 3.32c.1.18.33.25.52.19l2.39-.96c.5.38 1.05.7 1.66.93l.63 2.68c.03.19.19.34.38.34h4.24c.19 0 .35-.15.38-.34l.63-2.68c.61-.23 1.16-.54 1.66-.93l2.39.96c.19.08.42-.01.52-.19l1.92-3.32c.1-.18.06-.44-.12-.59l-2.03-1.6zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
          </svg>
          <span>Settings</span>
        </Link>
      </li>
      <li>
        <button onClick={handleLogout}>
          <span>Logout</span>
        </button>
      </li>
    </>
  );

  return (
    <>
      <div className={`sidebar-container ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="mobile-nav">
          <div onClick={() => handleNavigation('/')} className="cursor-pointer text-xl font-bold text-indigo-800 mb-2">Hux</div>
          <button className="hamburger-icon" onClick={toggleMobileNav}>
            ☰
          </button>
        </div>
        <ul ref={mobileDropdownRef} className={`mobile-dropdown ${isMobileActive ? 'active' : ''}`}>
          {isHomePage ? (
            <>
              <li>
                <Link onClick={() => handleNavigation('/signin')}>
                  <span>Online Banking</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => handleNavigation('/contactUs')}>
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => handleNavigation('/signin')}>
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => handleNavigation('/signup')}>
                  <span>Sign Up</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link onClick={() => handleNavigation('/contacts')} className={location.pathname === '/contacts' ? 'active' : ''}>
                  <span>Contacts</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => handleNavigation('/create-contact')} className={location.pathname === '/create-contact' ? 'active' : ''}>
                  <span>Add Contact</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => handleNavigation('/settings')} className={location.pathname === '/settings' ? 'active' : ''}>
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
          <div onClick={() => handleNavigation('/')} className="cursor-pointer text-xl font-bold text-indigo-800 mb-2">Hux</div>
          <button className="collapse-toggle mb-2 cursor-pointer" onClick={toggleCollapse}>
            {isCollapsed ? '▶' : '◀'}
          </button>
          <ul className="sidebar-menu">
            {renderUserSidebar()}
          </ul>
        </div>
      </div>
      {showLogoutConfirm && (
        <div className="logout-confirmation">
          <p>Are you sure you want to logout?</p>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={cancelLogout}>No</button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
