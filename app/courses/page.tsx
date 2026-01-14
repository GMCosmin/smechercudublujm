'use client'

import { TokenDisplay } from '@/components/TokenDisplay'
import { Navigation } from '@/components/Navigation'
import { useTokens } from '@/components/TokenProvider'
import { spendTokens, getUnlockedCourses, addUnlockedCourse, getCurrentTokens } from '@/lib/tokenSystem'
import { useState, useEffect } from 'react'
import { Lock, Unlock, CheckCircle, Tag, Filter } from 'lucide-react'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { useToast, ToastContainer } from '@/components/Toast'

interface Course {
  id: string
  title: string
  description: string
  content: string
  tokensRequired: number
  level: string
  category: string
  unlocked: boolean
}

const courses: Course[] = [
  {
    id: 'linux-basics',
    title: 'Linux Basics',
    description: 'Introduction to Linux operating system, file system, and basic commands',
    category: 'Fundamentals',
    content: `# Linux Basics

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
    category: 'Command Line',
    content: `# Command Line Mastery

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
    category: 'Administration',
    content: `# System Administration

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
  {
    id: 'shell-scripting',
    title: 'Shell Scripting Basics',
    description: 'Learn to write bash scripts and automate tasks',
    category: 'Scripting',
    content: `# Shell Scripting Basics

## Introduction
Shell scripting allows you to automate repetitive tasks and create powerful command-line tools.

## Basic Script Structure

\`\`\`bash
#!/bin/bash
# This is a comment
echo "Hello, World!"
\`\`\`

## Variables
- Declare: \`name="value"\`
- Use: \`$name\` or \`${name}\`
- Special variables:
  - \`$0\` - Script name
  - \`$1, $2...\` - Arguments
  - \`$#\` - Number of arguments
  - \`$?\` - Exit status

## Control Structures

### If Statements
\`\`\`bash
if [ condition ]; then
    # commands
elif [ condition ]; then
    # commands
else
    # commands
fi
\`\`\`

### Loops
\`\`\`bash
# For loop
for i in {1..10}; do
    echo $i
done

# While loop
while [ condition ]; do
    # commands
done
\`\`\`

## Functions
\`\`\`bash
function greet() {
    echo "Hello, $1!"
}

greet "World"
\`\`\`

## File Operations
\`\`\`bash
# Check if file exists
if [ -f "file.txt" ]; then
    echo "File exists"
fi

# Check if directory exists
if [ -d "directory" ]; then
    echo "Directory exists"
fi
\`\`\`
    `,
    tokensRequired: 25,
    level: 'Intermediate',
    unlocked: false,
  },
  {
    id: 'file-permissions',
    title: 'File Permissions & Ownership',
    description: 'Master Linux file permissions, ownership, and access control',
    category: 'Fundamentals',
    content: `# File Permissions & Ownership

## Understanding Permissions
Linux uses a three-tier permission system:
- **Owner** (user)
- **Group**
- **Others** (everyone else)

Each tier has three permissions:
- **Read (r)** - 4
- **Write (w)** - 2
- **Execute (x)** - 1

## Viewing Permissions
\`\`\`bash
ls -l file.txt
# Output: -rw-r--r-- 1 user group 1024 Jan 1 12:00 file.txt
\`\`\`

The permission string \`-rw-r--r--\` breaks down as:
- \`-\` - File type (d for directory)
- \`rw-\` - Owner permissions (read, write)
- \`r--\` - Group permissions (read)
- \`r--\` - Others permissions (read)

## Changing Permissions
### Symbolic Method
\`\`\`bash
chmod u+x file.txt    # Add execute for owner
chmod g-w file.txt    # Remove write for group
chmod o+r file.txt    # Add read for others
chmod a+x script.sh   # Add execute for all
\`\`\`

### Numeric Method
\`\`\`bash
chmod 755 script.sh   # rwxr-xr-x
chmod 644 file.txt    # rw-r--r--
chmod 600 private.txt # rw-------
\`\`\`

## Changing Ownership
\`\`\`bash
chown user:group file.txt
chown -R user:group directory/  # Recursive
\`\`\`

## Special Permissions
- **SUID** (Set User ID) - 4000
- **SGID** (Set Group ID) - 2000
- **Sticky Bit** - 1000

\`\`\`bash
chmod +s executable
chmod +t directory/
\`\`\`
    `,
    tokensRequired: 15,
    level: 'Beginner',
    unlocked: false,
  },
  {
    id: 'package-management',
    title: 'Package Management',
    description: 'Learn to install, update, and manage software packages',
    category: 'Administration',
    content: `# Package Management

## Debian/Ubuntu (APT)

### Update Package Lists
\`\`\`bash
sudo apt update
\`\`\`

### Upgrade Packages
\`\`\`bash
sudo apt upgrade          # Upgrade all packages
sudo apt upgrade package  # Upgrade specific package
\`\`\`

### Install Packages
\`\`\`bash
sudo apt install package-name
sudo apt install package1 package2  # Multiple packages
\`\`\`

### Remove Packages
\`\`\`bash
sudo apt remove package-name
sudo apt purge package-name    # Remove with config files
sudo apt autoremove           # Remove unused dependencies
\`\`\`

### Search Packages
\`\`\`bash
apt search keyword
apt show package-name
\`\`\`

## Red Hat/CentOS/Fedora (YUM/DNF)

### Install Packages
\`\`\`bash
sudo yum install package-name
sudo dnf install package-name  # Fedora uses dnf
\`\`\`

### Update Packages
\`\`\`bash
sudo yum update
sudo yum update package-name
\`\`\`

### Remove Packages
\`\`\`bash
sudo yum remove package-name
\`\`\`

### Search Packages
\`\`\`bash
yum search keyword
yum info package-name
\`\`\`

## Arch Linux (Pacman)

### Install Packages
\`\`\`bash
sudo pacman -S package-name
\`\`\`

### Update System
\`\`\`bash
sudo pacman -Syu
\`\`\`

### Remove Packages
\`\`\`bash
sudo pacman -R package-name
sudo pacman -Rs package-name  # Remove with dependencies
\`\`\`

## Snap Packages
\`\`\`bash
sudo snap install package-name
sudo snap remove package-name
sudo snap refresh
\`\`\`
    `,
    tokensRequired: 20,
    level: 'Intermediate',
    unlocked: false,
  },
]

const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))]

export default function CoursesPage() {
  const { tokenData, refreshTokens } = useTokens()
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [unlockedCourses, setUnlockedCourses] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const { toasts, showToast, removeToast } = useToast()

  // Load unlocked courses from localStorage on mount
  useEffect(() => {
    const saved = getUnlockedCourses()
    setUnlockedCourses(saved)
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
