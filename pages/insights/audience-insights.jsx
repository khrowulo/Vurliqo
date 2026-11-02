/* 
 * Vurliqo - Audience Insights
 * Phase 7: Audience insights
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";

export default function AudienceInsights({ userId }) {
  const [followerGrowth, setFollowerGrowth] = useState([]);
  const [newFollowers, setNewFollowers] = useState([]);
  const [unfollows, setUnfollows] = useState([]);
  const [audienceEngagement, setAudienceEngagement] = useState([]);
  const [mostEngagedContent, setMostEngagedContent] = useState([]);
  const [audienceActivityPeriods, setAudienceActivityPeriods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch real audience insights from Lovable Cloud backend
    setFollowerGrowth([
      { date: new Date(Date.now() - 86400000), count: 5 },
      { date: new Date(Date.now() - 86400000 * 2), count: 3 },
      { date: new Date(Date.now() - 86400000 * 3), count: 7 },
      { date: new Date(Date.now() - 86400000 * 4), count: 2 },
      { date: new Date(Date.now() - 86400000 * 5), count: 6 },
      { date: new Date(Date.now() - 86400000 * 6), count: 4 },
      { date: new Date(Date.now() - 86400000 * 7), count: 8 },
    ]);
    
    setNewFollowers([
      { id: 'user-1', username: 'alice', joined: new Date(Date.now() - 86400000 * 3) },
      { id: 'user-2', username: 'bob', joined: new Date(Date.now() - 86400000 * 2) },
      { id: 'user-3', username: 'diana', joined: new Date() },
    ]);
    
    setUnfollows([
      { id: 'user-4', username: 'charlie', unfollowed: new Date(Date.now() - 86400000 * 5) },
      { id: 'user-5', username: 'eve', unfollowed: new Date(Date.now() - 86400000 * 2) },
    ]);
    
    setAudienceEngagement([
      { user: 'alice', engagement: 95 },
      { user: 'bob', engagement: 87 },
      { user: 'diana', engagement: 92 },
    ]);
    
    setMostEngagedContent([
      { id: '1', type: 'post', title: 'My Best Post', engagement: 89 },
      { id: '2', type: 'reel', title: 'Best Reel', engagement: 94 },
    ]);
    
    setAudienceActivityPeriods([
      { period: 'Morning (6AM-12PM)', activity: 45 },
      { period: 'Afternoon (12PM-6PM)', activity: 52 },
      { period: 'Evening (6PM-12AM)', activity: 67 },
    ]);
    
    setIsLoading(false);
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Image src="/loading.svg" alt="Loading" width={40} height={40} />
          <p className="mt-2 text-gray-500">Loading audience insights...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Audience Insights</h1>

        {/* Follower Growth */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
          <div>
            <h2 className="font-medium text-white mb-3">Follower Growth (Last 7 Days)</h2>
            <div className="h-64 bg-gray-700 rounded-2xl p-4">
              <p className="text-gray-400/50">Follower growth chart will appear here</p>
            </div>
          </div>

          {/* New Followers */}
          <div>
            <h2 className="font-medium text-white mb-3">New Followers</h2>
            <p className="text-sm text-gray-400 text-center mb-3">Followers gained recently</p>
            <div className="h-48 bg-gray-700 rounded-2xl p-4">
              <p className="text-gray-400/50">New followers list will appear here</p>
            </div>
          </div>
        </div>

        {/* Unfollows */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
          <div>
            <h2 className="font-medium text-white mb-3">Recent Unfollows</h2>
            <p className="text-sm text-gray-400 text-center mb-3">Users who unfollowed</p>
            <div className="h-48 bg-gray-700 rounded-2xl p-4">
              <p className="text-gray-400/50">Unfollows list will appear here</p>
            </div>
          </div>

          {/* Audience Engagement */}
          <div>
            <h2 className="font-medium text-white mb-3">Top Engaged Users</h2>
            <p className="text-sm text-gray-400 text-center mb-3">Users with highest engagement</p>
            <div className="h-48 bg-gray-700 rounded-2xl p-4">
              <p className="text-gray-400/50">Engagement chart will appear here</p>
            </div>
          </div>
        </div>

        {/* Most Engaged Content */}
        <div>
          <h2 className="font-medium text-white mb-3">Most Engaged Content</h2>
          <p className="text-sm text-gray-400 mb-3">Content with highest engagement rates</p>
          <div className="space-y-3 max-h-[250px] overflow-y-auto">
            {mostEngagedContent.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-gray-700 flex items-center gap-3"
              >
                <span className="text-sm text-gray-300">{item.type}</span>
                <p className="font-medium text-white">{item.title || item.username}</p>
                <p className="text-xs text-primary-400">{item.engagement}% engagement</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Activity Periods */}
        <div>
          <h2 className="font-medium text-white mb-3">Audience Activity Periods</h2>
          <p className="text-sm text-gray-400 mb-3">When your audience is most active</p>
          <div className="grid grid-cols-3 gap-2">
            {audienceActivityPeriods.map((period) => (
              <div
                key={period.period}
                className="rounded-2xl bg-gray-700 p-3 text-center"
              >
                <p className="text-xs text-gray-400">{period.period}</p>
                <p className="text-2xl font-bold text-white">{period.activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}