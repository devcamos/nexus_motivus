'use client';

import { useParams, useRouter } from 'next/navigation';
import { findTopicById } from '@/data/topicsData';

// Simple icon component to replace lucide-react
const ArrowLeft = () => <span className="text-xl">←</span>;

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;
  
  const topic = findTopicById(topicId);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">Topic not found</h1>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex justify-center mb-8">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors mr-4 bg-white px-4 py-2 rounded-full shadow-sm"
          >
            <ArrowLeft />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Topic Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{topic.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            {topic.name}
          </h1>
          <p className="text-xl text-purple-600 max-w-2xl mx-auto">
            {topic.description}
          </p>
        </div>

        {/* Subtopics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topic.subtopics.map((subtopic) => (
            <div
              key={subtopic.id}
              onClick={() => router.push(`/topics/${topicId}/${subtopic.id}`)}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-xl border-2 border-transparent hover:border-purple-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{subtopic.emoji}</div>
                <h3 className="text-xl font-bold text-purple-800 mb-3">
                  {subtopic.name}
                </h3>
                <p className="text-purple-600 text-sm leading-relaxed">
                  {subtopic.description}
                </p>
                <div className="mt-4 text-purple-500 text-sm font-medium">
                  {subtopic.concepts.length} concepts to explore →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fun Fact Section */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            ✨ Did You Know?
          </h2>
          <p className="text-green-700 text-lg max-w-3xl mx-auto">
            Nature has been our pharmacy for thousands of years! Every culture around the world 
            has discovered amazing plants and practices that help us feel better, think clearer, 
            and live healthier lives. You're about to explore some of nature's best-kept secrets!
          </p>
        </div>
      </div>
    </div>
  );
}