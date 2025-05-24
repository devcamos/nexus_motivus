'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RotatingQuotes from '@/components/RotatingQuotes';
import { topicsData } from '@/data/topicsData';

const topics = topicsData.map((topic) => ({
  id: topic.id,
  name: `${topic.emoji} ${topic.name}`,
  description: topic.description,
}));

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
            Hey There, Health Explorer! 🌟
          </h1>
          <p className="text-xl text-purple-600 max-w-xl mx-auto">
            Let's discover amazing health secrets in simple ways.
          </p>
        </div>

        {/* Topic Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transform hover:scale-[1.02] transition-transform">
          {/* Dropdown Label */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-purple-800 mb-2">
              Which topic excites you most? 🎯
            </h2>
            <p className="text-purple-600 text-sm">
              Click the dropdown below to see all available topics
            </p>
          </div>

          {/* Enhanced Dropdown */}
          <div className="relative group">
            <label htmlFor="topic-selector" className="sr-only">
              Choose a topic
            </label>
            <div className="relative">
              <select
                id="topic-selector"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full pl-6 pr-12 py-5 text-lg border-2 border-purple-200 rounded-xl bg-white hover:bg-purple-50 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 text-purple-800 font-medium cursor-pointer shadow-sm transition-all duration-200 appearance-none dropdown-arrow"
              >
                <option value="" disabled>
                  👆 Choose your learning adventure...
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
                💡 Tip: Click the box above to see {topics.length} amazing
                topics!
              </p>
            )}
          </div>

          {/* Topic Description - only show when topic is selected */}
          {selectedTopic && (
            <div className="text-center animate-fade-in mb-4">
              <p className="text-purple-600">
                {topics.find((t) => t.id === selectedTopic)?.description}
              </p>
            </div>
          )}

          {/* Button - always visible but changes state based on selection */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleExplore}
              disabled={!selectedTopic}
              className={`px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 shadow-md relative overflow-hidden group ${
                selectedTopic
                  ? 'bg-purple-600 text-white hover:bg-purple-700 transform hover:scale-105 hover:shadow-lg cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
              }`}
            >
              <span className="relative z-10">
                {selectedTopic
                  ? 'Start Learning! 🚀'
                  : 'Select a topic first 📚'}
              </span>
              {/* Highlight effect - only active when enabled */}
              {selectedTopic && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          </div>
        </div>

        {/* Footer Quote */}
        <RotatingQuotes />
      </div>
    </main>
  );
}
