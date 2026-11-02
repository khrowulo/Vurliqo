/*
 * Vurliqo - Login Page
 * Phase 2: Login with email/password and Google OAuth
 */

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('Please enter email and password');
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        router.push('/');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      alert(err.message || 'Error during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (err) {
      console.error('Error signing in with Google:', err);
      alert(err.message || 'Error during Google sign in.');
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
          <h1 className="text-2xl font-bold text-white">Log In</h1>
          <p className="text-sm text-gray-400">Welcome back!</p>
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
            className="w-full"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <Link href="/auth/signup" className="underline">
            Don't have an account? Sign Up
          </Link>
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            Continue with Google
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <Link href="/auth/forgot-password" className="underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </main>
  );
}
