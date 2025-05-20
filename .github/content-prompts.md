# Content Writing Guide for GitHub Copilot

This guide helps in generating content that explains complex topics in simple terms.

## Content Generation Rules

1. **Simplicity First**
   - Use simple words and short sentences
   - Avoid technical jargon
   - If technical terms are necessary, explain them using simple analogies

2. **Structure**
   ```typescript
   interface TopicContent {
     title: string;           // Simple, clear title
     description: string;     // Brief overview for a 5-year-old
     subtopics: {
       [key: string]: {
         title: string;
         content: string;     // Main explanation
         examples: string[];  // Simple, relatable examples
         analogies: string[]; // Kid-friendly analogies
       }
     }
   }
   ```

3. **Writing Style**
   - Use active voice
   - Keep sentences under 15 words
   - Include fun analogies
   - Use familiar examples from daily life
   - Add interactive elements when possible

4. **Examples of Good Explanations**

   Instead of:
   "A function is a reusable block of code that performs a specific task"

   Write:
   "A function is like a recipe. Just like how a recipe tells you the steps to make cookies, a function tells the computer the steps to do something special!"

5. **Analogy Guidelines**
   - Use familiar objects/situations
   - Make comparisons to everyday experiences
   - Keep analogies age-appropriate
   - Use visual examples when possible

## Example Topic Structure

```typescript
const sampleTopic = {
  title: "What is the Internet?",
  description: "The Internet is like a giant network of friends sharing messages and pictures!",
  subtopics: {
    basics: {
      title: "How Does It Work?",
      content: "Think of the internet like a huge post office. When you send an email, it's like putting a letter in an envelope and sending it through many post offices until it reaches your friend!",
      examples: [
        "When you watch a video online, it's like getting a book from a library that's far away",
        "Websites are like different stores in a big shopping mall"
      ],
      analogies: [
        "The internet is like a bunch of roads connecting every house in the world",
        "Websites are like different rooms in a huge playground"
      ]
    }
  }
};
```

Remember: The goal is to make complex topics fun and understandable for young minds!
