'use client';

import { useState } from 'react';
import { Concept } from '@/data/topicsData';

// Simple icon components to replace lucide-react
const XIcon = () => <span className="text-xl">✕</span>;
const MessageCircleIcon = () => <span className="text-xl">💬</span>;
const BookOpenIcon = () => <span className="text-xl">📖</span>;
const LightbulbIcon = () => <span className="text-xl">💡</span>;
const SendIcon = () => <span className="text-xl">➤</span>;

interface ChatPromptProps {
  concept: Concept;
  onCloseAction: () => void;
}

type ChatMode = 'intro' | 'questions' | 'exercises' | 'chat';

export default function ChatPrompt({
  concept,
  onCloseAction,
}: ChatPromptProps) {
  const [mode, setMode] = useState<ChatMode>('intro');
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);

  const handleQuestionClick = (question: string) => {
    setMode('chat');
    setChatMessages([
      { role: 'user', content: question },
      {
        role: 'assistant',
        content: `Great question! ${question}\n\nLet me explain this in a simple way...`,
      },
    ]);
  };

  const handleExerciseClick = (exercise: string) => {
    setMode('chat');
    setChatMessages([
      { role: 'user', content: `I want to try: ${exercise}` },
      {
        role: 'assistant',
        content: `Awesome! Let's do this together. ${exercise}\n\nHere's how we'll start...`,
      },
    ]);
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { role: 'user', content: userMessage },
      {
        role: 'assistant',
        content: `Thanks for asking about "${userMessage}"! This is where the real conversation would happen with an AI assistant who can explain ${concept.name} in detail.`,
      },
    ]);
    setUserMessage('');
    setMode('chat');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 relative">
          <button
            onClick={onCloseAction}
            type="button"
            aria-label="Close dialog"
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <XIcon />
          </button>
          <div className="text-center">
            <div className="text-4xl mb-2">{concept.emoji}</div>
            <h2 className="text-2xl font-bold">{concept.name}</h2>
            <p className="text-green-100 mt-1">{concept.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {mode === 'intro' && (
            <div className="space-y-6">
              {/* Introduction */}
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-green-800 leading-relaxed whitespace-pre-line">
                  {concept.chatPrompt.introduction}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid gap-4">
                <button
                  onClick={() => setMode('questions')}
                  type="button"
                  className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-left"
                >
                  <MessageCircleIcon />
                  <div>
                    <div className="font-semibold text-blue-800">
                      Ask Questions
                    </div>
                    <div className="text-blue-600 text-sm">
                      Get answers about {concept.name}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setMode('exercises')}
                  type="button"
                  className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-left"
                >
                  <LightbulbIcon />
                  <div>
                    <div className="font-semibold text-purple-800">
                      Try Exercises
                    </div>
                    <div className="text-purple-600 text-sm">
                      Hands-on activities and experiments
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setMode('chat')}
                  type="button"
                  className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-left"
                >
                  <BookOpenIcon />
                  <div>
                    <div className="font-semibold text-green-800">
                      Free Chat
                    </div>
                    <div className="text-green-600 text-sm">
                      Ask me anything about this topic
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {mode === 'questions' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setMode('intro')}
                  type="button"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ← Back
                </button>
                <h3 className="text-lg font-bold text-blue-800">
                  Popular Questions
                </h3>
              </div>
              {concept.chatPrompt.questions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  type="button"
                  className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                >
                  <div className="font-medium text-blue-800">❓ {question}</div>
                </button>
              ))}
            </div>
          )}

          {mode === 'exercises' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setMode('intro')}
                  type="button"
                  className="text-purple-600 hover:text-purple-800 text-sm"
                >
                  ← Back
                </button>
                <h3 className="text-lg font-bold text-purple-800">
                  Try These Activities
                </h3>
              </div>
              {concept.chatPrompt.exercises.map((exercise, index) => (
                <button
                  key={index}
                  onClick={() => handleExerciseClick(exercise)}
                  type="button"
                  className="w-full text-left p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
                >
                  <div className="font-medium text-purple-800">
                    🎯 {exercise}
                  </div>
                </button>
              ))}
            </div>
          )}

          {mode === 'chat' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setMode('intro')}
                  type="button"
                  className="text-green-600 hover:text-green-800 text-sm"
                >
                  ← Back
                </button>
                <h3 className="text-lg font-bold text-green-800">
                  Chat about {concept.name}
                </h3>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl ${
                      message.role === 'user'
                        ? 'bg-green-100 text-green-800 ml-8'
                        : 'bg-gray-100 text-gray-800 mr-8'
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </div>
                    <div className="whitespace-pre-line">{message.content}</div>
                  </div>
                ))}
              </div>

              {/* Follow-up Prompts */}
              {chatMessages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm mb-3">
                    💡 Try asking about:
                  </p>
                  {concept.chatPrompt.followUpPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(prompt)}
                      type="button"
                      className="block w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Input (only show in chat mode) */}
        {mode === 'chat' && (
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!userMessage.trim()}
                type="button"
                aria-label="Send message"
                className={`p-2 rounded-lg ${
                  userMessage.trim()
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <SendIcon />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 This is a demo - in the real app, this would connect to an AI
              assistant!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
