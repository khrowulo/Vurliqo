/*
 * Vurliqo - Activity Centre
 * Phase 5: Dedicated Activity section with filters and real-time updates
 */

import { useState, useEffect } from 'react';
import { Image } from 'next/image';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function ActivityCentre({ userId }) {
  const [activities, setActivities] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // In a full implementation, would fetch activity from Lovable Cloud backend
    const mockActivities = [
      {
        id: '1',
        action_type: 'follow',
        target_type: 'user',
        target_id: 'user-2',
        user: { username: 'alice', avatar_url: '/placeholder-av.png' },
        created_at: new Date(Date.now() - 3600000),
        is_new: true,
      },
      {
        id: '2',
        action_type: 'like',
        target_type: 'post',
        target_id: 'post-1',
        user: { username: 'bob', avatar_url: '/placeholder-av.png' },
        created_at: new Date(Date.now() - 7200000),
        is_new: false,
      },
      {
        id: '3',
        action_type: 'comment',
        target_type: 'post',
        target_id: 'post-2',
        user: { username: 'charlie', avatar_url: '/placeholder-av.png' },
        created_at: new Date(Date.now() - 86400000),
        is_new: false,
      },
      {
        id: '4',
        action_type: 'mention',
        target_type: 'post',
        target_id: 'post-3',
        user: { username: 'diana', avatar_url: '/placeholder-av.png' },
        created_at: new Date(Date.now() - 172800000),
        is_new: false,
      },
      {
        id: '5',
        action_type: 'new_follower',
        target_type: 'user',
        target_id: 'user-1',
        user: { username: 'eve', avatar_url: '/placeholder-av.png' },
        created_at: new Date(Date.now() - 259200000),
        is_new: false,
      },
    ];

    setActivities(mockActivities);
    setIsLoading(false);
  }, [refreshKey]);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const filteredActivities = activities.filter((activity) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'mentions') return activity.action_type === 'mention';
    if (selectedFilter === 'follows') return activity.action_type === 'follow' || activity.action_type === 'new_follower';
    if (selectedFilter === 'likes') return activity.action_type === 'like';
    if (selectedFilter === 'comments') return activity.action_type === 'comment';
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center pt-20">
          <Image src="/loading.svg" alt="Loading" width={40} height={40} />
          <p className="mt-2 text-gray-500">Loading activity...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
          <p className="text-sm text-gray-500">Recent activity</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-700">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFilter('all')}
              className={selectedFilter === 'all' ? 'bg-primary-600 text-white' : ''}
            >
              All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFilter('follows')}
              className={selectedFilter === 'follows' ? 'bg-primary-600 text-white' : ''}
            >
              Follows {activities.filter(a => a.action_type === 'follow' || a.action_type === 'new_follower').length}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFilter('likes')}
              className={selectedFilter === 'likes' ? 'bg-primary-600 text-white' : ''}
            >
              Likes {activities.filter(a => a.action_type === 'like').length}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFilter('comments')}
              className={selectedFilter === 'comments' ? 'bg-primary-600 text-white' : ''}
            >
              Comments {activities.filter(a => a.action_type === 'comment').length}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFilter('mentions')}
              className={selectedFilter === 'mentions' ? 'bg-primary-600 text-white' : ''}
            >
              Mentions {activities.filter(a => a.action_type === 'mention').length}
            </Button>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-3">
          {filteredActivities.length === 0 ? (
            <div className="min-h-[300px] flex flex-col items-center justify-center py-8 text-gray-400">
              <p>No activity yet</p>
              <p className="mt-2">Actions will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="rounded-md p-3 flex items-start gap-3 hover:bg-gray-700 cursor-pointer"
                  onClick={() => window.alert(`View ${activity.action_type}`)}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={activity.user.avatar_url || '/placeholder-av.png'}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">
                      {activity.user.username} {activity.action_type}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load more */}
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRefreshKey(prev => prev + 1)}
          >
            Load More
          </Button>
        </div>
      </div>
    </main>
  );
}