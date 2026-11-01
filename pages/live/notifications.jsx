/* 
 * Vurliqo - Notifications Integration
 * Phase 9: Module 11 - Notifications System
 * Extend existing notification system for Phase 9 features
 * Reuse existing Phase 4 notification architecture
 */

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';

export default function Notifications({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch notifications from Lovable Cloud backend
    // Would integrate with existing Phase 4 notification architecture
    const mockNotifications = [
      {
        id: 'notif-1',
        type: 'live_invitation',
        title: 'Live invitation',
        message: 'artist1 started a live broadcast',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        read: false,
        actionUrl: '/live/broadcast',
      },
    ];
    setNotifications(mockNotifications);
    setUnreadCount(1);
    setIsLoading(false);
  }, [userId]);

  const markAsRead = (notifId) => {
    // In full implementation, would mark as read via backend
    window.alert('Marked as read');
  };

  const clearAll = () => {
    // In full implementation, would clear via backend
    window.alert('All notifications cleared');
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
        <h1 className="text-2xl font-bold text-white mb-6">Notifications</h1>

        {/* Notification Summary */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-white">📬 {unreadCount} new</span>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="text-sm"
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div>
          <h2 className="font-medium text-white mb-3">Recent Notifications</h2>
          <p className="text-sm text-gray-400 mb-3">All notifications</p>
          
          {notifications.length === 0 && (
            <p className="text-gray-400">No notifications</p>
          )}

          <div className="grid grid-cols-1 gap-3">
            {notifications.map((notif) => {
              const isUnread = !notif.read;
              return (
                <div
                  key={notif.id}
                  className={`bg-gray-700 rounded-xl p-3 border border-gray-600 ${
                    isUnread ? 'border-yellow-500' : 'border-gray-500'
                  }`}
                >
                  <div className="flex items-between justify-between">
                    <span className="font-medium text-white">
                      {notif.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {notif.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{notif.message}</p>
                  {isUnread && (
                    <p className="text-xs text-yellow-400 font-medium">
                      Unread
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Notification Types */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <p>
            Reuses existing Phase 4 notification architecture. Supports:
          </p>
          <ul className="text-gray-300 space-y-1">
            <li>Live broadcasts</li>
            <li>Live invitations</li>
            <li>Broadcast channel announcements</li>
            <li>Community invitations</li>
            <li>Community announcements</li>
            <li>Poll updates</li>
            <li>Event invitations</li>
            <li>Event reminders</li>
            <li>Incoming calls</li>
            <li>Missed calls</li>
            <li>Notes interactions</li>
          </ul>
        </div>
      </div>
    </main>
  );
}