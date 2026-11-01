/*
 * Vurliqo - Comment Item
 * Phase 5: Nested comment replies system
 */

import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export default function CommentItem({
  comment,
  onReply,
  onLike,
  onDelete,
  onPin,
  depth = 0,
  canEdit = false,
  isCurrentUser = false,
}) {
  const [isTypingReply, setIsTypingReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setIsTypingReply(false);
    onReply?.(comment.id, replyContent);
    setReplyContent('');
  };

  const handleToggleLike = async () => {
    onLike?.(comment.id);
  };

  const handleDelete = async () => {
    if (isCurrentUser) {
      onDelete?.(comment.id);
    }
  };

  const handleTogglePin = async () => {
    onPin?.(comment.id);
  };

  return (
    <div className={clsx(
      'rounded-md p-3 mb-3',
      depth > 0 && 'pl-4', // indentation for replies
      'bg-gray-800',
      isCurrentUser && 'border border-gray-600'
    )}>
      <div className="flex items-start gap-3">
        {/* User Avatar */}
        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
          {comment.sender.username.substring(0, 1).toUpperCase()}
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm {isCurrentUser ? 'text-white' : 'text-gray-300'}">
            {comment.content}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {comment.sender.is_current_user && ' • You'}
          </p>
        </div>

        {/* Actions */}
        <div className="ml-3 text-xs text-gray-400 flex items-center gap-3">
          <Button
            variant="text"
            size="icon"
            onClick={() => onLike?.(comment.id)}
            className={comment.likes_count > 0 ? 'text-primary-400' : 'text-gray-500'}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 9.96v-1.98h-2v1.98h2zm0 4.98v-1.98h-2v1.98h2zm0 4.98v-1.98h-2v1.98h2zm0 5.96v-2.98h-2v2.98h2zm0 5.96v-2.98h-2v2.98h2zM2 4.98C2 7.52 4.48 10 8 10s6-2.48 6-5.02-4.48-5.02-6-5.02S2 2.48 2 4.98zm14 4.98c0 1.48-.62 2.82-1.68 3.96h-2.96v2.96c0 1.48-.62 2.82-1.68 3.96h-3.04c-1.06 0-1.68-1.48-1.68-3.96v-2.96h-3.04v2.96c0 1.48-.62 2.82-1.68 3.96h-3.04c-1.06 0-1.68-1.48-1.68-3.96v-3.04h5.96v3.04z" />
            </svg>
            {comment.likes_count}
          </Button>
          <span className="text-gray-500">•</span>
          <Button
            variant="text"
            size="icon"
            onClick={() => handleToggleLike()}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C3 2 2 3 2 12s1 10 8 10 8-2 8-10S21 2 12 2zm1 3H5v2h6v-2zm0 4H5v2h6v-2zm0 4H5v2h6v-2z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Reply Form (for owner or first-level comments) */}
      {depth === 0 && isCurrentUser && (
        <form onSubmit={handleSendReply} className="mt-2 pl-3 bg-gray-700">
          <Input
            type="text"
            placeholder "Add a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={1}
          />
          <Button
            variant="text"
            size="sm"
            onClick={handleSendReply}
            className="ml-2 text-xs text-primary-400"
          >
            Reply
          </Button>
        </form>
      )}

      {/* Replies Section */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
          <p>{comment.replies.length} reply{comment.replies.length > 1 ? 's' : ''}</p>
          {comment.replies.map((reply, i) => (
            <CommentItem
              key={i}
              comment={reply}
              depth={depth + 1}
              canEdit={false}
              isCurrentUser={reply.sender.is_current_user}
              onReply={onReply}
              onLike={onLike}
              onDelete={onDelete}
              onPin={onPin}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function for clsx
function clsx() {
  const classes = [];
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      if (typeof arguments[i] === 'string') classes.push(arguments[i]);
      else if (Array.isArray(arguments[i])) classes.push(...arguments[i]);
    }
  }
  return classes.join(' ');
}