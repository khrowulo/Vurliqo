/* 
 * Vurliqo - User Management
 * Phase 8: Complete user administration system
 * Only accessible to authorized admin roles
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function UserManagement({ userId, role }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch users from Lovable Cloud backend
    // Would only show to users with appropriate admin role
    const mockUsers = [
      { id: 'user-1', username: 'admin1', displayName: 'Admin User', status: 'active', createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) },
      { id: 'user-2', username: 'creator1', displayName: 'Content Creator', status: 'active', createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
      { id: 'user-3', username: 'banned_user', displayName: 'Suspended User', status: 'suspended', createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    ];
    setUsers(mockUsers);
    setIsLoading(false);
  }, [userId, role]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (user.displayName && user.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleWarnUser = (userId) => {
    // In full implementation, would warn user with backend
    window.alert(`User ${userId} warned`);
  };

  const handleSuspendUser = (userId) => {
    // In full implementation, would suspend user with backend confirmation
    window.alert(`User ${userId} suspended`);
  };

  const handleRestoreUser = (userId) => {
    // In full implementation, would restore suspended account
    window.alert(`User ${userId} restored`);
  };

  const handleDisableUser = (userId) => {
    // In full implementation, would permanently disable account
    window.alert(`User ${userId} permanently disabled`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Button variant="outline" size="sm" onClick={() => window.alert('Loading...')}>
            Loading users...
          </Button>
        </div>
      </div>
    );
  }

  // Check if user has admin access
  const adminRoles = ['super-admin', 'admin', 'moderator'];
  const hasAdminAccess = adminRoles.includes(role);

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>

        {/* Access Denied */}
        {!hasAdminAccess && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Admin privileges required</p>
          </div>
        )}

        {hasAdminAccess && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
            <h2 className="font-medium text-white mb-3">Search & Filter</h2>
            
            <Input
              type="text"
              placeholder="Search users by username or display name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
            />
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
            >
              <option value="all">Show All</option>
              <option value="active">Active Only</option>
              <option value="suspended">Suspended Only</option>
            </select>
          </div>

          {/* Users List */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Display Name</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Joined</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-white">{user.username}</td>
                    <td className="px-6 py-4">{user.displayName || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.status === 'suspended' ? 'text-red-400 bg-red-900/20' : 'text-green-400 bg-green-900/20'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {user.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {user.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuspendUser(user.id)}
                        >
                          Suspend
                        </Button>
                      )}
                      {user.status === 'suspended' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRestoreUser(user.id)}
                        >
                          Restore
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDisableUser(user.id)}
                        className="ml-1"
                      >
                        Disable
                      </Button>
                    </td>
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