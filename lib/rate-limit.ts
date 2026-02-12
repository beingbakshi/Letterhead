const memoryStore = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, max = 10, windowMs = 60_000) {
  const now = Date.now();
  const item = memoryStore.get(key);
  if (!item || item.resetAt < now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (item.count >= max) return false;
  item.count += 1;
  return true;
}
