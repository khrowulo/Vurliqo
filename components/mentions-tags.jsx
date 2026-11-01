/*
 * Vurliqo - Mentions & Tags
 * Phase 5: @mention and #tag system for posts, comments, reels, and stories
 */

import { useState } from 'react';
import { Input } from '../../ui/input';

export default function MentionsTags({
  value,
  onChange,
  placeholder = 'Type @username or #tag',
  existingMentions = [],
  onRemoveMention,
}) {
  const [inputValue, setInputValue] = useState(value || '');
  const [mentions, setMentions] = useState(existingMentions || []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleAddMention = (text) => {
    // Extract @username from text
    const match = text.match(/@(\w+)/);
    if (match) {
      const username = match[1];
      setMentions(prev => {
        if (prev.some(m => m.username === username)) return prev;
        return [...prev, { username, id: `temp-${Date.now()}` }];
      });
      setInputValue(text.replace(match[0], '').trim());
    }
  };

  const handleRemove = (index) => {
    setMentions(prev => prev.filter((_, i) => i !== index));
    onRemoveMention?.(index);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Existing Mentions/Tags */}
      {mentions.map((mention, index) => (
        <span
          key={mention.id}
          className="inline-flex items-center gap-1 rounded-md bg-primary-600 text-white text-xs px-2.5 py-0.5"
        >
          @{mention.username}
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="cursor-pointer"
            onClick={() => handleRemove(index)}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      ))}

      {/* Input for new mentions */}
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className="flex-1 rounded-md bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        minWidth={0}
      />
    </div>
  );
}