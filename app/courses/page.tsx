'use client'

import { TokenDisplay } from '@/components/TokenDisplay'
import { Navigation } from '@/components/Navigation'
import { useTokens } from '@/components/TokenProvider'
import { spendTokens } from '@/lib/tokenSystem'
import { useState } from 'react'
import { Lock, Unlock, BookOpen, CheckCircle } from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  content: string
  tokensRequired: number
  level: string
  unlocked: boolean
}

const courses: Course[] = [
  {
    id: 'linux-basics',
    title: 'Linux Basics',
    description: 'Introduction to Linux operating system, file system, and basic commands',
    content: `
# Linux Basics

## What is Linux?
Linux is an open-source operating system kernel that powers millions of devices worldwide, from servers to smartphones.

## File System Structure
- **/** - Root directory
- **/home** - User home directories
- **/etc** - Configuration files
- **/var** - Variable data files
- **/usr** - User programs and data

## Essential Commands
- \`ls\` - List directory contents
- \`cd\` - Change directory
- \`pwd\` - Print working directory
- \`mkdir\` - Create directory
- \`rm\` - Remove files/directories
- \`cp\` - Copy files
- \`mv\` - Move/rename files

## File Permissions
Linux uses a permission system with three types:
- **Read (r)** - View file contents
- **Write (w)** - Modify file contents
- **Execute (x)** - Run file as program

Permissions are set for three groups:
- Owner
- Group
- Others

## Practice
Try these commands in your terminal:
\`\`\`bash
ls -la
cd ~
pwd
mkdir test_folder
cd test_folder
\`\`\`
    `,
    tokensRequired: 10,
    level: 'Beginner',
    unlocked: false,
  },
  {
    id: 'command-line',
    title: 'Command Line Mastery',
    description: 'Master the Linux terminal with advanced commands and techniques',
    content: `
# Command Line Mastery

## Advanced Commands

### Text Processing
- \`grep\` - Search text patterns
- \`sed\` - Stream editor for filtering/transforming text
- \`awk\` - Pattern scanning and processing
- \`cut\` - Extract columns from files
- \`sort\` - Sort lines of text
- \`uniq\` - Remove duplicate lines

### File Operations
- \`find\` - Search for files
- \`grep -r\` - Recursive search
- \`tar\` - Archive files
- \`zip\` / \`unzip\` - Compress files

### Process Management
- \`ps\` - List processes
- \`top\` / \`htop\` - Monitor processes
- \`kill\` - Terminate processes
- \`jobs\` - List background jobs
- \`bg\` / \`fg\` - Background/foreground jobs

### Pipes and Redirection
- \`|\` - Pipe output to next command
- \`>\` - Redirect output to file
- \`>>\` - Append to file
- \`<\` - Redirect input from file

## Examples
\`\`\`bash
# Find all .txt files
find . -name "*.txt"

# Search for pattern in files
grep -r "pattern" .

# Count lines in file
wc -l file.txt

# Sort and get unique lines
sort file.txt | uniq
\`\`\`
    `,
    tokensRequired: 20,
    level: 'Intermediate',
    unlocked: false,
  },
  {
    id: 'system-admin',
    title: 'System Administration',
    description: 'Learn advanced system management, user administration, and system monitoring',
    content: `
# System Administration

## User Management
- \`useradd\` - Create new user
- \`userdel\` - Delete user
- \`usermod\` - Modify user
- \`passwd\` - Change password
- \`groups\` - List user groups
- \`sudo\` - Execute as superuser

## System Monitoring
- \`df\` - Disk space usage
- \`du\` - Directory space usage
- \`free\` - Memory usage
- \`uptime\` - System uptime
- \`iostat\` - I/O statistics
- \`netstat\` - Network connections

## Service Management
- \`systemctl\` - Systemd service management
  - \`systemctl start service\`
  - \`systemctl stop service\`
  - \`systemctl restart service\`
  - \`systemctl status service\`
  - \`systemctl enable service\`

## Package Management
### Debian/Ubuntu (apt)
- \`apt update\` - Update package list
- \`apt upgrade\` - Upgrade packages
- \`apt install package\` - Install package
- \`apt remove package\` - Remove package

### RedHat/CentOS (yum/dnf)
- \`yum install package\`
- \`yum update package\`
- \`yum remove package\`

## Cron Jobs
Schedule tasks using cron:
\`\`\`bash
# Edit crontab
crontab -e

# List crontab
crontab -l

# Format: minute hour day month weekday command
0 2 * * * /path/to/script.sh
\`\`\`

## Logs
- \`/var/log/syslog\` - System log
- \`/var/log/auth.log\` - Authentication log
- \`journalctl\` - Systemd journal
- \`tail -f\` - Follow log file
    `,
    tokensRequired: 30,
    level: 'Advanced',
    unlocked: false,
  },
]

export default function CoursesPage() {
  const { tokenData, refreshTokens } = useTokens()
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [unlockedCourses, setUnlockedCourses] = useState<Set<string>>(new Set())

  const handleUnlockCourse = (course: Course) => {
    if (tokenData.tokens >= course.tokensRequired) {
      if (spendTokens(course.tokensRequired)) {
        setUnlockedCourses(new Set([...unlockedCourses, course.id]))
        refreshTokens()
        setSelectedCourse({ ...course, unlocked: true })
      }
    } else {
      alert(`You need ${course.tokensRequired} tokens to unlock this course. You currently have ${Math.floor(tokenData.tokens)} tokens.`)
    }
  }

  const isUnlocked = (courseId: string) => unlockedCourses.has(courseId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <TokenDisplay />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Linux Courses
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Unlock courses by spending tokens. Each course requires tokens based on its difficulty level.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course) => {
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {selectedCourse.title}
              </h2>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-mono text-sm bg-gray-50 dark:bg-gray-900 p-6 rounded-lg overflow-x-auto">
                {selectedCourse.content}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
