'use client';

import { useState, useEffect } from 'react';

const quotes = [
  {
    text: 'The only silly question is the one that goes unasked.',
    emoji: '💭',
  },
  {
    text: 'Every day is a chance to learn something new.',
    emoji: '✨',
  },
  {
    text: 'Curiosity is the key to knowledge.',
    emoji: '🔑',
  },
  {
    text: 'Small steps lead to big understanding.',
    emoji: '👣',
  },
  {
    text: 'Learning is like planting a garden in your mind.',
    emoji: '🌱',
  },
  {
    text: 'Your brain is a superhero that helps you discover amazing things!',
    emoji: '🦸‍♂️',
  },
  {
    text: 'Healthy habits make you shine bright like a star.',
    emoji: '⭐',
  },
  {
    text: 'When you focus, your mind becomes a magical telescope.',
    emoji: '🔭',
  },
  {
    text: "Nature's gifts help us grow strong and happy.",
    emoji: '🌿',
  },
];

export default function RotatingQuotes() {
  // Initialize with null values to avoid hydration mismatch
  const [currentQuote, setCurrentQuote] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set initial state only on the client side
    setCurrentQuote(0);
    setIsVisible(true);

    const interval = setInterval(() => {
      setIsVisible(false); // Start fade out and scale down

      setTimeout(() => {
        setCurrentQuote(
          (prev) => ((prev === null ? 0 : prev) + 1) % quotes.length
        );
        setIsVisible(true); // Start fade in and scale up
      }, 600); // Slightly longer fade out for smoother transition
    }, 6000); // Slightly longer display time for better readability

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 text-center min-h-[4rem] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto bg-purple-50 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
        <p
          className={`
            text-purple-700 italic text-base md:text-lg font-light
            transition-all duration-600 ease-in-out
            ${
              isVisible
                ? 'opacity-100 transform translate-y-0 scale-100'
                : 'opacity-0 transform translate-y-4 scale-95'
            }
          `}
        >
          {quotes &&
          Array.isArray(quotes) &&
          currentQuote !== null &&
          currentQuote >= 0 &&
          currentQuote < quotes.length
            ? `"${quotes[currentQuote].text}" ${quotes[currentQuote].emoji}`
            : ''}
        </p>
      </div>
    </div>
  );
}
