/*
 * Vurliqo - New Conversation
 * Phase 4: Start a new direct or group conversation
 */

import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function NewConversation() {
  const [recipientUsernames, setRecipientUsernames] = useState('');
  const [conversationType, setConversationType] = useState('direct'); // direct or group
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]); // Search results

  const handleSearch = async (e) => {
    const query = e.target.value.trim();
    if (!query) {
      setUsers([]);
      return;
    }
    // In full implementation, would search users from backend
    setUsers([
      { id: 'user-1', username: 'alice', avatar_url: '/placeholder-av.png' },
      { id: 'user-2', username: 'bob', avatar_url: '/placeholder-av.png' },
    ]);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!recipientUsernames.trim()) return;
    setIsSubmitting(true);
    // In full implementation, would create conversation and navigate to messaging
    setIsSubmitting(false);
    window.location.href = '/messaging/inbox';
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center pt-20">
        <Image
          src="/vurliqo-logo.svg"
          alt="Vurliqo"
          width={120}
          height={120}
          className="mx-auto mb-6"
        />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          New Conversation
        </h1>

        {conversationType === 'direct' && (
          <form onSubmit={handleCreate} className="w-full space-y-4">
            <Input
              type="text"
              placeholder="Recipients (usernames, separated by comma)"
              value={recipientUsernames}
              onChange={(e) => setRecipientUsernames(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            
            <Button
              variant="primary"
              type="submit"
              disabled={!recipientUsernames.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Start Conversation'}
            </Button>
          </form>
        )}

        {conversationType === 'group' && (
          <form onSubmit={handleCreate} className="w-full space-y-4">
            <Input
              type="text"
              placeholder="Group name"
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            
            <Input
              type="text"
              placeholder="Add participants (usernames, separated by comma)"
              value={recipientUsernames}
              onChange={(e) => setRecipientUsernames(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            
            <Button
              variant="primary"
              type="submit"
              disabled={!recipientUsernames.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Group'}
            </Button>
          </form>
        )}

        <div className="mt-6 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConversationType('direct')}
          >
            Direct Message
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConversationType('group')}
            className="ml-3"
          >
            Group Chat
          </Button>
        </div>
      </div>
    </main>
  );
}