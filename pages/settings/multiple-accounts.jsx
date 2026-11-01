/* 
 * Vurliqo - Multiple Account Management
 * Phase 6: Support multiple account switching
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function MultipleAccounts({ userId }) {
  const [accounts, setAccounts] = useState([
    { id: 'account-1', name: 'Primary', type: 'personal', isActive: true },
    { id: 'account-2', name: 'Secondary', type: 'personal', isActive: false },
  ]);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');

  useEffect(() => {
    // In full implementation, would fetch accounts from backend
    // Would preserve separate account settings, messages, posts, etc.
  }, [userId]);

  const handleAddAccount = async () => {
    setIsAddingAccount(true);
    // In full implementation, would create new account with backend
    // Would not merge account data - each account has independent permissions
    const newAccount = {
      id: `account-${Date.now()}`,
      name: newAccountName || 'New Account',
      type: 'personal',
      isActive: false,
    };
    setAccounts(prev => [...prev, newAccount]);
    setNewAccountName('');
    setIsAddingAccount(false);
    window.alert('Account added successfully');
  };

  const handleSwitchAccount = async (accountId) => {
    setIsSwitching(true);
    // In full implementation, would switch account with backend
    // Would preserve separate account settings
    // Would not mix messages, notifications or posts between accounts
    setIsSwitching(false);
    window.alert('Switched to account: ' + accounts.find(a => a.id === accountId)?.name);
  };

  const handleRemoveAccount = async (accountId) => {
    setIsSwitching(true);
    // In full implementation, would remove account with backend
    // Would not delete data - preserve separate account settings
    setAccounts(prev => prev.filter(a => a.id !== accountId));
    setIsSwitching(false);
    window.alert('Account removed');
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Multiple Accounts</h1>

        {/* Current Active Account */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Active Account</h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
              {accounts.find(a => a.isActive)?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="font-medium text-white">{accounts.find(a => a.isActive)?.name || 'No active account'}</p>
              <p className="text-xs text-gray-400">Tap to switch</p>
            </div>
          </div>
        </div>

        {/* Account List */}
        <div className="grid grid-cols-1 gap-3">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={account.isActive 
                ? 'bg-primary-600 text-white p-4 rounded-xl'
                : 'bg-gray-700 text-white p-4 rounded-xl cursor-pointer hover:bg-gray-600 transition-colors'
              }
              onClick={() => handleSwitchAccount(account.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm">{account.name}</span>
                <span className="text-xs text-gray-300">{account.type} account</span>
              </div>
              {account.isActive && (
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="text-gray-300"
                >
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Add New Account */}
        {(!accounts.some(a => a.isActive) || accounts.length < 3) && (
          <div className="mt-8 p-6 bg-gray-800 rounded-2xl border border-gray-700">
            <h2 className="font-medium text-white mb-3">Add Another Account</h2>
            <p className="text-gray-400 mb-4">
              Each account has independent settings, followers, and content
            </p>
            <Input
              type="text"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              placeholder "Account name"
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddAccount}
              disabled={isAddingAccount}
            >
              {isAddingAccount ? 'Adding...' : 'Add Account'}
            </Button>
          </div>
        )}

        {/* Management Notes */}
        <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Account Management</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              Do not merge account data between accounts
            </li>
            <li>
              Do not mix messages, notifications or posts between accounts
            </li>
            <li>
              Each account has independent permissions and settings
            </li>
            <li>
              Signing out of one account does not affect others
            </li>
            <li>
              Account data is preserved independently
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}