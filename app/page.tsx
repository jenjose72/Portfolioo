"use client"

import Head from 'next/head';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Server,
  Smartphone,
  GraduationCap,
  MapPin,
  Calendar,
  Star,
  ArrowRight,
  Download,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import HideScrollbar from '@/components/HideScrollbar';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [displayedText, setDisplayedText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
   const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  const typewriterWords = ["Full Stack Developer", "Problem Solver", "Tech Enthusiast", "Code Artist"]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

   useEffect(() => {
  fetch("/api/notify-visit", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => console.log("📩 Visit notification sent:", data))
    .catch((err) => console.error("❌ Notification error:", err));
}, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const currentWord = typewriterWords[currentWordIndex]
    let currentIndex = 0
    let isDeleting = false

    const typeInterval = setInterval(
      () => {
        if (!isDeleting) {
          setDisplayedText(currentWord.substring(0, currentIndex + 1))
          currentIndex++

          if (currentIndex === currentWord.length) {
            setTimeout(() => {
              isDeleting = true
            }, 2000)
          }
        } else {
          setDisplayedText(currentWord.substring(0, currentIndex))
          currentIndex--

          if (currentIndex === 0) {
            isDeleting = false
            setCurrentWordIndex((prev) => (prev + 1) % typewriterWords.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearInterval(typeInterval)
  }, [currentWordIndex])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setFormSubmitting(true);
    setFormError("");
    
    try {
      // Replace these with your actual EmailJS keys
 
      
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );
      
      // Success
      setFormSuccess(true);
      if (formRef.current) formRef.current.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormSuccess(false), 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setFormError("Failed to send message. Please try again later.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const projects = [
      {
      title: "BMChats",
      description:
        "WebSocket-based chat application with real time Chatting service. Built with React.js and Socket.io.",
      image: "/web/Bmchats.png",
      tech: ["React.js", "Socket.io", "MongoDB", "JWT", "Express.js","Node.js","Tailwind CSS"],
      live: "https://bmchats.onrender.com/",
      github: "https://github.com/jenjose72/BMChats",
      category: "Web Development",
    },
    {
      title: "RescueBytes",
      description:
        "Full-stack disaster management solution with MERN. Features include user SOS Rescue, Inventory Management, Real time news updates/ warnings, and admin dashboard.",
      image: "/web/Rb.png",
      tech: ["React.js", "ReactNative", "MongoDB", "Express.js","Node.js","Tailwind CSS"],
      live: "https://rbbackend-hlah.onrender.com/",
      github: "https://github.com/jenjose72/RescueBytes",
      category: "Web Development / Mobile Development",
    },
    {
      title: "MovieVerse",
      description:
       "A cross-platform movie discovery app that combines user ratings with emotional intelligence. Users can rate movies and get mood-based recommendations. Feeling happy, sad, or nostalgic? MovieVerse has a pick for every vibe. Features swipeable Tinder-style movie cards and a mood-input system for personalized curation.",
      image: "/web/mv.png",
      tech: ["React Native", "React", "Django","PostgreSQL"],
      live: "https://movieverse-nine.vercel.app",
      github: "https://github.com/jefin10/MovieVerse",
      category: "Mobile Development",
    },
  ]

  return (
    <>
     <Head>
        <title>Jen Jose Jeeson | Portfolio</title>
        <meta name="description" content="Official portfolio of Jen Jose Jeeson – software developer showcasing projects, skills, and experience." />
        <meta name="keywords" content="Jen Jose Jeeson, software developer, portfolio, web developer" />
        <meta name="author" content="Jen Jose Jeeson" />
        <link rel="canonical" href="https://jenjosejeeson.vercel.app" />
        
        {/* Schema.org markup for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jen Jose Jeeson",
              "url": "https://jenjosejeeson.vercel.app",
              "jobTitle": "Software Developer",
              "sameAs": [
                "https://www.linkedin.com/in/jenjosejeeson/",
                "https://github.com/jenjose72"
              ]
            }),
          }}
        />
      </Head>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      {/* Custom CSS for animations */}
      <HideScrollbar />
      <style jsx>{`
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromBottom {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(56, 189, 248, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(56, 189, 248, 0.8), 0 0 30px rgba(56, 189, 248, 0.6);
          }
        }

        @keyframes letterFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slide-in-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInFromRight 0.8s ease-out forwards;
        }

        .animate-slide-in-bottom {
          animation: slideInFromBottom 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }

        .animate-text-glow {
          animation: textGlow 2s ease-in-out infinite;
        }

        .animate-letter-float {
          animation: letterFloat 2s ease-in-out infinite;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        .stagger-7 { animation-delay: 0.7s; }
        .stagger-8 { animation-delay: 0.8s; }

        .typewriter-cursor::after {
          content: '|';
          animation: blink 1s infinite;
        }
          

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-400/5 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent animate-slide-in-left">
              Jen Jose Jeeson
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "education", "contact"].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-sky-400 animate-fade-in-up stagger-${index + 1} ${
                    activeSection === item ? "text-sky-400 font-semibold" : "text-white/80"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden animate-slide-in-right" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2 animate-slide-in-bottom">
              {["home", "about", "skills", "projects", "education", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 capitalize transition-colors hover:text-sky-400"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 relative animate-bounce-in">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full animate-spin"
                  style={{ animationDuration: "3s" }}
                />
                <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center">
                  <Code className="w-12 h-12 text-sky-400" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600 bg-clip-text text-transparent animate-text-glow typewriter-cursor">
                {displayedText}
              </div>
            </div>

            <div className="animate-slide-in-bottom stagger-3">
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
                {"Computer Science Student at IIIT Kottayam | Building amazing web experiences with modern tech"
                  .split(" ")
                  .map((word, index) => (
                    <span key={index} className={`inline-block animate-fade-in-up stagger-${(index % 8) + 1} mr-2`}>
                      {word}
                    </span>
                  ))}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in-bottom stagger-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 animate-bounce-in stagger-5"
                onClick={() => scrollToSection("projects")}
              >
                <span className="animate-letter-float">View My Work</span> <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
                <a
                href="/files/resume.pdf"
                download="JenJose_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2 border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white rounded-md font-medium transform hover:scale-105 transition-all duration-300 animate-bounce-in stagger-6"
                >
                <span className="animate-letter-float">Download CV</span> <Download className="ml-2 w-4 h-4" />
                </a>
            </div>

            <div className="flex justify-center space-x-6 animate-slide-in-bottom stagger-7">
              <Link
                href="https://github.com/jenjose72/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-sky-400 transform hover:scale-110 transition-all duration-300 animate-bounce-in stagger-8"
              >
                <Github className="w-6 h-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/jenjosejeeson/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-sky-400 transform hover:scale-110 transition-all duration-300 animate-bounce-in stagger-7"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
              
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div
          className="absolute top-1/4 left-10 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        >
          <div className="w-4 h-4 bg-sky-400 rounded-full opacity-60" />
        </div>
        <div
          className="absolute top-1/3 right-10 animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "3s" }}
        >
          <div className="w-6 h-6 bg-blue-400 rounded-full opacity-40" />
        </div>
        <div
          className="absolute bottom-1/4 left-1/4 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3s" }}
        >
          <div className="w-3 h-3 bg-blue-400 rounded-full opacity-50" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-white/80 leading-relaxed">
                I'm a passionate full-stack developer and computer science student at IIIT Kottayam with 2 years of
                experience in building modern web applications. I love creating innovative solutions that solve
                real-world problems.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                My journey in programming started with curiosity and has evolved into a deep passion for creating
                seamless user experiences and robust backend systems. I'm always eager to learn new tech and
                take on challenging projects.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl font-bold text-sky-400">10+</div>
                  <div className="text-sm text-white/60">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl font-bold text-blue-400">2</div>
                  <div className="text-sm text-white/60">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl rotate-6 opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-400 rounded-2xl -rotate-6 opacity-20" />
                <Image
                  src="/web/Me.jpg"
                  alt="Profile"
                  width={320}
                  height={320}
                  className="relative z-10 rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Skills & tech
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <Card
                key={category.title}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <CardContent className="p-6 relative z-10">
                  <div className="text-center mb-6">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{category.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors duration-300">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill}
                        className="flex items-center justify-center p-2 bg-white/5 rounded-lg border border-white/10 hover:border-sky-400/50 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Skills Cloud */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-white mb-8">Also Experienced With</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                "JavaScript",
                "Python",
                "Java",
                "C++",
                "Linux",
                "Figma",
                "Photoshop",
                "Webpack",
                "Vite",
              ].map((tech) => (
                <Badge
                  key={tech}
                  className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-sky-300 border-sky-500/30 hover:from-sky-500/30 hover:to-blue-500/30 hover:scale-110 transition-all duration-300 px-4 py-2 text-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader>
                  <CardTitle className="text-white group-hover:text-sky-400 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-white/60">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-sky-500/20 text-sky-300 border-sky-500/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white/60 hover:text-sky-400 transition-colors duration-300"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </Link>
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white/60 hover:text-blue-400 transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-3 rounded-full">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Technology in Computer Science</h3>
                    <p className="text-sky-400 font-semibold mb-2">
                      Indian Institute of Information Technology, Kottayam
                    </p>
                    <div className="flex items-center space-x-4 text-white/60 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        2023 - 2027 (Currently Pursuing)
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Kottayam, Kerala
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed">
                      Currently pursuing my undergraduate degree with a focus on software engineering, algorithms, and
                      modern web tech. Actively involved in coding competitions and technical projects.
                    </p>
                    
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full" />
            <p className="text-xl text-white/80 mt-6 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Get In Touch</h3>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear
                  from you. Let's create something amazing together!
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Email</h4>
                      <p className="text-white/60">jenjose72@gmail.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-sky-500 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Github className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">GitHub</h4>
                      <a 
                        href="https://github.com/jenjose72" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-sky-400 transition-colors duration-300"
                      >
                        github.com/jenjose72
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-sky-500 to-blue-400 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">LinkedIn</h4>
                      <a 
                        href="https://linkedin.com/in/jenjosejeeson" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-sky-400 transition-colors duration-300"
                      >
                        linkedin.com/in/jenjosejeeson
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
             <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardContent className="p-8">
        {formSuccess ? (
          <div className="flex flex-col items-center justify-center h-full py-8">
            <div className="text-green-400 mb-4 p-3 bg-green-400/10 border border-green-400/20 rounded-full">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-white/70 text-center">
              Thank you for reaching out. I'll get back to you soon!
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="user_name" className="text-sm font-medium text-white/80">
                  Full Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="user_email" className="text-sm font-medium text-white/80">
                  Email Address
                </label>
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-white/80">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                placeholder="What's this about?"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-white/80">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Tell me about your project or just say hello!"
              />
            </div>

            {formError && (
              <div className="text-red-400 bg-red-400/10 border border-red-400/20 rounded-md p-3 text-sm">
                {formError}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={formSubmitting}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 text-white font-semibold py-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Mail className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/60">© 2024 Jen Jose Jeeson</p>
        </div>
      </footer>
    </div>
  </>
  )
}

const skillCategories = [
  {
    title: "Frontend",
    icon: <Code className="w-6 h-6" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native",],
    color: "from-sky-400 to-blue-500",
  },
  {
    title: "Backend",
    icon: <Server className="w-6 h-6" />,
    skills: ["Node.js", "Django", "Express.js", "REST APIs", "PHP", "Flask"],
    color: "from-blue-500 to-sky-600",
  },
  {
    title: "Database",
    icon: <Database className="w-6 h-6" />,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Appwrite", "Supabase", "Firebase"],
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Mobile & Tools",
    icon: <Smartphone className="w-6 h-6" />,
    skills: ["React Native", "Git", "Docker", "Postman", "Vercel", "Firebase"],
    color: "from-sky-600 to-blue-500",
  },
]