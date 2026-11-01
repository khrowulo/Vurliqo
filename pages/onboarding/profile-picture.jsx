/*
 * Vurliqo - Onboarding Profile Picture
 * Phase 2: Set profile picture
 */

import Image from 'next/image';
import { Button } from '../../components/ui/button';

export default function OnboardingProfilePicture() {
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
        
        <div className="rounded-full w-40 h-40 bg-gray-700 border border-gray-600 flex items-center justify-center mb-6 text-gray-400">
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="mx-auto"
          >
            <path d="M4 4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4zm0 0V2c0-1.5 1.1-3 3-3h12c1.5 0 3 1.1 3 3v12c0 1.5-1.1 3-3 3h-3l.59 8H5l-.59-8zm16 4c0 1.66-1.34 3-3 3s-3-1.34-3-3v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 1.66 1.34 3 3 3s3-1.34 3-3v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 1.66 1.34 3 3 3s3-1.34 3-3v-2z" />
          </svg>
        </div>

        <p className="text-center text-gray-500 mb-8 text-sm">
          Add a profile picture so people can recognize you
        </p>

        <Button
          variant="primary"
          size="lg"
          className="mt-6 w-full"
          disabled
        >
          Next: Complete Profile
        </Button>
      </div>
    </main>
  );
}