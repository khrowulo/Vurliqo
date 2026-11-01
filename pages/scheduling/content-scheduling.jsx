/* 
 * Vurliqo - Content Scheduling
 * Phase 7: Professional content scheduler
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function ContentScheduling({ userId }) {
  const [scheduledContent, setScheduledContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch scheduled content from Lovable Cloud backend
    setScheduledContent([
      {
        id: '1',
        type: 'post',
        title: 'Scheduled Post 1',
        mediaUrl: '/placeholder-av.png',
        scheduledAt: new Date(Date.now() + 86400000),
        status: 'pending',
      },
      {
        id: '2',
        type: 'reel',
        title: 'Scheduled Reel 1',
        mediaUrl: '/placeholder-av.png',
        scheduledAt: new Date(Date.now() + 172800000),
        status: 'pending',
      },
    ]);
    setIsLoading(false);
  }, [userId]);

  const handleCancelScheduled = async (id) => {
    // In full implementation, would cancel scheduled content with backend
    window.alert('Scheduled content cancelled');
  };

  const handleRetryFailed = async (id) => {
    // In full implementation, would retry failed publication
    window.alert('Publication retry initiated');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Image src="/loading.svg" alt="Loading" width={40} height={40} />
          <p className="mt-2 text-gray-500">Loading scheduled content...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Content Scheduling</h1>

        {/* Scheduled Content Calendar */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Scheduled Content Calendar</h2>
          <p className="text-sm text-gray-400 mb-3">Upcoming publications</p>
          <div className="h-96 bg-gray-700 rounded-2xl p-4">
            <p className="text-gray-400/50">Content calendar will appear here</p>
            {scheduledContent.map((item) => (
              <div
                key={item.id}
                className="border-t border-gray-600 py-2 mt-2"
              >
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-xs text-gray-400">
                  Scheduled: {item.scheduledAt.toLocaleDateString()} at {item.scheduledAt.toLocaleTimeString()}
                </p>
                <p className="text-xs text-primary-400">{item.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule New Content */}
        <div className="mb-8">
          <h2 className="font-medium text-white mb-3">Schedule New Content</h2>
          <p className="text-sm text-gray-400 mb-3">Select content type and schedule publication</p>
          
          <Input
            type="text"
            placeholder="Content title..."
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
          />
          
          <Input
            type="datetime-local"
            placeholder="Select publication date and time"
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
          />
          
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.alert('Content scheduled')}
            className="w-full justify-center"
          >
            Schedule Content
          </Button>
        </div>

        {/* Management Actions */}
        <div>
          <h2 className="font-medium text-white mb-3">Management</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.alert('Edit scheduled content')}
            className="mb-2"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.alert('Cancel scheduled content')}
            className="mb-2"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.alert('Retry failed publication')}
            className="mb-2"
          >
            Retry
          </Button>
        </div>
      </div>
    </main>
  );
}