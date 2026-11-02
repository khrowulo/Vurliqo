/* 
 * Vurliqo - Settings
 * Phase 6: Settings dashboard with navigation
 */

import { useState } from 'react';
import { Link, useRouter } from 'next/link';
import { Button } from "../../components/ui/button";

export default function Settings() {
  const router = useRouter();
  const [section, setSection] = useState('profile');

  const navigateTo = (section) => {
    setSection(section);
    router.push(`/settings/${section}`);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage your Vurliqo account</p>
        </div>

        {/* Navigation */}
        <nav className="bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-700 mb-8">
          <h2 className="font-medium text-white mb-3">Account</h2>
          <div className="space-y-1">
            <Link
              href="/settings/account-types"
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                section === 'account-types' ? 'text-white bg-primary-600' : 'text-gray-300 hover:text-white transition-colors'
              }`}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              Account Types
            </Link>
            <Link
              href="/settings/privacy"
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                section === 'privacy' ? 'text-white bg-primary-600' : 'text-gray-300 hover:text-white transition-colors'
              }`}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-2">
                <path d="M12 22 s8-5 8-10V5l-8-3-8 3v8c0 3 8 5 8 10z" />
                <path d="M12 4a16 16 0 1 0 16 16A16.031 16.031 0 0 0 12 4z" />
              </svg>
              Privacy
            </Link>
            <Link
              href="/settings/security"
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                section === 'security' ? 'text-white bg-primary-600' : 'text-gray-300 hover:text-white transition-colors'
              }`}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              Security
            </Link>
          </div>

          <h2 className="font-medium text-white mt-6 mb-3">Privacy & Security</h2>
          <div className="space-y-1">
            <Link
              href="/settings/notifications-preferences"
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                section === 'notifications-preferences' ? 'text-white bg-primary-600' : 'text-gray-300 hover:text-white transition-colors'
              }`}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-2">
                <path d="M12 22 s8-5 8-10V5l-8-3-8 3v8c0 3 8 5 8 10z" />
                <path d="M12 4a16 16 0 1 0 16 16A16.031 16.031 0 0 0 12 4z" />
              </svg>
              Notification Preferences
            </Link>
            <Link
              href="/settings/content-management"
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                section === 'content-management' ? 'text-white bg-primary-600' : 'text-gray-300 hover:text-white transition-colors'
              }`}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              Content & Data
            </Link>
          </div>
        </nav>

        {/* Section Content */}
        <div className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700">
          {section === 'account-types' && <Button href="/settings/account-types" className="w-full">Account Types Page</Button>}
          {section === 'privacy' && <Button href="/settings/privacy" className="w-full">Privacy Settings Page</Button>}
          {section === 'security' && <Button href="/settings/security" className="w-full">Security Settings Page</Button>}
          {section === 'notifications-preferences' && <Button href="/settings/notifications-preferences" className="w-full">Notification Preferences Page</Button>}
          {section === 'content-management' && <Button href="/settings/content-management" className="w-full">Content Management Page</Button>}
        </div>
      </div>
    </main>
  );
}