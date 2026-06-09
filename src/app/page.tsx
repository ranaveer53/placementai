'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Zap, Users, Brain, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-gray-950">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              AI-Powered Campus Placements
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
              Connect students with opportunities. Empower recruiters with insights. Simplify placement
              management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" variant="primary">
                  Get Started <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose PlacementAI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-indigo-600 mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Placement Process?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join hundreds of institutions using PlacementAI
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Start Free Trial <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

const features = [
  {
    icon: <Brain size={40} />,
    title: 'AI-Powered Matching',
    description: 'Intelligent job matching using machine learning algorithms',
  },
  {
    icon: <Zap size={40} />,
    title: 'Resume Analyzer',
    description: 'Automated resume parsing and skill extraction',
  },
  {
    icon: <Users size={40} />,
    title: 'Multi-Role Support',
    description: 'Dedicated interfaces for students, recruiters, and admins',
  },
  {
    icon: <BarChart3 size={40} />,
    title: 'Advanced Analytics',
    description: 'Comprehensive insights and placement statistics',
  },
];
