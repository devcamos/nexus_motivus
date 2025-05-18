'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RotatingQuotes from '@/components/RotatingQuotes';

const topics = [
  { id: 'brain', name: '🧠 Brain Health', description: 'Learn about memory, thinking, and learning' },
  { id: 'health', name: '❤️ Healthy Living', description: 'Discover exercise, food, and sleep' },
  { id: 'focus', name: '🎯 Super Focus', description: 'Master concentration and attention' },
  { id: 'adaptogens', name: '🌿 Natural Helpers', description: 'Explore special plants and herbs' },
];

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const router = useRouter();

  const handleExplore = () => {
    if (selectedTopic) {
      router.push(`/topics/${selectedTopic}`);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white px-4">
      <div className="max-w-2xl w-full">
        {/* Welcoming Hero Section */}
        <div className="text-center mb-12 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-800 tracking-tight">
            Hello, Curious Mind! 🌟
          </h1>
          <p className="text-xl text-purple-600 max-w-xl mx-auto">
            Let's explore big ideas in simple ways. What would you like to learn about today?
          </p>
        </div>

        {/* Topic Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transform hover:scale-[1.02] transition-transform">
          <div className="relative">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-purple-100 rounded-xl appearance-none bg-transparent focus:border-purple-500 focus:outline-none text-purple-800 font-medium cursor-pointer"
            >
              <option value="">Choose a Topic to Explore...</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl pointer-events-none">
              🔍
            </div>
          </div>

          {selectedTopic && (
            <div className="text-center animate-fade-in">
              <p className="text-purple-600 mb-4">
                {topics.find(t => t.id === selectedTopic)?.description}
              </p>
              <button
                onClick={handleExplore}
                className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Start Learning! 🚀
              </button>
            </div>
          )}
        </div>

        {/* Footer Quote */}
        <RotatingQuotes />
      </div>
    </main>
  );
}
