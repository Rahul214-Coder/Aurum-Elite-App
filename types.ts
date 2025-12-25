
export type Role = 'ADMIN' | 'EDITOR';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  avatar: string;
}

export interface UserAccount extends User {
  passwordHash: string; // Simulated encrypted password
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Category {
  id: string;
  name: string;
  productCount?: number;
  createdAt: number;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  categoryId: string;
  categoryName?: string;
  createdAt: number;
  updatedAt?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy: 'price' | 'name' | 'createdAt';
  order: 'asc' | 'desc';
  search: string;
  categoryId?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface JobStatus {
  id: string;
  type: 'UPLOAD' | 'REPORT' | 'GENERATE';
  progress: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  resultUrl?: string;
  message?: string;
}
