/*
 * Vurliqo - Posts Create
 * Phase 2: Create posts with images, videos, captions, and hashtags
 */

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function PostsCreate({ onPostCreated }) {
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState[]; // Array of { preview, uri }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const MAX_FILES = 4; // Allow up to 4 images/videos

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, MAX_FILES - files.length);
    if (selectedFiles.length === 0) return;

    const newFiles = [...files];
    for (const file of selectedFiles) {
      // Create preview
      const preview = URL.createObjectURL(file);
      const format = file.type.startsWith('image/') ? 'image' : 'video';
      newFiles.push({ preview, uri: file, type: format, name: file.name });
    }
    setFiles(newFiles);
    e.target.value = ''; // Reset input
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const uploadMedia = async () => {
    if (files.length === 0 || isSubmitting) return;
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}${new Date().getTime()}.${fileExt}`;

        const { error, data } = await supabase.storage
          .from('posts')
          .upload(fileName, file.uri, {
            cacheControl: '3600',
              upsert: false,
          });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('posts')
          .getPublicUrl(fileName);

        // In a real implementation, we'd update the post with this media URL
        setUploadProgress(((i + 1) / files.length) * 100);
      }
    } catch (err) {
      console.error('Media upload error:', err);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption.trim() && files.length === 0) return;
    setIsSubmitting(true);

    try {
      // Upload media first
      await uploadMedia();

      // Create post with caption
      // In a full implementation, would pass media URLs to the post creation
      onPostCreated(caption, []);
      setCaption('');
      setFiles([]);
    } catch (err) {
      console.error('Error creating post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl bg-gray-800 p-6 border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Caption Input */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            What's on your mind?
          </label>
          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Share your thoughts..."
            rows={2}
            disabled={isSubmitting}
            className="resize-none w-full rounded-md bg-gray-800 border border-gray-600 text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Media Selection */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Add media
          </label>
          <div className="flex flex-wrap gap-2">
            {files.map((file, i) => (
              <div
                key={i}
                className="relative rounded-md bg-gray-700 p-2 min-w-[80px] min-h-[80px]"
              >
                {file.type === 'image' ? (
                  <img
                    src={file.preview}
                    alt=""
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <video
                    src={file.preview}
                    controls
                    className="w-full h-full rounded"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(i)}
                  className="absolute top-1 right-1 text-xs text-gray-400"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Add Files Button */}
            <button
              type="button"
              onClick={handleFileChange}
              className="flex items-center gap-2 rounded-md bg-gray-700 p-2 hover:bg-gray-600 transition-colors"
              disabled={files.length >= MAX_FILES || isSubmitting}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="text-gray-400"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <path d="M19 5l-14 3L5 7l6 8 6-8 6 8z" />
              </svg>
              <span>Add photos/videos</span>
            </button>
          </div>
          {files.length > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              {files.length} photo{s(files.length !== 1 ? 's' : '')} selected
            </p>
          )}
        </div>

        {/* Hashtags hint */}
        <p className="text-xs text-gray-500">
          Use #hashtags in your caption to categorize your post
        </p>

        {/* Submit Button */}
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting || files.length === 0 && !caption.trim()}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  d="M8 14s1.69-5 5-5 5 1.69 5 5-1.69 5-5 5z"
                />
                <line x1="12" y1="1" x12 y2="22" />
                <polyline points="22 8 12 12 2 8" />
              </svg>
              Publishing...
            </span>
          ) : (
            'Post'
          )}
        </Button>
      </form>
    </div>
  );
}

// Helper to format file count
function s(count) {
  return count !== 1 ? 's' : '';
}