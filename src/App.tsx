import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Upload, 
  Send, 
  FileText, 
  Code, 
  Zap, 
  Brain, 
  CheckCircle,
  X,
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Sparkles,
  Cpu,
  Database,
  GitBranch,
  Github,
  Mail,
  User,
  Settings,
  LogOut,
  Phone,
  MapPin,
  Clock,
  Shield,
  HelpCircle,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content?: string;
}

interface VideoStep {
  id: string;
  title: string;
  code: string;
  explanation: string;
  highlight: number[];
}

interface UserProfile {
  name: string;
  email: string;
  age: string;
  phone: string;
  leetcodeId: string;
  codeforcesId: string;
  githubId: string;
  interests: string[];
}

type Page = 'landing' | 'signin' | 'signup' | 'dashboard' | 'profile' | 'about' | 'contact' | 'support';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    age: '',
    phone: '',
    leetcodeId: '',
    codeforcesId: '',
    githubId: '',
    interests: []
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m AlgoSynth AI, your advanced DSA problem-solving assistant. Upload your code files and I\'ll create AI-powered video explanations with quantum visualizations!',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [videoSteps, setVideoSteps] = useState<VideoStep[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const interests = [
    'Machine Learning', 'Data Structures', 'Algorithms', 'Web Development',
    'Mobile Development', 'DevOps', 'Cybersecurity', 'Blockchain',
    'AI/ML', 'Cloud Computing', 'Game Development', 'System Design'
  ];

  const handleAuth = (email: string, password: string) => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleSocialAuth = (provider: string) => {
    console.log(`Authenticating with ${provider}`);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm analyzing your question about data structures and algorithms. Upload your code file and I'll create a step-by-step quantum visualization showing how your algorithm works!",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          content: e.target?.result as string
        };
        setUploadedFiles(prev => [...prev, uploadedFile]);
      };
      reader.readAsText(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
      setVideoSteps([]);
    }
  };

  const formatFileSize = (bytes: number) => {
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generateVideoFromUserCode = (file: UploadedFile) => {
    setSelectedFile(file);
    
    const codeLines = file.content?.split('\n') || [];
    const steps: VideoStep[] = [];
    let stepCount = 1;
    
    for (let i = 0; i < codeLines.length; i++) {
      const line = codeLines[i].trim();
      
      if (line.includes('def ') || line.includes('function ') || line.includes('class ')) {
        steps.push({
          id: stepCount.toString(),
          title: `Step ${stepCount}: ${line.includes('class') ? 'Class Definition' : 'Function Definition'}`,
          code: file.content || '',
          explanation: `Defining ${line.includes('class') ? 'class' : 'function'}: ${line}`,
          highlight: [i + 1]
        });
        stepCount++;
      } else if (line.includes('if ') || line.includes('while ') || line.includes('for ')) {
        steps.push({
          id: stepCount.toString(),
          title: `Step ${stepCount}: Control Flow`,
          code: file.content || '',
          explanation: `Executing control structure: ${line}`,
          highlight: [i + 1]
        });
        stepCount++;
      } else if (line.includes('return ')) {
        steps.push({
          id: stepCount.toString(),
          title: `Step ${stepCount}: Return Statement`,
          code: file.content || '',
          explanation: `Returning value: ${line}`,
          highlight: [i + 1]
        });
        stepCount++;
      }
    }
    
    if (steps.length === 0) {
      const chunkSize = Math.ceil(codeLines.length / 3);
      for (let i = 0; i < 3; i++) {
        const startLine = i * chunkSize;
        const endLine = Math.min((i + 1) * chunkSize, codeLines.length);
        const highlightLines = Array.from({length: endLine - startLine}, (_, idx) => startLine + idx + 1);
        
        steps.push({
          id: (i + 1).toString(),
          title: `Step ${i + 1}: Code Analysis`,
          code: file.content || '',
          explanation: `Analyzing lines ${startLine + 1} to ${endLine}`,
          highlight: highlightLines
        });
      }
    }
    
    setVideoSteps(steps);
    setCurrentStep(0);
    setIsVideoPlaying(false);
  };

  const playVideo = () => {
    setIsVideoPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= videoSteps.length - 1) {
          setIsVideoPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);
  };

  const pauseVideo = () => {
    setIsVideoPlaying(false);
  };

  const resetVideo = () => {
    setCurrentStep(0);
    setIsVideoPlaying(false);
  };

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Matrix Background */}
        <div className="matrix-rain"></div>
        <div className="absolute inset-0 circuit-pattern opacity-20"></div>
        
        {/* Enhanced Circuit Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-blue to-transparent opacity-30 animate-circuit-pulse"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-neon-purple to-transparent opacity-30 animate-circuit-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-30 animate-circuit-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-30 animate-circuit-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-neon-blue/3 to-neon-purple/3 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        {/* Header */}
        <header className="cyber-glass-strong sticky top-0 z-50 border-b border-neon-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3 animate-slide-in">
                <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center glow-neon animate-float">
                  <Brain className="w-6 h-6 text-white font-bold" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent text-shadow-neon font-cyber animate-hologram">
                  AlgoSynth
                </h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="text-cyan-300 hover:text-neon-blue transition-all duration-300 font-medium hover:scale-105 font-sans text-base"
                >
                  About
                </button>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="text-cyan-300 hover:text-neon-purple transition-all duration-300 font-medium hover:scale-105 font-sans text-base"
                >
                  Contact
                </button>
                <button 
                  onClick={() => setCurrentPage('support')}
                  className="text-cyan-300 hover:text-neon-blue transition-all duration-300 font-medium hover:scale-105 font-sans text-base"
                >
                  Support
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-16 lg:py-20 perspective-2000">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-slide-up">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 text-shadow-neon font-cyber animate-hologram">
                Master Data Structures & Algorithms
              </h2>
              <p className="text-xl text-cyan-300 mb-12 max-w-3xl mx-auto leading-relaxed font-sans">
                AlgoSynth creates AI-powered video explanations from YOUR code. 
                Upload any DSA implementation and watch it come to life with step-by-step quantum visualizations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button
                  onClick={() => setCurrentPage('signin')}
                  className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-xl hover:opacity-90 transition-all duration-300 glow-neon hover:scale-105 font-sans text-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="px-8 py-4 cyber-glass border-2 border-neon-blue text-cyan-300 font-bold rounded-xl hover:bg-neon-blue/10 transition-all duration-300 hover:scale-105 font-sans text-lg"
                >
                  Sign Up
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                {[
                  { icon: Code, title: "Your Code Analysis", desc: "Upload your DSA implementations for personalized video explanations.", delay: "0s" },
                  { icon: MessageCircle, title: "Interactive Chat", desc: "Ask questions about your uploaded code and get instant explanations.", delay: "0.2s" },
                  { icon: Zap, title: "Quantum Visualization", desc: "Watch your algorithms execute with stunning quantum animations.", delay: "0.4s" },
                  { icon: Monitor, title: "AI Video Generation", desc: "Generate step-by-step videos from your actual code files.", delay: "0.6s" }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="cyber-glass rounded-2xl p-6 shadow-2xl hover:shadow-neon-blue/10 transition-all duration-500 border border-neon-blue/20 hover:border-neon-purple/40 card-3d animate-scale-in group"
                    style={{ animationDelay: feature.delay }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center mb-4 mx-auto glow-neon group-hover:animate-bounce-slow">
                      <feature.icon className="w-6 h-6 text-white font-bold" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 font-sans">{feature.title}</h3>
                    <p className="text-gray-300 font-sans text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="cyber-glass-strong border-t border-neon-blue/20 py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4 animate-slide-up">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center glow-neon animate-float">
                  <Brain className="w-5 h-5 text-white font-bold" />
                </div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent font-cyber">
                  AlgoSynth
                </h4>
              </div>
              <p className="text-cyan-300 mb-6 font-sans text-base">
                Bringing your code to life with AI-powered quantum visualizations and dynamic experiences.
              </p>

              <p className="text-cyan-300 mb-6 font-sans text-lg font-semibold">Made With ❤️ By Ayan</p>
              <div className="flex justify-center space-x-6">
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="text-gray-400 hover:text-neon-blue transition-all duration-300 hover:scale-105 font-sans text-base"
                >
                  About
                </button>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="text-gray-400 hover:text-neon-purple transition-all duration-300 hover:scale-105 font-sans text-base"
                >
                  Contact
                </button>
                <button 
                  onClick={() => setCurrentPage('support')}
                  className="text-gray-400 hover:text-neon-blue transition-all duration-300 hover:scale-105 font-sans text-base"
                >
                  Support
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-8 font-sans">
                © 2025 AlgoSynth. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // About Page
  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="matrix-rain"></div>
        <div className="absolute inset-0 circuit-pattern opacity-20"></div>
        
        <header className="cyber-glass-strong sticky top-0 z-50 border-b border-neon-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setCurrentPage('landing')}
                className="flex items-center space-x-2 text-neon-blue hover:text-neon-purple transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-sans text-base">Back</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center glow-neon">
                  <Brain className="w-5 h-5 text-white font-bold" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent font-cyber">
                  AlgoSynth
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="cyber-glass-strong rounded-3xl p-8 border border-neon-blue/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center font-cyber">About AlgoSynth</h2>
            
            <div className="space-y-6 text-gray-300 font-sans text-base leading-relaxed">
              <p>
                AlgoSynth is a revolutionary AI-powered platform designed to transform how developers learn and understand 
                Data Structures and Algorithms. Our cutting-edge technology analyzes your actual code implementations 
                and creates personalized, step-by-step video explanations with stunning quantum visualizations.
              </p>
              
              <h3 className="text-xl font-semibold text-neon-blue mt-8 mb-4 font-cyber">Our Mission</h3>
              <p>
                To democratize advanced algorithmic learning by making complex DSA concepts accessible through 
                AI-generated visual explanations tailored to your specific code implementations.
              </p>
              
              <h3 className="text-xl font-semibold text-neon-purple mt-8 mb-4 font-cyber">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Upload your own DSA code for personalized analysis</li>
                <li>AI-powered video generation with quantum visualizations</li>
                <li>Interactive chat interface for code-specific questions</li>
                <li>Step-by-step algorithm execution breakdown</li>
                <li>Support for multiple programming languages</li>
                <li>Real-time code highlighting and explanations</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-neon-blue mt-8 mb-4 font-cyber">Technology Stack</h3>
              <p>
                Built with modern web technologies including React, TypeScript, and advanced AI models, 
                AlgoSynth delivers a seamless, responsive experience across all devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Contact Page
  if (currentPage === 'contact') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="matrix-rain"></div>
        <div className="absolute inset-0 circuit-pattern opacity-20"></div>
        
        <header className="cyber-glass-strong sticky top-0 z-50 border-b border-neon-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setCurrentPage('landing')}
                className="flex items-center space-x-2 text-neon-blue hover:text-neon-purple transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-sans text-base">Back</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center glow-neon">
                  <Brain className="w-5 h-5 text-white font-bold" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent font-cyber">
                  AlgoSynth
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="cyber-glass-strong rounded-3xl p-8 border border-neon-blue/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center font-cyber">Contact Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center glow-neon">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white font-sans">Email</h3>
                    <a 
                      href="mailto:ceoalgosynthai@gmail.com"
                      className="text-neon-blue hover:text-neon-purple transition-colors font-sans text-base"
                    >
                      ceoalgosynthai@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center glow-neon">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white font-sans">Response Time</h3>
                    <p className="text-gray-300 font-sans text-base">Within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center glow-neon">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white font-sans">GitHub</h3>
                    <p className="text-gray-300 font-sans text-base">Follow us for updates</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-glass rounded-2xl p-6 border border-neon-blue/20">
                <h3 className="text-xl font-semibold text-white mb-4 font-cyber">Send us a message</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 resize-none font-sans text-base"
                  ></textarea>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = 'mailto:ceoalgosynthai@gmail.com';
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 glow-neon hover:scale-105 font-sans text-base"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Support Page
  if (currentPage === 'support') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="matrix-rain"></div>
        <div className="absolute inset-0 circuit-pattern opacity-20"></div>
        
        <header className="cyber-glass-strong sticky top-0 z-50 border-b border-neon-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setCurrentPage('landing')}
                className="flex items-center space-x-2 text-neon-blue hover:text-neon-purple transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-sans text-base">Back</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center glow-neon">
                  <Brain className="w-5 h-5 text-white font-bold" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent font-cyber">
                  AlgoSynth
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="cyber-glass-strong rounded-3xl p-8 border border-neon-blue/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center font-cyber">Support Center</h2>
            
            <div className="space-y-8">
              <div className="cyber-glass rounded-2xl p-6 border border-neon-blue/20">
                <h3 className="text-xl font-semibold text-neon-blue mb-4 font-cyber">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-lg font-semibold text-white mb-2 font-sans">How do I upload my code files?</h4>
                    <p className="text-gray-300 font-sans text-base">Simply drag and drop your code files into the upload area or click the browse button. We support .py, .js, .cpp, .java, .c, and more.</p>
                  </div>
                  
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-lg font-semibold text-white mb-2 font-sans">What programming languages are supported?</h4>
                    <p className="text-gray-300 font-sans text-base">AlgoSynth supports Python, JavaScript, C++, Java, C, and many other popular programming languages.</p>
                  </div>
                  
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-lg font-semibold text-white mb-2 font-sans">How does the AI video generation work?</h4>
                    <p className="text-gray-300 font-sans text-base">Our AI analyzes your code structure and creates step-by-step visualizations showing how your algorithm executes, complete with quantum animations.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2 font-sans">Is my code data secure?</h4>
                    <p className="text-gray-300 font-sans text-base">Yes, we take security seriously. Your code is processed securely and is not stored permanently on our servers.</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-glass rounded-2xl p-6 border border-neon-blue/20">
                <h3 className="text-xl font-semibold text-neon-purple mb-4 font-cyber">Need More Help?</h3>
                <p className="text-gray-300 mb-4 font-sans text-base">
                  Can't find what you're looking for? Our support team is here to help!
                </p>
                <button
                  onClick={() => window.location.href = 'mailto:ceoalgosynthai@gmail.com'}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 glow-neon hover:scale-105 font-sans text-base"
                >
                  <Mail className="w-5 h-5" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sign In Page
  if (currentPage === 'signin') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="matrix-rain"></div>
        <div className="absolute inset-0 circuit-pattern opacity-20"></div>
        
        <div className="max-w-md w-full mx-4">
          <div className="cyber-glass-strong rounded-3xl p-8 border border-neon-blue/20 glow-neon">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mx-auto mb-4 glow-neon animate-float">
                <Brain className="w-8 h-8 text-white font-bold" />
              </div>
              <h2 className="text-2xl font-bold text-white font-cyber">Welcome Back</h2>
              <p className="text-gray-300 mt-2 font-sans text-base">Sign in to your AlgoSynth account</p>
            </div>

            <form className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-neon-blue"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleAuth('', '');
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 glow-neon hover:scale-105 font-sans text-base"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400 font-sans">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialAuth('github')}
                  className="flex items-center justify-center px-4 py-2 cyber-glass border border-neon-blue/20 rounded-lg hover:bg-neon-blue/10 transition-all duration-300 font-sans text-sm"
                >
                  <Github className="w-5 h-5 text-neon-blue mr-2" />
                  <span className="text-white">GitHub</span>
                </button>
                <button
                  onClick={() => handleSocialAuth('google')}
                  className="flex items-center justify-center px-4 py-2 cyber-glass border border-neon-blue/20 rounded-lg hover:bg-neon-purple/10 transition-all duration-300 font-sans text-sm"
                >
                  <Mail className="w-5 h-5 text-neon-purple mr-2" />
                  <span className="text-white">Google</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 font-sans text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="text-neon-blue hover:text-neon-purple font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setCurrentPage('landing')}
                className="text-gray-500 hover:text-neon-blue transition-colors font-sans text-sm"
              >
                ← Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sign Up Page
  if (currentPage === 'signup') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-8">
        <div className="matrix-rain"></div>
        <div className="absolute inset-0 circuit-pattern opacity-20"></div>
        
        <div className="max-w-2xl w-full mx-4">
          <div className="cyber-glass-strong rounded-3xl p-8 border border-neon-blue/20 glow-neon">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mx-auto mb-4 glow-neon animate-float">
                <Brain className="w-8 h-8 text-white font-bold" />
              </div>
              <h2 className="text-2xl font-bold text-white font-cyber">Join AlgoSynth</h2>
              <p className="text-gray-300 mt-2 font-sans text-base">Create your account and start learning</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  className="px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                  className="px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Age"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile({...userProfile, age: e.target.value})}
                  className="px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                  className="px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="LeetCode ID"
                  value={userProfile.leetcodeId}
                  onChange={(e) => setUserProfile({...userProfile, leetcodeId: e.target.value})}
                  className="px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                />
                <input
                  type="text"
                  placeholder="Codeforces ID"
                  value={userProfile.codeforcesId}
                  onChange={(e) => setUserProfile({...userProfile, codeforcesId: e.target.value})}
                  className="px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                />
                <input
                  type="text"
                  placeholder="GitHub ID"
                  value={userProfile.githubId}
                  onChange={(e) => setUserProfile({...userProfile, githubId: e.target.value})}
                  className="px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neon-blue mb-3 font-sans">
                  Select Your Interests
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {interests.map((interest) => (
                    <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userProfile.interests.includes(interest)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserProfile({
                              ...userProfile,
                              interests: [...userProfile.interests, interest]
                            });
                          } else {
                            setUserProfile({
                              ...userProfile,
                              interests: userProfile.interests.filter(i => i !== interest)
                            });
                          }
                        }}
                        className="rounded border-neon-blue/20 text-neon-purple focus:ring-neon-purple"
                      />
                      <span className="text-sm text-gray-300 font-sans">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 cyber-glass border border-neon-blue/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 font-sans text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-neon-blue"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleAuth('', '');
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 glow-neon hover:scale-105 font-sans text-base"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400 font-sans">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialAuth('github')}
                  className="flex items-center justify-center px-4 py-2 cyber-glass border border-neon-blue/20 rounded-lg hover:bg-neon-blue/10 transition-all duration-300 font-sans text-sm"
                >
                  <Github className="w-5 h-5 text-neon-blue mr-2" />
                  <span className="text-white">GitHub</span>
                </button>
                <button
                  onClick={() => handleSocialAuth('google')}
                  className="flex items-center justify-center px-4 py-2 cyber-glass border border-neon-blue/20 rounded-lg hover:bg-neon-purple/10 transition-all duration-300 font-sans text-sm"
                >
                  <Mail className="w-5 h-5 text-neon-purple mr-2" />
                  <span className="text-white">Google</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 font-sans text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentPage('signin')}
                  className="text-neon-blue hover:text-neon-purple font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setCurrentPage('landing')}
                className="text-gray-500 hover:text-neon-blue transition-colors font-sans text-sm"
              >
                ← Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile Page
  if (currentPage === 'profile') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="matrix-rain"></div>
        <div className="absolute inset-0 circuit-pattern opacity-20"></div>
        
        <header className="cyber-glass-strong sticky top-0 z-50 border-b border-neon-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="flex items-center space-x-2 text-neon-blue hover:text-neon-purple transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-sans text-base">Back to Dashboard</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center glow-neon">
                  <Brain className="w-5 h-5 text-white font-bold" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent font-cyber">
                  AlgoSynth
                </h1>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-sans text-base">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="cyber-glass-strong rounded-3xl p-8 border border-neon-blue/20">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center glow-neon">
                <User className="w-8 h-8 text-white font-bold" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-cyber">User Profile</h2>
                <p className="text-gray-300 font-sans text-base">Manage your account information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neon-blue mb-4 font-cyber">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 font-sans">Name</label>
                      <p className="text-white font-sans text-base">{userProfile.name || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 font-sans">Email</label>
                      <p className="text-white font-sans text-base">{userProfile.email || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 font-sans">Age</label>
                      <p className="text-white font-sans text-base">{userProfile.age || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 font-sans">Phone</label>
                      <p className="text-white font-sans text-base">{userProfile.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neon-purple mb-4 font-cyber">Coding Profiles</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 font-sans">LeetCode ID</label>
                      <p className="text-white font-sans text-base">{userProfile.leetcodeId || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 font-sans">Codeforces ID</label>
                      <p className="text-white font-sans text-base">{userProfile.codeforcesId || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 font-sans">GitHub ID</label>
                      <p className="text-white font-sans text-base">{userProfile.githubId || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neon-blue mb-4 font-cyber">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.interests.length > 0 ? (
                      userProfile.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 cyber-glass border border-neon-blue/20 rounded-full text-sm text-neon-purple font-sans"
                        >
                          {interest}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400 font-sans text-base">No interests selected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 glow-neon hover:scale-105 font-sans text-base"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard (Main App)
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix Background */}
      <div className="matrix-rain"></div>
      <div className="absolute inset-0 circuit-pattern opacity-20"></div>
      
      {/* Enhanced Circuit Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-blue to-transparent opacity-30 animate-circuit-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-neon-purple to-transparent opacity-30 animate-circuit-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-30 animate-circuit-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-30 animate-circuit-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-neon-blue/3 to-neon-purple/3 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Header */}
      <header className="cyber-glass-strong sticky top-0 z-50 border-b border-neon-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 animate-slide-in">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center glow-neon animate-float">
                <Brain className="w-6 h-6 text-white font-bold" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent text-shadow-neon font-cyber animate-hologram">
                AlgoSynth
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('profile')}
                className="flex items-center space-x-2 text-neon-blue hover:text-neon-purple transition-all duration-300"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline font-sans text-base">Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline font-sans text-base">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Chat Interface */}
            <div className="xl:col-span-2 animate-slide-in">
              <div className="cyber-glass-strong rounded-3xl shadow-2xl overflow-hidden border border-neon-blue/20 glow-neon">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-4">
                  <h3 className="text-xl font-semibold text-white flex items-center font-cyber">
                    <MessageCircle className="w-6 h-6 mr-3 animate-pulse" />
                    DSA Neural Network
                  </h3>
                  <p className="text-white/80 mt-1 font-sans text-base">Upload your code and ask me anything about your implementation</p>
                </div>

                <div className="flex flex-col lg:flex-row h-[600px]">
                  {/* Chat Messages */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                              message.isUser
                                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-br-sm glow-neon font-sans'
                                : 'cyber-glass text-gray-100 rounded-bl-sm border border-neon-blue/20 font-sans'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <p className={`text-xs mt-2 ${message.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 cyber-glass border-t border-neon-blue/20">
                      <div className="flex space-x-3">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask me about your uploaded code..."
                            className="w-full px-4 py-3 cyber-glass border border-neon-blue/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 font-sans text-base"
                          />
                        </div>
                        <button
                          onClick={handleSendMessage}
                          disabled={!inputText.trim()}
                          className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 glow-neon hover:scale-105 font-sans"
                        >
                          <Send className="w-4 h-4" />
                          <span className="hidden sm:inline">Send</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* File Upload Panel */}
                  <div className="lg:w-80 border-l border-neon-blue/20 cyber-glass">
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center font-cyber">
                        <Upload className="w-5 h-5 mr-2 animate-bounce-slow" />
                        Upload Your Code
                      </h4>

                      {/* Drag & Drop Area */}
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                          isDragOver
                            ? 'border-neon-purple bg-neon-purple/10 glow-neon'
                            : 'border-neon-blue/20 hover:border-neon-blue hover:bg-neon-blue/5'
                        }`}
                      >
                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3 animate-float" />
                        <p className="text-sm text-gray-400 mb-2 font-sans">
                          Drag & drop your code files here, or{' '}
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-neon-blue hover:text-neon-purple font-medium transition-all duration-300 hover:scale-105"
                          >
                            browse
                          </button>
                        </p>
                        <p className="text-xs text-gray-600 font-sans">Supports .py, .js, .cpp, .java and more</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          className="hidden"
                          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                          accept=".py,.js,.cpp,.java,.c,.txt,.md"
                        />
                      </div>

                      {/* Uploaded Files */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-6">
                          <h5 className="text-sm font-medium text-gray-400 mb-3 font-sans">Your Code Files</h5>
                          <div className="space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <div key={file.id} className="cyber-glass rounded-lg p-3 border border-neon-blue/20 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-3">
                                    <FileText className="w-4 h-4 text-neon-blue" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-300 truncate max-w-[120px] font-sans">
                                        {file.name}
                                      </p>
                                      <p className="text-xs text-gray-600 font-sans">{formatFileSize(file.size)}</p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => removeFile(file.id)}
                                    className="text-gray-500 hover:text-red-400 transition-colors hover:scale-110"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => generateVideoFromUserCode(file)}
                                  className="w-full px-3 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 text-sm flex items-center justify-center space-x-2 glow-neon hover:scale-105 font-sans"
                                >
                                  <Sparkles className="w-4 h-4 animate-pulse" />
                                  <span>Generate Video</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Video Explanation Panel */}
            <div className="xl:col-span-1 animate-slide-in" style={{ animationDelay: '0.3s' }}>
              <div className="cyber-glass-strong rounded-3xl shadow-2xl overflow-hidden border border-neon-blue/20 h-full glow-neon">
                {/* Video Header */}
                <div className="bg-gradient-to-r from-neon-purple to-neon-blue px-6 py-4">
                  <h3 className="text-xl font-semibold text-white flex items-center font-cyber">
                    <Monitor className="w-6 h-6 mr-3 animate-pulse" />
                    AI Quantum Visualization
                  </h3>
                  <p className="text-white/80 mt-1 font-sans text-base">Your code brought to life</p>
                </div>

                <div className="p-6">
                  {/* Generate Video Button */}
                  {videoSteps.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mx-auto mb-4 glow-neon animate-float">
                        <Sparkles className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2 font-cyber">Upload Code First</h4>
                      <p className="text-gray-400 mb-6 text-sm font-sans">
                        Upload your DSA code files to generate personalized step-by-step quantum video explanations
                      </p>
                      <div className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg text-white text-sm glow-neon animate-pulse font-sans font-bold">
                        Waiting for your code...
                      </div>
                    </div>
                  )}

                  {/* Video Player */}
                  {videoSteps.length > 0 && (
                    <div className="space-y-4">
                      {/* File Info */}
                      {selectedFile && (
                        <div className="cyber-glass rounded-lg p-3 mb-4 border border-neon-blue/20 animate-scale-in">
                          <p className="text-sm font-medium text-white font-sans">Analyzing: {selectedFile.name}</p>
                          <p className="text-xs text-gray-500 font-sans">Your uploaded code</p>
                        </div>
                      )}

                      {/* Video Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={isVideoPlaying ? pauseVideo : playVideo}
                            className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center text-white hover:opacity-90 transition-all duration-300 glow-neon hover:scale-110"
                          >
                            {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={resetVideo}
                            className="w-10 h-10 cyber-glass rounded-lg flex items-center justify-center text-gray-400 hover:bg-neon-blue/10 transition-all duration-300 border border-neon-blue/20 hover:scale-110"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-sm text-neon-blue font-sans">
                          Step {currentStep + 1} of {videoSteps.length}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full transition-all duration-1000 glow-neon"
                          style={{ width: `${((currentStep + 1) / videoSteps.length) * 100}%` }}
                        ></div>
                      </div>

                      {/* Current Step */}
                      {videoSteps[currentStep] && (
                        <div className="space-y-4 animate-scale-in">
                          <div>
                            <h4 className="text-lg font-semibold text-neon-blue mb-2 font-cyber">
                              {videoSteps[currentStep].title}
                            </h4>
                            <p className="text-gray-400 text-sm font-sans">
                              {videoSteps[currentStep].explanation}
                            </p>
                          </div>

                          {/* Code Display */}
                          <div className="cyber-glass rounded-xl p-4 border border-neon-blue/20 max-h-80 overflow-y-auto">
                            <pre className="text-sm text-gray-400 font-mono">
                              <code>
                                {videoSteps[currentStep].code.split('\n').map((line, index) => (
                                  <div
                                    key={index}
                                    className={`transition-all duration-500 hover:scale-105 ${
                                      videoSteps[currentStep].highlight.includes(index + 1)
                                        ? 'bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-l-2 border-neon-purple pl-2 text-white font-medium glow-neon'
                                        : 'text-gray-500'
                                    } py-1 rounded`}
                                  >
                                    <span className="text-gray-600 mr-4 select-none">
                                      {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {line}
                                  </div>
                                ))}
                              </code>
                            </pre>
                          </div>

                          {/* Step Navigation */}
                          <div className="flex justify-between">
                            <button
                              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                              disabled={currentStep === 0}
                              className="px-4 py-2 cyber-glass text-gray-400 rounded-lg hover:bg-neon-blue/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-neon-blue/20 hover:scale-105 font-sans"
                            >
                              Previous
                            </button>
                            <button
                              onClick={() => setCurrentStep(Math.min(videoSteps.length - 1, currentStep + 1))}
                              disabled={currentStep === videoSteps.length - 1}
                              className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-neon hover:scale-105 font-sans"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="cyber-glass-strong border-t border-neon-blue/20 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4 animate-slide-up">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center glow-neon animate-float">
                <Brain className="w-5 h-5 text-white font-bold" />
              </div>
              <h4 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent font-cyber">
                AlgoSynth
              </h4>
            </div>
            <p className="text-cyan-300 mb-6 font-sans text-base">
              Bringing your code to life with AI-powered quantum visualizations and dynamic experiences.
            </p>

            <p className="text-cyan-300 mb-6 font-sans text-lg font-semibold">Made With ❤️ By Ayan</p>
            <div className="flex justify-center space-x-6">
              <button 
                onClick={() => setCurrentPage('about')}
                className="text-gray-400 hover:text-neon-blue transition-all duration-300 hover:scale-105 font-sans text-base"
              >
                About
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="text-gray-400 hover:text-neon-purple transition-all duration-300 hover:scale-105 font-sans text-base"
              >
                Contact
              </button>
              <button 
                onClick={() => setCurrentPage('support')}
                className="text-gray-400 hover:text-neon-blue transition-all duration-300 hover:scale-105 font-sans text-base"
              >
                Support
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-8 font-sans">
              © 2025 AlgoSynth. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;