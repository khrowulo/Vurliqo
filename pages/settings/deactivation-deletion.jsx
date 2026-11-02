/* 
 * Vurliqo - Account Deactivation & Deletion
 * Phase 6: Account lifecycle management
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function AccountDeletionDeactivation({ userId }) {
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deactivationPeriod, setDeactivationPeriod] = useState('24h');
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  useEffect(() => {
    // In full implementation, would check current account status from backend
  }, [userId]);

  const handleRequestDeactivation = async () => {
    setIsDeactivating(true);
    // In full implementation, would request temporary deactivation with backend
    // Would hide the account according to deactivation policy
    // Would preserve account data
    setIsDeactivating(false);
    window.alert('Account deactivation requested. You will be emailed when your account is deactivated.');
  };

  const handleRequestPermanentDeletion = async () => {
    setConfirmDeletion(true);
  };

  const handleConfirmPermanentDeletion = async () => {
    setIsDeleting(true);
    // In full implementation, would process permanent deletion with backend
    // Would require explicit confirmation
    // Would apply deletion schedule
    // Would handle related content and account relationships consistently
    setIsDeleting(false);
    setConfirmDeletion(false);
    window.alert('Permanent deletion request submitted. Your account and data will be deleted according to our data retention policy.');
  };

  const handleCancelDeletion = () => {
    setConfirmDeletion(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Account Management</h1>

        {/* Temporary Deactivation */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Temporary Deactivation</h2>
          <p className="text-gray-400 mb-4">
            Hide your account temporarily. Your data will be preserved and you can reactivate anytime.
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={handleRequestDeactivation}
            disabled={isDeactivating}
          >
            {isDeactivating ? 'Deactivating...' : 'Deactivate Account Temporarily'}
          </Button>
          <p className="text-xs text-gray-400 mt-3">
            Your account will be hidden from other users. You can reactivate anytime by logging in.
          </p>
        </div>

        {/* Permanent Deletion */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Permanent Deletion</h2>
          <p className="text-gray-400 mb-4">
            Permanently delete your account and all associated data.
          </p>
          
          <p className="text-xs text-gray-500 mb-3">
            <strong>This action cannot be undone.</strong>
          </p>
          
          <p className="text-xs text-gray-400 mb-4">
            <strong>What will be deleted:</strong>
          </p>
          <ul className="text-xs text-gray-400 space-y-1 mb-4">
            <li>Your posts and reels</li>
            <li>Your comments and interactions</li>
            <li>Your followers and following lists</li>
            <li>Your saved collections</li>
            <li>Your messages and chat history</li>
            <li>Your profile information</li>
          </ul>
          
          <p className="text-xs text-gray-400 mb-4">
            <strong>What will be preserved:</strong>
          </p>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>Data retention requirements (some data may be kept per applicable laws)</li>
            <li>Account records for legal compliance</li>
          </ul>
          
          <Button
            variant="destructive"
            size="lg"
            onClick={handleRequestPermanentDeletion}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Account Permanently'}
          </Button>
          
          {confirmDeletion && (
            <div>
              <p className="text-warning text-xs mb-3">
                Are you sure you want to permanently delete your account?
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleConfirmPermanentDeletion}
              >
                Yes, Delete Account
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelDeletion}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Deactivation Period */}
        { !confirmDeletion && (
          <div>
            <p className="text-xs text-gray-400 mb-2">
              Deactivation period: 
            </p>
            <select
              value={deactivationPeriod}
              onChange={(e) => setDeactivationPeriod(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
            >
              <option value="24h">24 hours</option>
              <option value="72h">72 hours</option>
              <option value="7d">7 days</option>
              <option value="30d">30 days</option>
            </select>
          </div>
        )}

        {/* Important Notes */}
        <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Important</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              Do not delete an account immediately through an accidental button click
            </li>
            <li>
              A clearly communicated deletion schedule will be applied
            </li>
            <li>
              Related content and account relationships will be handled consistently
            </li>
            <li>
              Applicable data-retention requirements will be respected
            </li>
            <li>
              Permanent deletion requires explicit confirmation
            </li>
            <li>
              Authentication is required for deletion requests
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}