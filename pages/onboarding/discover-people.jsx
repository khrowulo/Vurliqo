/*
 * Vurliqo - Onboarding Discover People
 * Phase 2: Discover and follow other users
 */

import Image from 'next/image';
import { Button } from '../../components/ui/button';

export default function OnboardingDiscoverPeople() {
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
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Find Friends
        </h1>
        <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
          Connect with people who share your interests.
        </p>

        <div className="space-y-4 w-full max-w-md">
          {/* Suggested users placeholder */}
          <div className="rounded-xl bg-gray-800 p-4 border border-gray-700 text-center">
            <p className="text-gray-400">No suggestions yet</p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled
          >
            Finish Onboarding
          </Button>
        </div>
      </div>
    </main>
  );
}