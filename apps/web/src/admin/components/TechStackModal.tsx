import { useState, useEffect } from 'react';
import { HiX, HiSave, HiPlus, HiTrash } from 'react-icons/hi';
import { FaReact, FaNodeJs, FaAngular, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb, SiExpress, SiTailwindcss, SiBootstrap, SiRedux, SiMysql, SiPostgresql, SiGit, SiDocker, SiPostman } from 'react-icons/si';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TechFormData) => Promise<void>;
  initialData?: TechFormData | null;
  mode: 'add' | 'edit';
}

interface Topic {
  id: number;
  title: string;
  description: string;
  content: string; // Rich text HTML content
  subtopics: string[];
  isIntro: boolean;
}

interface Resource {
  title: string;
  url: string;
  type: 'Official' | 'Tutorial' | 'Documentation' | 'Video' | 'Article';
}

export interface TechFormData {
  id?: string;
  name: string;
  description: string;
  category: string;
  year: string;
  paradigm: string;
  features: string[];
  useCases: string[];
  icon: string;
  gradient: string;
  difficulty: string;
  topics: Topic[];
  resources: Resource[];
}

// Available icons
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

// Available gradients
const availableGradients = [
  { value: 'from-yellow-400 to-yellow-600', label: 'Yellow', preview: 'bg-gradient-to-r from-yellow-400 to-yellow-600' },
  { value: 'from-blue-500 to-blue-700', label: 'Blue', preview: 'bg-gradient-to-r from-blue-500 to-blue-700' },
  { value: 'from-cyan-400 to-blue-500', label: 'Cyan-Blue', preview: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
  { value: 'from-red-500 to-red-700', label: 'Red', preview: 'bg-gradient-to-r from-red-500 to-red-700' },
  { value: 'from-orange-500 to-red-500', label: 'Orange-Red', preview: 'bg-gradient-to-r from-orange-500 to-red-500' },
  { value: 'from-blue-400 to-blue-600', label: 'Light Blue', preview: 'bg-gradient-to-r from-blue-400 to-blue-600' },
  { value: 'from-green-500 to-green-700', label: 'Green', preview: 'bg-gradient-to-r from-green-500 to-green-700' },
  { value: 'from-gray-600 to-gray-800', label: 'Gray', preview: 'bg-gradient-to-r from-gray-600 to-gray-800' },
  { value: 'from-purple-500 to-purple-700', label: 'Purple', preview: 'bg-gradient-to-r from-purple-500 to-purple-700' },
  { value: 'from-cyan-400 to-teal-500', label: 'Cyan-Teal', preview: 'bg-gradient-to-r from-cyan-400 to-teal-500' },
  { value: 'from-purple-600 to-purple-800', label: 'Dark Purple', preview: 'bg-gradient-to-r from-purple-600 to-purple-800' },
  { value: 'from-blue-600 to-indigo-600', label: 'Blue-Indigo', preview: 'bg-gradient-to-r from-blue-600 to-indigo-600' },
  { value: 'from-orange-500 to-red-600', label: 'Orange', preview: 'bg-gradient-to-r from-orange-500 to-red-600' },
  { value: 'from-blue-500 to-cyan-500', label: 'Blue-Cyan', preview: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
  { value: 'from-orange-500 to-orange-600', label: 'Light Orange', preview: 'bg-gradient-to-r from-orange-500 to-orange-600' },
];

const TechStackModal: React.FC<TechStackModalProps> = ({ isOpen, onClose, onSave, initialData, mode }) => {
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
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'topics' | 'resources'>('basic');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form for add mode
      setFormData({
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
    }
    setActiveTab('basic');
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      await onSave(cleanedData);
      onClose();
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const selectedIcon = availableIcons.find(i => i.name === formData.icon);
  const IconComponent = selectedIcon?.component || SiJavascript;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center justify-between rounded-t-xl">
            <h2 className="text-2xl font-bold text-white">
              {mode === 'add' ? 'Add New Technology' : 'Edit Technology'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <HiX className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Tabs */}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Technology Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="e.g., React"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Framework">Framework</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Year *
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="e.g., 2013"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty *
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Paradigm */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Paradigm *
              </label>
              <input
                type="text"
                name="paradigm"
                value={formData.paradigm}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="e.g., Component-based, Event-driven"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                placeholder="Brief description of the technology..."
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Key Features
              </label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange('features', index, e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
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
                Use Cases
              </label>
              {formData.useCases.map((useCase, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={useCase}
                    onChange={(e) => handleArrayChange('useCases', index, e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
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
                      onClick={() => setFormData({ ...formData, icon: icon.name })}
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
                    onClick={() => setFormData({ ...formData, gradient: gradient.value })}
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

            {/* Topics Tab */}
            {activeTab === 'topics' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add topics to organize learning content. Topic ID 0 is reserved for the Introduction.
                  </p>
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
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <p className="text-gray-500 dark:text-gray-400">No topics added yet. Click "Add Topic" to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.topics.map((topic, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Topic #{topic.id}</h3>
                          <button
                            type="button"
                            onClick={() => removeTopic(index)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          {/* Topic ID */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Topic ID *
                            </label>
                            <input
                              type="number"
                              value={topic.id}
                              onChange={(e) => updateTopic(index, 'id', parseInt(e.target.value))}
                              className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                              placeholder="e.g., 1"
                            />
                          </div>

                          {/* Topic Title */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Title *
                            </label>
                            <input
                              type="text"
                              value={topic.title}
                              onChange={(e) => updateTopic(index, 'title', e.target.value)}
                              className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                              placeholder="e.g., Core Concepts"
                            />
                          </div>

                          {/* Topic Description */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Description *
                            </label>
                            <textarea
                              value={topic.description}
                              onChange={(e) => updateTopic(index, 'description', e.target.value)}
                              rows={2}
                              className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                              placeholder="Brief description of this topic..."
                            />
                          </div>

                          {/* Is Intro */}
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`isIntro-${index}`}
                              checked={topic.isIntro}
                              onChange={(e) => updateTopic(index, 'isIntro', e.target.checked)}
                              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor={`isIntro-${index}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              This is an introduction topic (shows features, use cases, and resources)
                            </label>
                          </div>

                          {/* Rich Text Content Editor with Preview */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Topic Content (Rich Text)
                            </label>
                            <div className="grid md:grid-cols-2 gap-4">
                              {/* Editor */}
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Editor</p>
                                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
                                  <ReactQuill
                                    theme="snow"
                                    value={topic.content || ''}
                                    onChange={(value) => updateTopic(index, 'content', value)}
                                    modules={{
                                      toolbar: [
                                        [{ 'header': [1, 2, 3, false] }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                        [{ 'color': [] }, { 'background': [] }],
                                        ['link', 'code-block'],
                                        ['clean']
                                      ]
                                    }}
                                    className="quill-editor"
                                  />
                                </div>
                              </div>

                              {/* Preview */}
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Preview</p>
                                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
                                  {topic.content ? (
                                    <div
                                      className="prose prose-sm dark:prose-invert max-w-none"
                                      dangerouslySetInnerHTML={{ __html: topic.content }}
                                    />
                                  ) : (
                                    <p className="text-gray-400 dark:text-gray-500 italic">Content preview will appear here...</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Subtopics */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Subtopics
                            </label>
                            {topic.subtopics.map((subtopic, subIndex) => (
                              <div key={subIndex} className="flex gap-2 mb-2">
                                <input
                                  type="text"
                                  value={subtopic}
                                  onChange={(e) => updateSubtopic(index, subIndex, e.target.value)}
                                  className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
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
                              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                            >
                              + Add Subtopic
                            </button>
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
                      <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
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

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <HiSave className="w-5 h-5" />
                    {mode === 'add' ? 'Add Technology' : 'Save Changes'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TechStackModal;

