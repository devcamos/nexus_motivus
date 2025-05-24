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
            Let's explore big health ideas in simple ways.
          </p>
        </div>

        {/* Topic Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transform hover:scale-[1.02] transition-transform">
          {/* Dropdown Label */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-purple-800 mb-2">
              What would you like to learn about today? 🎯
            </h2>
            <p className="text-purple-600 text-sm">
              Click the dropdown below to see all available topics
            </p>
          </div>

          {/* Enhanced Dropdown */}
          <div className="relative group">
            <label htmlFor="topic-selector" className="block text-sm font-medium text-purple-700 mb-2">
              📚 Available Topics:
            </label>
            <div className="relative">
              <select
                id="topic-selector"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full pl-6 pr-12 py-5 text-lg border-2 border-purple-200 rounded-xl bg-white hover:bg-purple-50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 text-purple-800 font-medium cursor-pointer shadow-sm transition-all duration-200 appearance-none"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b46c1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                <option value="" disabled>
                  👆 Click here to see all topics...
                </option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Helpful hint */}
            {!selectedTopic && (
              <p className="text-xs text-purple-500 mt-2 text-center animate-pulse">
                💡 Tip: Click the box above to see {topics.length} amazing topics!
              </p>
            )}
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
