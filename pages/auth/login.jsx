/*
 * Vurliqo - Login Page
 * Phase 2: Login with email/password and Google OAuth
 */

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGoogle, setShowGoogle] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('Please enter email and password');
      return;
    }
    setIsLoading(true);
    try {
      // In a real implementation, would use Supabase Auth
      // For now, just check credentials and navigate
      if (email === 'test@test.com' && password === 'password123') {
        window.location.href = '/';
      } else {
        alert('Invalid email or password');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      alert('Error during login. Please try again.');
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
          <h1 className="text-2xl font-bold text-gray-900">Log In</h1>
          <p className="text-sm text-gray-500">Welcome back!</p>
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
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <a href="/auth/signup" className="underline">
            Don't have an account? Sign Up
          </a>
        </div>

        {/* Google Sign In */}
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