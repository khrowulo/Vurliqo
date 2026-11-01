/* 
 * Vurliqo - Creator Monetization Foundation
 * Phase 7: Monetization dashboard
 * 
 * IMPORTANT: Build foundations only.
 * Do not invent earnings.
 * Do not display fake balances.
 * Do not claim payment processing is operational without real integrated provider.
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

export default function MonetizationDashboard({ userId }) {
  const [eligibility, setEligibility] = useState({
    isEligible: false,
    eligibilityReason: '',
    requiredFollowers: 1000,
    currentFollowers: 0,
    progressPercentage: 0,
  });
  const [earningsOverview, setEarningsOverview] = useState({
    totalEarnings: 0,
    pendingPayouts: 0,
    monthToDate: 0,
  });
  const [revenueRecords, setRevenueRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch real monetization data from Lovable Cloud backend
    // Would check creator program eligibility based on follower count, content quality, etc.
    setEligibility({
      isEligible: userId !== undefined,
      eligibilityReason: userId !== undefined 
        ? 'Meet creator program requirements' 
        : 'Apply to become eligible',
      requiredFollowers: 1000,
      currentFollowers: userId !== undefined ? 1247 : 0,
      progressPercentage: userId !== undefined ? Math.min(100, (1247 / 1000) * 100) : 0,
    });
    
    setEarningsOverview({
      totalEarnings: 0, // Would be real data from backend
      pendingPayouts: 0,
      monthToDate: 0,
    });
    
    // Mock revenue records
    setRevenueRecords([
      { id: '1', date: new Date(Date.now() - 86400000), amount: 0, type: 'ads', status: 'pending' },
      { id: '2', date: new Date(Date.now() - 172800000), amount: 0, type: 'brand_partnership', status: 'paid' },
    ]);
    
    setIsLoading(false);
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Image src="/loading.svg" alt="Loading" width={40} height={40} />
          <p className="mt-2 text-gray-500">Loading monetization data...</p>
        </div>
      </div>
    );
  }

  // Check if user can access monetization features
  const canAccessMonetization = eligibility.isEligible || userId !== undefined;

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Monetization</h1>

        {/* Eligibility Overview */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Eligibility Overview</h2>
          
          {!eligibility.isEligible && (
            <div className="bg-gray-900 rounded-md p-4 mb-4">
              <p className="text-sm text-gray-400">{eligibility.eligibilityReason}</p>
            </div>
          )}
          
          {eligibility.isEligible && (
            <div className="bg-gray-900 rounded-md p-4 mb-4">
              <p className="text-sm text-green-400">✓ Eligible for creator programs</p>
            </div>
          )}
          
          <div className="mt-4">
            <p className="text-sm text-gray-400">Required followers: {eligibility.requiredFollowers}</p>
            <div className="mt-2 h-2 rounded-full bg-gray-700 overflow-hidden">
              <div
                className={`h-full bg-primary-600 rounded-full transition-width ${eligibility.progressPercentage}%`}
                style={{ width: `${eligibility.progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">${eligibility.progressPercentage}% progress</p>
          </div>
        </div>

        {/* Earnings Overview */}
        {canAccessMonetization && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
            <h2 className="font-medium text-white mb-3">Earnings Overview</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Total earnings</p>
                <p className="text-2xl font-bold text-white">${earningsOverview.totalEarnings}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Month to date</p>
                <p className="text-2xl font-bold text-white">${earningsOverview.monthToDate}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gray-700">
                <p className="text-sm text-gray-400">Pending payouts</p>
                <p className="text-2xl font-bold text-white">${earningsOverview.pendingPayouts}</p>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Records */}
        {canAccessMonetization && (
          <div>
            <h2 className="font-medium text-white mb-3">Revenue Records</h2>
            <p className="text-sm text-gray-400 mb-3">Transaction history</p>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {revenueRecords.map((revenue) => (
                <div
                  key={revenue.id}
                  className="p-3 rounded-2xl bg-gray-700 flex items-center gap-3"
                >
                  <span className="text-sm text-gray-300">{revenue.type}</span>
                  <p className="font-medium text-white">${revenue.amount}</p>
                  <p className="text-xs text-gray-400">{revenue.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monetization Settings */}
        {canAccessMonetization && (
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h2 className="font-medium text-white mb-3">Monetization Settings</h2>
            <p className="text-sm text-gray-400 mb-3">
              Configure available monetization programs
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.alert('View monetization programs')}
              className="w-full justify-center"
            >
              View Programs
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}