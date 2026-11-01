/* 
 * Vurliqo - Privacy Settings
 * Phase 6: Comprehensive privacy dashboard
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function PrivacySettings({ userId }) {
  const [isPublic, setIsPublic] = useState(true);
  const [followRequestControls, setFollowRequestControls] = useState('allow');
  const [whoCanComment, setWhoCanComment] = useState('everyone');
  const [whoCanMention, setWhoCanMention] = useState('everyone');
  const [whoCanTag, setWhoCanTag] = useState('everyone');
  const [whoCanReplyToStories, setWhoCanReplyToStories] = useState('followers');
  const [whoCanMessage, setWhoCanMessage] = useState('everyone');
  const [whoCanShare, setWhoCanShare] = useState('everyone');
  const [onlineStatusVisible, setOnlineStatusVisible] = useState(true);
  const [readReceipts, setReadReceipts] = useState(false);
  const [activityVisible, setActivityVisible] = useState(true);
  const [likeVisible, setLikeVisible] = useState(true);
  const [hideStoriesFrom, setHideStoriesFrom] = useState([]);
  const [storyReplyPermissions, setStoryReplyPermissions] = useState('everyone');
  const [taggedContentApproval, setTaggedContentApproval] = useState('off');
  const [manualTagApproval, setManualTagApproval] = useState('off');
  const [locationSharing, setLocationSharing] = useState('on');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // In full implementation, would fetch current privacy settings from backend
    setIsPublic(true);
    setFollowRequestControls('allow');
    setWhoCanComment('everyone');
    setWhoCanMention('everyone');
    setWhoCanTag('everyone');
    setWhoCanReplyToStories('followers');
    setWhoCanMessage('everyone');
    setWhoCanShare('everyone');
    setOnlineStatusVisible(true);
    setReadReceipts(false);
    setActivityVisible(true);
    setLikeVisible(true);
    setHideStoriesFrom([]);
    setStoryReplyPermissions('everyone');
    setTaggedContentApproval('off');
    setManualTagApproval('off');
    setLocationSharing('on');
  }, [userId]);

  const handleSavePrivacy = async () => {
    setIsSaving(true);
    // In full implementation, would save to backend
    setIsSaving(false);
    window.alert('Privacy settings saved successfully!');
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Privacy Settings</h1>

        {/* Account Privacy */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Account Privacy</h2>
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4 rounded border-gray-500 focus:ring-primary-500"
              />
              <span className="text-gray-300">Make account public</span>
            </label>
            <p className="text-xs text-gray-400 ml-4">
              When unchecked, only approved followers can see your content
            </p>
          </div>
          {isPublic && (
            <p className="text-xs text-gray-400">
              Public account: Everyone can see your posts and profile
            </p>
          )}
          {!isPublic && (
            <p className="text-xs text-gray-400">
              Private account: Only approved followers can see your content
            </p>
          )}
          <div className="mt-3">
            <label className="block text-sm text-gray-300 mb-2">Follow Request Controls</label>
            <select
              value={followRequestControls}
              onChange={(e) => setFollowRequestControls(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="allow">Allow anyone to follow</option>
              <option value="require_approval">Require approval for follow requests</option>
              <option value="deny">Deny follow requests</option>
            </select>
          </div>
        </div>

        {/* Interaction Privacy */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Interaction Privacy</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={whoCanComment}
              onChange={(e) => setWhoCanComment(e.target.value)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="everyone">Everyone</option>
              <option value="followers"> followers only</option>
              <option value="following">Following only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={whoCanMention}
              onChange={(e) => setWhoCanMention(e.target.value)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="everyone">Everyone</option>
              <option value="followers">Followers only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={whoCanTag}
              onChange={(e) => setWhoCanTag(e.target.value)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="everyone">Everyone</option>
              <option value="followers">Followers only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={whoCanReplyToStories}
              onChange={(e) => setWhoCanReplyToStories(e.target.value)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="everyone">Everyone</option>
              <option value="followers">Followers only</option>
              <option value="close_friends">Close Friends only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={whoCanMessage}
              onChange={(e) => setWhoCanMessage(e.target.value)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="everyone">Everyone</option>
              <option value="followers">Followers only</option>
              <option value="nobody">Nobody</option>
            </select>
            <select
              value={whoCanShare}
              onChange={(e) => setWhoCanShare(e.target.value)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="everyone">Everyone</option>
              <option value="followers">Followers only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>
        </div>

        {/* Activity Privacy */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Activity Privacy</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={onlineStatusVisible}
              onChange={(e) => setOnlineStatusVisible(e.target.value)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="true">Online status visible</option>
              <option value="false">Hide online status</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={readReceipts}
              onChange={(e) => setReadReceipts(e.target.checked)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="true">Read receipts</option>
              <option value="false">Disable read receipts</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={activityVisible}
              onChange={(e) => setActivityVisible(e.target.checked)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="true">Activity visibility</option>
              <option value="false">Hide activity</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={likeVisible}
              onChange={(e) => setLikeVisible(e.target.checked)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="true">Like visibility</option>
              <option value="false">Hide like count</option>
            </select>
          </div>
        </div>

        {/* Story Privacy */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Story Privacy</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={storyReplyPermissions}
              onChange={(e) => setStoryReplyPermissions(e.target.value)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="everyone">Everyone can reply</option>
              <option value="followers">Followers only</option>
              <option value="close_friends">Close Friends only</option>
              <option value="nobody">Disable replies</option>
            </select>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">Hide stories from:</p>
            <Input
              type="text"
              placeholder "Enter usernames (comma separated)"
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={taggedContentApproval}
              onChange={(e) => setTaggedContentApproval(e.target.value)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="off">Off - Anyone can tag you</option>
              <option value="approve">Manual approval required</option>
              <option value="deny">Tags disabled</option>
            </select>
          </div>
        </div>

        {/* Content Privacy */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Content Privacy</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={manualTagApproval}
              onChange={(e) => setManualTagApproval(e.target.value)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="off">Off - Anyone can tag you in posts</option>
              <option value="approve">Manual approval required</option>
              <option value="deny">Tags disabled</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={locationSharing}
              onChange={(e) => setLocationSharing(e.target.value)}
              className="col-span-2 w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="on">Location sharing on</option>
              <option value="off">Location sharing off</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSavePrivacy}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Privacy Settings'}
          </Button>
        </div>
      </div>
    </main>
  );
}