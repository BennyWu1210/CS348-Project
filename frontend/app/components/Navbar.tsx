'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaMusic } from 'react-icons/fa';
import { useEffect } from 'react';
import { useAuth, AUTH_STATE_CHANGE_EVENT } from '../../lib/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  // Listen for auth state changes
  useEffect(() => {
    const handleAuthChange = () => {
      // Just force a re-render by updating state if needed, but do not call refreshUser
    };
    window.addEventListener(AUTH_STATE_CHANGE_EVENT, handleAuthChange);
    return () => {
      window.removeEventListener(AUTH_STATE_CHANGE_EVENT, handleAuthChange);
    };
  }, []);

  const handleLogout = async () => {
    await logout(router);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-full mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <FaMusic className="text-2xl text-indigo-500" />
            <span className="text-xl font-semibold text-gray-800">Music App</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/songs" className="text-gray-600 hover:text-indigo-500 transition-colors">
              Browse Songs
            </Link>
            <Link href="/playlists" className="text-gray-600 hover:text-indigo-500 transition-colors">
              Playlists
            </Link>
            <Link href="/match" className="text-gray-600 hover:text-indigo-500 transition-colors">
              Find a Match
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-full"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-gray-600 hover:text-indigo-500 transition-colors">Welcome, {user.username}</Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-indigo-500 hover:text-indigo-600 px-4 py-2 rounded-full border border-indigo-100 
                           hover:border-indigo-200 transition-colors text-sm font-medium"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/signin"
                  className="text-gray-600 hover:text-indigo-500 transition-colors text-sm font-medium"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded-full 
                           transition-colors text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 