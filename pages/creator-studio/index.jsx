/* 
 * Vurliqo - Creator Studio
 * Phase 7: Creator Studio dashboard
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function CreatorStudio({ userId }) {
  const [creatorOverview, setCreatorOverview] = useState({
    totalFollowers: 0,
    totalFollowing: 0,
    totalPosts: 0,
    totalReels: 0,
    totalStories: 0,
    joinedDate: new Date(),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch creator data from Lovable Cloud backend
    setCreatorOverview({
      totalFollowers: 1247,
      totalFollowing: 342,
      totalPosts: 87,
      totalReels: 23,
      totalStories: 15,
      joinedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    });
    setIsLoading(false);
  }, [userId]);

  const sections = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'content', label: 'Content', icon: '📝' },
    { key: 'analytics', label: 'Analytics', icon: '📈' },
    { key: 'monetization', label: 'Monetization', icon: '$' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Creator Studio</h1>

        {/* Navigation */}
        <nav className="bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-700 mb-8">
          <div className="flex gap-2 mb-4">
            {sections.map((section) => (
              <Button
                key={section.key}
                variant="outline"
                size="sm"
                onClick={() => window.alert(`Navigate to ${section.label}`)}
                className={`flex-1 ${section.key === 'overview' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:text-white transition-colors'}`}
              >
                {section.icon} {section.label}
              </Button>
            ))}
          </div>

          <h2 className="font-medium text-white mb-3">Sections</h2>
          <div className="space-y-1 text-xs text-gray-400">
            <p>Overview</p>
            <p>Content Management</p>
            <p>Analytics</p>
            <p>Monetization</p>
            <p>Settings</p>
          </div>
        </nav>

        {/* Section Content */}
        <div className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700">
          {isLoading && (
            <div className="min-h-[400px] flex items-center justify-center">
              <p className="text-gray-400">Loading creator data...</p>
            </div>
          )}
          {!isLoading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Creator Metrics Cards */}
              <div>
                <h2 className="font-medium text-white mb-4">Overview</h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-gray-700">
                    <p className="text-sm text-gray-400">Followers</p>
                    <p className="text-3xl font-bold text-white">{creatorOverview.totalFollowers}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-700">
                    <p className="text-sm text-gray-400">Following</p>
                    <p className="text-3xl font-bold text-white">{creatorOverview.totalFollowing}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-700">
                    <p className="text-sm text-gray-400">Posts</p>
                    <p className="text-3xl font-bold text-white">{creatorOverview.totalPosts}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-700">
                    <p className="text-sm text-gray-400">Reels</p>
                    <p className="text-3xl font-bold text-white">{creatorOverview.totalReels}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-700">
                    <p className="text-sm text-gray-400">Stories</p>
                    <p className="text-3xl font-bold text-white">{creatorOverview.totalStories}</p>
                  </div>
                </div>
              </div>

              {/* Creator Stats Timeline */}
              <div>
                <h2 className="font-medium text-white mb-4">Content Performance</h2>
                <p className="text-sm text-gray-400 mb-3">Recent activity and performance metrics</p>
                <div className="h-64 bg-gray-700 rounded-2xl p-4">
                  <p className="text-gray-400/50">Performance charts and graphs will appear here</p>
                </div>
              </div>
            </div>
          )}

          {/* Monetization Section */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h2 className="font-medium text-white mb-3">Monetization Dashboard</h2>
            <p className="text-gray-400 text-sm mb-4">
              Eligible creator accounts can access monetization features
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.alert('View monetization options')}
            >
              View Monetization Options
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}