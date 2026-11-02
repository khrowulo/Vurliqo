import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";

export default function AdminDashboard({ userId, role }) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newRegistrations: 0,
    totalPosts: 0,
    totalReels: 0,
    totalStories: 0,
    totalComments: 0,
    totalConversations: 0,
    pendingReports: 0,
    resolvedReports: 0,
    suspendedAccounts: 0
  });
  const [loading, setLoading] = useState(true);
  const hasAdminAccess = role === 'admin' || role === 'super-admin';

  useEffect(() => {
    // Mock data for now
    setStats({
      totalUsers: 1250,
      activeUsers: 890,
      newRegistrations: 45,
      totalPosts: 3420,
      totalReels: 1890,
      totalStories: 567,
      totalComments: 8930,
      totalConversations: 2340,
      pendingReports: 12,
      resolvedReports: 156,
      suspendedAccounts: 8
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-white">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>

        {!hasAdminAccess && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Admin privileges required</p>
          </div>
        )}

        {hasAdminAccess && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
              <div className="p-4 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Active Users</p>
                <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">New Registrations</p>
                <p className="text-3xl font-bold text-white">{stats.newRegistrations}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Total Posts</p>
                <p className="text-3xl font-bold text-white">{stats.totalPosts}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Total Reels</p>
                <p className="text-3xl font-bold text-white">{stats.totalReels}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Total Stories</p>
                <p className="text-3xl font-bold text-white">{stats.totalStories}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
              <div className="p-4 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Total Comments</p>
                <p className="text-3xl font-bold text-white">{stats.totalComments}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Total Conversations</p>
                <p className="text-3xl font-bold text-white">{stats.totalConversations}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Pending Reports</p>
                <p className="text-3xl font-bold text-white" style={{color: stats.pendingReports > 0 ? "#facc15" : "#4ade80"}}>{stats.pendingReports}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Resolved Reports</p>
                <p className="text-3xl font-bold text-white" style={{color: stats.resolvedReports > 0 ? "#4ade80" : "#9ca3af"}}>{stats.resolvedReports}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Suspended Accounts</p>
                <p className="text-3xl font-bold text-white" style={{color: stats.suspendedAccounts > 0 ? "#f87171" : "#4ade80"}}>{stats.suspendedAccounts}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
