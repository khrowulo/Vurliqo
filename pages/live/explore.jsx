/* 
 * Vurliqo - Live Explore
 * Phase 9: Module 1 - Live Streaming Explore
 * Discover live broadcasts and featured creators
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";

export default function LiveExplore({ userId }) {
  const [liveStreams, setLiveStreams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch live streams from Lovable Cloud backend
    // Would integrate with actual video streaming service
    const mockStreams = [
      {
        id: 'live-1',
        title: 'Morning Art Session',
        creator: 'artist1',
        viewerCount: 45,
        category: 'Art',
        duration: '2h 15m',
        thumbnail: '/placeholder-art.jpg',
      },
      {
        id: 'live-2',
        title: 'Tech Talk 2024',
        creator: 'tech_guru',
        viewerCount: 128,
        category: 'Technology',
        duration: '1h 45m',
        thumbnail: '/placeholder-tech.jpg',
      },
      {
        id: 'live-3',
        title: 'Cooking Live',
        creator: 'chef_maya',
        viewerCount: 89,
        category: 'Food',
        duration: '1h 30m',
        thumbnail: '/placeholder-food.jpg',
      },
    ];

    const mockCategories = ['All', 'Art', 'Technology', 'Food', 'Music', 'Gaming'];

    setLiveStreams(mockStreams);
    setCategories(mockCategories);
    setIsLoading(false);
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Button variant="outline" size="sm" onClick={() => window.alert('Loading...')}>
            Loading...
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Live Explore</h1>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="bg-gray-800 rounded-2xl p-4 mb-8 border border-gray-700">
            <h2 className="font-medium text-white mb-3">Categories</h2>
            <div className="grid grid-cols-6 gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-1 ${selectedCategory === cat ? 'bg-primary-600 text-white' : 'text-gray-300 hover:text-white transition-colors'}`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Live Streams */}
        <div>
          <h2 className="font-medium text-white mb-3">Live Broadcasts</h2>
          <p className="text-sm text-gray-400 mb-3">Discover live streams from creators</p>
          
          {liveStreams.length === 0 && (
            <p className="text-gray-400">No live broadcasts at this time</p>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {liveStreams.map((stream) => {
              // Filter by category
              if (selectedCategory !== 'all' && stream.category !== selectedCategory) {
                return null;
              }
              
              return (
                <div
                  key={stream.id}
                  className="group bg-gray-700 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors"
                >
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-white truncate">{stream.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      By {stream.creator}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-white">👁️ {stream.viewerCount}</span>
                      <span className="text-xs text-gray-400"> viewers</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <p>
            Requires integration with video streaming service (Cloudflare Stream, AWS
            MediaLive, or similar). Currently providing discovery interface only.
          </p>
        </div>
      </div>
    </main>
  );
}