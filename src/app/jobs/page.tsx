'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { JobCard } from '@/components/jobs/JobCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search, Filter } from 'lucide-react';
import { Job } from '@/types';

export default function JobsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    company: '',
    location: '',
    minPackage: 0,
    workType: '',
  });

  // Mock data - replace with API call
  const jobs: Job[] = [
    {
      id: '1',
      recruiter_id: 'rec1',
      company_name: 'Google',
      title: 'Software Engineer',
      description: 'We are looking for talented software engineers',
      package: 1200000,
      location: 'Bangalore',
      work_type: 'full-time',
      skills_required: ['React', 'Node.js', 'TypeScript'],
      eligibility_cgpa: 7.5,
      eligibility_departments: ['CSE', 'IT'],
      application_deadline: new Date().toISOString(),
      created_at: new Date().toISOString(),
      status: 'open',
    },
    {
      id: '2',
      recruiter_id: 'rec2',
      company_name: 'Microsoft',
      title: 'Cloud Solutions Architect',
      description: 'Design and implement cloud solutions',
      package: 1500000,
      location: 'Hyderabad',
      work_type: 'full-time',
      skills_required: ['AWS', 'Azure', 'Docker'],
      eligibility_cgpa: 8.0,
      eligibility_departments: ['CSE'],
      application_deadline: new Date().toISOString(),
      created_at: new Date().toISOString(),
      status: 'open',
    },
  ];

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 md:ml-64 p-4 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Explore Jobs</h1>
              <p className="text-gray-600 dark:text-gray-400">Find your perfect job opportunity</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Input
                  placeholder="Search jobs by title, company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Company"
                  value={filters.company}
                  onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                />
                <Input
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
                <Input
                  placeholder="Min Package (LPA)"
                  type="number"
                  value={filters.minPackage}
                  onChange={(e) => setFilters({ ...filters, minPackage: parseInt(e.target.value) || 0 })}
                />
                <Button variant="outline" className="w-full">
                  <Filter size={20} /> Advanced
                </Button>
              </div>
            </div>

            {/* Job Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  matchScore={85}
                  onApply={(jobId) => console.log('Apply to job:', jobId)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
