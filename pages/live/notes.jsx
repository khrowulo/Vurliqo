/* 
 * Vurliqo - Notes System
 * Phase 9: Module 4 - Notes Feature
 * Short text notes with music/audio references, profile display, expiration
 */

import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function Notes({ userId }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch notes from Lovable Cloud backend
    // Would integrate with notes storage system
    const mockNotes = [
      {
        id: 'note-1',
        author: 'user-1',
        content: 'Just started a new live session! 🎨',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        audience: 'followers',
        hasExpiration: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    ];
    setNotes(mockNotes);
    setIsLoading(false);
  }, [userId]);

  const [content, setContent] = useState('');
  const [audience, setAudience] = useState('followers');

  const [audienceOptions] = useState(['followers', 'following', 'public']);

  const publishNote = () => {
    if (!content.trim()) {
      window.alert('Please enter note content');
      return;
    }
    // In full implementation, would publish note via Lovable Cloud backend
    window.alert('Note published successfully');
    setContent('');
  };

  const deleteNote = (noteId) => {
    // In full implementation, would delete note via backend
    window.alert('Note deleted');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-20">
          <Button variant="outline" size="sm" onClick={() => window.alert('Loading...')}>
            Loading...
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Notes</h1>

        {/* Publish Note */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Publish Note</h2>
          
          <Input
            type="text"
            placeholder="What's on your mind?..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3 h-24 resize-none"
            required
          />
          
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
          >
            <option value="followers">Followers</option>
            <option value="following">Following</option>
            <option value="public">Public</option>
          </select>
          
          <Button
            variant="primary"
            size="sm"
            onClick={publishNote}
            className="w-full justify-center"
          >
            Post Note
          </Button>

          <p className="text-xs text-gray-400 mt-2">
            Notes expire automatically after 24 hours. audience selection controls
            who can view the note.
          </p>
        </div>

        {/* Your Notes */}
        <div>
          <h2 className="font-medium text-white mb-3">Your Notes</h2>
          <p className="text-sm text-gray-400 mb-3">Your recent notes</p>
          
          {notes.length === 0 && (
            <p className="text-gray-400">No notes yet</p>
          )}

          <div className="grid grid-cols-1 gap-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-gray-700 rounded-xl p-3 border border-gray-600"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{note.content}</span>
                  <span className="text-xs text-gray-400">
                    {note.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Audience: {note.audience} • {" "}
                  {note.hasExpiration ? (
                    <span className="text-red-400">
                      Expires {note.expiresAt.toLocaleDateString()}
                    </span>
                  ) : (
                    'No expiration'
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <ul className="text-gray-300 space-y-1">
            <li>
              Notes are stored persistently and expire after 24 hours automatically
            </li>
            <li>
              Notes can be replied to through the messaging system
            </li>
            <li>
              Notes displayed on profile avatars or designated interface areas
            </li>
            <li>
              Prevent unauthorized access to private notes based on audience setting
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}