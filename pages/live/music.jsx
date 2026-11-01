/* 
 * Vurliqo - Music & Audio Experience
 * Phase 9: Module 9 - Audio Integration
 * Audio references on supported content, audio attribution, discovery
 * Do not claim licensed music playback is operational
 */

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';

export default function MusicExperience({ userId }) {
  const [audioReferences, setAudioReferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch audio references from Lovable Cloud backend
    // Would integrate with audio attribution system
    const mockAudioReferences = [
      {
        id: 'audio-1',
        title: 'Sunset Vibes',
        artist: 'Independent Artist',
        timesUsed: 245,
        attribution: 'Royalty-free, attributed to original creator',
      },
    ];
    setAudioReferences(mockAudioReferences);
    setIsLoading(false);
  }, [userId]);

  const [searchQuery, setSearchQuery] = useState('');

  const addAudioReference = () => {
    window.alert('Audio reference addition requires backend integration');
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
        <h1 className="text-2xl font-bold text-white mb-6">Music & Audio</h1>

        {/* Audio References */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Audio References</h2>
          <p className="text-sm text-gray-400 mb-3">
            Audio references on supported content (reels, posts, etc.)
          </p>
          
          {audioReferences.length === 0 && (
            <p className="text-gray-400">No audio references yet</p>
          )}

          <div className="grid grid-cols-1 gap-3">
            {audioReferences.map((audio) => (
              <div
                key={audio.id}
                className="bg-gray-700 rounded-xl p-3 border border-gray-600"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">
                    {audio.title} - {audio.artist}
                  </span>
                  <span className="text-xs text-gray-400">{audio.timesUsed} uses</span>
                </div>
                <p className="text-xs text-gray-400">
                  {audio.attribution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Search Audio */}
        <div>
          <h2 className="font-medium text-white mb-3">Search Audio</h2>
          <Input
            type="text"
            placeholder="Search audio references..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.alert('Audio search requires backend integration')}
            className="w-full justify-center"
          >
            Search
          </Button>
        </div>

        {/* Important Copyright Notice */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <ul className="text-gray-300 space-y-1">
            <li>
              Respect copyright and licensing requirements
            </li>
            <li>
              Do not download, redistribute or provide unauthorized copyrighted music
            </li>
            <li>
              Do not claim licensed music playback is operational without a valid
              provider and licensing arrangement
            </li>
            <li>
              Reuse permitted audio references only
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}