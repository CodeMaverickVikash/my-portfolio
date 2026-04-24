import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiBookOpen, HiCode, HiLightningBolt, HiExternalLink, HiCheckCircle, HiChevronLeft, HiChevronRight, HiArrowLeft } from 'react-icons/hi';
import { FaReact, FaAngular, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaCode } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb, SiExpress, SiTailwindcss, SiBootstrap, SiRedux, SiMysql, SiPostgresql, SiPostman, SiNpm, SiWebpack, SiGit } from 'react-icons/si';
import { IconType } from 'react-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { ROUTES } from '../constants';
import { getDifficultyColor } from '../utils/utils';
import { api } from '../config/api';

interface Topic {
  id: number;
  title: string;
  description: string;
  content?: string;
  subtopics: string[];
  isIntro?: boolean;
}

interface Resource {
  title: string;
  url: string;
  type: 'Official' | 'Tutorial' | 'Documentation' | 'Video' | 'Article';
}

interface TechData {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  description: string;
  category: string;
  year: string;
  paradigm: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: Topic[];
  resources: Resource[];
  features: string[];
  useCases: string[];
  isActive: boolean;
}

// Icon mapping
const iconMap: Record<string, IconType> = {
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
  FaGitAlt,
  FaDocker,
  SiPostman,
  SiNpm,
  SiWebpack,
  FaCode,
};

const TechDetail = () => {
  const { techId } = useParams<{ techId: string }>();
  const [selectedTopicId, setSelectedTopicId] = useState<number>(0);
  const [techData, setTechData] = useState<TechData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Fetch technology data from API
  useEffect(() => {
    const fetchTechData = async () => {
      if (!techId) {
        setError('No technology ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch all tech stack data
        const response = await api.techStack.getAll({ isActive: true });

        if (response.success && response.data) {
          // Find the technology by matching the name (converted to URL-friendly format)
          const tech = response.data.find((item: TechData) =>
            item.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '') === techId.toLowerCase()
          );

          if (tech) {
            setTechData(tech);
          } else {
            setError('Technology not found');
          }
        } else {
          setError('Failed to load technology data');
        }
      } catch (err) {
        console.error('Error fetching tech data:', err);
        setError('Failed to load technology data');
      } finally {
        setLoading(false);
      }
    };

    fetchTechData();
  }, [techId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading technology details...</p>
        </div>
      </div>
    );
  }

  // Error or Not Found state
  if (error || !techData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <HiCode className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Technology Not Found'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The technology you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Link
            to={ROUTES.TECH_STACK}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            <HiArrowLeft className="text-lg" />
            Back to Tech Stack
          </Link>
        </div>
      </div>
    );
  }

  // Get icon component from icon map
  const Icon = iconMap[techData.icon] || FaCode;

  const getResourceTypeColor = (type: string) => {
    switch (type) {
      case 'Official': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Tutorial': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Documentation': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Video': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Article': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // Get selected topic
  const selectedTopic = techData.topics.find(t => t.id === selectedTopicId) || techData.topics[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Main Content */}
      <div className="px-4 md:px-6 lg:px-8 py-8 max-w-[1600px] mx-auto">
        <div className="w-full">
          {/* Horizontal Topics Navigation with Slider - Always at Top */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-6 sticky top-4 z-40">
            <div className="relative">
              {/* Left Scroll Button */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 transition-all ml-2"
                aria-label="Scroll left"
              >
                <HiChevronLeft className="text-xl text-gray-700 dark:text-gray-300" />
              </button>

              {/* Topics Container */}
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide scroll-smooth p-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex gap-2 min-w-max px-10">
                  {techData.topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopicId(topic.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                        selectedTopicId === topic.id
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      {topic.isIntro ? (
                        <HiBookOpen className="text-lg" />
                      ) : (
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                          selectedTopicId === topic.id
                            ? 'bg-white/20 text-white'
                            : 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white'
                        }`}>
                          {topic.id}
                        </div>
                      )}
                      <span className="font-medium text-sm">{topic.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Scroll Button */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 transition-all mr-2"
                aria-label="Scroll right"
              >
                <HiChevronRight className="text-xl text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Content Area - Full Width */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            {selectedTopic?.isIntro ? (
              /* Introduction Tab - Full Page Layout */
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${techData.gradient} shadow-lg`}>
                    <Icon className="text-5xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{techData.name}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{techData.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm font-medium">
                        {techData.category}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm font-medium">
                        Since {techData.year}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(techData.difficulty)}`}>
                        {techData.difficulty}
                      </span>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full text-sm font-medium">
                        {techData.paradigm}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Two Column Layout for Features and Use Cases */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Key Features */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-purple-100 dark:border-purple-800">
                    <div className="flex items-center gap-2 mb-4">
                      <HiLightningBolt className="text-2xl text-purple-600 dark:text-purple-400" />
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Key Features</h2>
                    </div>
                    <ul className="space-y-2">
                      {techData.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <HiCheckCircle className="text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use Cases */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-4">
                      <HiCode className="text-2xl text-blue-600 dark:text-blue-400" />
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Use Cases</h2>
                    </div>
                    <ul className="space-y-2">
                      {techData.useCases.map((useCase, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <HiCheckCircle className="text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Learning Resources */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-100 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-4">
                    <HiBookOpen className="text-2xl text-green-600 dark:text-green-400" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Resources</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {techData.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 group"
                      >
                        <div className="flex items-center gap-3">
                          <HiExternalLink className="text-gray-400 dark:text-gray-500 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                          <span className="font-medium text-gray-900 dark:text-white">{resource.title}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getResourceTypeColor(resource.type)}`}>
                          {resource.type}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Topic Detail View */
              <div className="space-y-6">
                {/* Topic Header */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedTopic?.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{selectedTopic?.description}</p>
                </div>

                {/* Markdown Content */}
                {selectedTopic?.content && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-6 first:mt-0" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-5 first:mt-0" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 mt-4 first:mt-0" {...props} />,
                        h4: ({node, ...props}) => <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 mt-3 first:mt-0" {...props} />,
                        h5: ({node, ...props}) => <h5 className="text-base font-bold text-gray-900 dark:text-white mb-2 mt-3 first:mt-0" {...props} />,
                        h6: ({node, ...props}) => <h6 className="text-sm font-bold text-gray-900 dark:text-white mb-2 mt-2 first:mt-0" {...props} />,
                        p: ({node, ...props}) => <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" {...props} />,
                        a: ({node, ...props}) => <a className="text-purple-600 dark:text-purple-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                        code: ({node, inline, ...props}: any) =>
                          inline ? (
                            <code className="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                          ) : (
                            <code className="block bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4" {...props} />
                          ),
                        pre: ({node, ...props}) => <pre className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden my-4" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2" {...props} />,
                        li: ({node, ...props}) => <li className="text-gray-700 dark:text-gray-300 ml-4" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300" {...props} />,
                        table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} /></div>,
                        th: ({node, ...props}) => <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left text-gray-900 dark:text-white font-semibold" {...props} />,
                        td: ({node, ...props}) => <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300" {...props} />,
                        img: ({node, ...props}) => <img className="rounded-lg shadow-md my-4 max-w-full h-auto" {...props} />,
                        hr: ({node, ...props}) => <hr className="my-6 border-gray-300 dark:border-gray-600" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
                        em: ({node, ...props}) => <em className="italic text-gray-700 dark:text-gray-300" {...props} />,
                      }}
                    >
                      {selectedTopic.content}
                    </ReactMarkdown>
                  </div>
                )}

                {/* Subtopics */}
                {selectedTopic && selectedTopic.subtopics.length > 0 && (
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-purple-100 dark:border-purple-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Topics to Master</h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {selectedTopic.subtopics.map((subtopic, index) => (
                        <div key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <HiCheckCircle className="text-purple-500 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                          <span>{subtopic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechDetail;
