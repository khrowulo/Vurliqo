import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function PlatformConfiguration({ userId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('user');
  const [config, setConfig] = useState({
    siteName: 'Vurliqo',
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: false,
    maxUploadSize: 100
  });

  useEffect(() => {
    setTimeout(() => {
      setRole('admin');
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <Button variant="ghost" disabled>
            Loading configuration...
          </Button>
        </div>
      </div>
    );
  }

  const adminRoles = ['super-admin', 'admin'];
  const hasAdminAccess = adminRoles.includes(role);

  const handleSave = () => {
    alert('Configuration saved');
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Platform Configuration</h1>

        {!hasAdminAccess && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-6 text-center text-gray-400">
            <p className="text-sm">Access denied</p>
            <p className="mt-2">Admin privileges required</p>
          </div>
        )}

        {hasAdminAccess && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
            <h2 className="font-medium text-white mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Site Name</label>
                <Input
                  value={config.siteName}
                  onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Maintenance Mode</label>
                <input
                  type="checkbox"
                  checked={config.maintenanceMode}
                  onChange={(e) => setConfig({ ...config, maintenanceMode: e.target.checked })}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Registration Enabled</label>
                <input
                  type="checkbox"
                  checked={config.registrationEnabled}
                  onChange={(e) => setConfig({ ...config, registrationEnabled: e.target.checked })}
                  className="rounded"
                />
              </div>
              <Button onClick={handleSave} className="mt-4">Save Configuration</Button>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h2 className="font-medium text-white mb-2">Security Note</h2>
          <p className="text-gray-400 text-sm">
            All sensitive configuration must be managed through secure server-side processes
          </p>
        </div>
      </div>
    </main>
  );
}
