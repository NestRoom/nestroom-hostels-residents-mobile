import { z } from 'zod';

/**
 * Common Validation Schemas
 */

export const loginSchema = z.object({
  residentId: z.string().min(3, 'Resident ID is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const complaintSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});
