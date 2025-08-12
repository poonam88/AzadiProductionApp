'use client'

import React, { useState, useRef, useEffect } from 'react';

// Add inline styles for immediate fix
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fff7ed, #ffffff, #f0fdf4)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    background: 'linear-gradient(90deg, #f97316, #ffffff, #16a34a)',
    padding: '2rem 1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0.5rem 0'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#4b5563',
    marginBottom: '1rem'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  mainContainer: {
    maxWidth: '7xl',
    margin: '0 auto',
    padding: '1.5rem',
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap'
  },
  chatContainer: {
    flex: '1',
    minWidth: '300px',
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  chatHeader: {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
    background: 'linear-gradient(90deg, #fed7aa, #dcfce7)',
    borderRadius: '0.75rem 0.75rem 0 0'
  },
  messagesContainer: {
    height: '500px',
    overflowY: 'auto',
    padding: '1rem',
    background: '#f9fafb'
  },
  messageUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem'
  },
  messageAI: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '1rem'
  },
  messageBubbleUser: {
    maxWidth: '70%',
    padding: '0.75rem 1rem',
    borderRadius: '1rem',
    background: 'linear-gradient(90deg, #f97316, #ea580c)',
    color: 'white',
    fontSize: '0.875rem',
    lineHeight: '1.5'
  },
  messageBubbleAI: {
    maxWidth: '85%',
    padding: '0.75rem 1rem',
    borderRadius: '1rem',
    background: 'white',
    color: '#1f2937',
    border: '1px solid #e5e7eb',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap'
  },
  inputContainer: {
    padding: '1rem',
    borderTop: '1px solid #e5e7eb',
    background: 'white',
    borderRadius: '0 0 0.75rem 0.75rem'
  },
  inputWrapper: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '0.75rem'
  },
  input: {
    flex: '1',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    outline: 'none',
    fontSize: '0.875rem'
  },
  sendButton: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(90deg, #f97316, #16a34a)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  quickPrompts: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  quickPrompt: {
    fontSize: '0.75rem',
    background: 'linear-gradient(90deg, #fed7aa, #fde68a)',
    color: '#9a3412',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  sidebar: {
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  sidebarCard: {
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #e5e7eb',
    padding: '1.5rem'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: '1.125rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  button: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    marginBottom: '0.75rem',
    transition: 'all 0.2s'
  },
  buttonOrange: {
    background: 'linear-gradient(90deg, #fb923c, #f97316)',
    color: 'white'
  },
  buttonGreen: {
    background: 'linear-gradient(90deg, #4ade80, #16a34a)',
    color: 'white'
  },
  buttonBlue: {
    background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
    color: 'white'
  },
  footer: {
    background: '#1f2937',
    color: 'white',
    padding: '2rem 1rem',
    marginTop: '3rem',
    textAlign: 'center'
  },
  specialCard: {
    background: 'linear-gradient(135deg, #fed7aa, #dcfce7)',
    border: '1px solid #fb923c'
  }
};

// Simple icon components
const MessageCircle = () => <span style={{fontSize: '1.2em'}}>💬</span>;
const Send = () => <span style={{fontSize: '1em'}}>➤</span>;
const Star = () => <span style={{fontSize: '1.2em'}}>⭐</span>;
const Calendar = () => <span style={{fontSize: '1em'}}>📅</span>;
const MapPin = () => <span style={{fontSize: '1em'}}>📍</span>;
const BookOpen = () => <span style={{fontSize: '1.2em'}}>📚</span>;
const Volume2 = () => <span style={{fontSize: '1em'}}>🔊</span>;
const Share2 = () => <span style={{fontSize: '1em'}}>📤</span>;
const Download = () => <span style={{fontSize: '1em'}}>⬇️</span>;
const Sparkles = () => <span style={{fontSize: '1.2em'}}>✨</span>;
const Users = () => <span style={{fontSize: '1em'}}>👥</span>;
const Award = () => <span style={{fontSize: '1em'}}>🏆</span>;
const Clock = () => <span style={{fontSize: '1em'}}>⏰</span>;

// Real freedom fighters database
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

  if (lowerMessage.includes('greeting') || lowerMessage.includes('independence day')) {
    const randomFighter = Object.values(freedomFightersDB)[Math.floor(Math.random() * Object.values(freedomFightersDB).length)];
    
    return `🎨 Here's a personalized Independence Day greeting featuring a forgotten hero:

🇮🇳 **"This Independence Day, let's honor ${randomFighter.name} from ${randomFighter.region}** 

${randomFighter.name}, known as "${randomFighter.alias}", showed us that ${randomFighter.achievements[0].toLowerCase()}. Their words still inspire us: 

*"${randomFighter.quote}"*

As we celebrate freedom on August 15th, let's remember that liberty came through the sacrifices of countless unsung heroes like ${randomFighter.name}. May their courage guide us toward a better India! 

**Jai Hind! 🇮🇳**"

Would you like me to create another greeting with a different hero?`;
  }

  return `🇮🇳 Welcome! I'm your AI historian, passionate about sharing the stories of India's forgotten freedom fighters. 

**I can help you discover:**
🌟 Lesser-known heroes from your state or region
👑 Brave women freedom fighters who changed history  
🏹 Tribal warriors who protected their homeland
🎨 Create personalized Independence Day greetings

**Some incredible forgotten heroes I love talking about:**
• **Matangini Hazra** - Bengal's 73-year-old revolutionary grandmother
• **Alluri Sitarama Raju** - Andhra's jungle warrior who fought guerrilla battles
• **Tirot Sing** - Meghalaya's Khasi chief who resisted British expansion
• **Aruna Asaf Ali** - The woman who hoisted the Congress flag in 1942

What story would you like to discover today? 🌟`;
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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

  const getTimestamp = () => {
    if (!isClient) return "Just now";
    return new Date().toLocaleTimeString();
  };

  const callOpenAI = async (userMessage, chatHistory) => {
    const systemPrompt = `You are Guruji, an enthusiastic AI historian specializing in India's forgotten freedom fighters. Focus on lesser-known heroes and their inspiring stories. TODAY: August 12, 2025 - 3 days before Independence Day!`;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_OPENAI_API_KEY_HERE`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...chatHistory.slice(-6),
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

    setMessages(prev => [...prev, userMessage]);
    
    const newHistory = [
      ...conversationHistory,
      { role: "user", content: input }
    ];
    
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse = await callOpenAI(currentInput, newHistory);
      
      setMessages(prev => [...prev, {
        type: 'ai',
        content: aiResponse,
        timestamp: getTimestamp()
      }]);

      setConversationHistory([
        ...newHistory,
        { role: "assistant", content: aiResponse }
      ].slice(-12));

      const fighterNames = Object.keys(freedomFightersDB);
      const mentionedFighter = fighterNames.find(name => 
        currentInput.toLowerCase().includes(name) || 
        aiResponse.toLowerCase().includes(freedomFightersDB[name].name.toLowerCase())
      );
      if (mentionedFighter) {
        setSelectedFighter(freedomFightersDB[mentionedFighter]);
      }

    } catch (error) {
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

  const shareStory = (content, platform = 'general') => {
    // Clean content and prepare for sharing
    const cleanContent = content.replace(/[🇮🇳🌟🔹👑🏹🔍🎨🌾]/g, '').replace(/\*\*/g, '').trim();
    
    // Extract hero name if mentioned
    const heroNames = Object.values(freedomFightersDB).map(f => f.name);
    const mentionedHero = heroNames.find(name => content.toLowerCase().includes(name.toLowerCase()));
    
    // Base hashtags
    const baseHashtags = [
      '#IndependenceDay2025',
      '#AzadiKeAsliHero', 
      '#ForgottenHeroes',
      '#IndianFreedomFighters',
      '#VandeMataram',
      '#JaiHind'
    ];
    
    // Add hero-specific hashtag if found
    if (mentionedHero) {
      const heroHashtag = '#' + mentionedHero.replace(/\s+/g, '');
      baseHashtags.push(heroHashtag);
    }
    
    // Platform-specific sharing
    switch (platform) {
      case 'twitter':
        const twitterText = `${cleanContent.substring(0, 200)}...\n\nDiscover more forgotten heroes: ${window.location.href}\n\n${baseHashtags.slice(0, 4).join(' ')}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
        window.open(twitterUrl, '_blank');
        break;
        
      case 'instagram':
        // Instagram doesn't support direct sharing with text, so copy to clipboard
        const instagramText = `${cleanContent}\n\nDiscover more forgotten heroes through our AI historian! Link in bio.\n\n${baseHashtags.join(' ')}\n\n#MonetIQ #AIForHeritage`;
        navigator.clipboard.writeText(instagramText).then(() => {
          alert('📸 Instagram caption copied to clipboard! Paste it when you create your Instagram post.');
          // Optionally open Instagram web
          window.open('https://www.instagram.com/', '_blank');
        });
        break;
        
      case 'whatsapp':
        const whatsappText = `🇮🇳 *AMAZING FREEDOM FIGHTER STORY* 🇮🇳\n\n${cleanContent}\n\n🔗 Discover more heroes: ${window.location.href}\n\n${baseHashtags.slice(0, 3).join(' ')}\n\n_Shared from Azadi Ke Asli Hero AI_`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
        window.open(whatsappUrl, '_blank');
        break;
        
      case 'linkedin':
        const linkedinText = `${cleanContent}\n\nAs we approach Independence Day 2025, it's crucial to remember these forgotten heroes who shaped our nation. Our AI historian helps preserve their stories for future generations.\n\nExplore more: ${window.location.href}\n\n${baseHashtags.slice(0, 5).join(' ')} #LinkedIn #ProfessionalNetworking`;
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Forgotten Freedom Fighters of India')}&summary=${encodeURIComponent(linkedinText)}`;
        window.open(linkedinUrl, '_blank');
        break;
        
      default:
        // General sharing (Web Share API or fallback)
        if (navigator.share) {
          navigator.share({
            title: 'Azadi Ke Asli Hero - Forgotten Freedom Fighter',
            text: `${cleanContent}\n\nDiscover more forgotten heroes!`,
            url: window.location.href
          });
        } else {
          // Fallback: Copy to clipboard
          const generalText = `${cleanContent}\n\nDiscover more forgotten heroes: ${window.location.href}\n\n${baseHashtags.join(' ')}`;
          navigator.clipboard.writeText(generalText).then(() => {
            alert('📋 Story copied to clipboard! You can now paste it anywhere.');
          });
        }
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
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
            <span style={{fontSize: '2.5rem'}}>🇮🇳</span>
            <h1 style={styles.title}>Azadi Ke Asli Hero</h1>
            <span style={{fontSize: '2.5rem'}}>🇮🇳</span>
          </div>
          <p style={styles.subtitle}>Discover India's Forgotten Freedom Fighters</p>
          
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center'}}>
                <Users />
                <span style={{...styles.statNumber, color: '#ea580c'}}>{stats.users.toLocaleString()}</span>
              </div>
              <span style={styles.statLabel}>Heroes Discovered</span>
            </div>
            <div style={styles.statItem}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center'}}>
                <BookOpen />
                <span style={{...styles.statNumber, color: '#16a34a'}}>{stats.stories}</span>
              </div>
              <span style={styles.statLabel}>Stories Shared</span>
            </div>
            <div style={styles.statItem}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center'}}>
                <Award />
                <span style={{...styles.statNumber, color: '#2563eb'}}>{stats.greetings}</span>
              </div>
              <span style={styles.statLabel}>Greetings Created</span>
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'}}>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '2px solid #d1d5db', background: 'white'}}
            >
              <option value="en">🇬🇧 English</option>
              <option value="hi">🇮🇳 हिंदी</option>
              <option value="bn">🇧🇩 বাংলা</option>
              <option value="ta">🇮🇳 தமிழ்</option>
              <option value="te">🇮🇳 తెలుగు</option>
            </select>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#fee2e2', borderRadius: '0.5rem'}}>
              <Clock />
              <span style={{color: '#dc2626', fontWeight: '600'}}>Independence Day: Aug 15!</span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainContainer}>
        <div style={styles.chatContainer}>
          <div style={styles.chatHeader}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div style={{width: '2.5rem', height: '2.5rem', background: 'linear-gradient(90deg, #f97316, #16a34a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <BookOpen />
                </div>
                <div>
                  <h2 style={{fontWeight: 'bold', color: '#1f2937', margin: 0}}>AI Historian</h2>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                    <div style={{width: '0.5rem', height: '0.5rem', background: '#16a34a', borderRadius: '50%'}}></div>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Online & Ready</span>
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Sparkles />
                <span style={{fontSize: '0.875rem', fontWeight: '600', color: '#4b5563'}}>Powered by AI</span>
              </div>
            </div>
          </div>

          <div style={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div key={index} style={message.type === 'user' ? styles.messageUser : styles.messageAI}>
                <div style={message.type === 'user' ? styles.messageBubbleUser : styles.messageBubbleAI}>
                  <div>{message.content}</div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.1)'}}>
                    <span style={{fontSize: '0.75rem', opacity: 0.7}}>{message.timestamp}</span>
                    {message.type === 'ai' && (
                      <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button 
                          onClick={() => speakMessage(message.content)}
                          style={{padding: '0.25rem', borderRadius: '0.25rem', border: 'none', background: 'transparent', cursor: 'pointer'}}
                        >
                          <Volume2 />
                        </button>
                        <button 
                          onClick={() => shareStory(message.content)}
                          style={{padding: '0.25rem', borderRadius: '0.25rem', border: 'none', background: 'transparent', cursor: 'pointer'}}
                        >
                          <Share2 />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={styles.messageAI}>
                <div style={styles.messageBubbleAI}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <div style={{display: 'flex', gap: '0.25rem'}}>
                      <div style={{width: '0.5rem', height: '0.5rem', background: '#fb923c', borderRadius: '50%'}}></div>
                      <div style={{width: '0.5rem', height: '0.5rem', background: '#fb923c', borderRadius: '50%'}}></div>
                      <div style={{width: '0.5rem', height: '0.5rem', background: '#fb923c', borderRadius: '50%'}}></div>
                    </div>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>AI Historian is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputContainer}>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about any freedom fighter, region, or request a greeting..."
                style={styles.input}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                style={{...styles.sendButton, opacity: (!input.trim() || isTyping) ? 0.5 : 1}}
              >
                <Send />
              </button>
            </div>
            
            <div style={styles.quickPrompts}>
              {quickPrompts.map((prompt, index) => (
                <button 
                  key={index}
                  onClick={() => setInput(prompt)}
                  style={styles.quickPrompt}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.sidebar}>
          {selectedFighter && (
            <div style={styles.sidebarCard}>
              <h3 style={styles.cardTitle}>
                <Star />
                Featured Hero
              </h3>
              <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                <div style={{width: '6rem', height: '6rem', background: 'linear-gradient(135deg, #fed7aa, #dcfce7)', borderRadius: '50%', margin: '0 auto 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4b5563'}}>
                    {selectedFighter.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 style={{fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.25rem 0'}}>{selectedFighter.name}</h4>
                <p style={{fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic', margin: 0}}>{selectedFighter.alias}</p>
              </div>
              <div style={{marginBottom: '1rem', fontSize: '0.875rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                  <Calendar />
                  <span>{selectedFighter.birth} - {selectedFighter.death}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <MapPin />
                  <span>{selectedFighter.region}</span>
                </div>
              </div>
              <div style={{padding: '0.75rem', background: 'linear-gradient(90deg, #fff7ed, #f0fdf4)', borderRadius: '0.5rem', borderLeft: '4px solid #fb923c', marginBottom: '1rem'}}>
                <p style={{fontSize: '0.875rem', fontStyle: 'italic', color: '#4b5563', margin: 0}}>"{selectedFighter.quote}"</p>
              </div>
              <button 
                onClick={() => setInput(`Tell me more about ${selectedFighter.name}`)}
                style={{...styles.button, ...styles.buttonOrange, margin: 0}}
              >
                Learn More
              </button>
            </div>
          )}

          <div style={styles.sidebarCard}>
            <h3 style={styles.cardTitle}>
              <BookOpen />
              Discover Heroes
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              {Object.values(freedomFightersDB).slice(0, 3).map((fighter, index) => (
                <div key={index} 
                     style={{border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.75rem', cursor: 'pointer', transition: 'all 0.2s'}}
                     onClick={() => setInput(`Tell me about ${fighter.name}`)}>
                  <h4 style={{fontWeight: '600', fontSize: '0.875rem', color: '#1f2937', margin: '0 0 0.25rem 0'}}>{fighter.name}</h4>
                  <p style={{fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.25rem 0'}}>{fighter.region} • {fighter.birth}-{fighter.death}</p>
                  <p style={{fontSize: '0.75rem', color: '#4b5563', margin: 0}}>{fighter.bio.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{...styles.sidebarCard, ...styles.specialCard}}>
            <h3 style={styles.cardTitle}>
              <Sparkles />
              Independence Day Special
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              <button 
                onClick={() => setInput("Create a personalized Independence Day greeting card with quotes from forgotten freedom fighters")}
                style={{...styles.button, ...styles.buttonOrange, margin: 0}}
              >
                🎨 Generate Greeting Card
              </button>
              <button 
                onClick={() => setInput("Create a viral social media post about forgotten freedom fighters with hashtags for Independence Day 2025")}
                style={{...styles.button, ...styles.buttonGreen, margin: 0}}
              >
                📱 Create Viral Social Post
              </button>
              <button 
                onClick={() => setInput("Tell me inspiring stories of women freedom fighters with shareable quotes")}
                style={{...styles.button, ...styles.buttonBlue, margin: 0}}
              >
                <span style={{marginRight: '0.5rem'}}><Download /></span>
                👑 Women Warriors Stories
              </button>
            </div>
            
            {/* Quick Share Section */}
            <div style={{marginTop: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', border: '1px dashed rgba(251,146,60,0.3)'}}>
              <h4 style={{fontSize: '0.875rem', fontWeight: '600', color: '#fb923c', margin: '0 0 0.5rem 0', textAlign: 'center'}}>
                
              </h4>
              <div style={{display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap'}}>
                <button 
                  onClick={() => shareStory(`🇮🇳 Discover India's forgotten freedom fighters with AI! Amazing stories of heroes like Matangini Hazra (73-year-old revolutionary) and Alluri Sitarama Raju (jungle warrior). Perfect for Independence Day 2025!`, 'whatsapp')}
                  style={{padding: '0.4rem 0.6rem', border: 'none', borderRadius: '0.25rem', background: 'rgba(34, 197, 94, 0.2)', cursor: 'pointer', fontSize: '0.75rem', color: '#22c55e', fontWeight: '500'}}
                >
                  💬 WhatsApp
                </button>
                <button 
                  onClick={() => shareStory(`🇮🇳 Amazing AI app discovering India's forgotten freedom fighters! Learn about heroes like Matangini Hazra & Udham Singh. Perfect for Independence Day! 🚀`, 'twitter')}
                  style={{padding: '0.4rem 0.6rem', border: 'none', borderRadius: '0.25rem', background: 'rgba(59, 130, 246, 0.2)', cursor: 'pointer', fontSize: '0.75rem', color: '#3b82f6', fontWeight: '500'}}
                >
                  🐦 Twitter
                </button>
                <button 
                  onClick={() => shareStory(`🇮🇳 Incredible AI historian revealing India's forgotten freedom fighters! Stories that will inspire you this Independence Day 2025! 📚✨`, 'instagram')}
                  style={{padding: '0.4rem 0.6rem', border: 'none', borderRadius: '0.25rem', background: 'rgba(236, 72, 153, 0.2)', cursor: 'pointer', fontSize: '0.75rem', color: '#ec4899', fontWeight: '500'}}
                >
                  📸 Instagram
                </button>
              </div>
            </div>
          </div>

          <div style={styles.sidebarCard}>
            <h3 style={styles.cardTitle}>🗺️ Explore by Region</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem'}}>
              {['Punjab', 'Bengal', 'Maharashtra', 'Tamil Nadu', 'Kerala', 'Rajasthan', 'Bihar', 'Assam'].map((state, index) => (
                <button
                  key={index}
                  onClick={() => setInput(`Freedom fighters from ${state}`)}
                  style={{padding: '0.5rem', textAlign: 'left', background: 'transparent', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', transition: 'all 0.2s'}}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <div style={{maxWidth: '7xl', margin: '0 auto', padding: '0 1rem'}}>
          <p style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', margin: '0 0 0.5rem 0'}}>🇮🇳 Every Hero Has a Story. Every Story Deserves to be Told. 🇮🇳</p>
          <p style={{fontSize: '0.875rem', color: '#9ca3af', margin: '0 0 1rem 0'}}>Preserving India's Heritage • One Story at a Time • Independence Day 2025</p>
          
          {/* MonetIQ Logo and Branding */}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #374151'}}>
            <span style={{fontSize: '0.875rem', color: '#9ca3af'}}>Proudly Built by</span>
            <a 
              href="https://www.instagram.com/monetiqai?utm_source=qr&igsh=MWQ1dzlwcWxoMzYzeg=="
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                padding: '0.5rem',
                borderRadius: '8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Instagram Icon */}
              <div style={{
                width: '32px', 
                height: '32px', 
                background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <div style={{
                  fontSize: '1.125rem', 
                  fontWeight: 'bold', 
                  color: 'white',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  MonetIQ
                </div>
                <div style={{
                  fontSize: '0.75rem', 
                  color: '#9ca3af',
                  fontStyle: 'italic',
                  marginTop: '-2px'
                }}>
                  Smart Money. Smarter You.
                </div>
              </div>
            </a>
          </div>
          
          {/* Additional credit */}
          <div style={{
            fontSize: '0.75rem', 
            color: '#6b7280', 
            textAlign: 'center',
            marginTop: '0.75rem'
          }}>
            Building AI solutions that preserve heritage and empower communities 🚀
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return <AzadiProductionApp />;
}
