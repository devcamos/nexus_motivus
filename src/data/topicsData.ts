export interface ChatPrompt {
  introduction: string;
  questions: string[];
  exercises: string[];
  followUpPrompts: string[];
}

export interface Concept {
  id: string;
  name: string;
  description: string;
  emoji: string;
  chatPrompt: ChatPrompt;
}

export interface Subtopic {
  id: string;
  name: string;
  description: string;
  emoji: string;
  concepts: Concept[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  emoji: string;
  subtopics: Subtopic[];
}

export const topicsData: Topic[] = [
  {
    id: 'adaptogens',
    name: 'Natural Helpers',
    description: 'Explore special plants and herbs',
    emoji: '🌿',
    subtopics: [
      {
        id: 'adaptogens-herbs',
        name: 'Adaptogen Superstars',
        description: 'Meet the amazing stress-fighting plants',
        emoji: '🌟',
        concepts: [
          {
            id: 'ashwagandha',
            name: 'Ashwagandha',
            description: 'The stress-busting superhero herb',
            emoji: '🦸‍♀️',
            chatPrompt: {
              introduction:
                "🦸‍♀️ Meet Ashwagandha - The Stress-Fighting Superhero!\n\nImagine having a tiny superhero living in a plant that helps your body fight stress! Ashwagandha is like having a calm, wise friend who whispers 'everything will be okay' to your nervous system.\n\n🌿 This magical herb has been helping people feel better for over 3,000 years!",
              questions: [
                'How does this tiny plant fight stress like a superhero?',
                'Is it safe for kids and teenagers to use?',
                'What does it actually feel like when you take it?',
                'How is this different from just drinking chamomile tea?',
                'Can it really help me sleep better?',
              ],
              exercises: [
                "Let's create a 'stress diary' to see how adaptogens might help you",
                'Try a simple breathing exercise that works like ashwagandha',
                "Design your own 'calm superhero' character based on this herb",
              ],
              followUpPrompts: [
                'Want to learn about other stress-fighting plant friends?',
                'Curious about how ancient people discovered these herbs?',
                'Ready to explore natural ways to boost your energy?',
              ],
            },
          },
          {
            id: 'rhodiola',
            name: 'Rhodiola',
            description: 'The energy-boosting mountain climber',
            emoji: '⛰️',
            chatPrompt: {
              introduction:
                "⛰️ Meet Rhodiola - The Mountain Climber's Secret!\n\nPicture a tough little plant growing on freezing mountain tops, getting stronger with every harsh wind and snowstorm. That's Rhodiola! This amazing herb teaches your body to be strong and energetic, just like it learned to be.\n\n💪 It's like having a personal trainer for your energy levels!",
              questions: [
                'How can a mountain plant give me more energy?',
                'What makes this different from drinking coffee?',
                'Can it help me focus better during school?',
                'Why do mountain plants make the best adaptogens?',
                'Is this the same as energy drinks?',
              ],
              exercises: [
                "Create an 'energy map' of your day to see when you need help most",
                'Try mountain-inspired breathing exercises',
                'Design a workout routine inspired by mountain climbers',
              ],
              followUpPrompts: [
                'Want to learn about other energy-boosting natural helpers?',
                'Curious about how extreme environments create super plants?',
                'Ready to explore natural focus enhancers?',
              ],
            },
          },
          {
            id: 'ginseng',
            name: 'Ginseng',
            description: 'The ancient wisdom keeper',
            emoji: '🧙‍♂️',
            chatPrompt: {
              introduction:
                "🧙‍♂️ Meet Ginseng - The Ancient Wisdom Keeper!\n\nImagine a wise old wizard who has been helping people think clearly and feel strong for thousands of years. That's Ginseng! This root looks like a tiny person and has been called 'the root of life' because it helps your whole body work better.\n\n✨ It's like having ancient wisdom in plant form!",
              questions: [
                'Why does this root look like a tiny person?',
                'How can something so old still help us today?',
                "What's the difference between Asian and American ginseng?",
                'Can it really make me smarter?',
                "Why do people call it 'the root of life'?",
              ],
              exercises: [
                "Draw your own 'wisdom root' and what powers it would have",
                'Create a timeline of how ginseng has helped people through history',
                'Try ancient breathing techniques that work with ginseng',
              ],
              followUpPrompts: [
                'Want to explore other ancient plant medicines?',
                'Curious about how different cultures use the same plants?',
                'Ready to learn about brain-boosting herbs?',
              ],
            },
          },
        ],
      },
      {
        id: 'healing-herbs',
        name: 'Healing Garden Heroes',
        description: 'Common herbs with amazing powers',
        emoji: '🌱',
        concepts: [
          {
            id: 'turmeric',
            name: 'Turmeric',
            description: 'The golden inflammation fighter',
            emoji: '✨',
            chatPrompt: {
              introduction:
                "✨ Meet Turmeric - The Golden Healer!\n\nImagine a spice so powerful it turns everything golden and fights inflammation like a tiny warrior! Turmeric is like having sunshine in powder form - it brightens your food AND helps your body heal.\n\n🌟 This golden treasure has been nature's medicine cabinet for over 4,000 years!",
              questions: [
                'Why is turmeric so bright golden yellow?',
                'How does it fight inflammation in my body?',
                'Can I just eat curry to get the benefits?',
                "What's the deal with black pepper and turmeric?",
                'Is it true it can help my brain work better?',
              ],
              exercises: [
                'Make golden milk and learn why each ingredient helps',
                "Create an 'inflammation detective' game",
                'Design your own healing spice blend',
              ],
              followUpPrompts: [
                'Want to learn about other colorful healing spices?',
                'Curious about how spices became medicine?',
                'Ready to explore anti-inflammatory foods?',
              ],
            },
          },
          {
            id: 'lavender',
            name: 'Lavender',
            description: 'The peaceful purple relaxer',
            emoji: '💜',
            chatPrompt: {
              introduction:
                "💜 Meet Lavender - The Purple Peace Maker!\n\nClose your eyes and imagine walking through a field of purple flowers that smell like calm itself. That's lavender! This gentle herb is like a lullaby for your nervous system, helping you feel peaceful and relaxed.\n\n🌸 It's nature's way of giving you a warm, cozy hug!",
              questions: [
                'Why does lavender smell so calming?',
                'Can smelling it really help me sleep better?',
                "What's the difference between lavender oil and the actual plant?",
                'Can I grow my own calming garden?',
                'How does a smell affect my brain?',
              ],
              exercises: [
                'Create your own calming bedtime routine with lavender',
                "Make a 'scent memory' journal",
                'Design a peaceful garden layout',
              ],
              followUpPrompts: [
                'Want to explore other calming scents and herbs?',
                'Curious about how aromatherapy actually works?',
                'Ready to learn about creating peaceful spaces?',
              ],
            },
          },
        ],
      },
      {
        id: 'natural-practices',
        name: "Nature's Toolkit",
        description: 'Simple practices that connect you with nature',
        emoji: '🧰',
        concepts: [
          {
            id: 'forest-bathing',
            name: 'Forest Bathing',
            description: 'The art of soaking up tree energy',
            emoji: '🌲',
            chatPrompt: {
              introduction:
                "🌲 Welcome to Forest Bathing - Nature's Spa Day!\n\nImagine taking a bath, but instead of water, you're soaking in the peaceful energy of trees! Forest bathing isn't about getting wet - it's about slowly walking through nature and letting the forest heal your mind and body.\n\n🍃 It's like meditation, but the trees are your teachers!",
              questions: [
                'How can trees actually make me feel better?',
                "What if I don't live near a forest?",
                'Is this the same as just going for a hike?',
                'Can I do this in my backyard?',
                "What's actually happening in my body when I'm around trees?",
              ],
              exercises: [
                "Try a 5-minute 'tree meditation' in any green space",
                'Create a nature journal to track how you feel',
                "Practice the '5-4-3-2-1' forest sensing exercise",
              ],
              followUpPrompts: [
                'Want to learn about other nature-based healing practices?',
                'Curious about the science behind nature therapy?',
                'Ready to explore grounding and earthing techniques?',
              ],
            },
          },
          {
            id: 'breathwork',
            name: 'Healing Breathwork',
            description: 'Using your breath as natural medicine',
            emoji: '🌬️',
            chatPrompt: {
              introduction:
                "🌬️ Discover Breathwork - Your Built-in Pharmacy!\n\nDid you know you carry the most powerful healing tool with you everywhere you go? Your breath! Different breathing patterns can calm you down, energize you, help you focus, or even help you fall asleep.\n\n💨 It's like having superpowers that run on air!",
              questions: [
                'How can just breathing differently change how I feel?',
                "What's the difference between regular breathing and breathwork?",
                'Can breathing exercises really help with anxiety?',
                'Which breathing technique should I try first?',
                'How does this connect to what plants and herbs do?',
              ],
              exercises: [
                "Try the '4-7-8' sleep breathing technique",
                "Practice 'box breathing' for instant calm",
                'Learn energizing breath patterns for morning focus',
              ],
              followUpPrompts: [
                'Want to explore meditation and mindfulness practices?',
                'Curious about how breath connects to your nervous system?',
                'Ready to learn about combining breathwork with movement?',
              ],
            },
          },
        ],
      },
    ],
  },
];

// Helper function to find topic by ID
export const findTopicById = (id: string): Topic | undefined => {
  return topicsData.find((topic) => topic.id === id);
};

// Helper function to find subtopic by ID within a topic
export const findSubtopicById = (
  topicId: string,
  subtopicId: string
): Subtopic | undefined => {
  const topic = findTopicById(topicId);
  return topic?.subtopics.find((subtopic) => subtopic.id === subtopicId);
};

// Helper function to find concept by ID within a subtopic
export const findConceptById = (
  topicId: string,
  subtopicId: string,
  conceptId: string
): Concept | undefined => {
  const subtopic = findSubtopicById(topicId, subtopicId);
  return subtopic?.concepts.find((concept) => concept.id === conceptId);
};
