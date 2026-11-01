/*
 * Vurliqo - Blocking & Restriction
 * Phase 5: Block and restrict accounts management
 */

import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export default function BlockingRestriction({
  userId,
  isCurrentUser,
  onBlock,
  onUnblock,
  onRestrict,
  onUnrestrict,
  blockedUsers = [],
  restrictedUsers = [],
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

  const handleBlock = async (userIdToBlock) => {
    if (onBlock) {
      onBlock(userIdToBlock);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleUnblock = async (userIdToUnblock) => {
    if (onUnblock) {
      onUnblock(userIdToUnblock);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRestrict = async (userIdToRestrict) => {
    if (onRestrict) {
      onRestrict(userIdToRestrict);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleUnrestrict = async (userIdToUnrestrict) => {
    if (onUnrestrict) {
      onUnrestrict(userIdToUnrestrict);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {/* Blocking Section */}
        <div>
          <h3 className="font-medium text-white mb-3">Blocked Accounts</h3>
          
          {blockedUsers.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
              {blockedUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-1">
                  <Image
                    src={user.avatar_url || '/placeholder-av.png'}
                    width={16}
                    height={16}
                    className="rounded-full object-cover"
                  />
                  <span className="truncate">{user.username}</span>
                  <svg
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </svg>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No blocked accounts
            </p>
          )}

          {/* Block new user */}
          <div className="mt-3">
            <Input
              type="text"
              placeholder "Username to block..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => searchQuery && handleBlock(searchResults?.[0]?.id)}
              disabled={!searchQuery}
            >
              Block
            </Button>
          </div>
        </div>

        {/* Restriction Section */}
        <div>
          <h3 className="font-medium text-white mb-3">Restricted Accounts</h3>
          
          {restrictedUsers.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
              {restrictedUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-1">
                  <Image
                    src={user.avatar_url || '/placeholder-av.png'}
                    width={16}
                    height={16}
                    className="rounded-full object-cover"
                  />
                  <span className="truncate">{user.username}</span>
                  <svg
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </svg>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No restricted accounts
            </p>
          )}

          {/* Restrict new user */}
          <div className="mt-3">
            <Input
              type="text"
              placeholder "Username to restrict..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => searchQuery && handleRestrict(searchResults?.[0]?.id)}
              disabled={!searchQuery}
            >
              Restrict
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}