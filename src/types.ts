/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Role {
  ADMIN = "admin",
  INSTRUCTOR = "instructor",
  STUDENT = "student"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  enrolledCourses: string[]; // Course IDs
  completedCourses: string[]; // Course IDs
  progress: { [courseId: string]: number }; // percentage
  quizScores: { [quizId: string]: number }; // score 0-100
  attendanceCount: number;
}

export type Language = "en" | "zu";

export interface Resource {
  name_en: string;
  name_zu: string;
  type: "pdf" | "zip" | "link" | "doc";
  url: string;
  pdfContent_en?: string;
  pdfContent_zu?: string;
}

export interface QuizQuestion {
  id: string;
  question_en: string;
  question_zu: string;
  options_en: string[];
  options_zu: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  title_en: string;
  title_zu: string;
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title_en: string;
  title_zu: string;
  duration: string;
  videoUrl: string;
  imageUrl?: string;
  content_en: string;
  content_zu: string;
  resources: Resource[];
  quiz?: Quiz;
}

export interface Module {
  id: string;
  title_en: string;
  title_zu: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title_en: string;
  title_zu: string;
  category_en: string;
  category_zu: string;
  difficulty_en: string;
  difficulty_zu: string;
  duration_en: string;
  duration_zu: string;
  description_en: string;
  description_zu: string;
  thumbnail: string;
  instructorName: string;
  modules: Module[];
  rating: number;
  studentsCount: number;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: Role;
  content: string;
  timestamp: string;
  language: Language;
}

export interface Notification {
  id: string;
  title_en: string;
  title_zu: string;
  message_en: string;
  message_zu: string;
  time: string;
  unread: boolean;
  type: "live" | "grade" | "system";
}

export interface StudentProgress {
  userId: string;
  userName: string;
  courseId: string;
  progress: number;
  lastActive: string;
}
