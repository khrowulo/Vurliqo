/*
 * Vurliqo - Stories Create
 * Phase 3: Create stories with photos, videos, text, and editing
 */

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function StoriesCreate() {
  const [mediaType, setMediaType] = useState('photo');
  const [caption, setCaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption.trim() && mediaType === 'photo') {
      // Create empty story with just media
    }
    setIsSubmitting(true);
    // In a full implementation, would upload media and create story
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
          Create Story
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-gray-300 mb-2">
              Story type
            </label>
            <div className="flex space-x-4">
              <label
                key="photo"
                className="flex-1 rounded border border-gray-600 px-3 py-2 text-center"
              >
                <input
                  type="radio"
                  name="media-type"
                  value="photo"
                  checked={mediaType === 'photo'}
                  onChange={(e) => setMediaType('photo')}
                  className="hidden"
                />
                <span>Photo</span>
              </label>
              <label
                key="video"
                className="flex-1 rounded border border-gray-600 px-3 py-2 text-center"
              >
                <input
                  type="radio"
                  name="media-type"
                  value="video"
                  checked={mediaType === 'video'}
                  onChange={(e) => setMediaType('video')}
                  className="hidden"
                />
                <span>Video</span>
              </label>
              <label
                key="text"
                className="flex-1 rounded border border-gray-600 px-3 py-2 text-center"
              >
                <input
                  type="radio"
                  name="media-type"
                  value="text"
                  checked={mediaType === 'text'}
                  onChange={(e) => setMediaType('text')}
                  className="hidden"
                />
                <span>Text</span>
              </label>
            </div>
          </div>

          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder "Add a caption..."
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={2}
          />

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Share Story'}
          </Button>
        </form>
      </div>
    </main>
  );
}