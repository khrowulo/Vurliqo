/* 
 * Vurliqo - Profile Editing 
 * Phase 6: Complete profile editing system
 */

import { useState, useEffect } from 'react';
import { Image } from 'next/image';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function EditProfile({ userId }) {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [accountCategory, setAccountCategory] = useState('personal');
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('/placeholder-av.png');
  const [isSaving, setIsSaving] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  useEffect(() => {
    // In full implementation, would fetch current profile data from backend
    setDisplayName('Test User');
    setBio('Software developer building cool stuff. 👨‍💻');
    setWebsite('https://example.com');
    setLocation('San Francisco');
    setUsername('testuser');
    setGender('not_specified');
    setPronouns('he/him');
    setAvatarUrl('/placeholder-av.png');
  }, [userId]);

  // Check username availability
  const checkUsernameAvailability = async () => {
    // In full implementation, would check with backend
    // For now, simulate availability check
    setUsernameAvailable(true);
    setShowDuplicateWarning(false);
  };

  if (isSaving) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-md mx-auto flex flex-col items-center justify-center pt-20">
          <Image src="/loading.svg" alt="Loading" width={40} height={40} />
          <p className="mt-2 text-gray-500">Saving profile...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link href={`/profile/${userId || 'me'}`} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 18l-6-6l6-6"/>
            </svg>
            Back to Profile
          </Link>
        </div>

        {/* Profile Picture Section */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700 text-center">
          <div className="relative">
            <Image
              src={avatarUrl}
              alt="Profile picture"
              width={120}
              height={120}
              className="rounded-full object-cover mb-3"
            />
            <label className="cursor-pointer select-none">
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="absolute -bottom-1 -right-1 text-primary-500"
              >
                <circle cx={12} cy={12} r={9} />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1={9} y1={9} x2={15} y2={15} />
              </svg>
              <Input
                type="file"
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (r) => setAvatarUrl(r.target.result);
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
              <span className="text-xs text-gray-400">Change photo</span>
            </label>
          </div>
          <p className="text-xs text-gray-400 mt-2">Change profile picture</p>
        </div>

        {/* Edit Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSaving(true);
            // In full implementation, would save to backend
            setIsSaving(false);
            window.alert('Profile saved successfully!');
          }}
          className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700"
        >
          <h2 className="font-medium text-white mb-4 text-center">Edit Profile</h2>

          {/* Display Name */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Display Name</label>
            <Input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display name"
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Username</label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                disabled={isSaving}
                className="flex-1 rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button
                variant="outline"
                size="sm"
                disabled={isSaving || !username.trim()}
                onClick={checkUsernameAvailability}
                className="px-3 py-2 text-sm"
              >
                Check
              </Button>
            </div>
            {usernameAvailable !== null && (
              <p className={`text-xs ${
                usernameAvailable ? 'text-green-400' : 'text-red-500'
              }`}
            >
              {usernameAvailable ? 'Available' : 'Username taken'}
            </p>
            )}
            {showDuplicateWarning && (
              <p className="text-xs text-red-500 mt-1">This username is already taken</p>
            )}
          </div>

          {/* Biography */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Biography</label>
            <Input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell people who you are..."
              rows={3}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">Maximum 150 characters</p>
          </div>

          {/* Website */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Website</label>
            <Input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-xs text-gray-400 mt-1">Must start with http:// or https://</p>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Location</label>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non_binary">Non-binary</option>
              <option value="not_specified">Not specified</option>
            </select>
          </div>

          {/* Pronouns */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Pronouns</label>
            <Input
              type="text"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              placeholder="he/him, she/her, they/them..."
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Account Category */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Account Type</label>
            <select
              value={accountCategory}
              onChange={(e) => setAccountCategory(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="personal">Personal</option>
              <option value="creator">Creator</option>
              <option value="business">Business</option>
            </select>
          </div>

          {/* Website Validation */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Website Format</label>
            <p className="text-xs text-gray-400">
              Website should start with http:// or https://
            </p>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}