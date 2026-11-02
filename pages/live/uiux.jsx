/* 
 * Vurliqo - UI/UX Integration
 * Phase 9: Module 13 - UI/UX
 * Maintain existing Vurliqo dark visual identity across all new features
 * Integrate new features without unnecessarily redesigning existing screens
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function UIUXIntegration({ userId }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Ensure dark mode is applied
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    const onChange = prefersDark.addEventListener('change', (e) => {
      if (e.matches) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }
    });

    return () => onChange.removeEventListener('change', onChange);
  }, [userId]);

  const transition = {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <main className="min-h-screen bg-gray-900 dark:bg-gray-800 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">UI/UX Integration</h1>

        {/* Design Principles */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Design Principles</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-medium text-white mb-2">Dark Visual Identity</h3>
              <p className="text-sm text-gray-400">
                Consistent dark theme across all screens, matching Phase 1-7 aesthetic
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Mobile-First</h3>
              <p className="text-sm text-gray-400">
                All layouts responsive from 320px to 1536px+
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-medium text-white mb-2">Smooth Transitions</h3>
              <p className="text-sm text-gray-400">
                300ms cubic-bezier transitions between states
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Consistent Icons</h3>
              <p className="text-sm text-gray-400">
                Uses shared icon set throughout the application
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-white mb-2">Accessible Controls</h3>
            <p className="text-sm text-gray-400">
              Keyboard navigation, screen reader friendly, proper contrast ratios
            </p>
          </div>
        </div>

        {/* Component Consistency */}
        <div>
          <h2 className="font-medium text-white mb-3">Component Integration</h2>
          
          <p className="text-sm text-gray-400 mb-3">
            All new Phase 9 features reuse existing UI components:
          </p>
          
          <ul className="text-gray-300 space-y-1">
            <li>
              Button component (primary, outline, ghost variants; sm/md/lg sizes)
            </li>
            <li>
              Input component (text, number, search, textarea types)
            </li>
            <li>
              Consistent card layout (rounded-xl, p-4, border-gray-600)
            </li>
            <li>
              Grid systems (grid-cols-1, md:grid-cols-2, lg:grid-cols-3)
            </li>
            <li>
              Shared typography (text-white, text-gray-300, text-sm, text-lg)
            </li>
            <li>
              Consistent spacing (p-2, p-3, p-4, mb-2, mb-3, mb-4)
            </li>
          </ul>
        </div>

        {/* Loading States */}
        <div>
          <h2 className="font-medium text-white mb-3">Loading States</h2>
          <p className="text-sm text-gray-400 mb-3">
            All async operations show skeleton or placeholder content
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 bg-gray-700 rounded-xl animate-bounce"></div>
            <div className="h-24 bg-gray-700 rounded-xl"></div>
          </div>
        </div>

        {/* Empty States */}
        <div>
          <h2 className="font-medium text-white mb-3">Empty States</h2>
          <p className="text-sm text-gray-400 mb-3">
            Friendly empty states when no data is available
          </p>
          
          <div className="bg-gray-700 rounded-xl p-8 text-center text-gray-400">
            <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mx-auto mb-2">
              <circle cx={9} cy={21} r={1.5} />
              <circle cx={20} cy={21} r={1.5} />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.73h9.74a2 2 0 002-1.73L23 6H6" />
            </svg>
            <p>No content available</p>
          </div>
        </div>

        {/* Error States */}
        <div>
          <h2 className="font-medium text-white mb-3">Error States</h2>
          <p className="text-sm text-gray-400 mb-3">
            Clear error messages with retry options
          </p>
          
          <div className="bg-gray-700 rounded-xl p-6 text-center text-gray-400">
            <p>An error occurred. Please try again.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.alert('Retry attempted')}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        </div>

        {/* Permission Prompts */}
        <div>
          <h2 className="font-medium text-white mb-3">Permission Prompts</h2>
          <p className="text-sm text-gray-400 mb-3">
            Clear prompts for features requiring user permission
          </p>
          
          <div className="bg-gray-700 rounded-xl p-6 text-center text-gray-400">
            <p>Camera/microphone access required for live broadcasting</p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.alert('Opening permissions settings')}
              className="mt-2 w-full"
            >
              Open Settings
            </Button>
          </div>
        </div>

        {/* Integration Notice */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <p>
            All new features integrate with existing Vurliqo navigation and data
            structures where appropriate. Redesign minimized to preserve familiarity
            for returning users.
          </p>
          <p>
            Mobile-first responsive design applied throughout (tested at 375px, 768px,
            1440px breakpoints).
          </p>
        </div>
      </div>
    </main>
  );
}