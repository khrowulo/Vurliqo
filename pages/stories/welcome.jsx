/*
 * Vurliqo - Stories Welcome
 * Phase 3: Welcome screen for Stories feature
 */

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function StoriesWelcome() {
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
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Stories
        </h1>
        <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
          Share moments that disappear in 24 hours.
        </p>

        <div className="flex gap-3 mb-8">
          <Button
            variant="primary"
            size="lg"
            href="/auth/login"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/onboarding/welcome"
          >
            Onboarding
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Stories are visible to everyone for 24 hours
        </p>
      </div>
    </main>
  );
}