/* 
 * Vurliqo - Content Moderation
 * Phase 8: Centralized moderation centre
 * Only accessible to authorized admin/moderator roles
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

export default function ContentModeration({ userId, role }) {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch reports from Lovable Cloud backend
    // Would only show to users with appropriate moderator role
    const mockReports = [
      {
        id: 'report-1',
        type: 'post',
        itemId: 'post-1',
        reason: 'spam',
        status: 'pending',
        reportedBy: 'user-2',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'report-2',
        type: 'reel',
        itemId: 'reel-1',
        reason: 'inappropriate',
        status: 'under-review',
        reportedBy: 'user-3',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
    ];
    setReports(mockReports);
    setIsLoading(false);
  }, [userId, role]);

  const adminRoles = ['super-admin', 'admin', 'moderator'];
  const hasModeratorAccess = adminRoles.includes(role);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Button variant="outline" size="sm" onClick={() => window.alert('Loading...')}>
            Loading moderation data...
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Content Moderation</h1>

        {!hasModeratorAccess && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Moderator privileges required</p>
          </div>
        )}

        {hasModeratorAccess && (
          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Pending Reports */}
            <div>
              <h2 className="font-medium text-white mb-3">Pending Reports</h2>
              <p className="text-sm text-gray-400 mb-3">Reports awaiting review</p>
              <div className="h-64 bg-gray-700 rounded-2xl p-4">
                <p className="text-gray-400/50">Reports will appear here</p>
                {reports.map((report) => (
                  report.status === 'pending' && (
                    <div
                      key={report.id}
                      className="border-t border-gray-600 py-2 mt-2"
                    >
                      <p className="font-medium text-white">{report.type}</p>
                      <p className="text-xs text-gray-400">Reason: {report.reason}</p>
                      <p className="text-xs text-gray-400">Reported by: {report.reportedBy}</p>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Under Review */}
            <div>
              <h2 className="font-medium text-white mb-3">Under Review</h2>
              <p className="text-sm text-gray-400 mb-3">Reports in review process</p>
              <div className="h-64 bg-gray-700 rounded-2xl p-4">
                <p className="text-gray-400/50">Reviews will appear here</p>
              </div>
            </div>
          </div>

          {/* Moderation Actions */}
          <div>
            <h2 className="font-medium text-white mb-3">Moderation Actions</h2>
            <p className="text-sm text-gray-400 mb-3">Take action on reported content</p>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.alert('Hide content')}
              className="mb-2"
            >
              Hide
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => window.alert('Remove content')}
              className="mb-2"
            >
              Remove
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.alert('Issue warning')}
              className="mb-2"
            >
              Warn
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.alert('Escalate report')}
              className="mb-2"
            >
              Escalate
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}