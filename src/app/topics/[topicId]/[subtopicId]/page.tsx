'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';



import ChatPrompt from '@/components/ChatPrompt';
import { findTopicById, findSubtopicById, Concept } from '@/data/topicsData';

// Simple icon components to replace lucide-react
const ArrowLeft = () => <span className="text-xl">←</span>;
const MessageCircle = () => <span className="text-sm">💬</span>;
const BookOpen = () => <span className="text-sm">📖</span>;
const Lightbulb = () => <span className="text-sm">💡</span>;

export default function SubtopicPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;
  const subtopicId = params.subtopicId as string;

  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [showChatPrompt, setShowChatPrompt] = useState(false);

  const topic = findTopicById(topicId);
  const subtopic = findSubtopicById(topicId, subtopicId);

  if (!topic || !subtopic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">
            Subtopic not found
          </h1>
          <button
            onClick={() => router.push('/')}
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleConceptClick = (concept: Concept) => {
    setSelectedConcept(concept);
    setShowChatPrompt(true);
  };

  const closeChatPrompt = () => {
    setShowChatPrompt(false);
    setSelectedConcept(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-purple-600 hover:text-purple-800 transition-colors"
          >
            Home
          </button>
          <span className="text-purple-400">→</span>
          <button
            onClick={() => router.push(`/topics/${topicId}`)}
            type="button"
            className="text-purple-600 hover:text-purple-800 transition-colors"
          >
            {topic.emoji} {topic.name}
          </button>
          <span className="text-purple-400">→</span>
          <span className="text-purple-800 font-medium">
            {subtopic.emoji} {subtopic.name}
          </span>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/topics/${topicId}`)}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors mb-8 bg-white px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft />
          <span>Back to {topic.name}</span>
        </button>

        {/* Subtopic Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{subtopic.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            {subtopic.name}
          </h1>
          <p className="text-xl text-purple-600 max-w-2xl mx-auto">
            {subtopic.description}
          </p>
        </div>

        {/* Concepts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {subtopic.concepts.map((concept) => (
            <div
              key={concept.id}
              onClick={() => handleConceptClick(concept)}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-xl border-2 border-transparent hover:border-green-200 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {concept.emoji}
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">
                {concept.name}
              </h3>
              <p className="text-purple-600 text-sm leading-relaxed mb-4">
                {concept.description}
              </p>

              {/* Interactive Indicators */}
              <div className="flex items-center gap-4 text-xs text-green-600">
                <div className="flex items-center gap-1">
                  <MessageCircle />
                  <span>Chat</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen />
                  <span>Learn</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lightbulb />
                  <span>Try</span>
                </div>
              </div>

              <div className="mt-3 text-green-500 text-sm font-medium group-hover:text-green-600">
                Start exploring! 💬
              </div>
            </div>
          ))}
        </div>

        {/* Encouragement Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            🎯 Ready to Dive Deep?
          </h2>
          <p className="text-green-700 text-lg max-w-3xl mx-auto">
            Each concept above opens up a world of discovery! Click on any one
            to start a conversation. You can ask questions, try exercises, and
            learn in a way that makes sense to you. Think of me as your friendly
            guide through nature&apos;s wisdom!
          </p>
        </div>
      </div>

      {/* Chat Prompt Modal */}
      {showChatPrompt && selectedConcept && (
        <ChatPrompt concept={selectedConcept} onCloseAction={closeChatPrompt} />
      )}
    </div>
  );
}
