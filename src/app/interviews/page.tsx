'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MessageSquare, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function InterviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Hello! I am your AI mock interview assistant. Let\'s start with a technical interview. Are you ready?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [interviewScore, setInterviewScore] = useState<{
    overall: number;
    confidence: number;
    communication: number;
    technical: number;
  } | null>(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        content: input,
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setInput('');

      // TODO: Call Gemini API for AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: 'That\'s a great answer! Now, let\'s move to the next question...',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 500);
    }
  };

  const endInterview = () => {
    setInterviewScore({
      overall: 82,
      confidence: 85,
      communication: 78,
      technical: 84,
    });
  };

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 md:ml-64 p-4 md:p-8 min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Mock Interview
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Section */}
              <Card className="lg:col-span-2 h-[600px] flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <span className="text-xs opacity-70">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {!interviewScore && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your answer..."
                      className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-indigo-600 focus:outline-none dark:bg-gray-800 dark:text-white"
                    />
                    <Button onClick={handleSendMessage} size="md">
                      <Send size={20} />
                    </Button>
                  </div>
                )}
              </Card>

              {/* Score Card */}
              {interviewScore && (
                <Card>
                  <h3 className="text-lg font-semibold mb-4">Interview Results</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Overall', value: interviewScore.overall, color: 'indigo' },
                      { label: 'Confidence', value: interviewScore.confidence, color: 'green' },
                      { label: 'Communication', value: interviewScore.communication, color: 'purple' },
                      { label: 'Technical', value: interviewScore.technical, color: 'blue' },
                    ].map((score) => (
                      <div key={score.label}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{score.label}</span>
                          <span className="text-sm font-bold">{score.value}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`bg-${score.color}-600 h-2 rounded-full`}
                            style={{ width: `${score.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {!interviewScore && (
              <div className="flex gap-4 mt-6">
                <Button onClick={endInterview} variant="outline" className="flex-1">
                  End Interview
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
