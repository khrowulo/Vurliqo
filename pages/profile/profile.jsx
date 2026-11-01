/*
 * Vurliqo - Profile
 * Phase 5: Profile page with following/followers, close friends, blocking, and profile enhancements
 */

import { useState, useEffect } from 'react';
import { Image } from 'next/image';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Profile({ userId }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [closeFriends, setCloseFriends] = useState([]);
  const [isCloseFriend, setIsCloseFriend] = useState(false);
  const [isLoadingFollowers, setIsLoadingFollowers] = useState(true);
  const [isLoadingFollowing, setIsLoadingFollowing] = useState(true);
  const [isLoadingCloseFriends, setIsLoadingCloseFriends] = useState(true);

  useEffect(() => {
    // In a full implementation, would fetch user data from Lovable Cloud backend
    const mockUser = {
      id: userId || 'user-1',
      username: 'testuser',
      displayName: 'Test User',
      avatar_url: '/placeholder-av.png',
      bio: 'Software developer building cool stuff. 👨‍💻',
      website: 'https://example.com',
      location: 'San Francisco',
      joined_at: new Date(),
      is_current_user: userId === undefined,
      follower_count: 158,
      following_count: 234,
      following_count_abbreviated: '234',
      followers_count_abbreviated: '158',
    };

    setUser(mockUser);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    // In a full implementation, would fetch followers from backend
    const mockFollowers = [
      { id: 'user-2', username: 'alice', avatar_url: '/placeholder-av.png', is_current_user: false },
      { id: 'user-3', username: 'bob', avatar_url: '/placeholder-av.png', is_current_user: false },
      { id: 'user-4', username: 'diana', avatar_url: '/placeholder-av.png', is_current_user: false },
    ];
    setFollowers(mockFollowers);
    setIsLoadingFollowers(false);
  }, [userId]);

  useEffect(() => {
    // In a full implementation, would fetch following from backend
    const mockFollowing = [
      { id: 'user-3', username: 'bob', avatar_url: '/placeholder-av.png', is_current_user: false },
      { id: 'user-5', username: 'eve', avatar_url: '/placeholder-av.png', is_current_user: false },
      { id: 'user-6', username: 'frank', avatar_url: '/placeholder-av.png', is_current_user: false },
    ];
    setFollowing(mockFollowing);
    setIsLoadingFollowing(false);
  }, [userId]);

  useEffect(() => {
    // In a full implementation, would fetch close friends from backend
    const mockCloseFriends = [
      { id: 'user-2', username: 'alice', avatar_url: '/placeholder-av.png', is_current_user: false },
      { id: 'user-4', username: 'diana', avatar_url: '/placeholder-av.png', is_current_user: false },
    ];
    setCloseFriends(mockCloseFriends);
    setIsLoadingCloseFriends(false);
  }, [userId]);

  const handleFollowToggle = async () => {
    setIsFollowing(!isFollowing);
    // In full implementation, would toggle follow status with backend
  };

  const handleAddCloseFriend = async (userIdToAdd) => {
    setIsLoadingCloseFriends(true);
    // In full implementation, would add to close friends with backend
    setIsLoadingCloseFriends(false);
  };

  const removeCloseFriend = async (userIdToRemove) => {
    setIsLoadingCloseFriends(true);
    // In full implementation, would remove from close friends with backend
    setIsLoadingCloseFriends(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Image src="/loading.svg" alt="Loading" width={40} height={40} />
          <p className="mt-2 text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="min-h-screen bg-gray-900 p-4 text-center text-gray-400">Profile not found</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={user.avatar_url || '/placeholder-av.png'}
              alt={user.username}
              width={100}
              height={100}
              className="rounded-2xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-white">{user.displayName || user.username}</h1>
              <p className="text-sm text-gray-400">{user.username}</p>
            </div>
          </div>

          {/* Follow/Following CTA */}
          <div className="mt-4 flex gap-2">
            {user.is_current_user ? null : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleFollowToggle}
                disabled={isFollowing}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.alert('Message')}
            >
              Message
            </Button>
            
            {user.is_current_user ? null : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.alert('Follow Request')}
              >
                Follow Request
              </Button>
            )}

          {user.is_current_user ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/settings/profile/edit'}
            >
              Edit Profile
            </Button>
          ) : null}
          </div>

          {/* Stats */}
          <div className="flex mt-4 -mx-2 text-sm text-gray-400">
            <div className="px-2">
              <p className="font-medium text-white">{user.follower_count}</p>
              <p className="abbreviated-text text-xs opacity-60">Followers</p>
            </div>
            <div className="px-2">
              <p className="font-medium text-white">{user.following_count}</p>
              <p className="abbreviated-text text-xs opacity-60">Following</p>
            </div>
          </div>
        </div>

        {/* Bio and Details */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">About</h2>
          <p className="text-gray-300 line-clamp-4">{user.bio || 'No bio added'}</p>
          
          {user.website && (
            <div className="mt-3">
              <p className="text-xs text-gray-400">Website</p>
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 underline hover:text-primary-400"
              >
                {user.website}
              </a>
            </div>
          )}

          {user.location && (
            <div className="mt-2">
              <p className="text-xs text-gray-400">Location</p>
              <span className="text-gray-300">{user.location}</span>
            </div>
          )}
        </div>

        {/* Followers List */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Followers ({user.follower_count})</h2>
          <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
            {followers.map((follower) => (
              <div
                key={follower.id}
                className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => window.alert(`View ${follower.username}'s profile`)}
              >
                <Image
                  src={follower.avatar_url || '/placeholder-av.png'}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <span className="text-sm text-white">{follower.username}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Following List */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Following ({user.following_count})</h2>
          <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
            {following.map((followee) => (
              <div
                key={followee.id}
                className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => window.alert(`View ${followee.username}'s profile`)}
              >
                <Image
                  src={followee.avatar_url || '/placeholder-av.png'}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <span className="text-sm text-white">{followee.username}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Close Friends Section */}
        {user.is_current_user && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
            <h2 className="font-medium text-white mb-3">Close Friends</h2>
            <p className="text-sm text-gray-400 mb-3">
              Share stories with Close Friends only
            </p>
            
            {/* Add to Close Friends */}
            <div className="mb-4">
              <Input
                type="text"
                placeholder "Search or add usernames..."
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.alert('Added to Close Friends')}
                className="mt-2 w-full"
              >
                Add
              </Button>
            </div>

            {/* Close Friends List */}
            {closeFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => window.alert(`Removed from Close Friends`)}
              >
                <Image
                  src={friend.avatar_url || '/placeholder-av.png'}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
                <span className="text-sm text-white">{friend.username}</span>
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="text-gray-400"
                >
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </div>
            ))}
          </div>
        )}

        {/* Post Interactions Section */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Recent Activity</h2>
          <p className="text-sm text-gray-400 mb-3">Latest interactions</p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v20a2 2 0 002 2h10a2 2 0 002-2V8l-6-6zm14-4L16 6l-6 4h12l-6-4z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white">New follower</p>
                <p className="text-xs text-gray-400">1h ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 9.96v-1.98h-2v1.98h2zm0 4.98v-1.98h-2v1.98h2zm0 4.98v-1.98h-2v1.98h2zm0 5.96v-2.98h-2v2.98h2zm0 5.96v-2.98h-2v2.98h2zM2 4.98C2 7.52 4.48 10 8 10s6-2.48 6-5.02-4.48-5.02-6-5.02S2 2.48 2 4.98zm14 4.98c0 1.48-.62 2.82-1.68 3.96h-2.96v2.96c0 1.48-.62 2.82-1.68 3.96h-3.04c-1.06 0-1.68-1.48-1.68-3.96v-2.96h-3.04v2.96c0 1.48-.62 2.82-1.68 3.96h-3.04c-1.06 0-1.68-1.48-1.68-3.96v-3.04h5.96v3.04z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white">Post liked</p>
                <p className="text-xs text-gray-400">2h ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 9.96v-1.98h-2v1.98h2zm0 4.98v-1.98h-2v1.98h2zm0 4.98v-1.98h-2v1.98h2zm0 5.96v-2.98h-2v2.98h2zm0 5.96v-2.98h-2v2.98h2zM2 4.98C2 7.52 4.48 10 8 10s6-2.48 6-5.02-4.48-5.02-6-5.02S2 2.48 2 4.98zm14 4.98c0 1.48-.62 2.82-1.68 3.96h-2.96v2.96c0 1.48-.62 2.82-1.68 3.96h-3.04c-1.06 0-1.68-1.48-1.68-3.96v-2.96h-3.04v2.96c0 1.48-.62 2.82-1.68 3.96h-3.04c-1.06 0-1.68-1.48-1.68-3.96v-3.04h5.96v3.04z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white">Commented</p>
                <p className="text-xs text-gray-400">3h ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}