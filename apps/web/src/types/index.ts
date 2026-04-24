import { IconType } from 'react-icons';

// Common Types
export interface NavbarProps {
  onToggle: () => void;
  isDarkModeEnabled: boolean;
}

export interface LogoProps {
  className?: string;
  width?: string;
  height?: string;
}

export interface LogoWithTextProps {
  className?: string;
  logoSize?: string;
}

export interface NavbarLogoProps {
  className?: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface LoginFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Language Reference Types
export interface Category {
  name: string;
  icon: IconType;
  color: string;
}

export interface LanguageReference {
  id: number;
  name: string;
  description: string;
  category: string;
  year: string;
  paradigm: string;
  features: string[];
  useCases: string[];
  icon: IconType;
  gradient: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

// Project Types
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  icon: string;
  gradient: string;
}

// Skill Types
export interface Skill {
  name: string;
  icon: string | IconType;
  gradient: string;
}

// Testimonial Types
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  message: string;
  avatar: string;
}

// Stats Types
export interface Stat {
  label: string;
  value: string;
  icon: string;
}

