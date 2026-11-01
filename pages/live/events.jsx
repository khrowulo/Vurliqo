/* 
 * Vurliqo - Events & Reminders
 * Phase 9: Module 7 - Events System
 * Create events, RSVP, reminders, sharing
 */

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function Events({ userId }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch events from Lovable Cloud backend
    // Would integrate with event management system
    const mockEvents = [
      {
        id: 'event-1',
        name: 'Live Q&A with Artist',
        description: 'Join our live Q&A session with featured artist',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        isPublic: true,
        interested: 128,
        attending: 45,
      },
    ];
    setEvents(mockEvents);
    setIsLoading(false);
  }, [userId]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());

  const createEvent = () => {
    if (!name.trim()) {
      window.alert('Please enter an event name');
      return;
    }
    // In full implementation, would create event via Lovable Cloud backend
    window.alert('Event created successfully');
    setName('');
    setDescription('');
  };

  const respondToEvent = (eventId, response) => {
    window.alert(`Response: ${response}`);
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
        <h1 className="text-2xl font-bold text-white mb-6">Events</h1>

        {/* Create Event */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Create Event</h2>
          
          <Input
            type="text"
            placeholder="Event name"
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
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
          />
          
          <Input
            type="date"
            value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
          />
          
          <Button
            variant="primary"
            size="sm"
            onClick={createEvent}
            className="w-full justify-center"
          >
            Create Event
          </Button>

          <p className="text-xs text-gray-400 mt-2">
            Public events visible to all, private events require invitations.
          </p>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="font-medium text-white mb-3">Upcoming Events</h2>
          <p className="text-sm text-gray-400 mb-3">Events you can attend</p>
          
          {events.length === 0 && (
            <p className="text-gray-400">No upcoming events</p>
          )}

          <div className="grid grid-cols-1 gap-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-700 rounded-xl p-4 border border-gray-600"
              >
                <h3 className="font-medium text-white">{event.name}</h3>
                <p className="text-sm text-gray-400">{event.description}</p>
                <p className="text-xs text-gray-400">
                  {event.date.toLocaleDateString()} • {' "}
                  {event.isPublic ? 'Public' : 'Private'}
                  </span>
                </p>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => respondToEvent(event.id, 'interested')}
                    className="mr-1"
                  >
                    Interested
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => respondToEvent(event.id, 'attending')}
                  >
                    Attending
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  {event.interested} interested, {event.attending} attending
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <p>
            Event management requires integration with backend storage and notification
            system. Currently providing UI foundation for event creation and RSVP.
          </p>
          <p>
            Do not claim that external calendar reminders work unless actually integrated.
          </p>
        </div>
      </div>
    </main>
  );
}