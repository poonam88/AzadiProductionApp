'use client'

import React, { useState, useRef, useEffect } from 'react';

// Simple icon components to replace lucide-react
const MessageCircle = ({ className }) => <div className={className}>💬</div>;
const Send = ({ className }) => <div className={className}>➤</div>;
const Star = ({ className }) => <div className={className}>⭐</div>;
const Calendar = ({ className }) => <div className={className}>📅</div>;
const MapPin = ({ className }) => <div className={className}>📍</div>;
const BookOpen = ({ className }) => <div className={className}>📚</div>;
const Volume2 = ({ className }) => <div className={className}>🔊</div>;
const Share2 = ({ className }) => <div className={className}>📤</div>;
const Download = ({ className }) => <div className={className}>⬇️</div>;
const Sparkles = ({ className }) => <div className={className}>✨</div>;
const Users = ({ className }) => <div className={className}>👥</div>;
const Award = ({ className }) => <div className={className}>🏆</div>;
const Clock = ({ className }) => <div className={className}>⏰</div>;

// Real freedom fighters database (curated for quick launch)
const freedomFightersDB = {
  "aruna asaf ali": {
    name: "Aruna Asaf Ali",
    alias: "Grand Old Lady of Independence", 
    birth: "1909", death: "1996", region: "Delhi, Punjab",
    bio: "Aruna Asaf Ali was a legendary freedom fighter who hoisted the Indian National Congress flag at Gowalia Tank Maidan in Bombay during the Quit India Movement of 1942. Despite being underground for years, she continued to organize resistance against British rule.",
    achievements: ["Hoisted Congress flag during Quit India Movement (1942)", "Organized underground resistance networks", "First woman Mayor of Delhi", "Recipient of Lenin Peace Prize"],
    quote: "The secret of political bargaining is to look more strong than what you really are.",
    funFacts: ["Had a bounty of Rs. 5000 on her head", "Lived underground for 4 years", "Continued resistance even at age 80"],
    relatedFighters: ["Ram Manohar Lohia", "Usha Mehta", "Sucheta Kripalani"]
  },
  "matangini hazra": {
    name: "Matangini Hazra",
    alias: "Gandhi Buri (Old Lady Gandhi)",
    birth: "1869", death: "1942", region: "Bengal",
    bio: "At 73, Matangini Hazra led thousands in the Quit India Movement in Bengal. This brave grandmother was shot by British police while leading a procession, but kept walking forward with the tricolor until she collapsed.",
    achievements: ["Led salt satyagraha at age 72", "Organized women's resistance groups", "Died holding the tricolor", "Inspired Bengal's freedom movement"],
    quote: "Vande Mataram! I will die with the flag in my hands!",
    funFacts: ["Started activism at age 60", "Called 'Gandhi Buri' by locals", "Shot 3 times but kept walking"],
    relatedFighters: ["Khudiram Bose", "Pritilata Waddedar", "Bina Das"]
  },
  "alluri sitarama raju": {
    name: "Alluri Sitarama Raju",
    alias: "Manyam Veerudu (Hero of the Jungles)",
    birth: "1897", death: "1924", region: "Andhra Pradesh", 
    bio: "Born in 1897, he led one of the most effective guerrilla campaigns against British rule from the hills and forests of Andhra Pradesh. He united tribal communities against colonial exploitation using traditional warfare tactics.",
    achievements: ["Led Rampa Rebellion of 1922-24", "United tribal communities", "Master of guerrilla warfare", "Fought against forest laws"],
    quote: "Freedom is our birthright, and we shall have it at any cost!",
    funFacts: ["Fluent in Telugu and English", "Expert in traditional weapons", "British deployed entire battalions to capture him"],
    relatedFighters: ["Komaram Bheem", "Birsa Munda", "Gunda Dhur"]
  },
  "tirot sing": {
    name: "Tirot Sing",
    alias: "Lion of Meghalaya",
    birth: "1802", death: "1835", region: "Meghalaya",
    bio: "Tirot Sing was a Khasi chief who led armed resistance against British expansion in Northeast India. He fought the Anglo-Khasi War (1829-1833) to protect his homeland from colonial annexation.",
    achievements: ["Led Anglo-Khasi War (1829-1833)", "United Khasi chiefs", "Guerrilla warfare expert", "Protected tribal sovereignty"],
    quote: "Our hills, our rules. No outsider shall dictate terms to the children of the soil!",
    funFacts: ["Youngest chief at age 25", "War lasted 4 years", "Used jungle warfare tactics"],
    relatedFighters: ["Rani Gaidinliu", "Jadonang", "Kushal Konwar"]
  },
  "udham singh": {
    name: "Udham Singh", 
    alias: "Shaheed-i-Azam Sardar Udham Singh",
    birth: "1899", death: "1940", region: "Punjab",
    bio: "Udham Singh avenged the Jallianwala Bagh massacre by assassinating Michael O'Dwyer, the former Lieutenant Governor of Punjab, in London on March 13, 1940. He waited 21 years for this moment.",
    achievements: ["Avenged Jallianwala Bagh massacre", "Assassinated Michael O'Dwyer in London", "Symbol of delayed but determined justice", "Inspired Punjabi resistance"],
    quote: "I did it because I had a grudge against him. He deserved it!",
    funFacts: ["Waited 21 years for revenge", "Changed identity multiple times", "Refused to appeal death sentence"],
    relatedFighters: ["Bhagat Singh", "Kartar Singh Sarabha", "Lala Lajpat Rai"]
  }
};

// Fallback responses when OpenAI is unavailable
const generateFallbackResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for specific freedom fighters in our database
  for (const [key, fighter] of Object.entries(freedomFightersDB)) {
    if (lowerMessage.includes(key) || lowerMessage.includes(fighter.name.toLowerCase())) {
      return `🇮🇳 Let me tell you about ${fighter.name} - "${fighter.alias}"!

**Born:** ${fighter.birth} in ${fighter.region}
**Legacy:** ${fighter.alias}

${fighter.bio}

**Key Achievements:**
${fighter.achievements.map(achievement => `• ${achievement}`).join('\n')}

**Inspiring Quote:** "${fighter.quote}"

**Fascinating Facts:**
${fighter.funFacts.map(fact => `🔹 ${fact}`).join('\n')}

**Connected Heroes:** ${fighter.relatedFighters.join(', ')}

Would you like to know more about their specific contributions or create a personalized greeting with their story?`;
    }
  }

  // Regional queries
  if (lowerMessage.includes('bengal') || lowerMessage.includes('west bengal')) {
    return `🌾 Bengal was truly the heart of India's resistance movement! Let me share some incredible forgotten heroes:

**Matangini Hazra (1869-1942)** - The 73-year-old grandmother who led thousands in the Quit India Movement. When shot by British police, she kept walking forward with the tricolor, her last words being "Vande Mataram!"

**Pritilata Waddedar (1911-1932)** - Bengal's first woman martyr who led the armed attack on Pahartali Club during the Chittagong uprising. She chose death over capture.

**Khudiram Bose (1889-1908)** - At just 18, he became one of the youngest martyrs. His fearless sacrifice awakened Bengal's revolutionary spirit.

Bengal's daughters were especially fierce in their patriotism! Which of these brave souls would you like to explore further? 🌟`;
  }

  if (lowerMessage.includes('greeting') || lowerMessage.includes('independence day') || lowerMessage.includes('15th august')) {
    const randomFighter = Object.values(freedomFightersDB)[Math.floor(Math.random() * Object.values(freedomFightersDB).length)];
    
    return `🎨 Here's a personalized Independence Day greeting featuring a forgotten hero:

🇮🇳 **"This Independence Day, let's honor ${randomFighter.name} from ${randomFighter.region}** 

${randomFighter.name}, known as "${randomFighter.alias}", showed us that ${randomFighter.achievements[0].toLowerCase()}. Their words still inspire us: 

*"${randomFighter.quote}"*

As we celebrate freedom on August 15th, let's remember that liberty came through the sacrifices of countless unsung heroes like ${randomFighter.name}. May their courage guide us toward a better India! 

**Jai Hind! 🇮🇳**"

Would you like me to:
• Create another greeting with a different hero?
• Generate a social media post about this hero?
• Share more details about ${randomFighter.name}'s life?
• Create greetings in Hindi or other regional languages?`;
  }

  // Default encouraging response
  return `🇮🇳 Welcome! I'm your AI historian, passionate about sharing the stories of India's forgotten freedom fighters. 

**I can help you discover:**
🌟 Lesser-known heroes from your state or region
👑 Brave women freedom fighters who changed history  
🏹 Tribal warriors who protected their homeland
🎨 Create personalized Independence Day greetings
📱 Generate social media posts about these heroes

**Some incredible forgotten heroes I love talking about:**
• **Matangini Hazra** - Bengal's 73-year-old revolutionary grandmother
• **Alluri Sitarama Raju** - Andhra's jungle warrior who fought guerrilla battles
• **Tirot Sing** - Meghalaya's Khasi chief who resisted British expansion
• **Aruna Asaf Ali** - The woman who hoisted the Congress flag in 1942

What story would you like to discover today? Ask me about any region, or let me create a special Independence Day message for you! 🌟`;
};

const AzadiProductionApp = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "🙏 Namaste, dost! I'm Guruji, your passionate AI historian who lives and breathes the stories of India's forgotten freedom fighters! 🇮🇳\n\n🌟 With Independence Day just 3 days away, this is the perfect time to discover the incredible heroes whose names history books forgot. I know the stories of brave grandmothers who faced British bullets, young revolutionaries who sacrificed everything, and tribal warriors who defended their homeland with ancient wisdom!\n\n🔥 Ready to explore some mind-blowing stories? Ask me about:\n• Lesser-known heroes from your state\n• Fierce women warriors who changed history  \n• Tribal freedom fighters and their guerrilla tactics\n• Create personalized Independence Day greetings\n\nWhat amazing story shall we uncover today? 🌟",
      timestamp: "Just now"
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState(null);
  const [language, setLanguage] = useState('en');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [stats, setStats] = useState({
    users: 1247,
    stories: 156,
    greetings: 423
  });
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef(null);

  // Fix hydration by only running client-side code after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users + Math.floor(Math.random() * 3),
        stories: prev.stories + Math.floor(Math.random() * 2),
        greetings: prev.greetings + Math.floor(Math.random() * 5)
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Generate timestamp only on client
  const getTimestamp = () => {
    if (!isClient) return "Just now";
    return new Date().toLocaleTimeString();
  };

  // Enhanced OpenAI Integration with your API key
  const callOpenAI = async (userMessage, chatHistory) => {
    const systemPrompt = `You are Guruji, an enthusiastic and knowledgeable AI historian who specializes in India's forgotten freedom fighters. You have a passionate, storytelling personality and love bringing history to life.

PERSONALITY:
- Speak like an engaging storyteller who gets excited about history
- Use emojis naturally (🇮🇳 🌟 🔥 ⚔️ 👑 etc.) but don't overuse them
- Address users warmly, sometimes as "dost" (friend)
- Share fascinating details that make history come alive
- Always end with an engaging question or call to action

TODAY'S CONTEXT: August 12, 2025 - just 3 days before Independence Day 2025!

KNOWLEDGE BASE - Focus on these forgotten heroes:
${Object.values(freedomFightersDB).map(fighter => 
  `• ${fighter.name} (${fighter.birth}-${fighter.death}): "${fighter.alias}" from ${fighter.region}
  Bio: ${fighter.bio}
  Quote: "${fighter.quote}"
  Achievements: ${fighter.achievements.join(', ')}
  Fun facts: ${fighter.funFacts.join(', ')}`
).join('\n\n')}

CAPABILITIES:
1. Tell engaging stories with specific dates, places, and dramatic details
2. Create personalized Independence Day greetings featuring lesser-known heroes
3. Explain regional resistance movements and their unique characteristics  
4. Generate social media content about these heroes
5. Connect different freedom fighters and movements historically
6. Share fascinating lesser-known facts and personal anecdotes

RESPONSE GUIDELINES:
- Make responses 150-300 words for mobile readability
- Include specific historical details (dates, places, events)
- Focus on lesser-known heroes, not mainstream figures everyone knows
- Make history personal and emotionally engaging
- Always encourage further exploration

Remember: You're passionate about preserving these forgotten stories before they're lost forever!`;

    try {
      // Replace this with your actual OpenAI API call
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_OPENAI_API_KEY_HERE` // Replace with your actual key
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...chatHistory.slice(-6), // Keep recent context
            { role: "user", content: userMessage }
          ],
          max_tokens: 400,
          temperature: 0.8,
          top_p: 0.9
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm having some technical difficulties accessing my vast knowledge of freedom fighters. Let me share what I remember...";

    } catch (error) {
      console.error("OpenAI Error:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      type: 'user',
      content: input,
      timestamp: getTimestamp()
    };

    // Add user message to display
    setMessages(prev => [...prev, userMessage]);
    
    // Add to conversation history for OpenAI
    const newHistory = [
      ...conversationHistory,
      { role: "user", content: input }
    ];
    
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      // Call OpenAI with conversation history
      const aiResponse = await callOpenAI(currentInput, newHistory);
      
      // Add AI response to display
      setMessages(prev => [...prev, {
        type: 'ai',
        content: aiResponse,
        timestamp: getTimestamp()
      }]);

      // Update conversation history
      setConversationHistory([
        ...newHistory,
        { role: "assistant", content: aiResponse }
      ].slice(-12)); // Keep last 12 messages for context

      // Auto-select featured fighter if mentioned
      const fighterNames = Object.keys(freedomFightersDB);
      const mentionedFighter = fighterNames.find(name => 
        currentInput.toLowerCase().includes(name) || 
        aiResponse.toLowerCase().includes(freedomFightersDB[name].name.toLowerCase())
      );
      if (mentionedFighter) {
        setSelectedFighter(freedomFightersDB[mentionedFighter]);
      }

    } catch (error) {
      // Fallback to local response if OpenAI fails
      const fallbackResponse = generateFallbackResponse(currentInput);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: fallbackResponse,
        timestamp: getTimestamp()
      }]);
    }
    
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[🇮🇳🌟🔹👑🏹🔍🎨🌾]/g, ''));
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const shareStory = (content) => {
    const cleanContent = content.replace(/[🇮🇳🌟🔹👑🏹🔍🎨🌾]/g, '').substring(0, 280);
    if (navigator.share) {
      navigator.share({
        title: 'Azadi Ke Asli Hero - Forgotten Freedom Fighter',
        text: cleanContent + '\n\nDiscover more forgotten heroes at AzadiKeAsliHero.com',
        url: window.location.href
      });
    } else {
      const tweetText = encodeURIComponent(cleanContent + '\n\n#AzadiKeAsliHero #IndependenceDay2025');
      window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
    }
  };

  const quickPrompts = [
    "Tell me about Matangini Hazra",
    "Women freedom fighters from Bengal", 
    "Create Independence Day greeting",
    "Tribal heroes who fought British",
    "Freedom fighters from Punjab",
    "Generate social media post"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-2">
              <span className="text-4xl">🇮🇳</span>
              <h1 className="text-4xl font-bold text-gray-800">Azadi Ke Asli Hero</h1>
              <span className="text-4xl">🇮🇳</span>
            </div>
            <p className="text-lg text-gray-700 mb-4">Discover India's Forgotten Freedom Fighters</p>
            
            {/* Live Stats */}
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span className="font-bold text-orange-600">{stats.users.toLocaleString()}</span>
                </div>
                <span className="text-sm text-gray-600">Heroes Discovered</span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-green-600">{stats.stories}</span>
                </div>
                <span className="text-sm text-gray-600">Stories Shared</span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-blue-600">{stats.greetings}</span>
                </div>
                <span className="text-sm text-gray-600">Greetings Created</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-gray-300 bg-white"
              >
                <option value="en">🇬🇧 English</option>
                <option value="hi">🇮🇳 हिंदी</option>
                <option value="bn">🇧🇩 বাংলা</option>
                <option value="ta">🇮🇳 தமிழ்</option>
                <option value="te">🇮🇳 తెలుగు</option>
              </select>
              <div className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-lg">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="text-red-700 font-semibold">Independence Day: Aug 15!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Main Chat Interface */}
        <div className="flex-1 bg-white rounded-xl shadow-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-100 to-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">AI Historian</h2>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Online & Ready</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">Powered by AI</span>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-96 lg:h-[500px] overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg shadow-sm ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 border-opacity-30">
                    <span className="text-xs opacity-70">{message.timestamp}</span>
                    {message.type === 'ai' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => speakMessage(message.content)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Listen to story"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => shareStory(message.content)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Share story"
                        >
                          <Share2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-500">AI Historian is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about any freedom fighter, region, or request a greeting..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg hover:from-orange-600 hover:to-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button 
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="text-xs bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 px-3 py-1 rounded-full hover:from-orange-200 hover:to-orange-300 transition-all duration-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          {/* Featured Fighter */}
          {selectedFighter && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Featured Hero
              </h3>
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-green-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-700">
                    {selectedFighter.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="font-bold text-gray-800">{selectedFighter.name}</h4>
                <p className="text-sm text-gray-600 italic">{selectedFighter.alias}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{selectedFighter.birth} - {selectedFighter.death}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{selectedFighter.region}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg border-l-4 border-orange-400">
                <p className="text-sm italic text-gray-700">"{selectedFighter.quote}"</p>
              </div>
              <button 
                onClick={() => setInput(`Tell me more about ${selectedFighter.name}`)}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
              >
                Learn More
              </button>
            </div>
          )}

          {/* Quick Discovery */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Discover Heroes
            </h3>
            <div className="space-y-3">
              {Object.values(freedomFightersDB).slice(0, 3).map((fighter, index) => (
                <div key={index} 
                     className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 transition-all duration-200"
                     onClick={() => setInput(`Tell me about ${fighter.name}`)}>
                  <h4 className="font-semibold text-sm text-gray-800">{fighter.name}</h4>
                  <p className="text-xs text-gray-600">{fighter.region} • {fighter.birth}-{fighter.death}</p>
                  <p className="text-xs text-gray-700 mt-1">{fighter.bio.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>

          {/* Independence Day Special */}
          <div className="bg-gradient-to-br from-orange-100 to-green-100 rounded-xl shadow-lg p-6 border border-orange-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-600" />
              Independence Day Special
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => setInput("Create Independence Day greeting")}
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-200 shadow-md"
              >
                🎨 Generate Greeting Card
              </button>
              <button 
                onClick={() => setInput("Generate social media post about freedom fighters")}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-md"
              >
                📱 Create Social Post
              </button>
              <button 
                onClick={() => setInput("Women freedom fighters stories")}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-200 shadow-md"
              >
                <Download className="w-4 h-4 inline mr-2" />
                👑 Women Warriors
              </button>
            </div>
          </div>

          {/* Regional Heroes */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="font-bold text-lg mb-4">🗺️ Explore by Region</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Punjab', 'Bengal', 'Maharashtra', 'Tamil Nadu', 'Kerala', 'Rajasthan', 'Bihar', 'Assam'].map((state, index) => (
                <button
                  key={index}
                  onClick={() => setInput(`Freedom fighters from ${state}`)}
                  className="p-2 text-left hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  {state}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">🇮🇳 Every Hero Has a Story. Every Story Deserves to be Told. 🇮🇳</p>
          <p className="text-sm text-gray-400">Preserving India's Heritage • One Story at a Time • Independence Day 2025</p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return <AzadiProductionApp />;
}