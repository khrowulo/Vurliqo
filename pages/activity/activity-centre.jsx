import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'next/image';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function ActivityCentre({ userId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setActivities([
        { id: 1, action_type: 'like', user: 'alice', content: 'Liked your post', created_at: new Date(), read: false },
        { id: 2, action_type: 'comment', user: 'bob', content: 'Commented on your post', created_at: new Date(), read: true },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredActivities = activities.filter(activity => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'likes') return activity.action_type === 'like';
    if (selectedFilter === 'comments') return activity.action_type === 'comment';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Button variant="ghost" disabled>Loading...</Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Activity Centre</h1>
        <div className="bg-gray-800 rounded-2xl p-4 mb-4 border border-gray-700">
          <div className="flex gap-2">
            {['all', 'likes', 'comments'].map(filter => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {filteredActivities.length === 0 ? (
            <div className="bg-gray-800 rounded-2xl p-6 text-center text-gray-400">
              No activities yet
            </div>
          ) : (
            filteredActivities.map(activity => (
              <div key={activity.id} className="bg-gray-800 rounded-2xl p-4 border border-gray-700 flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-white text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{activity.created_at.toLocaleDateString()}</p>
                </div>
                {!activity.read && <div className="w-2 h-2 bg-primary-500 rounded-full"></div>}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
