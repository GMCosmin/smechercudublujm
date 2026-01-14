'use client'

import { TokenDisplay } from '@/components/TokenDisplay'
import { Navigation } from '@/components/Navigation'
import { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, Play, RotateCcw } from 'lucide-react'

interface Command {
  command: string
  output: string
}

const sampleFiles: Record<string, string> = {
  'readme.txt': 'Welcome to LinuxToken.com!\nThis is a sample file.\nLearn Linux commands here.',
  'notes.md': '# Linux Notes\n\n- Linux is open-source\n- It uses a hierarchical file system\n- Commands are case-sensitive',
  'data.txt': 'apple\nbanana\ncherry\napple\ndate\nbanana',
  'numbers.txt': '3\n1\n4\n1\n5\n9\n2\n6',
  'log.txt': '2024-01-01 INFO: System started\n2024-01-01 ERROR: Connection failed\n2024-01-02 INFO: User logged in\n2024-01-02 WARN: High memory usage',
}

const availableCommands: Record<string, (args: string[]) => string> = {
  help: () => `Available commands:
  help          - Show this help message
  ls            - List directory contents
  pwd           - Print working directory
  whoami        - Show current user
  date          - Show current date and time
  echo [text]   - Echo text
  clear         - Clear terminal
  cat [file]    - Display file contents
  mkdir [name]  - Create directory
  cd [dir]      - Change directory
  history       - Show command history
  grep [pattern] [file] - Search for pattern in file
  find [dir] -name [pattern] - Find files matching pattern
  sort [file]   - Sort lines in file
  uniq [file]   - Remove duplicate lines
  wc [file]     - Count lines, words, characters
  head [file]   - Show first 10 lines
  tail [file]   - Show last 10 lines
  ps            - List processes
  df            - Show disk space usage
  free          - Show memory usage`,

  ls: () => `bin    dev    etc    home   lib    media  opt    root   sbin   sys    tmp    usr    var
Documents  Downloads  readme.txt  notes.md  data.txt  numbers.txt  log.txt`,

  pwd: () => `/home/user`,

  whoami: () => `user`,

  date: () => new Date().toLocaleString(),

  echo: (args) => args.join(' '),

  cat: (args) => {
    if (args.length === 0) return 'Usage: cat [filename]'
    return sampleFiles[args[0]] || `cat: ${args[0]}: No such file or directory`
  },

  mkdir: (args) => {
    if (args.length === 0) return 'Usage: mkdir [directory_name]'
    return `Directory '${args[0]}' created successfully`
  },

  cd: (args) => {
    if (args.length === 0) return 'Usage: cd [directory]'
    return `Changed directory to '${args[0]}'`
  },

  grep: (args) => {
    if (args.length < 2) return 'Usage: grep [pattern] [file]'
    const [pattern, file] = args
    const content = sampleFiles[file]
    if (!content) return `grep: ${file}: No such file or directory`
    const lines = content.split('\n')
    const matches = lines.filter(line => line.toLowerCase().includes(pattern.toLowerCase()))
    return matches.length > 0 ? matches.join('\n') : `(no matches found)`
  },

  find: (args) => {
    if (args.length < 3 || args[0] !== '.' || args[1] !== '-name') {
      return 'Usage: find . -name [pattern]\nExample: find . -name "*.txt"'
    }
    const pattern = args[2].replace(/\*/g, '.*')
    const regex = new RegExp(pattern)
    const files = Object.keys(sampleFiles).filter(f => regex.test(f))
    return files.length > 0 ? files.join('\n') : `(no files found)`
  },

  sort: (args) => {
    if (args.length === 0) return 'Usage: sort [file]'
    const content = sampleFiles[args[0]]
    if (!content) return `sort: ${args[0]}: No such file or directory`
    return content.split('\n').sort().join('\n')
  },

  uniq: (args) => {
    if (args.length === 0) return 'Usage: uniq [file]'
    const content = sampleFiles[args[0]]
    if (!content) return `uniq: ${args[0]}: No such file or directory`
    const lines = content.split('\n')
    const unique = Array.from(new Set(lines))
    return unique.join('\n')
  },

  wc: (args) => {
    if (args.length === 0) return 'Usage: wc [file]'
    const content = sampleFiles[args[0]]
    if (!content) return `wc: ${args[0]}: No such file or directory`
    const lines = content.split('\n')
    const words = content.split(/\s+/).filter(w => w.length > 0)
    const chars = content.length
    return `${lines.length} ${words.length} ${chars} ${args[0]}`
  },

  head: (args) => {
    if (args.length === 0) return 'Usage: head [file]'
    const content = sampleFiles[args[0]]
    if (!content) return `head: ${args[0]}: No such file or directory`
    return content.split('\n').slice(0, 10).join('\n')
  },

  tail: (args) => {
    if (args.length === 0) return 'Usage: tail [file]'
    const content = sampleFiles[args[0]]
    if (!content) return `tail: ${args[0]}: No such file or directory`
    return content.split('\n').slice(-10).join('\n')
  },

  ps: () => `  PID TTY          TIME CMD
  1234 pts/0    00:00:01 bash
  5678 pts/0    00:00:02 node
  9012 pts/0    00:00:00 ps`,

  df: () => `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        20G   8G   11G  42% /
/dev/sda2       100G  45G   50G  47% /home
tmpfs           2.0G     0  2.0G   0% /dev/shm`,

  free: () => `              total        used        free      shared  buff/cache   available
Mem:        8192000     2048000     3072000      512000     3072000     5120000
Swap:       2097152           0     2097152`,
}

export default function TerminalPage() {
  const [commands, setCommands] = useState<Command[]>([
    { command: 'help', output: availableCommands.help([]) },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [commands])

  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) return

    const parts = cmd.trim().split(/\s+/)
    const commandName = parts[0].toLowerCase()
    const args = parts.slice(1)

    let output = ''

    if (commandName === 'clear') {
      setCommands([])
      return
    }

    if (commandName === 'history') {
      output = history.length > 0 ? history.join('\n') : 'No command history'
    } else if (availableCommands[commandName]) {
      output = availableCommands[commandName](args)
    } else {
      output = `Command not found: ${commandName}. Type 'help' for available commands.`
    }

    setCommands([...commands, { command: cmd, output }])
    setHistory([...history, cmd])
    setHistoryIndex(-1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(input)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      }
    }
  }

  const clearTerminal = () => {
    setCommands([])
    setInput('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <TokenDisplay />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <TerminalIcon className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            Linux Terminal Simulator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Practice Linux commands in a safe, interactive environment. Type 'help' to see available commands.
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-gray-400 text-sm font-mono">terminal@linuxtoken:~$</span>
            </div>
            <button
              onClick={clearTerminal}
              className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
          </div>

          <div className="p-6 h-[600px] overflow-y-auto font-mono text-sm">
            {commands.map((cmd, idx) => (
              <div key={idx} className="mb-4">
                <div className="text-green-400 mb-1">
                  <span className="text-gray-500">user@linuxtoken:~$</span> {cmd.command}
                </div>
                <div className="text-gray-300 whitespace-pre-wrap ml-4">{cmd.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-700 bg-gray-800 p-4">
            <div className="flex items-center gap-2">
              <span className="text-green-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-gray-100 outline-none focus:outline-none"
                placeholder="Type a command..."
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Run
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>Tip:</strong> Use the up/down arrow keys to navigate through your command history. 
            This terminal simulator helps you learn Linux commands safely without affecting your system.
          </p>
        </div>
      </main>
    </div>
  )
}
