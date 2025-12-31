'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sprout, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validation
    if (!formData.name.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login?registered=true');
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8 border border-green-100">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-6">Welcome to AgriConnect. Redirecting to login...</p>
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-green-600 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-green-900 text-white p-12">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Sprout className="h-8 w-8 text-green-400" />
          AgriConnect
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Join the world's <br /> largest farming community.
          </h1>
          <p className="text-green-200 text-lg">
            Share updates, ask questions, and grow together with millions of farmers.
          </p>
        </div>
        <div className="text-sm text-green-300">
          © 2025 AgriConnect Inc.
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-black p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Account</h2>
            <p className="text-sm text-gray-500 mt-2">Join us and start connecting with the farming community</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="farmer@example.com"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 6 characters"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account? <Link href="/login" className="text-green-600 hover:underline font-semibold">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
