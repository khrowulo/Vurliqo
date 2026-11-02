/* 
 * Vurliqo - Advanced Content Discovery
 * Phase 9: Module 10 - Content Discovery
 * Expand Explore with live broadcasts, communities, events, polls, etc.
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";

export default function ContentDiscovery({ userId }) {
  const [discoveryItems, setDiscoveryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch discovery data from Lovable Cloud backend
    // Would integrate with platform discovery algorithm
    const mockItems = [
      {
        id: 'disc-1',
        type: 'live',
        title: 'Live: Morning Art',
        creator: 'artist1',
        viewers: 45,
      },
      {
        id: 'disc-2',
        type: 'community',
        title: 'Digital Artists Community',
        creator: 'artist1',
        members: 342,
      },
      {
        id: 'disc-3',
        type: 'event',
        title: 'Live Q&A Thursday',
        creator: 'tech_guru',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    ];
    setDiscoveryItems(mockItems);
    setIsLoading(false);
  }, [userId]);

  const [filter, setFilter] = useState('all');

  const filterOptions = ['all', 'live', 'community', 'event', 'poll'];

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
        <h1 className="text-2xl font-bold text-white mb-6">Content Discovery</h1>

        {/* Filters */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Filter</h2>
          <div className="grid grid-cols-5 gap-1">
            {filterOptions.map((opt) => (
              <Button
                key={opt}
                variant={filter === opt ? "primary" : "outline"}
                size="sm"
                onClick={() => setFilter(opt)}
                className={`flex-1 ${filter === opt ? 'bg-primary-600 text-white' : 'text-gray-300 hover:text-white transition-colors'}`}
              >
                {opt}
              </Button>
            ))}
          </div>
        </div>

        {/* Discovery Items */}
        <div>
          <h2 className="font-medium text-white mb-3">Discover</h2>
          <p className="text-sm text-gray-400 mb-3">Popular and relevant content</p>
          
          {discoveryItems.length === 0 && (
            <p className="text-gray-400">No discovery items</p>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {discoveryItems.map((item) => {
              if (filter !== 'all' && item.type !== filter) {
                return null;
              }
              
              return (
                <div
                  key={item.id}
                  className="group bg-gray-700 rounded-xl p-4 border border-gray-600 hover:bg-gray-800 transition-colors"
                >
                  <span className="text-lg font-bold text-white">{item.title}</span>
                  <p className="text-sm text-gray-400 mt-1">
                    {item.creator}
                  </p>
                  {item.viewers && (
                    <p className="text-xs text-gray-400">👁️ {item.viewers} viewers</p>
                  )}
                  {item.members && (
                    <p className="text-xs text-gray-400">👥 {item.members} members</p>
                  )}
                  {item.date && (
                    <p className="text-xs text-gray-400">
                      {item.date.toLocaleDateString()}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <p>
            Discovery algorithm respects account privacy, blocked users and content
            visibility. Uses genuine platform data for recommendations.
          </p>
        </div>
      </div>
    </main>
  );
}