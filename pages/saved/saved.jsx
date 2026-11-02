/*
 * Vurliqo - Saved
 * Phase 5: Saved posts and reels with collections
 */

import { useState, useEffect } from 'react';
import { Image } from 'next/image';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function Saved({ userId }) {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    // In a full implementation, would fetch collections from backend
    const mockCollections = [
      {
        id: '1',
        name: 'Favorite Posts',
        description: 'My favorite posts',
        is_private: true,
        item_count: 24,
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        name: ' Inspiration',
        description: 'Design inspiration',
        is_private: false,
        item_count: 12,
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
    ];

    setCollections(mockCollections);
    setIsLoading(false);
  }, [userId]);

  const handleCreateCollection = async (e) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    setIsLoading(true);
    // In full implementation, would create collection with backend
    setIsLoading(false);
    setNewCollectionName('');
  };

  const handleSaveItem = async (itemType, itemId) => {
    setIsLoading(true);
    // In full implementation, would save item with backend
    setIsLoading(false);
  };

  const handleRemoveFromCollection = async (collectionId, itemId) => {
    setIsLoading(true);
    // In full implementation, would remove item with backend
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center pt-20">
          <Image src="/loading.svg" alt="Loading" width={40} height={40} />
          <p className="mt-2 text-gray-500">Loading saved...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Saved</h1>
          <p className="text-sm text-gray-500">Your saved content</p>
        </div>

        {/* Create New Collection */}
        <form onSubmit={handleCreateCollection} className="mb-6 rounded-xl bg-gray-800 p-4 border border-gray-700">
          <Input
            type="text"
            placeholder="New collection name..."
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button
            variant="primary"
            type="submit"
            disabled={!newCollectionName.trim()}
          >
            Create
          </Button>
        </form>

        {/* Collections List */}
        {collections.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="rounded-xl bg-gray-800 p-4 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">{collection.name}</h3>
                  <span className="text-xs text-gray-400">{collection.item_count} items</span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">{collection.description}</p>
                
                {collection.is_private ? (
                  <p className="text-xs text-gray-500">Private collection</p>
                ) : (
                  <p className="text-xs text-gray-500">Public collection</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-400">
            <p>No collections yet</p>
            <p className="mt-2">Create your first collection above</p>
          </div>
        )}

        {/* Save Post/Reel Button */}
        <div className="mt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.alert('Save post/reel')}
          >
            Save Post/Reel
          </Button>
        </div>
      </div>
    </main>
  );
}