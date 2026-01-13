import { TokenDisplay } from '@/components/TokenDisplay'
import { Navigation } from '@/components/Navigation'
import Link from 'next/link'
import { ArrowRight, BookOpen, Terminal, Zap, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <TokenDisplay />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Learn Linux
            <span className="text-primary-600 dark:text-primary-400"> Free</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Master Linux through hands-on learning. Earn tokens by spending time on the platform, 
            then use them to unlock premium content. Everything is free - your time is your currency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            >
              Browse Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/terminal"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg border border-gray-200 dark:border-gray-700"
            >
              Try Terminal
              <Terminal className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Spend Time Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simply browse and learn on the platform. Every minute you spend earns you 1 Linux Token.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Earn Tokens
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your tokens accumulate automatically. The more you learn, the more tokens you earn.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Unlock Content
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use your tokens to access advanced courses and premium learning materials.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Courses */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Featured Courses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Linux Basics',
                description: 'Get started with Linux fundamentals',
                tokens: 10,
                level: 'Beginner',
              },
              {
                title: 'Command Line Mastery',
                description: 'Master the Linux terminal',
                tokens: 20,
                level: 'Intermediate',
              },
              {
                title: 'System Administration',
                description: 'Learn advanced system management',
                tokens: 30,
                level: 'Advanced',
              },
            ].map((course, idx) => (
              <Link
                key={idx}
                href="/courses"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {course.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {course.tokens} tokens
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
