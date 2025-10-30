"use client"

import { useEffect, useState } from "react"
import { Download, Mail, Github, ExternalLink, Linkedin, Menu, X } from "lucide-react"

export default function Page() {
  const [activeSection, setActiveSection] = useState(0)
  const [activeFilter, setActiveFilter] = useState("All Projects")
  const [isAutoExpanded, setIsAutoExpanded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [sectionVisibility, setSectionVisibility] = useState<{ [key: string]: boolean }>({
    intro: true,
    experience: false,
    projects: false,
    contact: false,
  })

  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Let's Connect" },
  ]

  const projectFilters = ["All Projects", "Full Stack", "Frontend", "Backend", "Mobile", "Data Science", "AI/ML"]

  const projects = [
    {
      title: "Foreclosure Finder",
      description: "Collaborative task management tool with real-time updates and team features",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-30%20at%202.08.38%E2%80%AFPM-pSKasbDDkkaACKWPATQDBkbaCeQUOw.png",
      technologies: ["Next.js", "Flask", "Supabase", "Docker", "AWS"],
      category: "Full Stack",
      codeUrl: "#",
      demoUrl: "#",
    },
    {
      title: "PyTorrent",
      description: "An Open Sourse Python Cli and Python Bit Torrent Client",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-30%20at%202.08.38%E2%80%AFPM-pSKasbDDkkaACKWPATQDBkbaCeQUOw.png",
      technologies: ["Python", "TKinter", "Docker", "Linux"],
      category: "Backend",
      codeUrl: "#",
      demoUrl: "#",
    },
  ]

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setSectionVisibility((prev) => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting,
        }))
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Expand navbar when active section changes
    setIsAutoExpanded(true)

    // Collapse after 2.5 seconds
    const timer = setTimeout(() => {
      setIsAutoExpanded(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [activeSection])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const filteredProjects =
    activeFilter === "All Projects" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Darkened animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-950 animate-gradient-shift -z-10" />

      {/* Reduced opacity of floating orbs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/25 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400/30 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-float-slow-reverse" />
        <div className="absolute top-2/3 right-1/3 w-48 h-48 bg-blue-300/35 rounded-full blur-xl animate-float-fast" />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-purple-500/25 rounded-full blur-2xl animate-float-medium-reverse" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/15 rounded-full blur-xl animate-float-fast-reverse" />
        <div className="absolute top-3/4 left-1/4 w-40 h-40 bg-blue-200/20 rounded-full blur-xl animate-float-slow" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="backdrop-blur-2xl bg-white/10 border-b border-white/20 shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-bold text-white font-display">EV</h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="border-t border-white/20 bg-white/5 backdrop-blur-xl">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-6 py-4 text-white transition-colors border-b border-white/10 last:border-b-0 ${
                    activeSection === index ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 group hidden md:block">
        <div
          className={`backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.3),0_0_40px_rgba(147,51,234,0.3)] py-4 px-3 ${
            isAutoExpanded ? "w-44" : "w-12 group-hover:w-44"
          }`}
        >
          <div className="flex flex-col gap-4">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="relative flex items-center gap-3 w-full mx-2"
                aria-label={section.label}
              >
                {/* Vertical rectangle indicator - always visible */}
                <div
                  className={`rounded-full transition-all duration-300 flex-shrink-0 px-0 ${
                    activeSection === index
                      ? "bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)] w-1.5 h-10"
                      : "bg-white/40 hover:bg-white/60 hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] w-1.5 h-8"
                  }`}
                />
                <span
                  className={`text-sm text-white/90 transition-all duration-300 font-medium whitespace-nowrap -translate-x-2 ${
                    isAutoExpanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                >
                  {section.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section
        id="intro"
        className={`min-h-screen flex items-center justify-center px-4 py-20 md:py-20 pt-24 transition-opacity duration-700 ${
          sectionVisibility.intro ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 md:p-16 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2),0_0_60px_rgba(147,51,234,0.3)] transition-all duration-500">
            <div className="text-center space-y-6 md:space-y-8 animate-fade-in">
              <div className="flex justify-center">
                <img
                  src="images/linked-in-profile.jpeg"
                  alt="Evelio Velez"
                  className="rounded-full object-cover border-4 border-white/30 shadow-2xl h-32 w-32 sm:h-48 sm:w-48 md:h-60 md:w-60"
                />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white font-display font-sans">
                Evelio Velez
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light font-sans">
                CS Student | Backend Engineer
              </p>

              <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-sans">
                Passionate about building scalable systems and solving complex problems with clean, efficient code.
                Specialized in distributed systems, API design, and cloud architecture.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-4">
                <button className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/30 transition-all duration-300 backdrop-blur-sm font-medium hover:shadow-[0_0_20px_rgba(255,255,255,0.4),0_0_30px_rgba(147,51,234,0.3)] hover:scale-105 text-sm sm:text-base">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download My Resume
                </button>
                <button className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/30 transition-all duration-300 backdrop-blur-sm font-medium hover:shadow-[0_0_20px_rgba(255,255,255,0.4),0_0_30px_rgba(147,51,234,0.3)] hover:scale-105 text-sm sm:text-base">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className={`min-h-screen flex items-center justify-center px-4 py-20 transition-opacity duration-700 ${
          sectionVisibility.experience ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto w-full">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 md:p-16 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2),0_0_60px_rgba(147,51,234,0.3)] transition-all duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 md:mb-20 gap-2">
              <h2 className="font-bold text-white font-display font-mono text-3xl sm:text-4xl md:text-5xl">
                Experience
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/50 font-mono font-sans">2021 — 2025</p>
            </div>

            {/* Experience Timeline */}
            <div className="space-y-12 md:space-y-16 border-0">
              {/* Experience 1 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-2">
                  <p className="text-white/50 text-2xl sm:text-2xl md:text-3xl font-medium font-mono">2025</p>
                </div>
                <div className="md:col-span-7 space-y-2 md:space-y-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white font-display font-mono">
                    Contract Software Engineer
                  </h3>
                  <p className="text-base sm:text-lg text-white/60 font-sans">Peak Real Estate</p>
                  <p className="text-sm sm:text-base text-white/50 leading-relaxed pt-2 font-sans">
                    Built performant interfaces for project management and team collaboration.
                  </p>
                </div>
                <div className="md:col-span-3 flex flex-wrap gap-2 items-start justify-start md:justify-end content-start">
                  <span className="px-3 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white/70 text-xs sm:text-sm font-medium font-sans hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                    Next.JS
                  </span>
                  <span className="px-3 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white/70 text-xs sm:text-sm font-medium font-sans hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                    Supabase
                  </span>
                  <span className="px-3 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white/70 text-xs sm:text-sm font-medium font-sans hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                    Python
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10"></div>

              {/* Experience 2 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-2">
                  <p className="text-white/50 text-2xl sm:text-2xl md:text-3xl font-medium font-mono">2025</p>
                </div>
                <div className="md:col-span-7 space-y-2 md:space-y-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white font-display font-mono">
                    Software Engineer Program Intern
                  </h3>
                  <p className="text-base sm:text-lg text-white/60 font-sans">JPMorgan Chase</p>
                  <p className="text-sm sm:text-base text-white/50 leading-relaxed pt-2 font-sans">
                    Leading frontend architecture for developer tools and AI-powered features.
                  </p>
                </div>
                <div className="md:col-span-3 flex flex-wrap gap-2 items-start justify-start md:justify-end content-start">
                  <span className="px-3 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white/70 text-xs sm:text-sm font-medium font-sans hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                    AWS
                  </span>
                  <span className="px-3 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white/70 text-xs sm:text-sm font-medium font-sans hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                    Python
                  </span>
                  <span className="px-3 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white/70 text-xs sm:text-sm font-medium font-sans hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                    Apache Spark
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10"></div>

              {/* Experience 3 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-2">
                  <p className="text-white/50 text-2xl sm:text-2xl md:text-3xl font-medium font-mono">2024</p>
                </div>
                <div className="md:col-span-7 space-y-2 md:space-y-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white font-display">
                    AHL Fellowship Program - Software Engineering Track
                  </h3>
                  <p className="text-base sm:text-lg text-white/60 font-sans">JPMorgan Chase</p>
                  <p className="text-sm sm:text-base text-white/50 leading-relaxed pt-2 font-sans">
                    Built performant interfaces for project management and team collaboration.
                  </p>
                </div>
                <div className="md:col-span-3 flex flex-wrap gap-2 items-start justify-start md:justify-end content-start">
                  <span className="px-3 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white/70 text-xs sm:text-sm font-medium font-sans hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                    AWS
                  </span>
                  <span className="px-3 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white/70 text-xs sm:text-sm font-medium font-sans hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                    React
                  </span>
                  <span className="px-3 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white/70 text-xs sm:text-sm font-medium font-sans hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                    Java SpringBoot
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className={`min-h-screen flex items-center justify-center px-4 transition-opacity duration-700 py-20 ${
          sectionVisibility.projects ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto w-full">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 md:p-16 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2),0_0_60px_rgba(147,51,234,0.3)] transition-all duration-500">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-center mb-8 md:mb-12 font-display font-mono">
              Featured Projects
            </h2>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 font-mono backdrop-blur-xl border ${
                    activeFilter === filter
                      ? "bg-white text-purple-900 shadow-[0_0_20px_rgba(255,255,255,0.5)] border-white"
                      : "bg-white/10 text-white border-white/30 hover:border-white/60 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_25px_rgba(147,51,234,0.2)]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 group shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.3),0_0_50px_rgba(147,51,234,0.4)] hover:scale-[1.02]"
                >
                  {/* Project Image */}
                  <div className="aspect-video bg-white/5 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <p className="text-white/40 text-xs sm:text-sm font-medium">Project Screenshot</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white font-display font-mono">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/10 text-white/80 rounded-full text-xs sm:text-sm backdrop-blur-sm border border-white/20 font-medium font-sans"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
                      <a
                        href={project.codeUrl}
                        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-all duration-300 backdrop-blur-sm font-medium font-sans hover:shadow-[0_0_15px_rgba(255,255,255,0.4),0_0_25px_rgba(147,51,234,0.3)] hover:scale-105 text-xs sm:text-sm"
                      >
                        <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                        Code
                      </a>
                      <a
                        href={project.demoUrl}
                        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-all duration-300 backdrop-blur-sm font-medium font-sans hover:shadow-[0_0_15px_rgba(255,255,255,0.4),0_0_25px_rgba(147,51,234,0.3)] hover:scale-105 text-xs sm:text-sm"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className={`min-h-screen flex items-center justify-center px-4 py-20 transition-opacity duration-700 ${
          sectionVisibility.contact ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto w-full">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 md:p-16 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2),0_0_60px_rgba(147,51,234,0.3)] transition-all duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
              {/* Left Column - Main Content */}
              <div className="space-y-6 md:space-y-8">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white font-display font-mono">
                  Let's Connect
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-sans">
                  Always interested in new opportunities, collaborations, and conversations about design and build
                  soemthing great!
                </p>
                <a
                  href="mailto:egv2113@columbia.edu"
                  className="inline-flex items-center gap-2 md:gap-3 text-lg sm:text-xl md:text-2xl text-white hover:text-white/80 transition-colors group font-medium font-mono break-all"
                >
                  egv2113@columbia.edu
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              {/* Right Column - Social Links */}
              <div className="space-y-4 md:space-y-6">
                <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider font-medium font-sans">
                  Links to Socials
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {/* GitHub Card */}
                  <a
                    href="https://github.com/evelez0101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 sm:p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3),0_0_40px_rgba(147,51,234,0.3)] hover:scale-105"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      <h3 className="text-lg sm:text-xl font-semibold text-white font-display font-mono">GitHub</h3>
                    </div>
                    <p className="text-sm sm:text-base text-white/70 group-hover:text-white transition-colors font-medium font-mono">
                      @evelez0101
                    </p>
                  </a>

                  {/* LinkedIn Card */}
                  <a
                    href="https://linkedin.com/in/evelez0101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 sm:p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3),0_0_40px_rgba(147,51,234,0.3)] hover:scale-105"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      <h3 className="text-lg sm:text-xl font-semibold text-white font-display font-mono">LinkedIn</h3>
                    </div>
                    <p className="text-sm sm:text-base text-white/70 group-hover:text-white transition-colors font-medium font-mono">
                      @evelez0101
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}