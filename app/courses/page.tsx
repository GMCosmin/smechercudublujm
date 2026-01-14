'use client'

import { TokenDisplay } from '@/components/TokenDisplay'
import { Navigation } from '@/components/Navigation'
import { useTokens } from '@/components/TokenProvider'
import { spendTokens, getUnlockedCourses, addUnlockedCourse, getCurrentTokens } from '@/lib/tokenSystem'
import { useState, useEffect } from 'react'
import { Lock, Unlock, CheckCircle, Tag, Filter } from 'lucide-react'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { useToast, ToastContainer } from '@/components/Toast'
import { courses, type Course } from '@/lib/coursesData'

// Prevent static generation - this page uses client-side only features
export const dynamic = 'force-dynamic'

export default function CoursesPage() {
  const { tokenData, refreshTokens } = useTokens()
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [unlockedCourses, setUnlockedCourses] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const { toasts, showToast, removeToast } = useToast()

  // Compute categories inside component to avoid SSR issues
  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))]

  // Load unlocked courses from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = getUnlockedCourses()
      setUnlockedCourses(saved)
    }
  }, [])

  const handleUnlockCourse = (course: Course) => {
    // Fix Bug 2: Get fresh token data directly from the token system
    // instead of relying on potentially stale component state
    const currentTokens = getCurrentTokens()
    
    if (currentTokens >= course.tokensRequired) {
      // spendTokens() internally calls updateTokens() to get fresh data
      if (spendTokens(course.tokensRequired)) {
        // Fix Bug 1: Persist unlocked course to localStorage
        addUnlockedCourse(course.id)
        
        // Update local state
        const newUnlocked = new Set(unlockedCourses)
        newUnlocked.add(course.id)
        setUnlockedCourses(newUnlocked)
        
        // Refresh token display
        refreshTokens()
        setSelectedCourse({ ...course, unlocked: true })
        showToast(`Course "${course.title}" unlocked!`, 'success')
      } else {
        // This should rarely happen, but handle edge case where tokens were spent between check and spend
        showToast(
          `Unable to unlock course. Please refresh and try again.`,
          'error',
          5000
        )
      }
    } else {
      showToast(
        `You need ${course.tokensRequired} tokens. You have ${Math.floor(currentTokens)} tokens.`,
        'warning',
        5000
      )
    }
  }

  const isUnlocked = (courseId: string) => unlockedCourses.has(courseId)

  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter((course) => course.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <TokenDisplay />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Linux Courses
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Unlock courses by spending tokens. Each course requires tokens based on its difficulty level.
          </p>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-gray-500" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCourses.map((course) => {
            const unlocked = isUnlocked(course.id)
            return (
              <div
                key={course.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 transition-all cursor-pointer ${
                  unlocked
                    ? 'border-green-500 hover:border-green-600'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-500'
                }`}
                onClick={() => {
                  if (unlocked) {
                    setSelectedCourse({ ...course, unlocked: true })
                  }
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-primary-500" />
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                        {course.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {course.description}
                    </p>
                  </div>
                  {unlocked ? (
                    <Unlock className="w-6 h-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <Lock className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {course.tokensRequired} tokens
                  </span>
                </div>

                {!unlocked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUnlockCourse(course)
                    }}
                    disabled={tokenData.tokens < course.tokensRequired}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                      tokenData.tokens >= course.tokensRequired
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {tokenData.tokens >= course.tokensRequired
                      ? 'Unlock Course'
                      : `Need ${course.tokensRequired - Math.floor(tokenData.tokens)} more tokens`}
                  </button>
                )}

                {unlocked && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Unlocked - Click to view</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {selectedCourse && isUnlocked(selectedCourse.id) && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-primary-500" />
                  <span className="text-sm text-primary-600 dark:text-primary-400">
                    {selectedCourse.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {selectedCourse.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="markdown-content">
              <MarkdownRenderer content={selectedCourse.content} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
