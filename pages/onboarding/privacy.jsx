/*
 * Vurliqo - Onboarding Privacy
 * Phase 2: Privacy settings and data usage
 */

import Image from 'next/image';
import { Button } from '../../components/ui/button';

export default function OnboardingPrivacy() {
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
          Stay Private
        </h1>
        <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
          Control who can see your posts and connect with you.
        </p>

        <div className="space-y-4 w-full max-w-md text-left">
          <div>
            <h3 className="font-medium text-white mb-2">Post Visibility</h3>
            <p className="text-gray-400 text-sm">
              Your posts can be public or visible to followers only. Change this anytime in settings.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-white mb-2">Data Usage</h3>
            <p className="text-gray-400 text-sm">
              We use your data to improve the Vurliqo experience and show relevant content.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
          >
            Finish Onboarding
          </Button>
        </div>
      </div>
    </main>
  );
}