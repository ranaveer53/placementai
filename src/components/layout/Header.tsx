'use client';

import React from 'react';
import Link from 'next/link';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { Sun, Moon, LogOut, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();

  return (
    <header className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} border-b border-gray-200 dark:border-gray-800`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          PlacementAI
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user && (
            <>
              <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400">
                {user.full_name}
              </span>
              <button
                onClick={logout}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          )}

          {onMenuClick && (
            <button onClick={onMenuClick} className="p-2 md:hidden" aria-label="Toggle menu">
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
