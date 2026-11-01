/*
 * Vurliqo - Explore Page
 * Phase 3: Discovery page with personalized content recommendations
 */

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useState } from 'react';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    // In a full implementation, would query the backend
    setIsSearching(false);
    setSearchResults([]);
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
          <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6 rounded-xl bg-gray-800 p-4 border border-gray-700">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder "Search Vurliqo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
              className="flex-1 rounded-l-xl bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button
              variant="primary"
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>

        {/* Trending Section */}
        <div className="mb-6 rounded-xl bg-gray-800 p-4 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Trending</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Trending posts/reels placeholders */}
            <div className="rounded-md bg-gray-700 p-3 text-center text-gray-400">
              <p>Post</p>
            </div>
            <div className="rounded-md bg-gray-700 p-3 text-center text-gray-400">
              <p>Reel</p>
            </div>
          </div>
        </div>

        {/* Popular Creators */}
        <div className="mb-6 rounded-xl bg-gray-800 p-4 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Popular Creators</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md bg-gray-700 p-3 flex items-center gap-3">
              <img
                src="/placeholder-av.png"
                alt="Creator"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-white">User</p>
                <p className="text-xs text-gray-400">@username</p>
              </div>
            </div>
            <div className="rounded-md bg-gray-700 p-3 flex items-center gap-3">
              <img
                src="/placeholder-av.png"
                alt="Creator"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-white">User</p>
                <p className="text-xs text-gray-400">@username</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hashtag Discovery */}
        <div className="mb-6 rounded-xl bg-gray-800 p-4 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Hashtags</h2>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              #vurliqo
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              #photography
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              #fyp
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              #reels
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              #explore
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              #discover
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}