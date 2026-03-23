export interface Tweet {
  id?: number;
  text: string;
  topic: string;
  createdAt?: string;
}

export interface Favorite {
  id: number;
  tweetText: string;
  topic: string;
  createdAt: string;
}

export interface User {
  id?: string;
  email?: string;
  isPremium?: boolean;
  usageCount?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GenerateRequest {
  topic: string;
}

export interface GenerateResponse {
  tweets: string[];
  usageCount: number;
  isPremium: boolean;
}