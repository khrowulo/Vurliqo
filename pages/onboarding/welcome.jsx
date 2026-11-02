/*
 * Vurliqo - Onboarding Welcome
 * Phase 2: Welcome screen for new users
 */

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "../../components/ui/button";

export default function OnboardingWelcome() {
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
          Welcome to Vurliqo!
        </h1>
        <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
          Share your moments, discover new friends, and connect with others.
        </p>

        <Button
          variant="primary"
          size="lg"
          href="/auth/login"
          className="mt-6"
        >
          Log In
        </Button>

        <Button
          variant="outline"
          size="lg"
          href="/auth/signup"
          className="mt-3 ml-4"
        >
          Sign Up
        </Button>
      </div>
    </main>
  );
}