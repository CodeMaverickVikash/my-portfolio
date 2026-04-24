import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiArrowLeft, HiSave, HiPlus, HiX, HiTrash, HiEye, HiCode } from 'react-icons/hi';
import { FaReact, FaNodeJs, FaAngular, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb, SiExpress, SiTailwindcss, SiBootstrap, SiRedux, SiMysql, SiPostgresql, SiGit, SiDocker, SiPostman } from 'react-icons/si';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import AdminLayout from '../layouts/AdminLayout';
import { api } from '../../config/api';
import { ADMIN_ROUTES } from '../routes';

interface Topic {
  id: number;
  title: string;
  description: string;
  content: string;
  subtopics: string[];
  isIntro: boolean;
}

interface Resource {
  title: string;
  url: string;
  type: 'Official' | 'Tutorial' | 'Documentation' | 'Video' | 'Article';
}

interface TechFormData {
  id?: string;
  name: string;
  description: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Framework' | 'Tools';
  year: string;
  paradigm: string;
  features: string[];
  useCases: string[];
  icon: string;
  gradient: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: Topic[];
  resources: Resource[];
}

// Icon mapping
const iconMap: Record<string, any> = {
  SiJavascript, SiTypescript, FaReact, FaAngular, FaHtml5, FaCss3Alt,
  SiTailwindcss, SiBootstrap, SiRedux, FaNodeJs, SiExpress, SiMongodb,
  SiMysql, SiPostgresql, SiGit, SiDocker, SiPostman,
};

const availableIcons = [
  { name: 'SiJavascript', component: SiJavascript, label: 'JavaScript' },
  { name: 'SiTypescript', component: SiTypescript, label: 'TypeScript' },
  { name: 'FaReact', component: FaReact, label: 'React' },
  { name: 'FaAngular', component: FaAngular, label: 'Angular' },
  { name: 'FaHtml5', component: FaHtml5, label: 'HTML5' },
  { name: 'FaCss3Alt', component: FaCss3Alt, label: 'CSS3' },
  { name: 'SiTailwindcss', component: SiTailwindcss, label: 'Tailwind' },
  { name: 'SiBootstrap', component: SiBootstrap, label: 'Bootstrap' },
  { name: 'SiRedux', component: SiRedux, label: 'Redux' },
  { name: 'FaNodeJs', component: FaNodeJs, label: 'Node.js' },
  { name: 'SiExpress', component: SiExpress, label: 'Express' },
  { name: 'SiMongodb', component: SiMongodb, label: 'MongoDB' },
  { name: 'SiMysql', component: SiMysql, label: 'MySQL' },
  { name: 'SiPostgresql', component: SiPostgresql, label: 'PostgreSQL' },
  { name: 'SiGit', component: SiGit, label: 'Git' },
  { name: 'SiDocker', component: SiDocker, label: 'Docker' },
  { name: 'SiPostman', component: SiPostman, label: 'Postman' },
];

const availableGradients = [
  { value: 'from-blue-500 to-blue-700', label: 'Blue', preview: 'bg-gradient-to-r from-blue-500 to-blue-700' },
  { value: 'from-purple-500 to-purple-700', label: 'Purple', preview: 'bg-gradient-to-r from-purple-500 to-purple-700' },
  { value: 'from-green-500 to-green-700', label: 'Green', preview: 'bg-gradient-to-r from-green-500 to-green-700' },
  { value: 'from-red-500 to-red-700', label: 'Red', preview: 'bg-gradient-to-r from-red-500 to-red-700' },
  { value: 'from-yellow-500 to-yellow-700', label: 'Yellow', preview: 'bg-gradient-to-r from-yellow-500 to-yellow-700' },
  { value: 'from-pink-500 to-pink-700', label: 'Pink', preview: 'bg-gradient-to-r from-pink-500 to-pink-700' },
  { value: 'from-indigo-500 to-indigo-700', label: 'Indigo', preview: 'bg-gradient-to-r from-indigo-500 to-indigo-700' },
  { value: 'from-cyan-500 to-cyan-700', label: 'Cyan', preview: 'bg-gradient-to-r from-cyan-500 to-cyan-700' },
  { value: 'from-orange-500 to-orange-700', label: 'Orange', preview: 'bg-gradient-to-r from-orange-500 to-orange-700' },
  { value: 'from-teal-500 to-teal-700', label: 'Teal', preview: 'bg-gradient-to-r from-teal-500 to-teal-700' },
];

const AdminTechStackForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<TechFormData>({
    name: '',
    description: '',
    category: 'Frontend',
    year: new Date().getFullYear().toString(),
    paradigm: '',
    features: [''],
    useCases: [''],
    icon: 'SiJavascript',
    gradient: 'from-blue-500 to-blue-700',
    difficulty: 'Intermediate',
    topics: [],
    resources: [],
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'topics' | 'resources'>('basic');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch tech data if editing
  useEffect(() => {
    if (isEditMode && id) {
      fetchTechData(id);
    }
  }, [id, isEditMode]);

  const fetchTechData = async (techId: string) => {
    try {
      setLoading(true);
      const response = await api.techStack.getById(techId);
      if (response.success) {
        setFormData(response.data);
      } else {
        alert('Failed to load technology data');
        navigate(ADMIN_ROUTES.TECH_STACK);
      }
    } catch (error) {
      console.error('Error fetching tech data:', error);
      alert('Error loading technology data');
      navigate(ADMIN_ROUTES.TECH_STACK);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof TechFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleArrayChange = (field: 'features' | 'useCases', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const addArrayItem = (field: 'features' | 'useCases') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };

  const removeArrayItem = (field: 'features' | 'useCases', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray.length > 0 ? newArray : [''],
    });
  };

  // Topic handlers
  const addTopic = () => {
    const newId = formData.topics.length > 0 ? Math.max(...formData.topics.map(t => t.id)) + 1 : 1;
    setFormData({
      ...formData,
      topics: [...formData.topics, { id: newId, title: '', description: '', content: '', subtopics: [], isIntro: false }],
    });
  };

  const removeTopic = (index: number) => {
    setFormData({
      ...formData,
      topics: formData.topics.filter((_, i) => i !== index),
    });
  };

  const updateTopic = (index: number, field: keyof Topic, value: any) => {
    const newTopics = [...formData.topics];
    newTopics[index] = { ...newTopics[index], [field]: value };
    setFormData({ ...formData, topics: newTopics });
  };

  const addSubtopic = (topicIndex: number) => {
    const newTopics = [...formData.topics];
    newTopics[topicIndex].subtopics.push('');
    setFormData({ ...formData, topics: newTopics });
  };

  const removeSubtopic = (topicIndex: number, subtopicIndex: number) => {
    const newTopics = [...formData.topics];
    newTopics[topicIndex].subtopics = newTopics[topicIndex].subtopics.filter((_, i) => i !== subtopicIndex);
    setFormData({ ...formData, topics: newTopics });
  };

  const updateSubtopic = (topicIndex: number, subtopicIndex: number, value: string) => {
    const newTopics = [...formData.topics];
    newTopics[topicIndex].subtopics[subtopicIndex] = value;
    setFormData({ ...formData, topics: newTopics });
  };

  // Resource handlers
  const addResource = () => {
    setFormData({
      ...formData,
      resources: [...formData.resources, { title: '', url: '', type: 'Official' }],
    });
  };

  const removeResource = (index: number) => {
    setFormData({
      ...formData,
      resources: formData.resources.filter((_, i) => i !== index),
    });
  };

  const updateResource = (index: number, field: keyof Resource, value: any) => {
    const newResources = [...formData.resources];
    newResources[index] = { ...newResources[index], [field]: value };
    setFormData({ ...formData, resources: newResources });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty strings from arrays and clean topics/resources
    const cleanedData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      useCases: formData.useCases.filter(u => u.trim() !== ''),
      topics: formData.topics.map(topic => ({
        ...topic,
        subtopics: topic.subtopics.filter(s => s.trim() !== ''),
      })).filter(topic => topic.title.trim() !== ''),
      resources: formData.resources.filter(r => r.title.trim() !== '' && r.url.trim() !== ''),
    };

    setSaving(true);
    try {
      if (isEditMode) {
        const response = await api.techStack.update(id!, cleanedData);
        if (response.success) {
          alert('Technology updated successfully!');
          navigate(ADMIN_ROUTES.TECH_STACK);
        } else {
          alert(response.message || 'Failed to update technology');
        }
      } else {
        const response = await api.techStack.create(cleanedData);
        if (response.success) {
          alert('Technology added successfully!');
          navigate(ADMIN_ROUTES.TECH_STACK);
        } else {
          alert(response.message || 'Failed to add technology');
        }
      }
    } catch (error) {
      console.error('Error saving tech:', error);
      alert('Error saving technology');
    } finally {
      setSaving(false);
    }
  };

  const IconComponent = iconMap[formData.icon] || SiJavascript;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading technology data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(ADMIN_ROUTES.TECH_STACK)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <HiArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isEditMode ? 'Edit Technology' : 'Add New Technology'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {isEditMode ? 'Update technology information' : 'Add a new technology to your stack'}
              </p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiSave className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-4 px-6">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'basic'
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Basic Info
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('topics')}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'topics'
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Topics ({formData.topics.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'resources'
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Resources ({formData.resources.length})
              </button>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                {/* Name and Category */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Technology Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="e.g., React"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      required
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Database</option>
                      <option value="Framework">Framework</option>
                      <option value="Tools">Tools</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                    placeholder="Brief description of the technology..."
                    required
                  />
                </div>

                {/* Year, Paradigm, Difficulty */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Year *
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="e.g., 2013"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Paradigm *
                    </label>
                    <input
                      type="text"
                      value={formData.paradigm}
                      onChange={(e) => handleInputChange('paradigm', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="e.g., Component-Based"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty *
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => handleInputChange('difficulty', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      required
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Key Features *
                  </label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleArrayChange('features', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="e.g., Virtual DOM"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('features', index)}
                          className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                          <HiX className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('features')}
                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    + Add Feature
                  </button>
                </div>

                {/* Use Cases */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Use Cases *
                  </label>
                  {formData.useCases.map((useCase, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={useCase}
                        onChange={(e) => handleArrayChange('useCases', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="e.g., Single Page Applications"
                      />
                      {formData.useCases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('useCases', index)}
                          className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                          <HiX className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('useCases')}
                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    + Add Use Case
                  </button>
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Icon *
                  </label>
                  <div className="grid grid-cols-6 md:grid-cols-9 gap-3">
                    {availableIcons.map((icon) => {
                      const Icon = icon.component;
                      return (
                        <button
                          key={icon.name}
                          type="button"
                          onClick={() => handleInputChange('icon', icon.name)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.icon === icon.name
                              ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30'
                              : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                          }`}
                          title={icon.label}
                        >
                          <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300 mx-auto" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Gradient Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Gradient *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {availableGradients.map((gradient) => (
                      <button
                        key={gradient.value}
                        type="button"
                        onClick={() => handleInputChange('gradient', gradient.value)}
                        className={`relative h-12 rounded-lg border-2 transition-all ${
                          formData.gradient === gradient.value
                            ? 'border-purple-600 ring-2 ring-purple-300'
                            : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                        }`}
                        title={gradient.label}
                      >
                        <div className={`w-full h-full rounded-md ${gradient.preview}`}></div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Preview
                  </label>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${formData.gradient} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{formData.name || 'Technology Name'}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formData.category} • {formData.difficulty}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Topics Tab - Simplified */}
            {activeTab === 'topics' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Topics</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Create comprehensive learning content with rich text formatting
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addTopic}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <HiPlus className="w-5 h-5" />
                    Add Topic
                  </button>
                </div>

                {formData.topics.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <HiPlus className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <p className="text-gray-900 dark:text-white font-semibold">No topics yet</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Click "Add Topic" to create your first learning topic</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {formData.topics.map((topic, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {/* Topic Header */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold text-sm">
                                {topic.id}
                              </span>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                  {topic.title || `Topic #${topic.id}`}
                                </h3>
                                {topic.isIntro && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    Introduction
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeTopic(index)}
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                              title="Delete Topic"
                            >
                              <HiTrash className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Topic Content */}
                        <div className="p-6 space-y-6">
                          {/* Basic Info - Compact Grid */}
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                                Topic ID
                              </label>
                              <input
                                type="number"
                                value={topic.id}
                                onChange={(e) => updateTopic(index, 'id', parseInt(e.target.value))}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="1"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                                Topic Title
                              </label>
                              <input
                                type="text"
                                value={topic.title}
                                onChange={(e) => updateTopic(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="e.g., Core Concepts"
                              />
                            </div>
                          </div>

                          {/* Description */}
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                              Short Description
                            </label>
                            <input
                              type="text"
                              value={topic.description}
                              onChange={(e) => updateTopic(index, 'description', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                              placeholder="Brief one-line description..."
                            />
                          </div>

                          {/* Is Intro Checkbox */}
                          <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <input
                              type="checkbox"
                              id={`isIntro-${index}`}
                              checked={topic.isIntro}
                              onChange={(e) => updateTopic(index, 'isIntro', e.target.checked)}
                              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor={`isIntro-${index}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Mark as Introduction Topic (displays features, use cases, and resources)
                            </label>
                          </div>

                          {/* Markdown Editor with Live Preview */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                Topic Content (Markdown)
                              </label>
                              <a
                                href="https://www.markdownguide.org/cheat-sheet/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                              >
                                <HiCode className="w-3 h-3" />
                                Markdown Guide
                              </a>
                            </div>

                            {/* Markdown Syntax Helper */}
                            <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                              <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-2">Quick Markdown Syntax:</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-blue-800 dark:text-blue-400">
                                <code># Heading 1</code>
                                <code>## Heading 2</code>
                                <code>**bold**</code>
                                <code>*italic*</code>
                                <code>`code`</code>
                                <code>[link](url)</code>
                                <code>- list item</code>
                                <code>```code block```</code>
                              </div>
                            </div>

                            {/* Markdown Editor */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
                              <textarea
                                value={topic.content || ''}
                                onChange={(e) => updateTopic(index, 'content', e.target.value)}
                                className="w-full h-[400px] px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="# Write your content in Markdown

## Example Section

You can use **bold**, *italic*, and `code` formatting.

### Lists
- Item 1
- Item 2
- Item 3

### Code Blocks
```javascript
const example = 'Hello World';
console.log(example);
```

### Links
[Visit React Docs](https://react.dev)

### Images
![Alt text](image-url.jpg)
"
                              />
                            </div>
                          </div>

                          {/* Live Markdown Preview */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                Live Preview
                              </label>
                              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <HiEye className="w-3 h-3" />
                                Real-time Rendering
                              </span>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 p-6 min-h-[200px] max-h-[500px] overflow-y-auto">
                              {topic.content ? (
                                <div
                                  className="prose prose-base dark:prose-invert max-w-none
                                    prose-headings:text-gray-900 dark:prose-headings:text-white
                                    prose-p:text-gray-700 dark:prose-p:text-gray-300
                                    prose-a:text-purple-600 dark:prose-a:text-purple-400 hover:prose-a:underline
                                    prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-code:bg-purple-50 dark:prose-code:bg-purple-900/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                    prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100
                                    prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 dark:prose-blockquote:bg-purple-900/20 prose-blockquote:py-1
                                    prose-strong:text-gray-900 dark:prose-strong:text-white
                                    prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                                    prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                                    prose-li:text-gray-700 dark:prose-li:text-gray-300
                                    prose-table:text-gray-700 dark:prose-table:text-gray-300
                                    prose-th:bg-gray-100 dark:prose-th:bg-gray-800
                                    prose-img:rounded-lg prose-img:shadow-md"
                                >
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                  >
                                    {topic.content}
                                  </ReactMarkdown>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                  <HiEye className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                                  <p className="text-gray-400 dark:text-gray-500 italic">Start typing in Markdown to see a live preview...</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Subtopics - Simplified */}
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                              Subtopics (Optional)
                            </label>
                            <div className="space-y-2">
                              {topic.subtopics.map((subtopic, subIndex) => (
                                <div key={subIndex} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={subtopic}
                                    onChange={(e) => updateSubtopic(index, subIndex, e.target.value)}
                                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="e.g., JSX Syntax"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeSubtopic(index, subIndex)}
                                    className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                  >
                                    <HiX className="w-5 h-5" />
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addSubtopic(index)}
                                className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium"
                              >
                                + Add Subtopic
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add learning resources like documentation, tutorials, and videos.
                  </p>
                  <button
                    type="button"
                    onClick={addResource}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <HiPlus className="w-5 h-5" />
                    Add Resource
                  </button>
                </div>

                {formData.resources.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <p className="text-gray-500 dark:text-gray-400">No resources added yet. Click "Add Resource" to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.resources.map((resource, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resource #{index + 1}</h3>
                          <button
                            type="button"
                            onClick={() => removeResource(index)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Resource Title */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Title *
                            </label>
                            <input
                              type="text"
                              value={resource.title}
                              onChange={(e) => updateResource(index, 'title', e.target.value)}
                              className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                              placeholder="e.g., Official React Documentation"
                            />
                          </div>

                          {/* Resource Type */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Type *
                            </label>
                            <select
                              value={resource.type}
                              onChange={(e) => updateResource(index, 'type', e.target.value)}
                              className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                              <option value="Official">Official</option>
                              <option value="Tutorial">Tutorial</option>
                              <option value="Documentation">Documentation</option>
                              <option value="Video">Video</option>
                              <option value="Article">Article</option>
                            </select>
                          </div>

                          {/* Resource URL */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              URL *
                            </label>
                            <input
                              type="url"
                              value={resource.url}
                              onChange={(e) => updateResource(index, 'url', e.target.value)}
                              className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTechStackForm;
