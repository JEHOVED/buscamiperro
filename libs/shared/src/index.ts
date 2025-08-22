// Interfaces compartidas
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  language: string;
  reputation: number;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DogLost {
  id: string;
  ownerId: string;
  name: string;
  breed?: string;
  color?: string;
  description?: string;
  lostAt: Date;
  lastPos: {
    lat: number;
    lng: number;
  };
  photoUrl?: string;
  status: 'lost' | 'found' | 'tracking';
  createdAt: Date;
  updatedAt: Date;
}

export interface Sighting {
  id: string;
  reporterId: string;
  description?: string;
  pos: {
    lat: number;
    lng: number;
  };
  spottedAt: Date;
  photoUrl?: string;
  matchedDogId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Match {
  id: string;
  dogId: string;
  sightingId: string;
  distanceM: number;
  algoScore: number;
  ownerConfirmed: boolean;
  createdAt: Date;
}

export interface ChatRoom {
  id: string;
  dogId: string;
  sightingId: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  message: string;
  sentAt: Date;
}

export interface Report {
  id: string;
  reporterId: string;
  targetType: 'dog' | 'sighting' | 'user' | 'message';
  targetId: string;
  reasonCode: string;
  comment?: string;
  resolved: boolean;
  createdAt: Date;
  resolvedAt?: Date;
}

// DTOs para APIs
export interface CreateDogDto {
  name: string;
  breed?: string;
  color?: string;
  description?: string;
  lostAt: Date;
  lastPos: {
    lat: number;
    lng: number;
  };
  photoUrl?: string;
}

export interface CreateSightingDto {
  description?: string;
  pos: {
    lat: number;
    lng: number;
  };
  spottedAt: Date;
  photoUrl?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  displayName: string;
  language?: string;
}

export interface UpdateProfileDto {
  displayName?: string;
  language?: string;
  avatarUrl?: string;
}

// Respuestas de API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Constantes
export const DOG_STATUS = {
  LOST: 'lost',
  FOUND: 'found',
  TRACKING: 'tracking',
} as const;

export const REPORT_REASONS = {
  SPAM: 'spam',
  INAPPROPRIATE: 'inappropriate',
  FALSE_INFO: 'false_info',
  HARASSMENT: 'harassment',
  OTHER: 'other',
} as const;

export const LANGUAGES = {
  ES: 'es',
  EN: 'en',
} as const;