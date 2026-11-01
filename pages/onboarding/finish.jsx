/*
 * Vurliqo - Onboarding Finish
 * Phase 2: Onboarding completion
 */

import Image from 'next/image';
import { Button } from '../../components/ui/button';

export default function OnboardingFinish() {
  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center pt-20">
        <Image
          src="/vurliqo-logo.svg"
          alt="Vurliqo"
          width={120}
          height={120}
          className="mx-auto mb-6"
        />
        
        <svg
          width={80}
          height={80}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mx-auto mb-6 text-green-500"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 7l10 5 10-5" />
        </svg>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Welcome to Vurliqo!
        </h1>
        <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
          You're all set. Start sharing your moments with the world.
        </p>

        <div className="flex gap-3 mb-8">
          <Button
            variant="primary"
            size="lg"
            href="/"
          >
            Go to Home
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/auth/profile"
          >
            View Profile
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          By signing up, you agree to Vurliqo's Terms and Privacy Policy
        </p>
      </div>
    </main>
  );
}