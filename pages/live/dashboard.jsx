/* 
 * Vurliqo - Live Dashboard
 * Phase 9: Module 1 - Live Streaming Dashboard
 * Overview of live broadcasts and statistics
 */

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';

export default function LiveDashboard({ userId }) {
  const [broadcasts, setBroadcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch live broadcasts from Lovable Cloud backend
    // Would integrate with actual video streaming service
    const mockBroadcasts = [
      {
        id: 'live-1',
        title: 'Morning Art Session',
        creator: 'artist1',
        viewerCount: 45,
        duration: '2h 15m',
        startedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        status: 'live',
      },
      {
        id: 'live-2',
        title: 'Q&A Thursday',
        creator: 'tech_guru',
        viewerCount: 128,
        duration: '1h 45m',
        startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: 'completed',
      },
    ];
    setBroadcasts(mockBroadcasts);
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
        <h1 className="text-2xl font-bold text-white mb-6">Live Dashboard</h1>

        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Recent Live Broadcasts</h2>
          
          {broadcasts.length === 0 && (
            <p className="text-gray-400">No live broadcasts yet</p>
          )}

          <div className="space-y-4">
            {broadcasts.map((broadcast) => (
              <div
                key={broadcast.id}
                className="bg-gray-700 rounded-xl p-4 border border-gray-600 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{broadcast.title}</span>
                  <span className="text-xs text-gray-400">{broadcast.status}</span>
                </div>
                <p className="text-sm text-gray-400">
                  By {broadcast.creator} • {broadcast.viewerCount} viewers
                </p>
                <p className="text-xs text-gray-500">
                  {broadcast.startedAt.toLocaleString()} ({broadcast.duration})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-gray-700">
            <p className="text-sm text-gray-400">Total Broadcasts</p>
            <p className="text-3xl font-bold text-white">2</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-700">
            <p className="text-sm text-gray-400">Total Viewers</p>
            <p className="text-3xl font-bold text-white">173</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-700">
            <p className="text-sm text-gray-400">Average Duration</p>
            <p className="text-3xl font-bold text-white">1h 55m</p>
          </div>
        </div>
      </div>
    </main>
  );
}