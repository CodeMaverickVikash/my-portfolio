import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiLogin } from 'react-icons/hi';
import { Logo } from '../components';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Login
    const result = await login(email, password);

    if (result.success) {
      navigate(ROUTES.ADMIN_DASHBOARD);
    } else {
      setError(result.message || 'Login failed');
    }

    setIsLoading(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Info */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
              <Link to="/" className="flex items-center gap-3 mb-8">
                <Logo width="60" height="60" />
                <div>
                  <h1 className="text-3xl font-bold">Vikash Maskhare</h1>
                  <p className="text-purple-100">Software Engineer</p>
                </div>
              </Link>
              
              <h2 className="text-4xl font-bold mb-6">
                Welcome to My Portfolio
              </h2>
              <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                Join me to explore my projects, skills, and professional journey. Connect with me to discuss opportunities and collaborations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">3+ Years Experience</h3>
                    <p className="text-sm text-purple-100">Professional Development</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Modern Tech Stack</h3>
                    <p className="text-sm text-purple-100">React, Angular, TypeScript</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Innovative Solutions</h3>
                    <p className="text-sm text-purple-100">Building Scalable Applications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login/Signup Form */}
          <div className="w-full">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
              {/* Mobile Logo */}
              <div className="lg:hidden flex justify-center mb-8">
                <Link to="/" className="flex items-center gap-3">
                  <Logo width="50" height="50" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vikash Maskhare</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
                  </div>
                </Link>
              </div>

              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome Back!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign in to access your dashboard
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pl-11 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="admintest@gmail.com"
                    />
                    <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pl-11 pr-11 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="••••••••"
                    />
                    <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
                    >
                      {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <HiLogin className="text-xl" />
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-xs font-medium text-purple-900 dark:text-purple-300 mb-2">Demo Credentials:</p>
                <p className="text-xs text-purple-700 dark:text-purple-400">
                  Email: <span className="font-mono font-semibold">admintest@gmail.com</span>
                </p>
                <p className="text-xs text-purple-700 dark:text-purple-400">
                  Password: <span className="font-mono font-semibold">admin123</span>
                </p>
              </div>

              {/* Back to Home */}
              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

