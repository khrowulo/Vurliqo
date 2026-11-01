/* 
 * Vurliqo - Live Collaboration
 * Phase 9: Module 2 - Live Collaboration
 * Features: invite, accept/reject, participant management, removal
 * Actual audio/video collaboration requires WebRTC infrastructure not configured
 */

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';

export default function LiveCollaboration({ userId }) {
  const [collaborators, setCollaborators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In full implementation, would fetch collaboration data from Lovable Cloud backend
    // Would integrate with WebRTC signaling server
    setIsLoading(false);
  }, [userId]);

  const inviteCollaborator = (creatorId) => {
    // In full implementation, would send invitation via backend
    // Would integrate with WebRTC signaling server
    window.alert(`Invitation sent to creator ${creatorId}`);
  };

  const acceptInvitation = () => {
    window.alert('Accepted collaboration invitation');
  };

  const rejectInvitation = () => {
    window.alert('Rejected collaboration invitation');
  };

  const removeParticipant = (participantId) => {
    window.alert(`Removed participant ${participantId}`);
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
        <h1 className="text-2xl font-bold text-white mb-6">Live Collaboration</h1>

        {/* Collaboration Status */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <h2 className="font-medium text-white mb-3">Collaboration Setup</h2>
          <p className="text-sm text-gray-400 mb-3">
            Real-time audio/video collaboration requires WebRTC infrastructure.
            The following features provide the UI foundation.
          </p>

          {/* Invite Collaborator */}
          <div>
            <h3 className="font-medium text-white mb-3">Invite Collaborator</h3>
            <Input
              type="text"
              placeholder="Creator ID or username"
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.alert('Invite functionality requires WebRTC setup')}
              className="w-full justify-center"
            >
              Send Invitation
            </Button>
          </div>

          {/* Current Collaborators */}
          <div>
            <h3 className="font-medium text-white mb-3">Current Collaborators</h3>
            <p className="text-sm text-gray-400">No collaborators currently</p>
            <p className="text-xs text-gray-500">Collaborators will appear here</p>
          </div>

          {/* Collaboration Controls */}
          <div>
            <h3 className="font-medium text-white mb-3">Controls</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.alert('Add participant')}
                className="flex-1"
              >
                Add
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.alert('Remove participant')}
                className="flex-1"
              >
                Remove
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => window.endCollaboration}
                className="flex-1"
              >
                End
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              End collaboration session for all participants
            </p>
          </div>
        </div>

        {/* Important Infrastructure Notice */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300">
          <p>
            Actual audio/video collaboration requires WebRTC signaling server and
            media infrastructure (e.g., Janus, mediasoup, or similar). This component
            provides the UI foundation but does not establish actual real-time
            connections without the required backend services.
          </p>
          <p>
            If you have a WebRTC signaling server configured, please integrate it
            to enable actual live collaboration features.
          </p>
        </div>
      </div>
    </main>
  );
}