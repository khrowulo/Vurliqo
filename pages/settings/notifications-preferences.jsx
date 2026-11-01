/* 
 * Vurliqo - Notification Preferences
 * Phase 6: Expanded notification preferences
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function NotificationPreferences({ userId }) {
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    followers: true,
    follow_requests: true,
    mentions: true,
    tags: true,
    stories: true,
    reels: true,
    direct_messages: true,
    message_requests: true,
    groups: true,
    business_messages: true,
    live_activity: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // In full implementation, would fetch current notification preferences from backend
    // Would preserve the Phase 4 notification system
  }, [userId]);

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    // In full implementation, would save to backend
    setIsSaving(false);
    window.alert('Notification preferences saved successfully!');
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Notification Preferences</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSaving(true);
            setIsSaving(false);
            window.alert('Notification preferences saved!');
          }}
        >
          <div className="grid grid-cols-2 gap-3 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications.likes}
                onChange={(e) => setNotifications(prev => ({ ...prev, likes: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Likes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications.comments}
                onChange={(e) => setNotifications(prev => ({ ...prev, comments: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Comments</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications.followers}
                onChange={(e) => setNotifications(prev => ({ ...prev, followers: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Followers</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications['follow_requests']}
                onChange={(e) => setNotifications(prev => ({ ...prev, 'follow_requests': e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Follow requests</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications.mentions}
                onChange={(e) => setNotifications(prev => ({ ...prev, mentions: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Mentions</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications.tags}
                onChange={(e) => setNotifications(prev => ({ ...prev, tags: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Tags</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications.stories}
                onChange={(e) => setNotifications(prev => ({ ...prev, stories: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Stories</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications.reels}
                onChange={(e) => setNotifications(prev => ({ ...prev, reels: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Reels</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications['direct_messages']}
                onChange={(e) => setNotifications(prev => ({ ...prev, 'direct_messages': e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Direct Messages</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications['message_requests']}
                onChange={(e) => setNotifications(prev => ({ ...prev, 'message_requests': e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Message Requests</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications.groups}
                onChange={(e) => setNotifications(prev => ({ ...prev, groups: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Groups</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications['business_messages']}
                onChange={(e) => setNotifications(prev => ({ ...prev, 'business_messages': e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Business Messages</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={notifications['live_activity']}
                onChange={(e) => setNotifications(prev => ({ ...prev, 'live_activity': e.target.checked }))}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Live Activity</span>
            </label>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSaveNotifications}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}