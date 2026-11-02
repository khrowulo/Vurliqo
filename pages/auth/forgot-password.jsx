/*
 * Vurliqo - Forgot Password Page
 * Phase 2: Password recovery flow
 */

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert('Please enter your email address');
      return;
    }
    setIsLoading(true);
    try {
      // In a real implementation, would trigger Supabase password reset
      // For now, simulate success
      setShowSuccess(true);
    } catch (err) {
      console.error('Error sending reset email:', err);
      alert('Error sending reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Image
            src="/vurliqo-logo.svg"
            alt="Vurliqo"
            width={120}
            height={120}
            className="mx-auto block mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-sm text-gray-500">Enter your email below and we'll send you a reset link</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        {showSuccess && (
          <div className="mt-6 text-center text-green-500">
            <p>If an account with that email exists, a password reset link has been sent.</p>
            <Button
              variant="outline"
              size="sm"
              href="/auth/login"
            >
              Go to Log In
            </Button>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <a href="/auth/login" className="underline">
            Remember your password? Log In
          </a>
        </div>
      </div>
    </main>
  );
}