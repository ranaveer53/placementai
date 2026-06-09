import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string(),
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    role: z.enum(['student', 'recruiter']),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const studentProfileSchema = z.object({
  roll_number: z.string().min(1),
  department: z.string(),
  branch: z.string(),
  cgpa: z.number().min(0).max(10),
  phone: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
});

export const recruiterProfileSchema = z.object({
  company_name: z.string().min(1),
  company_email: z.string().email(),
  phone: z.string().min(10),
  position: z.string(),
  company_website: z.string().url().optional().or(z.literal('')),
});

export const jobPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
  package: z.number().positive(),
  location: z.string(),
  work_type: z.enum(['full-time', 'internship', 'contract']),
  skills_required: z.array(z.string()),
  eligibility_cgpa: z.number().min(0).max(10),
  eligibility_departments: z.array(z.string()),
  application_deadline: z.string().datetime(),
});

export const assessmentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  duration_minutes: z.number().positive(),
  total_score: z.number().positive(),
  passing_score: z.number().positive(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type StudentProfileInput = z.infer<typeof studentProfileSchema>;
export type RecruiterProfileInput = z.infer<typeof recruiterProfileSchema>;
export type JobPostInput = z.infer<typeof jobPostSchema>;
export type AssessmentInput = z.infer<typeof assessmentSchema>;
