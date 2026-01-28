// utils/discountHelpers.ts

/**
 * Format days string for display
 */
export function formatDays(daysStr: string): string {
  if (!daysStr) return 'All days';
  
  const days = daysStr.split(',').map(d => parseInt(d.trim()));
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  if (days.length === 7) return 'All days';
  if (days.length === 5 && !days.includes(6) && !days.includes(7)) return 'Weekdays';
  if (days.length === 2 && days.includes(6) && days.includes(7)) return 'Weekends';
  
  return days.map(d => names[d - 1]).join(', ');
}

/**
 * Format date to YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Format time to HH:mm
 */
export function formatTime(date: Date): string {
  return date.toTimeString().slice(0, 5);
}