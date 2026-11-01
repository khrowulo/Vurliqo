/* 
 * Vurliqo - Broadcast Channels
 * Phase 9: Module 3 - Broadcast Channels System
 * Features: create channels, join/leave, announcements, membership
 */

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function BroadcastChannels({ userId }) {
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch broadcast channels from Lovable Cloud backend
    // Would integrate with channel management system
    const mockChannels = [
      {
        id: 'channel-1',
        name: 'Art Community',
        description: 'Discussion and sharing for artists',
        isPublic: true,
        memberCount: 245,
        owner: 'artist1',
      },
      {
        id: 'channel-2',
        name: 'Tech Talk',
        description: 'Technology discussions and news',
        isPublic: true,
        memberCount: 189,
        owner: 'tech_guru',
      },
    ];
    setChannels(mockChannels);
    setIsLoading(false);
  }, [userId]);

  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');

  const createChannel = () => {
    if (!channelName.trim()) {
      window.alert('Please enter a channel name');
      return;
    }
    // In full implementation, would create channel via Lovable Cloud backend
    window.alert('Channel created successfully');
    setChannelName('');
    setChannelDescription('');
  };

  const joinChannel = (channelId) => {
    window.alert(`Joined channel ${channelId}`);
  };

  const leaveChannel = (channelId) => {
    window.alert(`Left channel ${channelId}`);
  };

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
        <h1 className="text-2xl font-bold text-white mb-6">Broadcast Channels</h1>

        {/* Create Channel */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Create Channel</h2>
          
          <Input
            type="text"
            placeholder="Channel name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
            required
          />
          
          <Input
            type="text"
            placeholder="Description (optional)"
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
          />
          
          <Button
            variant="primary"
            size="sm"
            onClick={createChannel}
            className="w-full justify-center"
          >
            Create Channel
          </Button>

          <p className="text-xs text-gray-500 mt-2">
            Channels can be public (anyone can join) or restricted (requires approval).
          </p>
        </div>

        {/* Existing Channels */}
        <div>
          <h2 className="font-medium text-white mb-3">Your Channels</h2>
          <p className="text-sm text-gray-400 mb-3">Your broadcast channels</p>
          
          {channels.length === 0 && (
            <p className="text-gray-400">No channels yet</p>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="bg-gray-700 rounded-xl p-4 border border-gray-600 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{channel.name}</span>
                  <span className="text-xs text-gray-400">
                    {channel.isPublic ? 'Public' : 'Restricted'}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{channel.description}</p>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>👥 {channel.memberCount} members</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => joinChannel(channel.id)}
                    className="text-sm"
                  >
                    Join/Leave
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <p>
            Channel management requires integration with backend storage and membership
            system. Currently providing UI foundation for channel creation and membership.
          </p>
        </div>
      </div>
    </main>
  );
}