import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiViewGrid } from 'react-icons/hi';
import { FaReact, FaNodeJs, FaAngular, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb, SiExpress, SiTailwindcss, SiBootstrap, SiRedux, SiMysql, SiPostgresql, SiGit, SiDocker, SiPostman } from 'react-icons/si';
import { api } from '../../config/api';
import { getDifficultyColor } from '../../utils/utils';
import { ADMIN_ROUTES } from '../routes';

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
  createdAt?: string;
  updatedAt?: string;
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

const AdminTechStack = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, frontend: 0, backend: 0, database: 0, framework: 0, tools: 0 });

  // Fetch tech stack data
  useEffect(() => {
    fetchTechStack();
    fetchStats();
  }, []);

  const fetchTechStack = async () => {
    try {
      setLoading(true);
      const response = await api.techStack.getAll();
      if (response.success) {
        setTechStack(response.data);
      }
    } catch (error) {
      console.error('Error fetching tech stack:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.techStack.getStats();
      if (response.success) {
        const { total, byCategory } = response.data;
        setStats({
          total,
          frontend: byCategory.Frontend || 0,
          backend: byCategory.Backend || 0,
          database: byCategory.Database || 0,
          framework: byCategory.Framework || 0,
          tools: byCategory.Tools || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this technology?')) {
      return;
    }

    try {
      const response = await api.techStack.delete(id);
      if (response.success) {
        await fetchTechStack();
        await fetchStats();
        alert('Technology deleted successfully!');
      } else {
        alert(response.message || 'Failed to delete technology');
      }
    } catch (error) {
      console.error('Error deleting tech:', error);
      alert('Error deleting technology');
    }
  };

  const handleAdd = () => {
    navigate(ADMIN_ROUTES.TECH_STACK_ADD);
  };

  const handleEdit = (tech: TechItem) => {
    navigate(`/admin/tech-stack/edit/${tech.id}`);
  };

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Framework', 'Tools'];

  const filteredTech = techStack.filter(tech => {
    const matchesCategory = selectedCategory === 'All' || tech.category === selectedCategory;
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Tech Stack Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your technologies, frameworks, and tools
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <HiPlus className="w-5 h-5" />
            Add Technology
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Technologies</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <HiViewGrid className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Frontend</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.frontend}</p>
              </div>
              <FaReact className="w-8 h-8 text-cyan-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Backend</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.backend}
                </p>
              </div>
              <FaNodeJs className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Database</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.database}</p>
              </div>
              <SiMongodb className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Technology
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-600 dark:text-gray-400">Loading technologies...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredTech.length > 0 ? (
                  filteredTech.map((tech) => {
                    const Icon = iconMap[tech.icon] || HiViewGrid;
                    return (
                      <tr key={tech.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-r ${tech.gradient} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {tech.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {tech.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(tech.difficulty)}`}>
                            {tech.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {tech.year}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(tech)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <HiPencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(tech.id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <HiTrash className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <HiViewGrid className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400">No technologies found</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Count */}
        {filteredTech.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-purple-600 dark:text-purple-400">{filteredTech.length}</span> of{' '}
              <span className="font-semibold">{techStack.length}</span> technologies
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTechStack;
