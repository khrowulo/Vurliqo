/* 
 * Vurliqo - Communities
 * Phase 9: Module 5 - Communities System
 * Create communities, manage membership, community posts and discussions
 */

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function Communities({ userId }) {
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch communities from Lovable Cloud backend
    // Would integrate with community management system
    const mockCommunities = [
      {
        id: 'comm-1',
        name: 'Digital Artists',
        description: 'Community for digital artists to share work and collaborate',
        isPublic: true,
        memberCount: 342,
        creator: 'artist1',
      },
      {
        id: 'comm-2',
        name: 'Tech Enthusiasts',
        description: 'Discussion community for technology enthusiasts',
        isPublic: true,
        memberCount: 512,
        creator: 'tech_guru',
      },
    ];
    setCommunities(mockCommunities);
    setIsLoading(false);
  }, [userId]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createCommunity = () => {
    if (!name.trim()) {
      window.alert('Please enter a community name');
      return;
    }
    // In full implementation, would create community via Lovable Cloud backend
    window.alert('Community created successfully');
    setName('');
    setDescription('');
  };

  const joinCommunity = (commId) => {
    window.alert(`Joined community ${commId}`);
  };

  const leaveCommunity = (commId) => {
    window.alert(`Left community ${commId}`);
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
        <h1 className="text-2xl font-bold text-white mb-6">Communities</h1>

        {/* Create Community */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Create Community</h2>
          
          <Input
            type="text"
            placeholder="Community name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
            required
          />
          
          <Input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
          />
          
          <Button
            variant="primary"
            size="sm"
            onClick={createCommunity}
            className="w-full justify-center"
          >
            Create Community
          </Button>

          <p className="text-xs text-gray-400 mt-2">
            Communities can be public (anyone can join) or private (requires approval).
          </p>
        </div>

        {/* Your Communities */}
        <div>
          <h2 className="font-medium text-white mb-3">Your Communities</h2>
          <p className="text-sm text-gray-400 mb-3">Communities you've created or joined</p>
          
          {communities.length === 0 && (
            <p className="text-gray-400">No communities yet</p>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {communities.map((comm) => (
              <div
                key={comm.id}
                className="bg-gray-700 rounded-xl p-4 border border-gray-600 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{comm.name}</span>
                  <span className="text-xs text-gray-400">
                    {comm.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{comm.description}</p>
                <div className="text-gray-400">
                  <span>👥 {comm.memberCount} members</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => joinCommunity(comm.id)}
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
            Community management requires integration with backend storage and membership
            system. Currently providing UI foundation for community creation and membership.
          </p>
          <p>
            Community posts can integrate with the existing feed where appropriate.
          </p>
        </div>
      </div>
    </main>
  );
}