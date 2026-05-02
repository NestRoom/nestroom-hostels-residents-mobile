import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

/**
 * Common Date Formatting Utilities
 */

export const formatDate = (date, formatStr = 'PPP') => {
  if (!date) return '';
  return format(new Date(date), formatStr);
};

export const formatRelativeTime = date => {
  if (!date) return '';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatTime = date => {
  if (!date) return '';
  return format(new Date(date), 'p');
};

export const getSmartDate = date => {
  if (!date) return '';
  const d = new Date(date);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return formatDate(d, 'MMM d, yyyy');
};
