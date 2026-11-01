/*
 * Vurliqo - Chat View
 * Phase 4: One-to-one or group messaging interface
 */

import { useState, useEffect } from 'react';
import { Image } from 'next/image';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function Chat({ conversationId, conversationType }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a full implementation, would fetch messages from Lovable Cloud backend
    const mockMessages = [
      {
        id: '1',
        content: 'Hey there!',
        created_at: new Date(Date.now() - 3600000),
        sender: { username: 'friend1', avatar_url: '/placeholder-av.png', is_current_user: true },
        type: 'text',
      },
      {
        id: '2',
        content: 'How are you?',
        created_at: new Date(),
        sender: { username: 'me', avatar_url: '/placeholder-av.png', is_current_user: false },
        type: 'text',
      },
    ];
    setMessages(mockMessages);
    setIsLoading(false);
  }, [conversationId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setIsTyping(true);
    
    // In full implementation, would send message to backend
    const mockNewMessage = {
      id: Date.now().toString(),
      content: newMessage,
      created_at: new Date(),
      sender: { username: 'me', avatar_url: '/placeholder-av.png', is_current_user: true },
      type: 'text',
    };
    setMessages(prev => [...prev, mockNewMessage]);
    setNewMessage('');
    setIsTyping(false);
  };

  if (isLoading) {
    return <div className="min-h-[500px] flex justify-center items-center text-gray-500">Loading chat...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {conversationType === 'direct' ? (
              <img
                src="/placeholder-av.png"
                alt="Participant"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="5.5" />
                  <polyline points="21 16 16 21 5 21" />
                </svg>
              </svg>
            )}
            <div>
              <p className="font-medium text-white">{conversationType === 'direct' ? 'Friend' : 'Group Chat'}</p>
              <p className="text-xs text-gray-400">Active</p>
            </div>
          </div>

          {/* New message button for quick access */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = '/messaging/inbox'}
          >
            Inbox
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex flex-col h-[600px] overflow-y-auto space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={clsx(
                'max-w-full rounded-md p-3 px-4 mb-3',
                msg.sender.is_current_user ? 'bg-primary-600 text-white justify-end' : 'bg-gray-700 text-white',
              )}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-gray-300 mt-1">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}

          {/* Empty state */}
          {messages.length === 0 && (
            <p className="text-center text-gray-400 py-8">Start the conversation by sending a message</p>
          )}
        </div>

        {/* Message Input Area */}
        <form
          onSubmit={sendMessage}
          className="mt-4 p-3 bg-gray-800 border-t border-gray-600"
        >
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder "Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isTyping}
              className="flex-1 rounded-md bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={1}
            />
            <Button
              variant="primary"
              type="submit"
              disabled={!newMessage.trim() || isTyping}
            >
              Send
            </Button>
          </div>

          {/* Typing indicator */}
          {isTyping && (
            <div className="mt-2 text-sm text-gray-400">
              <span>Friend is typing...</span>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

// Helper to classx - simple class joining
function clsx() {
  const classes = [];
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      if (typeof arguments[i] === 'string') classes.push(arguments[i]);
      else if (Array.isArray(arguments[i])) classes.push(...arguments[i]);
    }
  }
  return classes.join(' ');
}