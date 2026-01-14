export interface Course {
  id: string
  title: string
  description: string
  content: string
  tokensRequired: number
  level: string
  category: string
  unlocked: boolean
}

export const courses: Course[] = [
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
