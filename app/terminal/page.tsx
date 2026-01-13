'use client'

import { TokenDisplay } from '@/components/TokenDisplay'
import { Navigation } from '@/components/Navigation'
import { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, Play, RotateCcw } from 'lucide-react'

interface Command {
  command: string
  output: string
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
  history       - Show command history`,

  ls: () => `bin    dev    etc    home   lib    media  opt    root   sbin   sys    tmp    usr    var`,

  pwd: () => `/home/user`,

  whoami: () => `user`,

  date: () => new Date().toLocaleString(),

  echo: (args) => args.join(' '),

  cat: (args) => {
    if (args.length === 0) return 'Usage: cat [filename]'
    const files: Record<string, string> = {
      'readme.txt': 'Welcome to LinuxToken.com!\nThis is a sample file.\nLearn Linux commands here.',
      'notes.md': '# Linux Notes\n\n- Linux is open-source\n- It uses a hierarchical file system\n- Commands are case-sensitive',
    }
    return files[args[0]] || `cat: ${args[0]}: No such file or directory`
  },

  mkdir: (args) => {
    if (args.length === 0) return 'Usage: mkdir [directory_name]'
    return `Directory '${args[0]}' created successfully`
  },

  cd: (args) => {
    if (args.length === 0) return 'Usage: cd [directory]'
    return `Changed directory to '${args[0]}'`
  },
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
