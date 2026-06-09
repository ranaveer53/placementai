'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Upload, FileText } from 'lucide-react';

export default function ResumePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resumeScore, setResumeScore] = useState(78);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // TODO: Implement resume analysis with Gemini API
    }
  };

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 md:ml-64 p-4 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Resume Analyzer</h1>

            {/* Upload Section */}
            <Card className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <Upload className="mx-auto mb-4 text-indigo-600" size={40} />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Drag and drop your resume or click to upload
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload">
                  <Button as="label" className="cursor-pointer">
                    Select File
                  </Button>
                </label>
                {file && <p className="mt-4 text-sm text-green-600">✓ {file.name} uploaded</p>}
              </div>
            </Card>

            {/* Resume Score */}
            <Card className="mb-8">
              <h2 className="text-xl font-semibold mb-6">Resume Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Score Gauge */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(resumeScore / 100) * 377} 377`}
                        className="text-indigo-600 transition-all"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{resumeScore}</p>
                        <p className="text-xs text-gray-500">/100</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-400">Overall Score</p>
                </div>

                {/* Detailed Scores */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Skills Score</span>
                      <span className="text-sm font-medium">85/100</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: '85%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Project Score</span>
                      <span className="text-sm font-medium">72/100</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: '72%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">ATS Score</span>
                      <span className="text-sm font-medium">78/100</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-pink-600 h-2 rounded-full"
                        style={{ width: '78%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Suggestions */}
            <Card>
              <h2 className="text-xl font-semibold mb-4">Improvement Suggestions</h2>
              <div className="space-y-3">
                {[
                  'Add more technical skills to increase ATS compatibility',
                  'Include quantifiable achievements in project descriptions',
                  'Update certifications section with recent courses',
                  'Improve formatting to match ATS requirements',
                ].map((suggestion, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <span className="text-amber-600 font-bold">•</span>
                    <p className="text-gray-700 dark:text-gray-300">{suggestion}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
