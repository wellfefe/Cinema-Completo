export function generateCode(prefix: string, now = new Date()) {
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${now.getTime()}-${randomPart}`;
}
