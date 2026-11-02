/*
 * Vurliqo - Onboarding Complete Profile
 * Phase 2: Complete user profile setup
 */

import Image from 'next/image';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function OnboardingCompleteProfile() {
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center pt-20">
        <Image
          src="/vurliqo-logo.svg"
          alt="Vurliqo"
          width={120}
          height={120}
          className="mx-auto mb-8"
        />
        
        <p className="text-center text-gray-500 mb-6 text-sm">
          Tell us more about yourself
        </p>

        <form className="w-full space-y-4">
          <Input
            placeholder="Bio (what you're up to)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="resize-none w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Input
            placeholder="Website (optional)"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Input
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <div className="w-full flex justify-center">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
            >
              Finish Setup
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}