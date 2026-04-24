import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowRight, HiSearch, HiBookOpen, HiCode, HiLightningBolt, HiDatabase, HiTemplate } from 'react-icons/hi';
import { FaReact, FaNodeJs, FaCode, FaAngular, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb, SiExpress, SiTailwindcss, SiBootstrap, SiRedux, SiMysql, SiPostgresql, SiGit, SiDocker, SiPostman } from 'react-icons/si';
import { Category } from '../types';
import { ROUTES } from '../constants';
import { api } from '../config/api';
import { getDifficultyColor } from '../utils/utils';

interface TechItem {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  year: string;
  paradigm: string;
  features: string[];
  useCases: string[];
  icon: string;
  gradient: string;
  isActive: boolean;
}

// Icon mapping
const iconMap: Record<string, any> = {
  SiJavascript,
  SiTypescript,
  FaReact,
  FaAngular,
  FaHtml5,
  FaCss3Alt,
  SiTailwindcss,
  SiBootstrap,
  SiRedux,
  FaNodeJs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiPostman,
};

const TechStack = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: Category[] = [
    { name: 'All', icon: HiBookOpen, color: 'purple' },
    { name: 'Frontend', icon: FaReact, color: 'blue' },
    { name: 'Backend', icon: FaNodeJs, color: 'green' },
    { name: 'Database', icon: HiDatabase, color: 'orange' },
    { name: 'Framework', icon: HiTemplate, color: 'indigo' },
    { name: 'Tools', icon: HiCode, color: 'pink' },
  ];

  // Fetch tech stack from API
  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        setLoading(true);
        const response = await api.techStack.getAll({ isActive: true });
        if (response.success) {
          setTechStack(response.data);
        }
      } catch (error) {
        console.error('Error fetching tech stack:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechStack();
  }, []);

  const filteredLanguages = techStack.filter(tech => {
    const matchesCategory = selectedCategory === 'All' || tech.category === selectedCategory;
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Full-Stack <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Tech Stack</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-3">
            Comprehensive documentation of my expertise in MEAN & MERN stack development, covering frontend, backend, databases, and essential development tools.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-semibold shadow-lg">
              MEAN Stack
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg">
              MERN Stack
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-sm font-semibold shadow-lg">
              Full-Stack Developer
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search technologies, frameworks, tools..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-6 py-4 pl-14 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none transition-all duration-200 shadow-lg"
            />
            <HiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <Icon className="text-lg" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading technologies...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Language Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => {
                  const Icon = iconMap[lang.icon] || FaCode;
                  const techId = lang.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
                  return (
                <article
                  key={lang.id}
                  onClick={() => navigate(ROUTES.TECH_DETAIL.replace(':techId', techId))}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group hover:scale-105 cursor-pointer"
                >
                  {/* Card Header with Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${lang.gradient}`}></div>

                  <div className="p-6">
                    {/* Language Icon & Name */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${lang.gradient} rounded-xl flex items-center justify-center`}>
                          <Icon className="text-white text-2xl" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {lang.name}
                          </h2>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Since {lang.year}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(lang.difficulty)}`}>
                        {lang.difficulty}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">
                      {lang.description}
                    </p>

                    {/* Paradigm & Category */}
                    <div className="flex gap-2 mb-4">
                      <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full font-medium">
                        {lang.paradigm}
                      </span>
                      <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
                        {lang.category}
                      </span>
                    </div>

                    {/* Key Features */}
                    <div className="mb-4">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <HiLightningBolt className="text-purple-600" />
                        Key Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {lang.features.slice(0, 4).map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <HiCode className="text-purple-600" />
                        Common Use Cases
                      </h3>
                      <ul className="space-y-1">
                        {lang.useCases.slice(0, 3).map((useCase, index) => (
                          <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learn More Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(ROUTES.TECH_DETAIL.replace(':techId', techId));
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 group-hover:shadow-lg"
                    >
                      View Documentation
                      <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20">
              <FaCode className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No technologies found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
              )}
            </div>

            {/* Results Count */}
            {filteredLanguages.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing <span className="font-bold text-purple-600 dark:text-purple-400">{filteredLanguages.length}</span> of{' '}
                  <span className="font-bold">{techStack.length}</span> technologies
                </p>
              </div>
            )}
          </>
        )}

        {/* Tech Stack Summary */}
        <div className="mt-16 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-purple-100 dark:border-gray-600">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            My Full-Stack Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🅜</span> MEAN Stack
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                MongoDB, Express.js, Angular, Node.js - Enterprise-grade full-stack development
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">MongoDB</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">Express.js</span>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-semibold">Angular</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">Node.js</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🅡</span> MERN Stack
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                MongoDB, Express.js, React, Node.js - Modern, scalable web applications
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">MongoDB</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">Express.js</span>
                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded-full text-xs font-semibold">React</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">Node.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
