'use client';

import React from 'react';
import Link from 'next/link';
import { Job } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, DollarSign, Briefcase } from 'lucide-react';

interface JobCardProps {
  job: Job;
  matchScore?: number;
  onApply?: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, matchScore, onApply }) => {
  return (
    <Card hover className="flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {job.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{job.company_name}</p>
        </div>
        {matchScore && (
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
            {matchScore}% Match
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4 flex-1">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <DollarSign size={16} />
          <span>₹{job.package.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Briefcase size={16} />
          <span className="capitalize">{job.work_type}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Required Skills:</p>
        <div className="flex flex-wrap gap-2">
          {job.skills_required.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-xs"
            >
              {skill}
            </span>
          ))}
          {job.skills_required.length > 3 && (
            <span className="text-gray-500 text-xs">+{job.skills_required.length - 3} more</span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Link href={`/jobs/${job.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        {onApply && (
          <Button onClick={() => onApply(job.id)} className="flex-1">
            Apply Now
          </Button>
        )}
      </div>
    </Card>
  );
};
