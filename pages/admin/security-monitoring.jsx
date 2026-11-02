/* 
 * Vurliqo - Security Monitoring
 * Phase 8: Administrative security overview
 * Do not claim to detect threats that the backend cannot actually measure
 * Avoid collecting unnecessary personal information
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";

export default function SecurityMonitoring({ userId, role }) {
  const [securityEvents, setSecurityEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch security events from Lovable Cloud backend
    // Would only show measurable security indicators
    // Do not claim to detect threats that the backend cannot actually measure
    const mockEvents = [
      {
        id: 'sec-1',
        type: 'failed_login',
        count: 5,
        timeframe: 'last 24 hours',
        target: 'various accounts',
        riskLevel: 'low',
      },
      {
        id: 'sec-2',
        type: 'report_spike',
        count: 12,
        timeframe: 'last 7 days',
        target: 'various content',
        riskLevel: 'medium',
      },
    ];
    setSecurityEvents(mockEvents);
    setIsLoading(false);
  }, [userId, role]);

  const adminRoles = ['super-admin', 'admin'];
  const canViewSecurity = adminRoles.includes(role);

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
        <h1 className="text-2xl font-bold text-white mb-6">Security Monitoring</h1>

        {!canViewSecurity && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Admin privileges required</p>
          </div>
        )}

        {canViewSecurity && (
          <div>
            <h2 className="font-medium text-white mb-3">Security Event Indicators</h2>
            <p className="text-sm text-gray-400 mb-3">
              Measurable security events where the backend can actually track
            </p>
            
            {securityEvents.length === 0 && (
              <p className="text-gray-400">No significant security events detected</p>
            )}

            {securityEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-800 rounded-2xl p-3 mb-3 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">{event.type}</span>
                  <span className={`text-xs font-bold ${
                    event.riskLevel === 'low' ? 'text-green-400' : event.riskLevel === 'medium' ? 'text-yellow-400' : 'text-red-400'
                  }`}>{event.riskLevel.toUpperCase()}</span>
                </div>
                <p className="text-xs text-gray-400">Count: {event.count}</p>
                <p className="text-xs text-gray-400">Timeframe: {event.timeframe}</p>
              </div>
            ))}
          </div>
        )}

        {/* Security Guidelines */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <h2 className="font-medium text-white mb-3">Security Guidelines</h2>
          <ul>
            <li>
              Do not claim to detect threats that the backend cannot actually measure
            </li>
            <li>
              Avoid collecting unnecessary personal information
            </li>
            <li>
              Security events are based on measurable backend events only
            </li>
            <li>
              All monitoring respects user privacy
            </li>
            <li>
              Unusual activity patterns are investigated by authorized personnel
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}