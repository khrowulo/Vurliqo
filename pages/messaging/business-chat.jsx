/*
 * Vurliqo - Business Chat
 * Phase 4: Dedicated business messaging category
 */

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function BusinessChat() {
  const [isBusinessVerified, setIsBusinessVerified] = useState(false);
  const [messages, setMessages] = useState[];
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a full implementation, would fetch business conversations
    setMessages([
      {
        id: '1',
        content: 'Hello! I'm interested in your services.',
        created_at: new Date(),
        sender: { username: 'business_owner', avatar_url: '/placeholder-av.png', is_business: true, verified: true },
        is_current_user: false,
      },
    ]);
    setIsLoading(false);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setIsLoading(true);
    // In full implementation, would send business message
    setIsLoading(false);
    setNewMessage('');
  };

  if (isLoading) {
    return <div className="min-h-[400px] flex justify-center items-center text-gray-500">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Business Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
            {isBusinessVerified ? (
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 9.96v-1.98h-2v1.98h2zm0 4.98v-1.98h-2v1.98h2zm0 4.98v-2.98h-2v2.98h2zm0 5.96v-2.98h-2v2.98h2zM2 4.98C2 7.52 4.48 10 8 10s6-2.48 6-5.02-4.48-5.02-6-5.02S2 2.48 2 4.98zm14 4.98c0 1.48-.62 2.82-1.68 3.96h-2.96v2.96c0 1.48-.62 2.82-1.68 3.96h-3.04c-1.06 0-1.68-1.48-1.68-3.96v-2.96h-3.04v2.96c0 1.48-.62 2.82-1.68 3.96h-3.04c-1.06 0-1.68-1.48-1.68-3.96v-3.04h5.96v3.04z" />
              </svg>
            ) : null}
            <span className="font-medium text-white {isBusinessVerified ? 'text-green-400' : 'text-gray-300'}">
              {isBusinessVerified ? 'Verified Business' : 'Business'}
            </span>
          </div>
          
          <p className="text-xs text-gray-400">Send a message to potential clients or partners</p>
        </div>

        {/* Messages Area */}
        <div className="flex flex-col h-[500px] overflow-y-auto space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.is_current_user 
                ? 'max-w-full rounded-md p-3 px-4 mb-3 bg-primary-600 text-white justify-end'
                : 'rounded-md p-3 px-4 mb-3 bg-gray-700 text-white'}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-gray-300 mt-1">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}

          {messages.length === 0 && (
            <p className="text-center text-gray-400 py-8">Start a business conversation</p>
          )}
        </div>

        {/* Message Input */}
        <form
          onSubmit={handleSend}
          className="mt-4 p-3 bg-gray-800 border-t border-gray-600"
        >
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder "Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 rounded-md bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={1}
            />
            <Button
              variant="primary"
              type="submit"
              disabled={!newMessage.trim()}
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}