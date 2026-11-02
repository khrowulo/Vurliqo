/*
 * Vurliqo - Reels Create
 * Phase 3: Create reels with videos, captions, and editing
 */

import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function ReelsCreate() {
  const [caption, setCaption] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption.trim()) {
      alert('Please add a caption');
      return;
    }
    setIsSubmitting(true);
    // In a full implementation, would upload video and create reel
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center pt-20">
        <Image
          src="/vurliqo-logo.svg"
          alt="Vurliqo"
          width={120}
          height={120}
          className="mx-auto mb-6"
        />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create Reel
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption..."
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={3}
          />
          
          <Input
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            placeholder="#hashtag"
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Share Reel'}
          </Button>
        </form>
      </div>
    </main>
  );
}