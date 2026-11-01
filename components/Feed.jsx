/*
 * Vurliqo - Home Feed
 * Phase 2: Instagram-style home feed with infinite scroll, pagination, and interactions
 */

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '../hooks/useAuth';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef();

  const { user } = useAuth();

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    if (loadMoreRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            setPage((prev) => prev + 1);
          }
        },
        { rootMargin: '100px' }
      );
      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }
      return () => { if (loadMoreRef.current) observer.unobserve(loadMoreRef.current); };
    }
  }, [hasMore, isLoading]);

  const fetchPosts = async (pageNum) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          user:auth.users!posts_user_id_fkey (
            id, email, username, avatar_url
          ),
          likes!posts_id_fkey (count),
          comments!posts_id_fkey (count)
        `)
        .order('created_at', { ascending: false });

      // Only show posts from followed users or the current user's own posts
      if (user) {
        const { data: following } = await supabase
          .from('follows')
          .select('follower_id')
          .eq('following_id', user.id);

        if (following && following.length > 0) {
          const followingIds = following.map(f => f.follower_id);
          followingIds.push(user.id); // Include own posts
          query = query.in('user_id', followingIds);
        } else {
          query = query.eq('user_id', user.id);
        }
      }

      const { data, error } = await query.range(
        (pageNum - 1) * 10,
        pageNum * 10 - 1
      );

      if (error) throw error;

      if (pageNum === 1) {
        setPosts(data || []);
      } else {
        setPosts((prev) => [...new Set([...prev, ...(data || [])])]); // Deduplicate
      }

      // Check if there are more posts
      const count = data ? data.length : 0;
      setHasMore(count > 0);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (caption, mediaUrls = []) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          caption,
          likes_count: 0,
          comments_count: 0,
          saves_count: 0,
        });

      if (error) throw error;
      setPage(1); // Reset to first page after creating a post
      fetchPosts(1);
    } catch (err) {
      console.error('Error creating post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikePost = async (postId) => {
    if (!user) return;
    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('likes')
        .select('*')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .single();

      if (existingLike) {
        // Unlike
        await supabase.from('likes').delete().eq('id', existingLike.id);
        await supabase
          .from('posts')
          .update({ likes_count: Math.max(0, likes_count - 1) })
          .eq('id', postId);
      } else {
        // Like
        await supabase.from('likes').insert({
          user_id: user.id,
          post_id: postId,
        });
        await supabase
          .from('posts')
          .increment('likes_count')
          .eq('id', postId);
      }
      fetchPosts(1); // Refresh feed
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleAddComment = async (postId, content) => {
    if (!user || !content.trim()) return;
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content,
        })
        .select()
        .single();

      if (error) throw error;
      await supabase
        .from('posts')
        .increment('comments_count')
        .eq('id', postId);
      fetchPosts(1); // Refresh feed
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleSavePost = async (postId) => {
    if (!user) return;
    try {
      const { data: existingSave } = await supabase
        .from('saved_posts')
        .select('*')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .single();

      if (existingSave) {
        // Unsaved
        await supabase.from('saved_posts').delete().eq('id', existingSave.id);
      } else {
        // Save
        await supabase.from('saved_posts').insert({
          user_id: user.id,
          post_id: postId,
        });
      }
      fetchPosts(1); // Refresh feed
    } catch (err) {
      console.error('Error saving post:', err);
    }
  };

  if (!hasMore && posts.length === 0) {
    return (
      <div className="min-h-[400px] flex justify-center items-center text-gray-500">
        No posts yet. Be the first to share a moment!
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* New Post Section */}
        <div className="mb-6 rounded-xl bg-gray-800 p-4 border border-gray-700">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const captionInput = e.target.elements.caption;
              const caption = captionInput.value.trim();
              // In a full implementation, would get media URLs from upload
              if (caption) {
                handleCreatePost(caption);
                captionInput.value = '';
              }
            }}
            className="flex gap-3"
          >
            <Input
              type="text"
              placeholder="Share your moment..."
              className="flex-1 rounded-l-xl bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={!user}
            />
            <Button
              variant="primary"
              type="submit"
              disabled={!user || !captionInput.value.trim()}
            >
              Post
            </Button>
          </form>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl bg-gray-800 p-4 border border-gray-700"
            >
              {/* Post Header */}
              <div className="flex items-start gap-3">
                <img
                  src={post.user.avatar_url || '/placeholder-av.png'}
                  alt={post.user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">
                    {post.user.username}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Post Media */}
              {post.media_urls && post.media_urls.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {post.media_urls.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Post media"
                      className="rounded-md w-full h-40 object-cover"
                    />
                  ))}
                </div>
              ) : (
                <div className="h-40 bg-gray-700 rounded-md flex items-center justify-center text-gray-400">
                  {/* No media placeholder */}
                </div>
              )}

              {/* Post Footer */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{post.likes_count || 0} likes</span>
                  <span>{post.comments_count || 0} comments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikePost(post.id)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="fill-current"
                    >
                      <path d="M20.84 4.6h-5.32c-.6 0-1.25.23-1.75.55l-4.62 4.62c-.38.38-.55.86-.55 1.35v7.7c0 .49.2.97.55 1.35l4.63 4.63c.5.5.5.92.5 1.43v4.07a2.67 2.67 0 0 1-1.07 2.29l-4.06 2.03a2.73 2.73 0 0 1-2.42-1.39l-1.35-3.08a2.75 2.75 0 0 1 .55-2.36l2.71-1.35h7.7l2.66-1.33a2.73 2.73 0 0 1 1.38-.55l4.62-4.62a1.18 1.18 0 0 1 1.7-.55h5.26c.9 0 1.53.76 1.53 1.37v4.85c0 .63-.2 1.22-.55 1.68l-4.65 4.65c-.35.35-.55.68-.55 1.08v7.7c0 .79.48 1.3.9 1.55l4.78 2.35c.33.16.53.33.65.55.13.23.2.45.2.7v4.7c0 .49.2.97.55 1.35l4.63 4.63c.5.5.5.92.5 1.43v4.07a2.67 2.67 0 0 1-1.07 2.29l-4.06 2.03a2.73 2.73 0 0 1-2.42-1.39l-1.35-3.08a2.75 2.75 0 0 1 .55-2.36l2.71-1.35h7.7l2.66-1.33a2.73 2.73 0 0 1 1.38-.55l4.62-4.62a1.18 1.18 0 0 1 1.7-.55h5.26c.9 0 1.53.76 1.53 1.37v4.85c0 .63-.2 1.22-.55 1.68l-4.65 4.65c-.35.35-.55.68-.55 1.08v7.7c0 .79.48 1.3.9 1.55l4.78 2.35c.33.16.53.33.65.55.13.23.2.45.2.7v-7.37c0-.31.11-.61.3-.87l4.75-4.75c.3-.3.45-.55.53-.87.08-.32.15-.6.18-.88zM12 6.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
                    </svg>
                  </Button>
                  <span id="like-count-{post.id}">
                    {post.likes_count || 0}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddComment(post.id, '')}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Loading more indicator */}
          {isLoading && hasMore && (
            <div className="flex justify-center py-8">
              <span className="text-gray-500">Loading more posts...</span>
            </div>
          )}

          {/* End of feed indicator */}
          {!hasMore && posts.length > 0 && (
            <div className="flex justify-center py-8 text-gray-400 text-sm">
              No more posts
            </div>
          )}
        </div>
      </div>
    </main>
  );
}