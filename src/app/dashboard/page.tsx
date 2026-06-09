'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { useAuthStore } from '@/store/authStore';
import { LayoutDashboard, BarChart3, Users, Briefcase } from 'lucide-react';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();

  const stats = [
    { label: 'Applications', value: '24', icon: <Briefcase size={32} />, trend: '+5 this week' },
    { label: 'Profile', value: '85%', icon: <LayoutDashboard size={32} />, trend: '+10% growth' },
    { label: 'Resume Score', value: '78/100', icon: <BarChart3 size={32} />, trend: 'Strong' },
    { label: 'Interviews', value: '3', icon: <Users size={32} />, trend: '+1 scheduled' },
  ];

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 md:ml-64 p-4 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {user?.full_name || 'User'}!
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  trend={stat.trend}
                  trendUp={idx % 2 === 0}
                />
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Application Status">
                <div className="h-64 bg-white dark:bg-gray-800 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder</p>
                </div>
              </ChartCard>
              <ChartCard title="Placement Probability">
                <div className="h-64 bg-white dark:bg-gray-800 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder</p>
                </div>
              </ChartCard>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
