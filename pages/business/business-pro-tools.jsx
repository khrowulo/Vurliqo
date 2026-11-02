/* 
 * Vurliqo - Business Professional Tools
 * Phase 7: Business account tools
 * Maintains existing Business Chat system
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";

export default function BusinessProfessionalTools({ userId, accountType }) {
  const [businessDashboard, setBusinessDashboard] = useState({
    profileViews: 0,
    websiteClicks: 0,
    emailContacts: 0,
    directionRequests: 0,
  });
  const [businessContentPerformance, setBusinessContentPerformance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch business data from Lovable Cloud backend
    // Would only show to Business account types
    setBusinessDashboard({
      profileViews: Math.floor(Math.random() * 500),
      websiteClicks: Math.floor(Math.random() * 200),
      emailContacts: Math.floor(Math.random() * 50),
      directionRequests: Math.floor(Math.random() * 30),
    });
    
    // Mock business content performance
    setBusinessContentPerformance([
      { id: '1', type: 'post', title: 'Business Post 1', views: 245, engagements: 32 },
      { id: '2', type: 'post', title: 'Business Post 2', views: 189, engagements: 24 },
    ]);
    
    setIsLoading(false);
  }, [userId, accountType]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Image src="/loading.svg" alt="Loading" width={40} height={40} />
          <p className="mt-2 text-gray-500">Loading business tools...</p>
        </div>
      </div>
    );
  }

  // Only show to Business account types
  const showToBusinessType = accountType === 'business';

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          {showToBusinessType ? 'Business Tools' : 'Business Account'}
        </h1>

        {!showToBusinessType && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700 text-center">
            <p className="text-gray-400">Business tools available for Business accounts</p>
            <p className="text-sm mt-2">
              Switch to Business account type to access these features
            </p>
          </div>
        )}

        {showToBusinessType && (
          <div>
            {/* Business Dashboard */}
            <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
              <h2 className="font-medium text-white mb-3">Business Dashboard</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-gray-700">
                  <p className="text-sm text-gray-400">Profile views</p>
                  <p className="text-2xl font-bold text-white">{businessDashboard.profileViews}</p>
                </div>
                <div className="p-3 rounded-2xl bg-gray-700">
                  <p className="text-sm text-gray-400">Website clicks</p>
                  <p className="text-2xl font-bold text-white">{businessDashboard.websiteClicks}</p>
                </div>
                <div className="p-3 rounded-2xl bg-gray-700">
                  <p className="text-sm text-gray-400">Email contacts</p>
                  <p className="text-2xl font-bold text-white">{businessDashboard.emailContacts}</p>
                </div>
                <div className="p-3 rounded-2xl bg-gray-700">
                  <p className="text-sm text-gray-400">Direction requests</p>
                  <p className="text-2xl font-bold text-white">{businessDashboard.directionRequests}</p>
                </div>
              </div>
            </div>

            {/* Business Content Performance */}
            {businessContentPerformance.length > 0 && (
              <div>
                <h2 className="font-medium text-white mb-3">Content Performance</h2>
                <p className="text-sm text-gray-400 mb-3">Business content results</p>
                <div className="space-y-3 max-h-[250px] overflow-y-auto">
                  {businessContentPerformance.map((content) => (
                    <div
                      key={content.id}
                      className="p-3 rounded-2xl bg-gray-700 flex items-center gap-3"
                    >
                      <span className="text-sm text-gray-300">{content.type}</span>
                      <p className="font-medium text-white">{content.title}</p>
                      <p className="text-xs text-gray-400">{content.views} views, {content.engagements} engagements</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Business Profile Management */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h2 className="font-medium text-white mb-3">Business Profile</h2>
              <p className="text-sm text-gray-400 mb-3">
                Manage business profile information
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.alert('Edit business profile')}
                className="w-full justify-center"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}