import { HiViewGrid, HiUser, HiEye, HiCode } from 'react-icons/hi';
import AdminLayout from '../layouts/AdminLayout';

const AdminDashboard = () => {

  const stats = [
    {
      title: 'Tech Stack Items',
      value: '17',
      icon: HiViewGrid,
      color: 'from-purple-600 to-indigo-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
    {
      title: 'Profile Views',
      value: '1,234',
      icon: HiEye,
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      title: 'Projects',
      value: '12',
      icon: HiCode,
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    {
      title: 'Total Skills',
      value: '19',
      icon: HiUser,
      color: 'from-orange-600 to-red-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
    },
  ];

  const recentActivities = [
    { action: 'Updated React documentation', time: '2 hours ago', type: 'update' },
    { action: 'Added new TypeScript skill', time: '5 hours ago', type: 'add' },
    { action: 'Modified profile information', time: '1 day ago', type: 'edit' },
    { action: 'Deleted old project', time: '2 days ago', type: 'delete' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Overview 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your portfolio content and settings from here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-6 transition-all hover:shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'add' ? 'bg-green-500' :
                    activity.type === 'update' ? 'bg-blue-500' :
                    activity.type === 'edit' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all">
                <HiViewGrid className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Add Tech</p>
              </button>
              <button className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all">
                <HiCode className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">New Project</p>
              </button>
              <button className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all">
                <HiUser className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Edit Profile</p>
              </button>
              <button className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all">
                <HiEye className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">View Stats</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

