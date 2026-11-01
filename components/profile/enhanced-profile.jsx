/*
 * Vurliqo - Enhanced Profile
 * Phase 5: Profile enhancements - mutual followers, close friends, restrictions
 */

import { useState } from 'react';
import { Image } from 'next/image';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { MentionsTags } from '../../mentions-tags';

export default function EnhancedProfile({
  userId,
  isCurrentUser,
  targetUser,
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isCloseFriend, setIsCloseFriend] = useState(false);
  const [isRestricted, setIsRestricted] = useState(false);
  const [mutualFollowers, setMutualFollowers] = useState([]);
  const [statusToggle, setStatusToggle] = useState('public'); // public, followers, close_friends, restricted

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // In full implementation, would toggle follow with backend
  };

  const handleCloseFriendToggle = () => {
    setIsCloseFriend(!isCloseFriend);
    // In full implementation, would toggle close friend status with backend
  };

  const handleRestrictionToggle = () => {
    setIsRestricted(!isRestricted);
    // In full implementation, would toggle restriction with backend
  };

  const handleStatusChange = (e) => {
    setStatusToggle(e.target.value);
    // In full implementation, would update privacy settings with backend
  };

  // If no target user specified, use current user or default
  const profileUser = targetUser || (isCurrentUser ? null : { id: 'user-1', username: 'testuser' });

  return (
    <div>
      <h2 className="font-medium text-white mb-3">Profile Settings</h2>

      {/* Follow Status */}
      {isCurrentUser ? null : (
        <div className="mb-4">
          <p className="text-sm text-gray-400">Follow status</p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFollowToggle}
            className={isFollowing ? 'bg-primary-600 text-white' : ''}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
      )}

      {/* Close Friend Status */}
      {isCurrentUser ? (
        <div className="mb-4">
          <p className="text-sm text-gray-400">Close Friends</p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCloseFriendToggle}
            className={isCloseFriend ? 'bg-primary-600 text-white' : ''}
          >
            {isCloseFriend ? 'Remove from Close Friends' : 'Add to Close Friends'}
          </Button>
        </div>
      ) : null}

      {/* Restriction Status */}
      {isCurrentUser ? (
        <div className="mb-4">
          <p className="text-sm text-gray-400">Restrict interactions</p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestrictionToggle}
            className={isRestricted ? 'bg-primary-600 text-white' : ''}
          >
            {isRestricted ? 'Unrestrict' : 'Restrict Account'}
          </Button>
        </div>
      ) : null}

      {/* Privacy Settings */}
      {isCurrentUser && (
        <div className="mb-4">
          <p className="text-sm text-gray-400">Who can see your stories</p>
          <select
            value={statusToggle}
            onChange={handleStatusChange}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
          >
            <option value="public">Public</option>
            <option value="followers">Followers</option>
            <option value="close_friends">Close Friends</option>
            <option value="restricted">Restricted</option>
          </select>
        </div>
      )}

      {/* Mutual Followers */}
      {targetUser && !isCurrentUser && (
        <div className="mb-6">
          <h3 className="font-medium text-white mb-3">Mutual Followers</h3>
          {mutualFollowers.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {mutualFollowers.map((follower) => (
                <div
                  key={follower.id}
                  className="flex items-center gap-2 rounded-md p-2 text-xs text-gray-300 hover:bg-gray-700 cursor-pointer"
                >
                  <Image
                    src={follower.avatar_url || '/placeholder-av.png'}
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                  <span>{follower.username}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No mutual followers</p>
          )}
        </div>
      )}

      {/* Mentions Tag Input */}
      {isCurrentUser && (
        <div className="mb-6">
          <MentionsTags
            placeholder="Tag users in your post..."
            onRemoveMention={() => {}}
          />
        </div>
      )}
    </div>
  );
}