'use client'

import React, { useState, useEffect } from 'react';

// Styles
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
  }
};

// Icon components
const Send = () => <span>➤</span>;
const Star = () => <span>⭐</span>;
const Calendar = () => <span>📅</span>;
const MapPin = () => <span>📍</span>;
const BookOpen = () => <span>📚</span>;
const Sparkles = () => <span>✨</span>;
const Users = () => <span>👥</span>;
const Award = () => <span>🏆</span>;
const Clock = () => <span>⏰</span>;

// Freedom fighters database
const freedomFightersDB = {
  "aruna asaf ali": {
    name: "Aruna Asaf Ali",
    alias: "Grand Old Lady of Independence", 
    birth: "1909", death: "1996", region: "Delhi, Punjab",
    bio: "Aruna Asaf Ali was a legendary freedom fighter who hoisted the Indian National Congress flag at Gowalia Tank Maidan in Bombay during the Quit India Movement of 1942.",
    achievements: ["Hoisted Congress flag during Quit India Movement (1942)", "Organized underground resistance networks", "First woman Mayor of Delhi"],
    quote: "The secret of political bargaining is to look more strong than what you really are.",
    funFacts: ["Had a bounty of Rs. 5000 on her head", "Lived underground for 4 years", "Continued resistance even at age 80"],
    rarity: "legendary"
  },
  "matangini hazra": {
    name: "Matangini Hazra",
    alias: "Gandhi Buri (Old Lady Gandhi)",
    birth: "1869", death: "1942", region: "Bengal",
    bio: "At 73, Matangini Hazra led thousands in the Quit India Movement in Bengal. This brave grandmother was shot by British police but kept walking forward with the tricolor.",
    achievements: ["Led salt satyagraha at age 72", "Organized women's resistance groups", "Died holding the tricolor"],
    quote: "Vande Mataram! I will die with the flag in my hands!",
    funFacts: ["Started activism at age 60", "Called 'Gandhi Buri' by locals", "Shot 3 times but kept walking"],
    rarity: "legendary"
  },
  "alluri sitarama raju": {
    name: "Alluri Sitarama Raju",
    alias: "Manyam Veerudu (Hero of the Jungles)",
    birth: "1897", death: "1924", region: "Andhra Pradesh", 
    bio: "He led one of the most effective guerrilla campaigns against British rule from the hills and forests of Andhra Pradesh.",
    achievements: ["Led Rampa Rebellion of 1922-24", "United tribal communities", "Master of guerrilla warfare"],
    quote: "Freedom is our birthright, and we shall have it at any cost!",
    funFacts: ["Fluent in Telugu and English", "Expert in traditional weapons", "British deployed entire battalions to capture him"],
    rarity: "legendary"
  },
  "tirot sing": {
    name: "Tirot Sing",
    alias: "Lion of Meghalaya",
    birth: "1802", death: "1835", region: "Meghalaya",
    bio: "Tirot Sing was a Khasi chief who led armed resistance against British expansion in Northeast India.",
    achievements: ["Led Anglo-Khasi War (1829-1833)", "United Khasi chiefs", "Guerrilla warfare expert"],
    quote: "Our hills, our rules. No outsider shall dictate terms to the children of the soil!",
    funFacts: ["Youngest chief at age 25", "War lasted 4 years", "Used jungle warfare tactics"],
    rarity: "legendary"
  },
  "udham singh": {
    name: "Udham Singh", 
    alias: "Shaheed-i-Azam Sardar Udham Singh",
    birth: "1899", death: "1940", region: "Punjab",
    bio: "Udham Singh avenged the Jallianwala Bagh massacre by assassinating Michael O'Dwyer in London on March 13, 1940.",
    achievements: ["Avenged Jallianwala Bagh massacre", "Assassinated Michael O'Dwyer in London", "Symbol of delayed justice"],
    quote: "I did it because I had a grudge against him. He deserved it!",
    funFacts: ["Waited 21 years for revenge", "Changed identity multiple times", "Refused to appeal death sentence"],
    rarity: "rare"
  },
  "khudiram bose": {
    name: "Khudiram Bose",
    alias: "The Young Revolutionary",
    birth: "1889", death: "1908", region: "Bengal",
    bio: "At just 18, Khudiram Bose became one of the youngest martyrs of the Indian independence movement.",
    achievements: ["Youngest revolutionary martyr", "Muzaffarpur bombing", "Inspired youth movement"],
    quote: "I am proud to die for my motherland!",
    funFacts: ["Executed at age 18", "Smiled while going to gallows", "Became inspiration for youth"],
    rarity: "rare"
  },
  "begum hazrat mahal": {
    name: "Begum Hazrat Mahal",
    alias: "The Rebel Queen of Awadh",
    birth: "1820", death: "1879", region: "Uttar Pradesh",
    bio: "Begum Hazrat Mahal led the rebellion in Lucknow during the Indian Rebellion of 1857.",
    achievements: ["Led 1857 rebellion in Lucknow", "Refused British offers", "Established independent government"],
    quote: "I will never accept the dominance of the British!",
    funFacts: ["Ruled Awadh independently", "Rejected British pension", "Died in exile in Nepal"],
    rarity: "rare"
  },
  "birsa munda": {
    name: "Birsa Munda",
    alias: "Dharti Aba (Father of Earth)",
    birth: "1875", death: "1900", region: "Jharkhand",
    bio: "Birsa Munda led the tribal movement against British colonial rule and exploitation by landlords.",
    achievements: ["Led Munda rebellion", "Protected tribal rights", "Fought against forced conversions"],
    quote: "My people will be free from the chains of oppression!",
    funFacts: ["Died at age 25", "Called 'Bhagwan' by tribals", "Jharkhand formed on his birth anniversary"],
    rarity: "rare"
  },
  "pritilata waddedar": {
    name: "Pritilata Waddedar",
    alias: "The Brave Heart of Chittagong",
    birth: "1911", death: "1932", region: "Bengal",
    bio: "Pritilata Waddedar was a Bengali revolutionary who led an armed attack on the Pahartali European Club.",
    achievements: ["Led Pahartali Club attack", "First woman to lead armed resistance", "Graduated with distinction"],
    quote: "Freedom is our birthright and we shall achieve it!",
    funFacts: ["Mathematics graduate", "Disguised as male for attack", "Youngest woman revolutionary leader"],
    rarity: "epic"
  },
  "rani gaidinliu": {
    name: "Rani Gaidinliu",
    alias: "The Naga Queen",
    birth: "1915", death: "1993", region: "Manipur",
    bio: "Rani Gaidinliu was a Naga spiritual and political leader who led a revolt against British rule.",
    achievements: ["Led Naga independence movement", "Imprisoned for 14 years", "Preserved Naga culture"],
    quote: "My people's freedom is worth any sacrifice!",
    funFacts: ["Started rebellion at age 13", "Imprisoned at 16", "Released only after independence"],
    rarity: "epic"
  },
  "peer ali khan": {
    name: "Peer Ali Khan",
    alias: "The Fearless Martyr",
    birth: "1825", death: "1857", region: "Bihar",
    bio: "Peer Ali Khan was a freedom fighter who participated in the 1857 rebellion.",
    achievements: ["Participated in 1857 revolt", "Led resistance in Patna", "Sacrificed life for freedom"],
    quote: "Death is preferable to slavery!",
    funFacts: ["Fought in Patna region", "Executed publicly", "Remembered in folk songs"],
    rarity: "epic"
  },
  "tara rani srivastava": {
    name: "Tara Rani Srivastava",
    alias: "The Undaunted Spirit",
    birth: "1914", death: "2007", region: "Bihar",
    bio: "Tara Rani Srivastava continued leading protests even after her husband was shot by police during the Quit India Movement.",
    achievements: ["Led Quit India protests", "Continued after husband's death", "Symbol of determination"],
    quote: "The struggle must continue despite personal loss!",
    funFacts: ["Husband died in her arms", "Continued protest immediately", "Active till old age"],
    rarity: "epic"
  }
};

// Quick prompts
const quickPrompts = [
  "Tell me about Matangini Hazra",
  "Women freedom fighters from Bengal", 
  "Create Independence Day greeting",
  "Tribal heroes who fought British",
  "Freedom fighters from Punjab",
  "Generate social media post"
];

// Fallback response function
const generateFallbackResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const [key, fighter] of Object.entries(freedomFightersDB)) {
    if (lowerMessage.includes(key) || lowerMessage.includes(fighter.name.toLowerCase())) {
      return `🇮🇳 Let me tell you about ${fighter.name} - "${fighter.alias}"!\n\n**Born:** ${fighter.birth} in ${fighter.region}\n**Legacy:** ${fighter.alias}\n\n${fighter.bio}\n\n**Key Achievements:**\n${fighter.achievements.map(achievement => `• ${achievement}`).join('\n')}\n\n**Inspiring Quote:** "${fighter.quote}"\n\nWould you like to know more about their specific contributions?`;
    }
  }

  return `🇮🇳 Welcome! I'm your AI historian, passionate about sharing the stories of India's forgotten freedom fighters.\n\n**I can help you discover:**\n🌟 Lesser-known heroes from your state or region\n👑 Brave women freedom fighters who changed history\n🏹 Tribal warriors who protected their homeland\n🎨 Create personalized Independence Day greetings\n\nWhat story would you like to discover today? 🌟`;
};

// Visual card generator
const generateVisualCard = (heroData) => {
  const cardWindow = window.open('', 'GreetingCard', 'width=550,height=900,scrollbars=yes');
  
  const cardHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Independence Day Greeting - ${heroData.name}</title>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          margin: 0; 
          padding: 20px; 
          font-family: 'Segoe UI', 'Arial', sans-serif; 
          background: linear-gradient(135deg, #f0f0f0, #e8e8e8); 
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card { 
          width: 480px; 
          height: 800px; 
          background: linear-gradient(45deg, #FF6B35 0%, #FFFFFF 30%, #FFFFFF 70%, #138808 100%);
          margin: 0 auto;
          border-radius: 25px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2);
          padding: 40px 30px;
          position: relative;
          overflow: hidden;
          color: #333;
        }
        .card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .header {
          text-align: center;
          margin-bottom: 25px;
          position: relative;
          z-index: 2;
        }
        .independence-title {
          font-size: 24px;
          font-weight: bold;
          color: #138808;
          margin-bottom: 5px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .hero-name {
          color: #FF6B35;
          text-align: center;
          margin: 20px 0 15px 0;
          font-size: 42px;
          font-weight: bold;
          text-shadow: 0 2px 6px rgba(0,0,0,0.2);
          position: relative;
          z-index: 2;
          line-height: 1.1;
        }
        .alias {
          text-align: center;
          font-style: italic;
          color: #666;
          font-size: 18px;
          margin-bottom: 30px;
          position: relative;
          z-index: 2;
        }
        .details-section {
          background: rgba(255,255,255,0.9);
          padding: 20px;
          border-radius: 15px;
          margin: 20px 0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          position: relative;
          z-index: 2;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 16px;
          align-items: center;
        }
        .detail-label {
          font-weight: bold;
          color: #FF6B35;
          font-size: 16px;
        }
        .detail-value {
          font-weight: 600;
          color: #333;
          text-align: right;
        }
        .quote-section {
          background: rgba(19, 136, 8, 0.1);
          padding: 25px;
          border-radius: 15px;
          border-left: 4px solid #138808;
          margin: 25px 0;
          position: relative;
          z-index: 2;
        }
        .quote {
          font-style: italic;
          text-align: center;
          color: #333;
          font-size: 18px;
          line-height: 1.6;
          margin: 0;
        }
        .achievements {
          background: rgba(255, 107, 53, 0.1);
          padding: 20px;
          border-radius: 15px;
          margin: 25px 0;
          position: relative;
          z-index: 2;
        }
        .achievements-title {
          font-weight: bold;
          color: #FF6B35;
          font-size: 20px;
          margin-bottom: 15px;
          text-align: center;
        }
        .achievement-item {
          font-size: 15px;
          margin-bottom: 8px;
          color: #555;
          padding-left: 25px;
          position: relative;
          line-height: 1.4;
        }
        .achievement-item::before {
          content: '🏆';
          position: absolute;
          left: 0;
          top: 0;
          font-size: 16px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          position: relative;
          z-index: 2;
        }
        .footer-text {
          font-size: 16px;
          color: #138808;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .footer-subtitle {
          font-size: 14px;
          color: #666;
          font-style: italic;
        }
        .download-section {
          text-align: center;
          margin-top: 30px;
          position: relative;
          z-index: 2;
        }
        .download-btn {
          background: linear-gradient(45deg, #FF6B35, #138808);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: transform 0.2s;
          margin: 0 5px;
        }
        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        @media print {
          body { background: white; padding: 0; }
          .download-section { display: none; }
          .card { box-shadow: none; }
        }
      </style>
    </head>
    <body>
      <div class="card" id="heroCard">
        <div class="header">
          <div class="independence-title">🇮🇳 Independence Day 2025 🇮🇳</div>
        </div>
        
        <h2 class="hero-name">${heroData.name}</h2>
        <div class="alias">"${heroData.alias}"</div>
        
        <div class="details-section">
          <div class="detail-row">
            <span class="detail-label">Born:</span>
            <span class="detail-value">${heroData.birth}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Died:</span>
            <span class="detail-value">${heroData.death}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Region:</span>
            <span class="detail-value">${heroData.region}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Legacy:</span>
            <span class="detail-value">${heroData.rarity.charAt(0).toUpperCase() + heroData.rarity.slice(1)} Hero</span>
          </div>
        </div>
        
        <div class="quote-section">
          <div class="quote">"${heroData.quote}"</div>
        </div>
        
        <div class="achievements">
          <div class="achievements-title">Key Achievements</div>
          ${heroData.achievements.slice(0, 3).map(achievement => 
            `<div class="achievement-item">${achievement}</div>`
          ).join('')}
        </div>
        
        <div class="footer">
          <div class="footer-text">🙏 Remembering Our Forgotten Heroes 🙏</div>
          <div class="footer-subtitle">"Every hero has a story. Every story deserves to be told."</div>
        </div>
        
        <div class="download-section">
          <button class="download-btn" onclick="downloadCard()">📥 Download Card</button>
          <button class="download-btn" onclick="shareCard()">📤 Share Story</button>
          <br><br>
          <button class="download-btn" onclick="window.print()" style="width: 200px;">🖨️ Print Card</button>
        </div>
      </div>
      
      <script>
        function downloadCard() {
          if (window.html2canvas) {
            const card = document.getElementById('heroCard');
            html2canvas(card, {
              backgroundColor: null,
              scale: 2,
              logging: false,
              useCORS: true
            }).then(canvas => {
              const link = document.createElement('a');
              link.download = '${heroData.name.replace(/\s+/g, '_')}_Independence_Day_Card.png';
              link.href = canvas.toDataURL('image/png');
              link.click();
            });
          } else {
            alert('Right-click on the card and select "Save as Image" or use the Print option below!');
          }
        }
        
        function shareCard() {
          const shareText = \`🇮🇳 This Independence Day, let's honor ${heroData.name} from ${heroData.region}!

"${heroData.alias}" - ${heroData.name} showed us that freedom comes through sacrifice and courage.

"${heroData.quote}"

Key Achievements:
• ${heroData.achievements[0] || 'Led resistance against British rule'}
• ${heroData.achievements[1] || 'Inspired future generations'}
• ${heroData.achievements[2] || 'Sacrificed everything for freedom'}

Let's remember our forgotten heroes who gave everything for our freedom! 

#IndependenceDay #ForgottenHeroes #${heroData.name.replace(/\s+/g, '')} #IndianFreedomFighters #JaiHind\`;
          
          if (navigator.share) {
            navigator.share({
              title: \`${heroData.name} - Independence Day Tribute\`,
              text: shareText,
              url: window.location.href
            });
          } else if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
              alert('Story copied to clipboard! You can now paste it on your social media.');
            }).catch(() => {
              prompt('Copy this text to share:', shareText);
            });
          } else {
            prompt('Copy this text to share:', shareText);
          }
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = function() {
          console.log('html2canvas loaded successfully');
        };
        document.head.appendChild(script);
      </script>
    </body>
    </html>
  `;
  
  cardWindow.document.write(cardHTML);
  cardWindow.document.close();
};

// Main component
export default function Home() {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "🙏 Namaste! I'm Guruji, your passionate AI historian who lives and breathes the stories of India's forgotten freedom fighters! 🇮🇳\n\n🌟 On this glorious Independence Day, as we celebrate 78 years of freedom, it's the perfect time to discover the incredible heroes whose names history books forgot. I know the stories of brave grandmothers who faced British bullets, young revolutionaries who sacrificed everything, and tribal warriors who defended their homeland with ancient wisdom!\n\n🔥 Ready to explore some mind-blowing stories? Ask me about:\n• Lesser-known heroes from your state\n• Fierce women warriors who changed history\n• Tribal freedom fighters and their guerrilla tactics\n• Create personalized Independence Day greetings\n\nWhat amazing story shall we uncover today? 🌟",
      timestamp: "Just now"
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState(null);
  const [language, setLanguage] = useState('en');
  const [stats, setStats] = useState({
    users: 1247,
    stories: 156,
    greetings: 423
  });
  const [isClient, setIsClient] = useState(false);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [discoveredHeroes, setDiscoveredHeroes] = useState(new Set());

  // Initialize with random 4 cards
  useEffect(() => {
    const allFighters = Object.values(freedomFightersDB);
    const shuffled = [...allFighters].sort(() => Math.random() - 0.5);
    setDisplayedCards(shuffled.slice(0, 4));
    setDiscoveredHeroes(new Set(shuffled.slice(0, 4).map(f => f.name)));
    setIsClient(true);
  }, []);

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

  const formatAIResponse = (content) => {
    const lines = content.split('\n');
    return (
      <div>
        {lines.map((line, index) => {
          if (line.trim() === '') {
            return <div key={index} style={{height: '0.5rem'}} />;
          }
          
          if (line.includes('**') || line.includes('Achievement') || line.includes('Born:') || line.includes('Legacy:')) {
            return (
              <div key={index} style={{fontWeight: 'bold', color: '#ea580c', marginBottom: '0.5rem'}}>
                {line.replace(/\*\*/g, '')}
              </div>
            );
          }
          
          if (line.trim().startsWith('•')) {
            return (
              <div key={index} style={{color: '#16a34a', fontWeight: '500', marginLeft: '1rem', marginBottom: '0.25rem'}}>
                {line}
              </div>
            );
          }
          
          return (
            <div key={index} style={{marginBottom: '0.5rem', lineHeight: '1.6'}}>
              {line}
            </div>
          );
        })}
      </div>
    );
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      type: 'user',
      content: input,
      timestamp: getTimestamp()
    };

    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const fallbackResponse = generateFallbackResponse(currentInput);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: fallbackResponse,
        timestamp: getTimestamp()
      }]);

      const fighterNames = Object.keys(freedomFightersDB);
      const mentionedFighter = fighterNames.find(name => 
        currentInput.toLowerCase().includes(name)
      );
      if (mentionedFighter) {
        setSelectedFighter(freedomFightersDB[mentionedFighter]);
      }

      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
              <span style={{color: '#dc2626', fontWeight: '600'}}>Independence Day: Aug 15! 🇮🇳</span>
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
                  <div>
                    {message.type === 'ai' 
                      ? formatAIResponse(message.content)
                      : message.content
                    }
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.1)'}}>
                    <span style={{fontSize: '0.75rem', opacity: 0.7}}>{message.timestamp}</span>
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
                  <span><strong>{selectedFighter.birth} - {selectedFighter.death}</strong></span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                  <MapPin />
                  <span><strong>{selectedFighter.region}</strong></span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span>🏆</span>
                  <span><strong>{selectedFighter.rarity.charAt(0).toUpperCase() + selectedFighter.rarity.slice(1)} Hero</strong></span>
                </div>
              </div>
              
              <div style={{padding: '0.75rem', background: 'linear-gradient(90deg, #fff7ed, #f0fdf4)', borderRadius: '0.5rem', borderLeft: '4px solid #fb923c', marginBottom: '1rem'}}>
                <p style={{fontSize: '0.875rem', fontStyle: 'italic', color: '#4b5563', margin: 0}}>"{selectedFighter.quote}"</p>
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <button 
                  onClick={() => setInput(`Tell me more about ${selectedFighter.name}`)}
                  style={{...styles.button, ...styles.buttonOrange, margin: 0, fontSize: '0.875rem'}}
                >
                  📚 Learn More Details
                </button>
                <button 
                  onClick={() => generateVisualCard(selectedFighter)}
                  style={{...styles.button, ...styles.buttonGreen, margin: 0, fontSize: '0.875rem'}}
                >
                  🎨 Create Detailed Card
                </button>
                <button 
                  onClick={() => {
                    const shareText = `🇮🇳 This Independence Day, let's honor ${selectedFighter.name} from ${selectedFighter.region}!\n\n"${selectedFighter.alias}" showed us true courage.\n\n"${selectedFighter.quote}"\n\nLet's remember our forgotten heroes! #IndependenceDay #ForgottenHeroes #JaiHind`;
                    
                    if (navigator.share) {
                      navigator.share({
                        title: `${selectedFighter.name} - Independence Day Tribute`,
                        text: shareText
                      });
                    } else if (navigator.clipboard) {
                      navigator.clipboard.writeText(shareText).then(() => {
                        alert('Hero story copied to clipboard! Share it on your social media stories.');
                      });
                    } else {
                      prompt('Copy this text to share on your stories:', shareText);
                    }
                  }}
                  style={{...styles.button, ...styles.buttonBlue, margin: 0, fontSize: '0.875rem'}}
                >
                  📤 Share on Stories
                </button>
              </div>
            </div>
          )}

          <div style={styles.sidebarCard}>
            <h3 style={styles.cardTitle}>🃏 Hero Trading Cards</h3>
            
            <div style={{marginBottom: '1rem', padding: '0.75rem', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '0.5rem', border: '1px solid #f59e0b'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                <span style={{fontSize: '0.75rem', fontWeight: '600', color: '#92400e'}}>Collection Progress</span>
                <span style={{fontSize: '0.75rem', color: '#92400e'}}>{discoveredHeroes.size}/{Object.keys(freedomFightersDB).length} Discovered</span>
              </div>
              <div style={{width: '100%', height: '6px', background: '#fed7aa', borderRadius: '3px', overflow: 'hidden'}}>
                <div style={{width: `${(discoveredHeroes.size / Object.keys(freedomFightersDB).length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #f97316, #ea580c)', borderRadius: '3px'}}></div>
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem', minHeight: '300px'}}>
              {displayedCards.map((fighter, index) => {
                const getRarityInfo = (rarity) => {
                  switch(rarity) {
                    case 'legendary': return { badge: '💎 LEGENDARY', colors: '#fef3c7, #f59e0b' };
                    case 'rare': return { badge: '🔥 RARE', colors: '#dcfce7, #16a34a' };
                    case 'epic': return { badge: '⚡ EPIC', colors: '#e0e7ff, #3b82f6' };
                    default: return { badge: '⭐ HERO', colors: '#fce7f3, #ec4899' };
                  }
                };
                
                const rarityInfo = getRarityInfo(fighter.rarity);
                
                return (
                  <div 
                    key={`${fighter.name}-${index}`}
                    style={{
                      height: '140px',
                      cursor: 'pointer',
                      borderRadius: '0.5rem',
                      background: `linear-gradient(135deg, ${rarityInfo.colors})`,
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: '2px solid rgba(0,0,0,0.1)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s'
                    }}
                    onClick={() => setSelectedFighter(fighter)}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <div style={{textAlign: 'center'}}>
                      <div style={{
                        width: '40px', 
                        height: '40px', 
                        background: 'rgba(255,255,255,0.3)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.5rem',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#1f2937'
                      }}>
                        {fighter.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h4 style={{fontSize: '0.7rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.25rem 0', lineHeight: '1.2'}}>{fighter.name}</h4>
                      <p style={{fontSize: '0.6rem', color: '#4b5563', margin: 0}}>{fighter.region}</p>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#6b7280'}}>
                        <span>{fighter.birth}</span>
                        <span>•</span>
                        <span>{fighter.death}</span>
                      </div>
                      <div style={{fontSize: '0.6rem', color: '#7c3aed', fontWeight: '600', marginTop: '0.25rem'}}>
                        {rarityInfo.badge}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{marginBottom: '1.5rem'}}>
              <button
                onClick={() => {
                  const allFighters = Object.values(freedomFightersDB);
                  const shuffled = [...allFighters].sort(() => Math.random() - 0.5);
                  const newCards = shuffled.slice(0, 4);
                  
                  setDisplayedCards(newCards);
                  setDiscoveredHeroes(prev => new Set([...prev, ...newCards.map(f => f.name)]));
                  setSelectedFighter(null);
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 4px rgba(139, 92, 246, 0.3)'
                }}
              >
                🎲 Discover Random Heroes
              </button>
            </div>

            <div style={{padding: '0.75rem', background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)', borderRadius: '0.5rem', border: '1px solid #d1d5db'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#4b5563'}}>
                <div style={{textAlign: 'center', flex: 1}}>
                  <div style={{fontWeight: 'bold', color: '#f59e0b', fontSize: '1rem', marginBottom: '0.25rem'}}>
                    💎 {Array.from(discoveredHeroes).filter(name => {
                      const fighter = Object.values(freedomFightersDB).find(f => f.name === name);
                      return fighter && fighter.rarity === 'legendary';
                    }).length}
                  </div>
                  <div style={{fontWeight: '500'}}>Legendary</div>
                </div>
                <div style={{textAlign: 'center', flex: 1}}>
                  <div style={{fontWeight: 'bold', color: '#16a34a', fontSize: '1rem', marginBottom: '0.25rem'}}>
                    🔥 {Array.from(discoveredHeroes).filter(name => {
                      const fighter = Object.values(freedomFightersDB).find(f => f.name === name);
                      return fighter && fighter.rarity === 'rare';
                    }).length}
                  </div>
                  <div style={{fontWeight: '500'}}>Rare</div>
                </div>
                <div style={{textAlign: 'center', flex: 1}}>
                  <div style={{fontWeight: 'bold', color: '#3b82f6', fontSize: '1rem', marginBottom: '0.25rem'}}>
                    ⚡ {Array.from(discoveredHeroes).filter(name => {
                      const fighter = Object.values(freedomFightersDB).find(f => f.name === name);
                      return fighter && fighter.rarity === 'epic';
                    }).length}
                  </div>
                  <div style={{fontWeight: '500'}}>Epic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <div style={{maxWidth: '7xl', margin: '0 auto', padding: '0 1rem'}}>
          <p style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem'}}>🇮🇳 Every Hero Has a Story. Every Story Deserves to be Told. 🇮🇳</p>
          <p style={{fontSize: '0.875rem', color: '#9ca3af', margin: '0 0 1rem 0'}}>Preserving India's Heritage • One Story at a Time • Independence Day 2025</p>
          
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #374151'}}>
            <span style={{fontSize: '0.875rem', color: '#9ca3af'}}>Proudly Built by</span>
            <a 
              href="https://www.instagram.com/monetiqai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                textDecoration: 'none',
                padding: '0.5rem',
                borderRadius: '8px'
              }}
            >
              <div style={{
                width: '32px', 
                height: '32px', 
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{color: 'white', fontSize: '18px'}}>📷</span>
              </div>
              <div>
                <div style={{
                  fontSize: '1.125rem', 
                  fontWeight: 'bold', 
                  color: 'white'
                }}>
                  MonetIQ
                </div>
                <div style={{
                  fontSize: '0.75rem', 
                  color: '#9ca3af',
                  fontStyle: 'italic'
                }}>
                  Smart Money. Smarter You.
                </div>
              </div>
            </a>
          </div>
          
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
}
