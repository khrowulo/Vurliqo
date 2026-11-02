/*
 * Vurliqo - Notifications Settings
 * Phase 4: Notification preferences and management
 */

import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function NotificationsSettings() {
  const [preferences, setPreferences] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
    story_interactions: true,
    reel_interactions: true,
    mention: true,
    tag: true,
    new_followers: true,
    follow_requests: true,
    group_invitations: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a full implementation, would fetch preferences from backend
    setIsLoading(false);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // In full implementation, would save preferences to backend
    setIsLoading(false);
    alert('Preferences saved!');
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <Image
            src="/vurliqo-logo.svg"
            alt="Vurliqo"
            width={60}
            height={60}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500">Manage your notification preferences</p>
        </div>

        {isLoading ? (
          <div className="min-h-[400px] flex justify-center items-center text-gray-500">Loading...</div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <h2 className="font-medium text-white mb-2">Main Categories</h2>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.likes}
                    onChange={(e) => setPreferences({ ...preferences, likes: e.target.checked })}
                    className="rounded border-gray-600 focus:ring-primary-500"
                  />
                  Likes
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.comments}
                    onChange={(e) => setPreferences({ ...preferences, comments: e.target.checked })}
                    className="rounded border-gray-600 focus:ring-primary-500"
                  />
                  Comments
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.follows}
                    onChange={(e) => setPreferences({ ...preferences, follows: e.target.checked })}
                    className="rounded border-gray-600 focus:ring-primary-500"
                  />
                  Follows
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.messages}
                    onChange={(e) => setPreferences({ ...preferences, messages: e.target.checked })}
                    className="rounded border-gray-600 focus:ring-primary-500"
                  />
                  Messages
                </label>
              </div>
            </div>

            <div>
              <h2 className="font-medium text-white mb-2">Interaction Notifications</h2>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.story_interactions}
                    onChange={(e) => setPreferences({ ...preferences, story_interactions: e.target.checked })}
                    className="rounded border-gray-600 focus:ring-primary-500"
                  />
                  Story Interactions
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.reel_interactions}
                    onChange={(e) => setPreferences({ ...preferences, reel_interactions: e.target.checked })}
                    className="rounded border-gray-600 focus:ring-primary-500"
                  />
                  Reel Interactions
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.mention}
                    onChange={(e) => setPreferences({ ...preferences, mention: e.target.checked })}
                    className="rounded border-gray-600 focus:ring-primary-500"
                  />
                  Mentions
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.tag}
                    onChange={(e) => setPreferences({ ...preferences, tag: e.target.checked })}
                    className="rounded border-gray-600 focus:ring-primary-500"
                  />
                  Tags
                </label>
              </div>
            </div>

            <div>
              <h2 className="font-medium text-white mb-2">Account Updates</h2>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.new_followers}
                    onChange={(e) => setPreferences({ ...preferences, new_followers: e.target.checked })}
                    className="rounded border-gray-600 focus:ring-primary-500"
                  />
                  New Followers
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.follow_requests}
                    onChange={(e) => setPreferences({ ...preferences, follow_requests: e.target.checked })}
                    className="rounded border-gray-600 focus:ring-primary-500"
                  />
                  Follow Requests
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.group_invitations}
                    onChange={(e) => setPreferences({ ...preferences, group_invitations: e.target.checked })}
                    className="rounded border-gray-600 focus:ring-primary-500"
                  />
                  Group Invitations
                </label>
              </div>
            </div>

            <div>
              <h2 className="font-medium text-white mb-2">Additional Settings</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => {}}
                    disabled
                    className="rounded border-gray-600 focus:ring-primary-500 cursor-not-allowed"
                  />
                  Read receipts
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => {}}
                    disabled
                    className="rounded border-gray-600 focus:ring-primary-500 cursor-not-allowed"
                  />
                  Typing indicators
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => {}}
                    disabled
                    className="rounded border-gray-600 focus:ring-primary-500 cursor-not-allowed"
                  />
                  Online status
                </label>
              </div>
            </div>

            <div>
              <Button
                variant="primary"
                type="submit"
              >
                Save Preferences
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}