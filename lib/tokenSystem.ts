// Token System: Earn 1 token per minute spent on the site
const TOKEN_RATE = 1; // tokens per minute
const STORAGE_KEY = 'linuxtoken_data';

export interface TokenData {
  tokens: number;
  totalMinutes: number;
  lastActiveTime: number;
  sessionStartTime: number;
}

export function getTokenData(): TokenData {
  if (typeof window === 'undefined') {
    return {
      tokens: 0,
      totalMinutes: 0,
      lastActiveTime: Date.now(),
      sessionStartTime: Date.now(),
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // If parsing fails, return default
    }
  }

  const defaultData: TokenData = {
    tokens: 0,
    totalMinutes: 0,
    lastActiveTime: Date.now(),
    sessionStartTime: Date.now(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  return defaultData;
}

export function saveTokenData(data: TokenData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function updateTokens(): TokenData {
  const data = getTokenData();
  const now = Date.now();
  
  // Calculate minutes since last update (minimum 0)
  const minutesSinceLastUpdate = Math.floor(
    (now - data.lastActiveTime) / (1000 * 60)
  );

  if (minutesSinceLastUpdate > 0) {
    // Add tokens based on time spent
    const tokensEarned = minutesSinceLastUpdate * TOKEN_RATE;
    data.tokens += tokensEarned;
    data.totalMinutes += minutesSinceLastUpdate;
    data.lastActiveTime = now;
    saveTokenData(data);
  }

  return data;
}

export function spendTokens(amount: number): boolean {
  const data = updateTokens();
  if (data.tokens >= amount) {
    data.tokens -= amount;
    saveTokenData(data);
    return true;
  }
  return false;
}

export function getCurrentTokens(): number {
  return updateTokens().tokens;
}

export function getTotalMinutes(): number {
  return updateTokens().totalMinutes;
}
