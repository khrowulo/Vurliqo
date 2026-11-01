/* 
 * Vurliqo - Platform Configuration
 * Phase 8: Secure platform settings dashboard
 * Do not expose secrets or sensitive backend configuration in the frontend
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

export default function PlatformConfiguration({ userId, role }) {
  const [platformSettings, setPlatformSettings] = useState({
    communityGuidelines: 'Vurliqo community guidelines...',
    contentPolicy: 'Content policy configuration...',
    reportCategories: 'Spam, Harassment, Impersonation, Fraud, Inappropriate, IP concerns, Other',
    registrationSettings: 'Standard registration process',
    verificationConfiguration: 'Email verification required',
    notificationDefaults: 'Standard notification preferences',
    maintenanceMode: false,
    platformAnnouncements: '',
    supportSettings: 'Standard support configuration',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch platform settings from Lovable Cloud backend
    // Would only show to super-admin
    setPlatformSettings({
      communityGuidelines: 'Vurliqo community guidelines. Be respectful, no spam, no harassment, protect intellectual property.',
      contentPolicy: 'Content must comply with applicable laws and Vurliqo policies. No illegal content, no extremist material, no explicit content.',
      reportCategories: 'Spam, Harassment, Impersonation, Fraud, Inappropriate content, Intellectual property concerns, Other',
      registrationSettings: 'Email verification required during sign-up',
      verificationConfiguration: 'Email verification required for account activation',
      notificationDefaults: 'New followers, likes, comments, mentions, follows requests',
      maintenanceMode: false,
      platformAnnouncements: '',
      supportSettings: 'Standard support ticket configuration',
    });
    setIsLoading(false);
  }, [userId, role]);

  // Only super-admin can access platform configuration
  const isSuperAdmin = role === 'super-admin';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Button variant="outline" size="sm" onClick={() => window.alert('Loading...')}>
            Loading...
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Platform Configuration</h1>

        {!isSuperAdmin && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Super Administrator privileges required</p>
          </div>
        )}

        {isSuperAdmin && (
          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Community Guidelines */}
            <div>
              <h2 className="font-medium text-white mb-3">Community Guidelines</h2>
              <p className="text-sm text-gray-400 mb-3">Guidelines displayed to all users</p>
              <Input
                type="text"
                value={platformSettings.communityGuidelines}
                onChange={(e) => setPlatformSettings({ ...platformSettings, communityGuidelines: e.target.value })}
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-32"
              />
            </div>

            {/* Content Policy */}
            <div>
              <h2 className="font-medium text-white mb-3">Content Policy</h2>
              <p className="text-sm text-gray-400 mb-3">Content policy rules</p>
              <Input
                type="text"
                value={platformSettings.contentPolicy}
                onChange={(e) => setPlatformSettings({ ...platformSettings, contentPolicy: e.target.value })}
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-40"
              />
            </div>

            {/* Report Categories */}
            <div>
              <h2 className="font-medium text-white mb-3">Report Categories</h2>
              <p className="text-sm text-gray-400 mb-3">Categories available for reports</p>
              <Input
                type="text"
                value={platformSettings.reportCategories}
                onChange={(e) => setPlatformSettings({ ...platformSettings, reportCategories: e.target.value })}
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-24"
              />
            </div>

            {/* Registration Settings */}
            <div>
              <h2 className="font-medium text-white mb-3">Registration Settings</h2>
              <p className="text-sm text-gray-400 mb-3">User registration configuration</p>
              <Input
                type="text"
                value={platformSettings.registrationSettings}
                onChange={(e) => setPlatformSettings({ ...platformSettings, registrationSettings: e.target.value })}
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Verification Configuration */}
            <div>
              <h2 className="font-medium text-white mb-3">Verification Configuration</h2>
              <p className="text-sm text-gray-400 mb-3">Account verification settings</p>
              <Input
                type="text"
                value={platformSettings.verificationConfiguration}
                onChange={(e) => setPlatformSettings({ ...platformSettings, verificationConfiguration: e.target.value })}
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Notification Defaults */}
            <div>
              <h2 className="font-medium text-white mb-3">Notification Defaults</h2>
              <p className="text-sm text-gray-400 mb-3">Default notification preferences</p>
              <Input
                type="text"
                value={platformSettings.notificationDefaults}
                onChange={(e) => setPlatformSettings({ ...platformSettings, notificationDefaults: e.target.value })}
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Maintenance Mode */}
            <div>
              <h2 className="font-medium text-white mb-3">Maintenance Mode</h2>
              <p className="text-sm text-gray-400 mb-3">Toggle maintenance mode</p>
              <Button
                variant={platformSettings.maintenanceMode ? "destructive" : "outline"}
                size="sm"
                onClick={() => setPlatformSettings({ ...platformSettings, maintenanceMode: !platformSettings.maintenanceMode })}
                className="w-full justify-center"
              >
                {platformSettings.maintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
              </Button>
            </div>

            {/* Platform Announcements */}
            <div>
              <h2 className="font-medium text-white mb-3">Platform Announcements</h2>
              <p className="text-sm text-gray-400 mb-3">Announcements displayed to all users</p>
              <Input
                type="text"
                value={platformSettings.platformAnnouncements}
                onChange={(e) => setPlatformSettings({ ...platformSettings, platformAnnouncements: e.target.value })}
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-32"
              />
            </div>

            {/* Support Settings */}
            <div>
              <h2 className="font-medium text-white mb-3">Support Settings</h2>
              <p className="text-sm text-gray-400 mb-3">Support configuration</p>
              <Input
                type="text"
                value={platformSettings.supportSettings}
                onChange={(e) => setPlatformSettings({ ...platformSettings, supportSettings: e.target.value })}
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Warning */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-red-400">
            <h2 className="font-medium text-white mb-3">Security Warning</h2>
            <p className="text-sm text-red-400 mb-2">
              Do not expose secrets or sensitive backend configuration in the frontend
            </p>
            <p className="text-xs text-gray-400">
              All sensitive configuration must be managed through secure server-side processes
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}