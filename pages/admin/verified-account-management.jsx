/* 
 * Vurliqo - Verified Account Management
 * Phase 8: Verification review system
 * Verification badges must only be granted after authorized approval
 * Never automatically verify accounts based on follower counts
 * Protect submitted verification documents and restrict access to authorized reviewers
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";

export default function VerifiedAccountManagement({ userId, role }) {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch verification applications from Lovable Cloud backend
    // Would only show to super-admin or designated reviewers
    const mockApplications = [
      {
        id: 'app-1',
        applicant: 'user-1',
        username: 'verified_creator',
        status: 'pending',
        submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        documents: ['id_document', 'profile_photo'],
        requiredFollowers: 1000,
        currentFollowers: 1247,
      },
      {
        id: 'app-2',
        applicant: 'user-2',
        username: 'aspiring_influencer',
        status: 'under-review',
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        documents: ['id_document'],
        requiredFollowers: 1000,
        currentFollowers: 850,
      },
    ];
    setApplications(mockApplications);
    setIsLoading(false);
  }, [userId, role]);

  const adminRoles = ['super-admin'];
  const canReview = adminRoles.includes(role);

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
        <h1 className="text-2xl font-bold text-white mb-6">Verified Account Management</h1>

        {!canReview && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Super Administrator privileges required</p>
          </div>
        )}

        {canReview && (
          <div>
            <h2 className="font-medium text-white mb-3">Verification Applications</h2>
            <p className="text-sm text-gray-400 mb-3">Applications awaiting review</p>
            
            {applications.length === 0 && (
              <p className="text-gray-400">No verification applications at this time</p>
            )}

            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-gray-800 rounded-2xl p-4 mb-3 border border-gray-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold">{app.username}</span>
                  <span className="text-sm text-gray-400">(@{app.username})</span>
                </div>
                <p className="text-sm text-gray-400">Applied: {app.submittedAt.toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">Followers: {app.currentFollowers}/{app.requiredFollowers}</p>
                
                <div className="mt-2">
                  <select
                    className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.alert('Application status updated')}
                    className="mt-1 w-full justify-center"
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Information */}
        {!canReview && (
          <div>
            <h2 className="font-medium text-white mb-3">Verification Requirements</h2>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>
                Verification applications require super-admin review
              </li>
              <li>
                Documents are protected and restrict access to authorized reviewers only
              </li>
              <li>
                Verification badges must only be granted after authorized approval
              </li>
              <li>
                Accounts are never automatically verified based on follower counts alone
              </li>
              <li>
                Additional information may be requested from applicants
              </li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}