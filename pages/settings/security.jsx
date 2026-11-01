/* 
 * Vurliqo - Security Settings
 * Phase 6: Security dashboard
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function SecuritySettings({ userId }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loginActivity, setLoginActivity] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [showSessionManagement, setShowSessionManagement] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isCheckingSessions, setIsCheckingSessions] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch security data from backend
    setEmailVerified(false);
    setLoginActivity([
      { date: 'Today', device: 'iPhone', location: 'San Francisco', status: 'active' },
      { date: 'Yesterday', device: 'MacBook', location: 'New York', status: 'active' },
      { date: '2 days ago', device: 'iPad', location: 'London', status: 'ended' },
    ]);
    setActiveSessions([
      { id: 'session-1', device: 'iPhone', location: 'San Francisco', lastActivity: 'Now', status: 'active' },
      { id: 'session-2', device: 'MacBook', location: 'New York', lastActivity: '2h ago', status: 'active' },
      { id: 'session-3', device: 'iPad', location: 'London', lastActivity: 'Ended', status: 'ended' },
    ]);
    setIsCheckingSessions(false);
  }, [userId]);

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      window.alert('Passwords do not match');
      setIsChangingPassword(false);
      return;
    }
    setIsChangingPassword(true);
    // In full implementation, would change password with backend
    setIsChangingPassword(false);
    setPassword('');
    setConfirmPassword('');
    window.alert('Password changed successfully!');
  };

  const handleSignOutSession = async (sessionId) => {
    setIsSigningOut(true);
    // In full implementation, would sign out specific session with backend
    setIsSigningOut(false);
    window.alert('Signed out of selected session');
  };

  const handleSignOutAll = async () => {
    setIsSigningOut(true);
    // In full implementation, would sign out all other sessions with backend
    setIsSigningOut(false);
    window.alert('Signed out of all other sessions');
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Security Settings</h1>

        {/* Change Password */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Change Password</h2>
          <p className="text-xs text-gray-400 mb-4">Update your account password</p>
          
          <div className="mb-3">
            <label className="block text-sm text-gray-300 mb-2">New Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder "Enter new password"
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder "Confirm new password"
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleChangePassword}
            disabled={isChangingPassword || !password || password.length < 6}
          >
            {isChangingPassword ? 'Changing...' : 'Change Password'}
          </Button>
        </div>

        {/* Email Verification */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Email Verification</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="font-medium text-white">Status</p>
              <p className={`text-gray-300 ${
                emailVerified ? 'text-green-400' : 'text-red-500'
              }`}
            >
              {emailVerified ? 'Verified' : 'Not verified'}
            </p>
            </div>
            <div>
              <p className="font-medium text-white">Resend verification</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.alert('Verification email resent')}
                className="justify-center"
              >
                Resend
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            A verified email helps protect your account and enables password recovery
          </p>
        </div>

        {/* Login Activity */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Login Activity</h2>
          <p className="text-xs text-gray-400 mb-3">
            Recent device and location activity for your account
          </p>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {loginActivity.map((activity) => (
              <div
                key={activity.date}
                className={activity.status === 'active' ? 'flex items-center gap-3 p-3 rounded-md bg-gray-700' : 'flex items-center gap-3 p-3 rounded-md bg-gray-600 text-gray-400'}
              >
                <div className="w-3 h-3 rounded-full bg-{activity.status === 'active' ? 'green-500' : 'gray-400'} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{activity.device}</p>
                  <p className="text-xs text-gray-400">{activity.location}</p>
                </div>
                <p className="text-xs text-gray-400">{activity.status === 'active' ? 'Active' : 'Ended'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Active Sessions</h2>
          <p className="text-xs text-gray-400 mb-3">
            Currently active sessions on your account
          </p>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center gap-3 p-3 rounded-md bg-gray-700"
              >
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{session.device}</p>
                  <p className="text-xs text-gray-400">{session.location}</p>
                </div>
                <p className="text-xs text-gray-400">{session.lastActivity}</p>
              </div>
            ))}
          </div>
          
          {/* Session Management */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSessionManagement(true)}
            className="mt-2 w-full justify-center"
          >
            Manage Sessions
          </Button>
        </div>

        {/* Sign Out of All Other Sessions */}
        {showSessionManagement && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
            <h2 className="font-medium text-white mb-3">Sign Out of Other Sessions</h2>
            <p className="text-gray-400 mb-4">
              This will sign out all sessions except the current one
            </p>
            <Button
              variant="destructive"
              size="lg"
              onClick={handleSignOutAll}
              disabled={isSigningOut}
            >
              {isSigningOut ? 'Signing out...' : 'Sign Out of All Other Sessions'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowSessionManagement(false)}
              className="mt-2 w-full"
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Security Alerts */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Security Alerts</h2>
          <p className="text-xs text-gray-400">
            No security alerts at this time
          </p>
        </div>

        {/* Account Recovery */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Account Recovery</h2>
          <p className="text-xs text-gray-400 mb-4">
            Use your verified email to recover your account
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.alert('Initiating account recovery...')}
            className="w-full justify-center"
          >
            Start Recovery
          </Button>
        </div>
      </div>
    </main>
  );
}