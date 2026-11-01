/* 
 * Vurliqo - Admin Panel Main
 * Phase 8: Admin panel with role-based navigation
 * Regular users must never see administrative navigation
 */

import { useState, useEffect } from 'react';
import { Link, useRouter } from 'next/link';
import { Button } from '../components/ui/button';

export default function AdminPanel({ userId, role }) {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState('dashboard');

  const adminRoles = ['super-admin', 'admin', 'moderator'];
  const hasAdminAccess = adminRoles.includes(role);

  const sections = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'users', label: 'Users', icon: '👥' },
    { key: 'moderation', label: 'Moderation', icon: '🔨' },
    { key: 'reports', label: 'Reports', icon: '📋' },
    { key: 'audit', label: 'Audit Logs', icon: '📝' },
    { key: 'platform', label: 'Platform', icon: '⚙️' },
    { key: 'verification', label: 'Verification', icon: '✓' },
    { key: 'security', label: 'Security', icon: '🔒' },
    { key: 'support', label: 'Support', icon: '🎫' },
  ];

  const navigateTo = (section) => {
    setCurrentSection(section);
    router.push(`/admin/${section}`);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400">Vurliqo administration</p>
        </header>

        {/* Navigation - Only shown to admins */}
        {!hasAdminAccess && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Administrative privileges required</p>
          </div>
        )}

        {hasAdminAccess && (
          <nav className="bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-700 mb-8">
            <div className="flex gap-2 mb-4">
              {sections.map((section) => (
                <Link
                  key={section.key}
                  href={`/admin/${section.key}`}
                  className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                    currentSection === section.key
                      ? 'text-white bg-primary-600'
                      : 'text-gray-300 hover:text-white transition-colors'
                  }`}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mr-1">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  </svg>
                  {section.label}
                </Link>
              ))}
            </div>

            <h2 className="font-medium text-white mt-4 mb-2">Admin Tools</h2>
            <div className="text-xs text-gray-400">
              {sections.map((section) => (
                <p key={section.key}>{section.label}</p>
              ))}
            </div>
          </nav>
        )}

        {/* Section Content */}
        <section className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700">
          {currentSection === 'dashboard' && (
            <AdminDashboard userId={userId} role={role} navigateTo={navigateTo} />
          )}
          {currentSection === 'users' && (
            <UserManagement userId={userId} role={role} navigateTo={navigateTo} />
          )}
          {currentSection === 'moderation' && (
            <ContentModeration userId={userId} role={role} navigateTo={navigateTo} />
          )}
          {currentSection === 'reports' && (
            <ReportingSystem userId={userId} />
          )}
          {currentSection === 'audit' && (
            <AuditLogs userId={userId} role={role} />
          )}
          {currentSection === 'platform' && (
            <PlatformConfiguration userId={userId} role={role} />
          )}
          {currentSection === 'verification' && (
            <VerifiedAccountManagement userId={userId} role={role} />
          )}
          {currentSection === 'security' && (
            <SecurityMonitoring userId={userId} role={role} />
          )}
          {currentSection === 'support' && (
            <SupportManagement userId={userId} role={role} />
          )}
        </section>
      </div>
    </main>
  );
}