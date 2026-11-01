/*
 * Vurliqo - Close Friends
 * Phase 5: Close Friends management and story sharing
 */

import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export default function CloseFriends({
  userId,
  isCurrentUser,
  onAddFriend,
  onRemoveFriend,
  closeFriends = [],
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    const query = e.target.value.trim();
    if (!query) {
      setSearchResults([]);
      return;
    }
    // In full implementation, would search users from backend
    setSearchResults([
      { id: 'user-2', username: 'alice', avatar_url: '/placeholder-av.png' },
      { id: 'user-3', username: 'bob', avatar_url: '/placeholder-av.png' },
    ]);
  };

  const handleAdd = async (userIdToAdd) => {
    if (onAddFriend) {
      onAddFriend(userIdToAdd);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div>
      <h3 className="font-medium text-white mb-3">Close Friends</h3>

      {!isCurrentUser ? (
        <p className="text-sm text-gray-400">
          This feature is available for your own account.
        </p>
      ) : null}

      {/* Add to Close Friends */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder "Add to Close Friends..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <Button
          variant="primary"
          size="sm"
          onClick={() => searchQuery && handleAdd(searchResults?.[0]?.id)}
          disabled={!searchQuery}
        >
          Add
        </Button>
      </div>

      {/* Close Friends List */}
      {closeFriends.length > 0 && (
        <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
          {closeFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-2 rounded-md p-2 text-xs text-gray-300"
            >
              <Image
                src={friend.avatar_url || '/placeholder-av.png'}
                width={20}
                height={20}
                className="rounded-full object-cover"
              />
              <span className="truncate">{friend.username}</span>
              <svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="text-gray-500"
              >
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* No close friends state */}
      {closeFriends.length === 0 && isCurrentUser && (
        <p className="text-sm text-gray-400 mb-3">
          No Close Friends yet. Add people to share stories with.
        </p>
      )}
    </div>
  );
}