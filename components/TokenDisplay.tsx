'use client'

import { useTokens } from './TokenProvider'
import { Clock, Coins } from 'lucide-react'

export function TokenDisplay() {
  const { tokenData } = useTokens()

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-[200px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Linux Tokens
          </span>
        </div>
        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {Math.floor(tokenData.tokens)}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Clock className="w-4 h-4" />
        <span>{Math.floor(tokenData.totalMinutes)} minutes total</span>
      </div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
        Earn 1 token per minute spent
      </div>
    </div>
  )
}
