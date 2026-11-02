/* 
 * Vurliqo - Content Drafts & Planning
 * Phase 7: Expanded draft system
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function DraftsManagement({ userId }) {
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch drafts from Lovable Cloud backend
    setDrafts([
      {
        id: '1',
        type: 'post',
        title: 'Draft Post 1',
        content: 'This is a draft post...',
        mediaUrl: '/placeholder-av.png',
        createdAt: new Date(Date.now() - 86400000),
      },
      {
        id: '2',
        type: 'reel',
        title: 'Draft Reel 1',
        content: 'This is a draft reel...',
        mediaUrl: '/placeholder-av.png',
        createdAt: new Date(Date.now() - 172800000),
      },
    ]);
    setIsLoading(false);
  }, [userId]);

  const handleDeleteDraft = async (id) => {
    // In full implementation, would delete draft with backend confirmation
    setDrafts(drafts.filter((draft) => draft.id !== id));
    window.alert('Draft deleted');
  };

  const handleEditDraft = async (id) => {
    // In full implementation, would open editor for draft
    window.alert('Opening draft editor');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Image src="/loading.svg" alt="Loading" width={40} height={40} />
          <p className="mt-2 text-gray-500">Loading drafts...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Drafts & Planning</h1>

        {/* Drafts List */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
          <div>
            <h2 className="font-medium text-white mb-3">Post Drafts</h2>
            <p className="text-sm text-gray-400 mb-3">Save and edit post drafts</p>
            <div className="h-64 bg-gray-700 rounded-2xl p-4">
              <p className="text-gray-400/50">Post drafts will appear here</p>
            </div>
          </div>

          {/* Reel Drafts */}
          <div>
            <h2 className="font-medium text-white mb-3">Reel Drafts</h2>
            <p className="text-sm text-gray-400 mb-3">Save and edit reel drafts</p>
            <div className="h-64 bg-gray-700 rounded-2xl p-4">
              <p className="text-gray-400/50">Reel drafts will appear here</p>
            </div>
          </div>
        </div>

        {/* Story Drafts */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
          <div>
            <h2 className="font-medium text-white mb-3">Story Drafts</h2>
            <p className="text-sm text-gray-400 mb-3">Save and edit story drafts</p>
            <div className="h-64 bg-gray-700 rounded-2xl p-4">
              <p className="text-gray-400/50">Story drafts will appear here</p>
            </div>
          </div>

          {/* Calendar Planning */}
          <div>
            <h2 className="font-medium text-white mb-3">Calendar Planning</h2>
            <p className="text-sm text-gray-400 mb-3">Organize drafts by publication date</p>
            <div className="h-64 bg-gray-700 rounded-2xl p-4">
              <p className="text-gray-400/50">Content calendar will appear here</p>
            </div>
          </div>
        </div>

        {/* Draft Actions */}
        <div>
          <h2 className="font-medium text-white mb-3">Actions</h2>
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.alert('Create new draft')}
            className="mb-2 w-full justify-center"
          >
            Create Draft
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.alert('Edit selected draft')}
            className="mb-2"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => window.alert('Delete selected draft')}
            className="mb-2"
          >
            Delete
          </Button>
        </div>
      </div>
    </main>
  );
}