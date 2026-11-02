/*
 * Vurliqo - Search Page
 * Phase 3: Global search system
 */

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([
    { id: 1, query: 'photography', date: 'Today' },
    { id: 2, query: 'reels', date: 'Yesterday' },
  ]);
  const [searchResults, setSearchResults] = useState({
    accounts: [],
    posts: [],
    reels: [],
    hashtags: [],
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    // In a full implementation, would query the backend
    setIsSearching(false);
    setSearchResults({ accounts: [], posts: [], reels: [], hashtags: [] });
  };

  const clearHistory = (queryId) => {
    // In a full implementation, would remove from backend
    setSearchHistory(prev => prev.filter(item => item.id !== queryId));
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Image
            src="/vurliqo-logo.svg"
            alt="Vurliqo"
            width={40}
            height={40}
            className="mr-3"
          />
          <h1 className="text-2xl font-bold text-gray-900">Search</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6 rounded-xl bg-gray-800 p-4 border border-gray-700">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={false}
              className="flex-1 rounded-l-xl bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button
              variant="primary"
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Search History */}
        <div className="mb-6 rounded-xl bg-gray-800 p-4 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Recent Searches</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {searchHistory.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                size="sm"
                className="w-full text-left justify-between"
                onClick={() => setQuery(item.query)}
              >
                {item.query}
                <span className="text-xs text-gray-400">×</span>
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="text-xs w-full text-left"
              onClick={() => setSearchHistory([])}
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-xl bg-gray-800 p-4 border border-gray-700">
            <h3 className="font-medium text-white mb-3">Accounts</h3>
            <div className="space-y-3">
              {searchResults.accounts.map((account) => (
                <div key={account.id} className="flex items-center gap-3">
                  <img
                    src="/placeholder-av.png"
                    alt={account.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">{account.username}</p>
                    <p className="text-xs text-gray-400">@{account.handle}</p>
                  </div>
                </div>
              ))}
              {searchResults.accounts.length === 0 && (
                <p className="text-gray-400">No accounts found</p>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-gray-800 p-4 border border-gray-700">
            <h3 className="font-medium text-white mb-3">Posts</h3>
            <div className="space-y-3">
              {searchResults.posts.map((post) => (
                <div key={post.id} className="flex items-center gap-3">
                  <img
                    src="/placeholder-av.png"
                    alt={post.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">{post.username}</p>
                    <p className="text-xs truncate text-gray-400">{post.caption?.substring(0, 50)}...</p>
                  </div>
                </div>
              ))}
              {searchResults.posts.length === 0 && (
                <p className="text-gray-400">No posts found</p>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-gray-800 p-4 border border-gray-700">
            <h3 className="font-medium text-white mb-3">Reels</h3>
            <div className="space-y-3">
              {searchResults.reels.map((reel) => (
                <div key={reel.id} className="flex items-center gap-3">
                  <img
                    src="/placeholder-av.png"
                    alt={reel.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">{reel.username}</p>
                    <p className="text-xs text-gray-400">Reel</p>
                  </div>
                </div>
              ))}
              {searchResults.reels.length === 0 && (
                <p className="text-gray-400">No reels found</p>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-gray-800 p-4 border border-gray-700">
            <h3 className="font-medium text-white mb-3">Hashtags</h3>
            <div className="space-y-3">
              {searchResults.hashtags.map((tag) => (
                <Button
                  key={tag.id}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-between"
                >
                  {tag.tag}
                  <span className="text-xs text-gray-400">#{tag.uses} uses</span>
                </Button>
              ))}
              {searchResults.hashtags.length === 0 && (
                <p className="text-gray-400">No hashtags found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}