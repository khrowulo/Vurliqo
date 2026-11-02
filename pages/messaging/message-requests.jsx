/*
 * Vurliqo - Message Requests
 * Phase 4: Messages from non-followers or unrestricted users
 */

import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function MessageRequests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a full implementation, would fetch message requests from backend
    const mockRequests = [
      {
        id: '1',
        from_user: { username: 'stranger1', avatar_url: '/placeholder-av.png' },
        content: 'Hey, great profile!',
        created_at: new Date(),
        is_accepted: false,
      },
      {
        id: '2',
        from_user: { username: 'stranger2', avatar_url: '/placeholder-av.png' },
        content: 'I love your content!',
        created_at: new Date(Date.now() - 86400000),
        is_accepted: false,
      },
    ];

    setRequests(mockRequests);
    setIsLoading(false);
  }, []);

  const handleAccept = async (requestId) => {
    setIsLoading(true);
    // In full implementation, would accept the message request
    setIsLoading(false);
  };

  const handleDecline = async (requestId) => {
    setIsLoading(true);
    // In full implementation, would decline the message request
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="min-h-[300px] flex justify-center items-center text-gray-500">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <Image
            src="/vurliqo-logo.svg"
            alt="Vurliqo"
            width={60}
            height={60}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Message Requests</h1>
          <p className="text-sm text-gray-500">Messages from people you don't follow</p>
        </div>

        {isLoading ? (
          <div className="min-h-[300px] flex justify-center items-center text-gray-500">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            <p>No new message requests</p>
            <p className="mt-2">Messages from non-followers go here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="rounded-xl bg-gray-800 p-4 border border-gray-700"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={req.from_user.avatar_url || '/placeholder-av.png'}
                    alt={req.from_user.username}
                    className="w-10 h-10 rounded-full object-overflow flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{req.from_user.username}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-gray-300 line-clamp-2">
                  {req.content}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAccept(req.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDecline(req.id)}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}