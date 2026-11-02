/* 
 * Vurliqo - Audit Logs
 * Phase 8: Immutable administrative audit trail
 * Records all administrative actions for security and accountability
 * Ordinary administrators must not be able to alter or erase audit records
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";

export default function AuditLogs({ userId, role }) {
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch audit logs from Lovable Cloud backend
    // Audit logs must be immutable - ordinary admins cannot modify/erase them
    const mockLogs = [
      {
        id: 'log-1',
        actor: 'super-admin',
        action: 'user_suspended',
        target: 'user-5',
        timestamp: new Date(Date.now() - 86400000),
        reason: 'Repeated policy violations',
        outcome: 'Account suspended for 7 days',
      },
      {
        id: 'log-2',
        actor: 'admin',
        action: 'content_removed',
        target: 'post-1',
        timestamp: new Date(Date.now() - 172800000),
        reason: 'Spam content',
        outcome: 'Post hidden, user warned',
      },
    ];
    setAuditLogs(mockLogs);
    setIsLoading(false);
  }, [userId, role]);

  // Check if user can view audit logs
  const adminRoles = ['super-admin', 'admin'];
  const canViewLogs = adminRoles.includes(role);

  // Check if user can modify audit logs (should always be false for security)
  const canModifyLogs = false; // Security: ordinary admins cannot modify audit records

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Button variant="outline" size="sm" onClick={() => window.alert('Loading...')}>
            Loading audit logs...
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Audit Logs</h1>

        {/* Access Info */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Audit Trail Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Actor</p>
              <p className="font-medium text-white">{role || '—'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Can Modify</p>
              <p className="font-medium text-red-400">No</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Audit records are immutable and cannot be modified or erased by ordinary administrators.
          </p>
        </div>

        {/* Logs List */}
        {!canViewLogs && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Insufficient privileges</p>
          </div>
        )}

        {canViewLogs && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                  <th className="px-6 py-3">Actor</th>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Target</th>
                  <th className="px-6 py-3">Timestamp</th>
                  <th className="px-6 py-3">Reason</th>
                  <th className="px-6 py-3">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-white">{log.actor}</td>
                    <td className="px-6 py-4 text-xs text-gray-300">{log.action}</td>
                    <td className="px-6 py-4">{log.target}</td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {log.timestamp.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-300">{log.reason}</td>
                    <td className="px-6 py-4 text-xs text-gray-300">{log.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}