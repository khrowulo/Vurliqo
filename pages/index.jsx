/*
 * Vurliqo - Welcome Screen
 * Phase 1: Initial welcome screen with sign up and log in options
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";

export default function WelcomePage() {
  const [showGoogle, setShowGoogle] = useState(false);

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        {/* Vurliqo Logo/Wordmark */}
        <div className="text-center mb-8">
          <Image
            src="/vurliqo-logo.svg"
            alt="Vurliqo"
            width={120}
            height={120}
            className="mx-auto block"
          />
          <h1 className="text-2xl font-bold text-gray-900 mt-3 tracking-tight">
            Vurliqo
          </h1>
          <p className="text-sm text-gray-500 mt-1">Share your moments</p>
        </div>

        {/* Sign Up Button */}
        <Link
          href="/auth/signup"
          className="flex justify-center mb-4">
          <Button
            variant="primary"
            size="lg"
          >
            Sign Up
          </Button>
        </Link>

        {/* Log In Button */}
        <Link
          href="/auth/login"
          className="flex justify-center mb-6">
          <Button
            variant="outline"
            size="lg"
          >
            Log In
          </Button>
        </Link>

        {/* Continue with Google */}
        {showGoogle && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
            >
              Continue with Google
            </Button>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <a href="/auth/forgot-password" className="underline">
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
}