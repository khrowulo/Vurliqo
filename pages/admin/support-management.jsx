/* 
 * Vurliqo - Support Management
 * Phase 8: Administrative support ticket dashboard
 * Only authorized support personnel may access tickets
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";

export default function SupportManagement({ userId, role }) {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch support tickets from Lovable Cloud backend
    // Only authorized support personnel may access tickets
    const mockTickets = [
      {
        id: 'ticket-1',
        subject: 'Account access issue',
        status: 'open',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        requester: 'user-3',
        assignedTo: 'support-agent-1',
      },
      {
        id: 'ticket-2',
        subject: 'Content removal request',
        status: 'in-progress',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        requester: 'user-1',
        assignedTo: 'support-agent-2',
      },
    ];
    setTickets(mockTickets);
    setIsLoading(false);
  }, [userId, role]);

  const supportRoles = ['support-agent'];
  const canAccessTickets = supportRoles.includes(role);

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
        <h1 className="text-2xl font-bold text-white mb-6">Support Ticket Dashboard</h1>

 {!canAccessTickets && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Support personnel privileges required</p>
          </div>
        )}

        {canAccessTickets && (
          <div>
            <h2 className="font-medium text-white mb-3">Active Tickets</h2>
            <p className="text-sm text-gray-400 mb-3">Support tickets requiring attention</p>
            
            {tickets.length === 0 && (
              <p className="text-gray-400">No active tickets</p>
            )}

            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-gray-800 rounded-2xl p-4 mb-3 border border-gray-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">{ticket.subject}</h3>
                  <span className="text-xs text-gray-400">{ticket.status}</span>
                </div>
                <p className="text-sm text-gray-400 mb-1">Requester: {ticket.requester}</p>
                <p className="text-xs text-gray-500">Assigned: {ticket.assignedTo}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.alert('View ticket details')}
                  className="w-full justify-center mt-2"
                >
                  View
                </Button>
              </div>
            ))}

            {/* Ticket Status Filters */}
            <div className="mt-4">
              <select
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
              >
                <option value="all">Show All</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="waiting">Waiting for User</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        )}

        {/* Support Guidelines */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <h2 className="font-medium text-white mb-3">Support Guidelines</h2>
          <ul className="text-gray-300 space-y-1">
            <li>Only authorized support personnel may access tickets</li>
            <li>Ticket statuses: Open, In Progress, Waiting for User, Resolved, Closed</li>
            <li>Add internal notes for team collaboration</li>
            <li>Track resolution and closure properly</li>
            <li>Maintain user privacy in all communications</li>
          </ul>
        </div>
      </div>
    </main>
  );
}