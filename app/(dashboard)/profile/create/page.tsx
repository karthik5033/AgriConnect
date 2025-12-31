'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createProfile } from '@/actions/profile.actions';

export default function CreateProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    bio: '',
    location: '',
    website: '',
    crops: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!formData.name.trim()) {
        setError('Full name is required');
        setIsLoading(false);
        return;
      }

      if (!formData.email.trim()) {
        setError('Email is required');
        setIsLoading(false);
        return;
      }

      if (!formData.bio.trim()) {
        setError('Bio is required');
        setIsLoading(false);
        return;
      }

      if (!formData.crops.trim()) {
        setError('Please add at least one crop');
        setIsLoading(false);
        return;
      }

      const age = formData.age ? parseInt(formData.age, 10) : null;
      if (age && (age < 15 || age > 120)) {
        setError('Please enter a valid age between 15 and 120');
        setIsLoading(false);
        return;
      }

      console.log('Creating profile with data:', formData);

      const result = await createProfile({
        name: formData.name,
        email: formData.email,
        gender: formData.gender || undefined,
        age: age || undefined,
        bio: formData.bio,
        location: formData.location || undefined,
        website: formData.website || undefined,
        crops: formData.crops
      });

      console.log('Profile creation result:', result);

      if (result.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', gender: '', age: '', bio: '', location: '', website: '', crops: '' });
        
        setTimeout(() => {
          router.push('/feed');
        }, 1500);
      } else {
        setError(result.error || 'Failed to create profile. Please try again.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Profile creation exception:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Created!</h2>
          <p className="text-gray-600 mb-6">Your profile has been successfully created. Redirecting to feed...</p>
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-green-600 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <div className="mb-8 pt-4">
          <Link href="/feed">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Feed
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-8">
            <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
            <p className="text-green-100">Help the farming community know more about you</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <div className="text-red-600 mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-red-900">Error</p>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your legal or preferred name
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll use this to contact you about farming opportunities
                </p>
              </div>

              {/* Gender and Age */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender <span className="text-gray-400">(Optional)</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={isLoading}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age <span className="text-gray-400">(Optional)</span>
                  </label>
                  <Input
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={isLoading}
                    min="15"
                    max="120"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="bio"
                  placeholder="Tell us about your farming background, expertise, and experience (e.g., 'Wheat farmer with 10 years of experience in Punjab')"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full min-h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  disabled={isLoading}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.bio.length}/500 characters
                </p>
              </div>

              {/* Crops */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Crops <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="crops"
                  placeholder="E.g. Wheat, Rice, Corn (comma-separated)"
                  value={formData.crops}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the crops you grow or work with, separated by commas
                </p>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location <span className="text-gray-400">(Optional)</span>
                </label>
                <Input
                  type="text"
                  name="location"
                  placeholder="E.g. Punjab, India"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your farming location or district
                </p>
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Website <span className="text-gray-400">(Optional)</span>
                </label>
                <Input
                  type="url"
                  name="website"
                  placeholder="https://yourfarm.com"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Link to your farm's website or social media
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2 py-2 h-10"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Profile'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoading}
                  className="px-6"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Info Section */}
          <div className="bg-blue-50 border-t border-gray-200 px-8 py-6">
            <h3 className="font-semibold text-blue-900 mb-3">Why complete your profile?</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                Connect with other farmers and agricultural professionals
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                Get personalized recommendations based on your crops
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                Increase visibility in the community
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                Build your farming reputation
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
