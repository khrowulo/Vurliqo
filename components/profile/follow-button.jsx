/*
 * Vurliqo - Follow Button
 * Phase 5: Follow/unfollow toggle button
 */

import { useState } from 'react';
import { Button } from '../../ui/button';

export default function FollowButton({ userId, isCurrentUser, initialFollowing = false }) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const handleToggle = async () => {
    setIsFollowing(!isFollowing);
    // In full implementation, would toggle follow status with backend
    // await toggleFollow(userId);
  };

  if (isCurrentUser) {
    return null; // Don't show follow button for own profile
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled = {isFollowing}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}