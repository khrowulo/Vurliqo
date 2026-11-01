/* 
 * Vurliqo - Content & Data Management
 * Phase 6: Content management dashboard
 */

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function ContentManagement({ userId }) {
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [archivedPosts, setArchivedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    // In full implementation, would fetch content from backend
    setPosts([
      { id: '1', type: 'post', title: 'My First Post', mediaUrl: '/placeholder-av.png', createdAt: new Date() },
    ]);
    setReels([
      { id: '1', type: 'reel', title: 'My First Reel', mediaUrl: '/placeholder-av.png', createdAt: new Date() },
    ]);
    setHighlights([
      { id: '1', name: 'Highlights', postIds: ['1'], createdAt: new Date() },
    ]);
    setDrafts([
      { id: '1', type: 'post', title: 'Draft Post', mediaUrl: '/placeholder-av.png', createdAt: new Date() },
    ]);
    setArchivedPosts([
      { id: '1', type: 'post', title: 'Archived Post', mediaUrl: '/placeholder-av.png', createdAt: new Date() },
    ]);
    setIsLoading(false);
  }, [userId]);

  const handleDeleteContent = async (itemType, itemId) => {
    setIsDeleting(true);
    // In full implementation, would delete with backend confirmation
    setIsDeleting(false);
    window.alert('Content deleted');
  };

  const handleRestoreContent = async (itemType, itemId) => {
    setIsRestoring(true);
    // In full implementation, would restore with backend
    setIsRestoring(false);
    window.alert('Content restored');
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Content & Data Management</h1>

        {/* Published Posts */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Published Posts</h2>
          {isLoading && (
            <p className="text-gray-400">Loading...</p>
          )}
          {!isLoading && posts.length === 0 && (
            <p className="text-gray-400">No posts yet</p>
          )}
          {!isLoading && posts.length > 0 && (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer"
                >
                  <Image
                    src={post.mediaUrl}
                    alt={post.title}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{post.title}</p>
                    <p className="text-xs text-gray-400">{post.createdAt.toLocaleDateString()}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.alert(`View post ${post.id}`)}
                    className="text-sm"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Published Reels */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Published Reels</h2>
          {isLoading && (
            <p className="text-gray-400">Loading...</p>
          )}
          {!isLoading && reels.length === 0 && (
            <p className="text-gray-400">No reels yet</p>
          )}
          {!isLoading && reels.length > 0 && (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {reels.map((reel) => (
                <div
                  key={reel.id}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer"
                >
                  <Image
                    src={reel.mediaUrl}
                    alt={reel.title}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{reel.title}</p>
                    <p className="text-xs text-gray-400">{reel.createdAt.toLocaleDateString()}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.alert(`View reel ${reel.id}`)}
                    className="text-sm"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Story Highlights */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Story Highlights</h2>
          {isLoading && (
            <p className="text-gray-400">Loading...</p>
          )}
          {!isLoading && highlights.length === 0 && (
            <p className="text-gray-400">No highlights yet</p>
          )}
          {!isLoading && highlights.length > 0 && (
            <div className="space-y-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer"
                >
                  <Image
                    src="/placeholder-av.png"
                    alt={highlight.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{highlight.name}</p>
                    <p className="text-xs text-gray-400">{highlight.postIds.length} posts</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.alert(`View highlight ${highlight.id}`)}
                    className="text-sm"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Drafts */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Drafts</h2>
          {isLoading && (
            <p className="text-gray-400">Loading...</p>
          )}
          {!isLoading && drafts.length === 0 && (
            <p className="text-gray-400">No drafts</p>
          )}
          {!isLoading && drafts.length > 0 && (
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer"
                >
                  <Image
                    src={draft.mediaUrl}
                    alt={draft.title}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{draft.title}</p>
                    <p className="text-xs text-gray-400">{draft.createdAt.toLocaleDateString()}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.alert(`Edit draft ${draft.id}`)}
                    className="text-sm"
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Archived Posts */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Archived Posts</h2>
          {isLoading && (
            <p className="text-gray-400">Loading...</p>
          )}
          {!isLoading && archivedPosts.length === 0 && (
            <p className="text-gray-400">No archived posts</p>
          )}
          {!isLoading && archivedPosts.length > 0 && (
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {archivedPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer"
                >
                  <Image
                    src={post.mediaUrl}
                    alt={post.title}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{post.title}</p>
                    <p className="text-xs text-gray-400">{post.createdAt.toLocaleDateString()}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.alert(`Restore post ${post.id}`)}
                    className="text-sm"
                  >
                    Restore
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteContent('post', post.id)}
                    className="text-sm ml-2"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.alert('Manage content')}
            className="w-full justify-center"
          >
            Content Actions
          </Button>
        </div>
      </div>
    </main>
  );
}