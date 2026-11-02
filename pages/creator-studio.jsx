/* 
 * Vurliqo - Creator Studio Main
 * Phase 7: Creator Studio dashboard with section navigation
 */

import { useState, useEffect } from 'react';
import { Link, useRouter } from 'next/link';
import { Button } from "../components/ui/button";

export default function CreatorStudioMain({ userId }) {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState('overview');

  const navigateTo = (section) => {
    setCurrentSection(section);
    router.push(`/creator-studio/${section}`);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-white">Creator Studio</h1>
          <p className="text-gray-400">Manage your creator account</p>
        </header>

        {/* Navigation */}
        <nav className="bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-700 mb-8">
          <div className="flex gap-2 mb-4">
            <Link
              href="/creator-studio/overview"
              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                currentSection === 'overview' ? 'text-white bg-primary-600' : 'text-gray-300 hover:text-white transition-colors'
              }`}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-1">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              Overview
            </Link>
            <Link
              href="/creator-studio/content"
              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                currentSection === 'content' ? 'text-white bg-primary-600' : 'text-gray-300 hover:text-white transition-colors'
              }`}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-1">
                <path d="M12 3v4m0 12v4M4.93 4.93l2.83 2.83a1 1 0 0 1 0 1.42l-2.83 2.83a1 1 0 0 1-1.42 0L2 7v2m6-4h.01M9 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m6 4v.01M3 7v10c2-2 5-2 7-2s5 2 7 2v-2m-5-5h.01M13 7v10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2m-6-4h.01" />
              </svg>
              Content
            </Link>
            <Link
              href="/creator-studio/analytics"
              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                currentSection === 'analytics' ? 'text-white bg-primary-600' : 'text-gray-300 hover:text-white transition-colors'
              }`}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-1">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 22 s8-5 8-10V5l-8-3-8 3v8c0 3 8 5 8 10z" />
                <path d="M12 4a16 16 0 1 0 16 16A16.031 16.031 0 0 0 12 4z" />
              </svg>
              Analytics
            </Link>
            <Link
              href="/creator-studio/monetization"
              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                currentSection === 'monetization' ? 'text-white bg-primary-600' : 'text-gray-300 hover:text-white transition-colors'
              }`}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-1">
                <path d="M12 2v2m0 10.5a2.5 2.5 0 1 0 0-5M2.5 12l5.66-3.43a1.11 1.11 0 0 1 1.06 1.26l-.72 4.42a1.11 1.11 0 0 1-1.98 0l-.72-4.41a1.11 1.11 0 0 1 1.06-1.22l5.66 3.43z" />
              </svg>
              Monetization
            </link>
            <Link
              href="/creator-studio/settings"
              className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                currentSection === 'settings' ? 'text-white bg-primary-600' : 'text-gray-300 hover:text-white transition-colors'
              }`}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-1">
                <circle cx="12" cy="12" r="10" />
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                <path d="M3 2v1l6.12 5.88.76-.22a1 1 0 0 1 1.46 0l.74.22 6.5-6.51a1.5 1.5 0 0 1 1.8 0l.73.21 6.5 6.51a1 1 0 0 1-.18 1.46l-.22.74-6.5 6.51a1 1 0 0 1-1.45-.18l-.22-.74L3 22V2z" />
              </svg>
              Settings
            </Link>
          </div>

          <h2 className="font-medium text-white mt-4 mb-2">Creator Tools</h2>
          <div className="text-xs text-gray-400">
            <p>Account insights</p>
            <p>Content settings</p>
            <p>Notification preferences</p>
          </div>
        </nav>

        {/* Section Content */}
        <section className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700">
          {currentSection === 'overview' && (
            <CreatorStudioOverview navigateTo={navigateTo} userId={userId} />
          )}
          {currentSection === 'content' && (
            <CreatorStudioContent navigateTo={navigateTo} userId={userId} />
          )}
          {currentSection === 'analytics' && (
            <AdvancedAnalytics userId={userId} />
          )}
          {currentSection === 'monetization' && (
            <MonetizationDashboard userId={userId} />
          )}
          {currentSection === 'settings' && (
            <Button href="/settings" className="w-full">Go to Settings</Button>
          )}
        </section>
      </div>
    </main>
  );
}

/* Creator Studio Overview Component */
function CreatorStudioOverview({ navigateTo, userId }) {
  return (
    <div>
      <h2 className="font-medium text-white mb-3">Creator Overview</h2>
      <p className="text-sm text-gray-400 mb-4">
        Manage your creator account and view performance metrics
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateTo('content')}
        className="mb-2 w-full justify-center"
      >
        Go to Content Management
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateTo('analytics')}
        className="mb-2 w-full justify-center"
      >
        View Analytics
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateTo('monetization')}
        className="mb-2 w-full justify-center"
      >
        Monetization Dashboard
      </Button>
    </div>
  );
}

/* Creator Studio Content Component */
function CreatorStudioContent({ navigateTo, userId }) {
  return (
    <div>
      <h2 className="font-medium text-white mb-3">Content Management</h2>
      <p className="text-sm text-gray-400 mb-4">
        Manage your posts, reels, and stories
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateTo('overview')}
        className="mb-2 w-full justify-center"
      >
        Back to Overview
      </Button>
    </div>
  );
}