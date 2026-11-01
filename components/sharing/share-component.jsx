/*
 * Vurliqo - Sharing
 * Phase 5: Share posts, reels, profiles and links
 */

import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export default function ShareComponent({
  itemType, // 'post', 'reel', 'profile', 'link'
  itemId,
  onShare,
}) {
  const [shareType, setShareType] = useState('direct'); // direct, group, external
  const [shareText, setShareText] = useState('');
  const [shareLink, setShareLink] = useState('');

  const handleShare = async (e) => {
    e.preventDefault();
    if (!shareText.trim() && !shareLink.trim()) return;
    setIsLoading(true);
    // In full implementation, would share with backend
    setIsLoading(false);
    onShare?.({
      type: shareType,
      text: shareText,
      link: shareLink,
    });
  };

  return (
    <div>
      <h3 className="font-medium text-white mb-3">Share</h3>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShareType('direct')}
          className={shareType === 'direct' ? 'bg-primary-600 text-white' : ''}
        >
          Direct Message
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShareType('group')}
          className={shareType === 'group' ? 'bg-primary-600 text-white' : ''}
        >
          Group Chat
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShareType('external')}
          className={shareType === 'external' ? 'bg-primary-600 text-white' : ''}
        >
          External
        </Button>
      </div>

      {/* Direct Message Share */}
      {shareType === 'direct' && (
        <div className="mb-4">
          <Input
            type="text"
            placeholder "Message to accompany share..."
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleShare}
            disabled={!shareText.trim()}
          >
            Share
          </Button>
        </div>
      )}

      {/* Group Share */}
      {shareType === 'group' && (
        <div className="mb-4">
          <Input
            type="text"
            placeholder "Group or conversation..."
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleShare}
            disabled={true}
          >
            Share
          </Button>
        </div>
      )}

      {/* External Share */}
      {shareType === 'external' && (
        <div className="mb-4">
          <Input
            type="text"
            placeholder "Link to share..."
            value={shareLink}
            onChange={(e) => setShareLink(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleShare}
            disabled={!shareLink.trim()}
          >
            Share
          </Button>
        </div>
      )}
    </div>
  );
}