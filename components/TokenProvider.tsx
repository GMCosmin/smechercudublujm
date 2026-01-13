'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { TokenData, updateTokens, getTokenData } from '@/lib/tokenSystem'

interface TokenContextType {
  tokenData: TokenData
  refreshTokens: () => void
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

export function TokenProvider({ children }: { children: ReactNode }) {
  const [tokenData, setTokenData] = useState<TokenData>(() => {
    if (typeof window !== 'undefined') {
      return getTokenData()
    }
    return {
      tokens: 0,
      totalMinutes: 0,
      lastActiveTime: Date.now(),
      sessionStartTime: Date.now(),
    }
  })

  const refreshTokens = () => {
    const updated = updateTokens()
    setTokenData(updated)
  }

  useEffect(() => {
    // Update tokens on mount
    refreshTokens()

    // Update tokens every 30 seconds
    const interval = setInterval(() => {
      refreshTokens()
    }, 30000)

    // Update tokens when user becomes active (visibility change)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshTokens()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <TokenContext.Provider value={{ tokenData, refreshTokens }}>
      {children}
    </TokenContext.Provider>
  )
}

export function useTokens() {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider')
  }
  return context
}
