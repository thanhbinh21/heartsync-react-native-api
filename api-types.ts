/**
 * HeartSync Backend API Types
 * 
 * Import these types in your frontend project for type-safe API calls
 * 
 * Usage:
 * import { User, Match, Message, ApiResponse } from './api-types';
 */

// ============================================================================
// BASE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  photos: string[];
  bio: string;
  location: string;
  distance?: number;
  job: string;
  company: string;
  education: string;
  height: string;
  zodiac: string;
  interests: string[];
  lifestyle: {
    smoking: string;
    drinking: string;
    workout: string;
    diet: string;
  };
  isOnline?: boolean;
  lastActive?: string;
  verified?: boolean;
}

export interface Profile extends User {
  preferences: UserPreferences;
  isPremium: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  gender: string[];
  ageRange: {
    min: number;
    max: number;
  };
  distance: number;
  languages?: string[];
}

export type SubscriptionType = 'free' | 'premium';

// ============================================================================
// MATCH TYPES
// ============================================================================

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  matchedAt: string;
  isActive: boolean;
  lastMessageId?: string;
  matchedUser?: User;
}

export interface Like {
  id: string;
  userId: string;
  likedUserId: string;
  likeType: 'like' | 'super_like' | 'pass';
  timestamp: string;
}

export type LikeType = 'like' | 'super_like' | 'pass';

// ============================================================================
// MESSAGE TYPES
// ============================================================================

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  messageType: 'text' | 'image' | 'emoji';
}

export type MessageType = 'text' | 'image' | 'emoji';

export interface Conversation {
  matchId: string;
  user: {
    id: string;
    name: string;
    age: number;
    photos: string[];
    isOnline: boolean;
    verified: boolean;
    lastActive?: string;
  };
  lastMessage: {
    id: string;
    text: string;
    timestamp: string;
    isRead: boolean;
    senderId: string;
  } | null;
  unreadCount: number;
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'like' | 'super_like';
  title: string;
  message: string;
  data: any;
  isRead: boolean;
  timestamp: string;
}

export type NotificationType = 'match' | 'message' | 'like' | 'super_like';

// ============================================================================
// API REQUEST TYPES
// ============================================================================

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface UpdateProfileRequest {
  profile: {
    name?: string;
    age?: number;
    photos?: string[];
    aboutMe?: string;
    occupation?: string;
    education?: string;
    height?: string;
    zodiac?: string;
    interests?: string[];
    smoking?: string;
    drinking?: string;
    location?: {
      city?: string;
      state?: string;
      zipCode?: string;
    };
  };
}

export interface UpdatePreferencesRequest {
  preferences: {
    gender?: string[];
    ageRange?: {
      min: number;
      max: number;
    };
    distance?: number;
  };
}

export interface UpdateSubscriptionRequest {
  subscriptionType: SubscriptionType;
}

export interface SwipeRequest {
  likedUserId: string;
  likeType: LikeType;
}

export interface SendMessageRequest {
  text: string;
  messageType?: MessageType;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    profile: any;
    preferences: UserPreferences;
    subscription: SubscriptionType;
    verified: boolean;
  };
}

export interface SwipeResponse {
  isMatch: boolean;
  matchId: string | null;
  like: Like;
}

export interface UnreadCountResponse {
  count: number;
}

// ============================================================================
// API CLIENT TYPES
// ============================================================================

export interface ApiClientConfig {
  baseURL: string;
  getToken: () => Promise<string | null>;
  onUnauthorized?: () => void;
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

export type ErrorResponse = {
  success: false;
  message: string;
};

export type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

// ============================================================================
// PAGINATION TYPES
// ============================================================================

export interface PaginationParams {
  limit?: number;
  before?: string;
}

export interface NotificationParams extends PaginationParams {
  unreadOnly?: boolean;
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/**
 * Example: Type-safe API call
 * 
 * async function login(username: string, password: string) {
 *   const response = await fetch('/api/auth/login', {
 *     method: 'POST',
 *     body: JSON.stringify({ username, password } as LoginRequest)
 *   });
 *   const data = await response.json() as ApiResponse<LoginResponse>;
 *   if (data.success) {
 *     return data.data;
 *   }
 *   throw new Error(data.message);
 * }
 */
