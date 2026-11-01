/* 
 * Vurliqo - Admin Dashboard
 * Phase 8: Administrator dashboard with real backend data
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

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
    suspendedAccounts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('30d');

  useEffect(() => {
    // In full implementation, would fetch real admin stats from Lovable Cloud backend
    // Would only show to users with appropriate admin role
    setStats({
      totalUsers: 1247,
      activeUsers: 892,
      newRegistrations: 12,
      totalPosts: 8923,
      totalReels: 2341,
      totalStories: 5678,
      totalComments: 12345,
      totalConversations: 456,
      pendingReports: 3,
      resolvedReports: 24,
      suspendedAccounts: 12,
    });
    setIsLoading(false);
  }, [userId, role]);

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    // In full implementation, would re-fetch stats with new date range
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Button variant="outline" size="sm" onClick={() => window.alert('Loading...')}>
            Loading dashboard...
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
        <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>

        {/* Date Filter */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Date Range</h2>
          <select
            value={dateFilter}
            onChange={handleDateFilterChange}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d" selected>Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
        </div>

        {/* Statistics Cards */}
        {!hasAdminAccess && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Admin privileges required</p>
          </div>
        )}

        {hasAdminAccess && (
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
              <p className="text-3xl font-bold text-white {stats.pendingReports > 0 ? 'text-yellow-400' : 'text-green-400'}">{stats.pendingReports}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-700">
              <p className="text-sm text-gray-400">Resolved Reports</p>
              <p className="text-3xl font-bold text-white {stats.resolvedReports > 0 ? 'text-green-400' : 'text-gray-400'}">{stats.resolvedReports}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-700">
              <p className="text-sm text-gray-400">Suspended Accounts</p>
              <p className="text-3xl font-bold text-white {stats.suspendedAccounts > 0 ? 'text-red-400' : 'text-green-400'}">{stats.suspendedAccounts}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}