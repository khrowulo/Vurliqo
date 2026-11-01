/* 
 * Vurliqo - Live Broadcast
 * Phase 9: Module 1 - Live Streaming System
 * Interface and backend integration foundation.
 * Note: Actual video streaming requires external service (e.g., Cloudflare Stream,
 * AWS MediaLive, or similar). This component provides the UI and backend
 * integration structure, but does not simulate a working live stream.
 */

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function LiveBroadcast({ userId }) {
  const [streamTitle, setStreamTitle] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would connect to Lovable Cloud backend
    // Would integrate with actual video streaming service
    setIsLoading(false);
  }, [userId]);

  const startBroadcast = () => {
    if (!streamTitle.trim()) {
      window.alert('Please enter a broadcast title');
      return;
    }
    // In full implementation, would start live broadcast via backend
    // Would integrate with video streaming service
    setIsLive(true);
    const timeoutId = setTimeout(() => {
      setViewerCount(24); // Placeholder - would come from streaming service
    }, 500);
    setIsLoading(false);
  };

  const endBroadcast = () => {
    setIsLive(false);
    setViewerCount(0);
    setStreamTitle('');
    window.alert('Live broadcast ended');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Button variant="outline" size="sm" onClick={() => window.alert('Loading...')}>
            Loading live broadcast interface...
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Live Broadcast</h1>

        {/* Broadcast Status */}
        {!isLive && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
            <h2 className="font-medium text-white mb-3">Start Live Broadcast</h2>
            <p className="text-sm text-gray-400 mb-4">
              Share live video with your followers in real-time
            </p>
            
            <Input
              type="text"
              placeholder="Broadcast title..."
              value={streamTitle}
              onChange={(e) => setStreamTitle(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
              required
            />
            
            <Button
              variant="primary"
              size="lg"
              onClick={startBroadcast}
              className="w-full justify-center"
            >
              Start Broadcast
            </Button>

            <p className="text-xs text-gray-500 mt-4">
              Requires integration with video streaming service (Cloudflare Stream, 
              AWS MediaLive, or similar). Currently providing UI foundation only.
            </p>
          </div>
        )}

        {/* Live Broadcast Interface */}
        {isLive && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
            <h2 className="font-medium text-white mb-3">Live: {streamTitle || 'Live Now'}</h2>
            
            {/* Viewer Count */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-lg font-bold text-white">👁️ {viewerCount}</span>
              <span className="text-sm text-gray-400"> viewers</span>
            </div>

            {/* Viewer List */}
            <div>
              <h3 className="font-medium text-white mb-3">Viewer List</h3>
              <div className="h-40 bg-gray-700 rounded-xl p-3 overflow-y-auto">
                <p className="text-gray-400/50 text-sm">Viewers will appear here</p>
                <p className="text-gray-500 text-xs">24 viewers currently</p>
              </div>
            </div>

            {/* Live Controls */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.alert('Toggle camera')}
                className="flex-1"
              >
                Camera
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.alert('Toggle microphone')}
                className="flex-1"
              >
                Mic
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={endBroadcast}
                className="flex-1"
              >
                End
              </Button>
            </div>

            {/* Real-time Comments */}
            <div>
              <h3 className="font-medium text-white mb-3">Live Comments</h3>
              <div className="h-32 bg-gray-700 rounded-xl p-3 overflow-y-auto">
                <p className="text-gray-400/50 text-sm">Live comments will appear here</p>
                <p className="text-gray-500 text-xs">New comment...</p>
              </div>
            </div>

            {/* Viewer Reactions */}
            <div>
              <h3 className="font-medium text-white mb-3">Reactions</h3>
              <div className="grid grid-cols-4 gap-2 mb-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.alert('Add heart reaction')}
                  className="flex-1 justify-center"
                >
                  ❤️
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.alert('Add applause')}
                  className="flex-1 justify-center"
                >
                  👏
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.alert('Add laugh')}
                  className="flex-1 justify-center"
                >
                  😄
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.alert('Add wow')}
                  className="flex-1 justify-center"
                >
                  🤩
                </Button>
              </div>
            </div>

            {/* Share Broadcast */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="font-medium text-white mb-3">Share</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.alert('Share broadcast link')}
                className="w-full justify-center"
              >
                Share
              </Button>
              <p className="text-xs text-gray-400 mt-2">
                Share broadcast to followers and other platforms
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}