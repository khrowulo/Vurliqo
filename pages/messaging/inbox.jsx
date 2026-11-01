/*
 * Vurliqo - Messaging Inbox
 * Phase 4: Display all conversations with preview and status
 */

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function MessagingInbox() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // In a full implementation, would fetch conversations from Lovable Cloud backend
    const mockConversations = [
      {
        id: '1',
        type: 'direct',
        participants: [
          { user_id: 'user-1', username: 'alice', avatar_url: '/placeholder-av.png', is_online: true },
          { user_id: 'user-2', username: 'bob', avatar_url: '/placeholder-av.png', is_online: false }
        ],
        last_message: {
          content: 'Hey! Are you free tonight?',
          created_at: new Date(),
          is_from_current_user: false,
        },
        unread_count: 3,
        is_pinned: false,
        is_muted: false,
        is_archived: false,
      },
      {
        id: '2',
        type: 'direct',
        participants: [
          { user_id: 'user-3', username: 'charlie', avatar_url: '/placeholder-av.png', is_online: true },
        ],
        last_message: {
          content: 'Check out this post!',
          created_at: new Date(Date.now() - 86400000),
          is_from_current_user: true,
        },
        unread_count: 0,
        is_pinned: true,
        is_muted: false,
        is_archived: false,
      },
      {
        id: '3',
        type: 'group',
        title: 'Work Friends',
        participants: [
          { user_id: 'user-1', username: 'alice', avatar_url: '/placeholder-av.png', is_online: true },
          { user_id: 'user-4', username: 'diana', avatar_url: '/placeholder-av.png', is_online: false },
        ],
        last_message: {
          content: 'Lunch next week?',
          created_at: new Date(),
          is_from_current_user: false,
        },
        unread_count: 0,
        is_pinned: false,
        is_muted: true,
        is_archived: false,
      },
    ];

    setConversations(mockConversations);
    setIsLoading(false);
    
    // Calculate unread count
    const totalUnread = mockConversations.reduce((sum, conv) => sum + (conv.unread_count || 0), 0);
    setUnreadCount(totalUnread);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // In full implementation, would filter conversations
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center text-gray-500">
        Loading conversations...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Image
              src="/vurliqo-logo.svg"
              alt="Vurliqo"
              width={40}
              height={40}
              className="mr-2"
            />
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            href="/settings/notifications"
          >
            Settings
          </Button>
        </div>

        {/* Search and New Conversation */}
        <div className="mb-4 rounded-xl bg-gray-800 p-4 border border-gray-700">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder "Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-l-xl bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = '/messaging/new-conversation'}
            >
              New Message
            </Button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="min-h-[400px] flex justify-center items-center text-gray-500">
              Loading conversations...
            </div>
          ) : conversations.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center py-8 text-gray-400">
              No conversations yet. Start a new message above.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="rounded-xl bg-gray-800 p-4 border border-gray-700 hover:border-primary-500 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {/* Participant Avatar(s) */}
                    {conv.type === 'group' ? (
                      <div className="flex-1 min-w-0">
                        {conv.participants.slice(0, 3).map((participant) => (
                          <img
                            key={participant.user_id}
                            src={participant.avatar_url || '/placeholder-av.png'}
                            alt={participant.username}
                            className="w-8 h-8 rounded-full object-overflow"
                          />
                        ))}
                        {conv.participants.length > 3 && (
                          <span className="text-xs text-gray-400 ml-1">+{conv.participants.length - 3} more</span>
                        )}
                      </div>
                    ) : (
                      <img
                        src={conv.participants[0].avatar_url || '/placeholder-av.png'}
                        alt={conv.participants[0].username}
                        className="w-10 h-10 rounded-full object-overflow flex-shrink-0"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-1">
                        <p className="font-medium text-white truncate">
                          {conv.participants.map((p) => p.username).join(', ')}
                        </p>
                        {conv.type !== 'direct' && (
                          <p className="text-xs text-gray-400">{conv.title}</p>
                        )}
                      </div>
                      
                      {/* Last message preview */}
                      <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                        {conv.last_message?.content || 'No messages yet'}
                      </p>
                    </div>
                  </div>

                  {/* Status indicators */}
                  <div className="flex items-center justify-between mt-2">
                    {/* Unread indicator */}
                    {conv.unread_count > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-primary-600 text-white rounded-full px-2 py-0.5">
                        {conv.unread_count}
                      </span>
                    )}

                    {/* Pin/mute/archive buttons (compact) */}
                    <div className="flex gap-1 text-xs text-gray-400">
                      {conv.is_pinned && (
                        <span title="Pinned">📌</span>
                      )}
                      {conv.is_muted && (
                        <span title="Muted">🔇</span>
                      )}
                      {conv.is_archived && (
                        <span title="Archived">📦</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* No conversations state when loaded */}
        {!isLoading && conversations.length === 0 && (
          <div className="min-h-[400px] flex flex-col items-center justify-center py-8 text-gray-400">
            <p>Start a new conversation to connect with friends</p>
          </div>
        )}
      </div>
    </main>
  );
}