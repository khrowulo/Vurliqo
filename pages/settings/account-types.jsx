/* 
 * Vurliqo - Account Types
 * Phase 6: Support Personal, Creator, and Business account types
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function AccountTypes({ userId }) {
  const [currentAccountType, setCurrentAccountType] = useState('personal');
  const [isSwitching, setIsSwitching] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [creatorCategory, setCreatorCategory] = useState('');

  useEffect(() => {
    // In full implementation, would fetch current account type from backend
    setCurrentAccountType('personal');
  }, [userId]);

  const handleSwitchAccountType = async (type) => {
    setIsSwitching(true);
    // In full implementation, would switch account type with backend
    // Would preserve posts, followers, messages, and account history
    setIsSwitching(false);
    setCurrentAccountType(type);
    window.alert(`Account switched to ${type} type`);
  };

  if (isSwitching) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-md mx-auto flex flex-col items-center justify-center pt-20">
          <Image src="/loading.svg" alt="Loading" width={40} height={40} />
          <p className="mt-2 text-gray-500">Switching account type...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Account Type</h1>

        {/* Current Account Type Display */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{currentAccountType.charAt(0).toUpperCase() + currentAccountType.slice(1)} Account</h2>
          <p className="text-gray-400">Current account type</p>
          <p className="text-sm text-gray-500">Switch to a different account type below</p>
        </div>

        {/* Switch Account Type Section */}
        <div className="mb-8">
          <h2 className="font-medium text-white mb-4">Switch Account Type</h2>

          {currentAccountType === 'personal' && (
            <div className="mb-4 p-4 bg-gray-700 rounded-xl border border-gray-600">
              <p className="text-gray-300 text-sm mb-2">Personal accounts</p>
              <p className="text-gray-400 text-sm">
                Standard social interactions. Private/public account options available.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwitchAccountType('creator')}
                className="w-full mb-2"
              >
                Switch to Creator Account
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwitchAccountType('business')}
                className="w-full"
              >
                Switch to Business Account
              </Button>
            </div>
          )}

          {currentAccountType === 'creator' && (
            <div className="mb-4 p-4 bg-gray-700 rounded-xl border border-gray-600">
              <p className="text-gray-300 text-sm mb-2">Creator accounts</p>
              <p className="text-gray-400 text-sm">
                Professional profile information. Audience insights foundation.
              </p>
              <Input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder "Creator name"
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
              />
              <select
                value={creatorCategory}
                onChange={(e) => setCreatorCategory(e.target.value)}
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
              >
                <option value="">Select creator category</option>
                <option value="fitness">Fitness & Health</option>
                <option value="art">Art & Design</option>
                <option value="tech">Technology</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwitchAccountType('personal')}
                className="w-full mb-2"
              >
                Switch to Personal Account
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwitchAccountType('business')}
                className="w-full"
              >
                Switch to Business Account
              </Button>
            </div>
          )}

          {currentAccountType === 'business' && (
            <div className="mb-4 p-4 bg-gray-700 rounded-xl border border-gray-600">
              <p className="text-gray-300 text-sm mb-2">Business accounts</p>
              <p className="text-gray-400 text-sm">
                Business description. Contact details. Website integration.
              </p>
              <Input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder "Business name"
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
              />
              <Input
                type="text"
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder "Describe your business"
                className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3 rows={3}"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwitchAccountType('personal')}
                className="w-full mb-2"
              >
                Switch to Personal Account
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwitchAccountType('creator')}
                className="w-full"
              >
                Switch to Creator Account
              </Button>
            </div>
          )}
        </div>

        {/* Important Notes */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Important</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              Your posts, followers, messages, and account history will be preserved
              when switching account types
            </li>
            <li>
              Do not automatically grant verified status when switching to Creator or
              Business accounts
            </li>
            <li>
              Each account type has independent permissions and settings
            </li>
            <li>
              Business accounts may have additional verification application requirements
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}