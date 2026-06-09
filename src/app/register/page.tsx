'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validators';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'student' | 'recruiter'>('student');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: selectedRole },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // API call to register
      console.log('Register:', { ...data, role: selectedRole });
      // TODO: Implement actual registration
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-20 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Join PlacementAI today</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {(['student', 'recruiter'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`p-3 rounded-lg border-2 transition capitalize font-medium ${
                  selectedRole === role
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900 text-indigo-600'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              {...register('full_name')}
              error={errors.full_name?.message as string}
            />
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
              error={errors.email?.message as string}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message as string}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              {...register('confirm_password')}
              error={errors.confirm_password?.message as string}
            />

            <Button type="submit" size="lg" isLoading={loading} className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
