import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function UserManagement({ userId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('user');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setRole('admin');
      setUsers([
        { id: 1, username: 'john_doe', displayName: 'John Doe', status: 'active', createdAt: new Date() },
        { id: 2, username: 'jane_smith', displayName: 'Jane Smith', status: 'suspended', createdAt: new Date() },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <Button variant="ghost" disabled>
            Loading users...
          </Button>
        </div>
      </div>
    );
  }

  const adminRoles = ['super-admin', 'admin', 'moderator'];
  const hasAdminAccess = adminRoles.includes(role);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSuspendUser = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'suspended' } : u));
  };

  const handleRestoreUser = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' } : u));
  };

  const handleDisableUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>

        {!hasAdminAccess && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Admin privileges required</p>
          </div>
        )}

        {hasAdminAccess && (
          <>
            <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
              <h2 className="font-medium text-white mb-3">Search & Filter</h2>
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-3"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Show All</option>
                <option value="active">Active Only</option>
                <option value="suspended">Suspended Only</option>
              </select>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 overflow-x-auto">
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
                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-6 py-4 text-white">{user.username}</td>
                      <td className="px-6 py-4 text-white">{user.displayName}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'active' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {user.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        {user.status === 'active' && (
                          <Button variant="outline" size="sm" onClick={() => handleSuspendUser(user.id)}>
                            Suspend
                          </Button>
                        )}
                        {user.status === 'suspended' && (
                          <Button variant="outline" size="sm" onClick={() => handleRestoreUser(user.id)}>
                            Restore
                          </Button>
                        )}
                        <Button variant="destructive" size="sm" onClick={() => handleDisableUser(user.id)}>
                          Disable
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
