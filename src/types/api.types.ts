// API request and response types
export interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  fullName?: string;
  password?: string;
  avatar?: File | null;
}

export interface User {
  id: string;
  email: string;
  user_metadata: {
    fullName: string;
    avatar: string;
  };
}

// Query and filter types
export interface FilterOption {
  filterField: string;
  value: string | number;
  method?: "eq" | "neq" | "gt" | "gte" | "lt" | "lte";
}

export interface SortOption {
  field: string;
  direction: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
}

// Form data types
export interface CabinFormData {
  id?: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File | string;
}

export interface GetTodayOptions {
  end?: boolean;
}

// Form data types for authentication
export interface SignupFormData {
  email: string;
  password: string;
  fullName: string;
  passwordConfirm: string;
}

export interface UpdatePasswordFormData {
  password: string;
  passwordConfirm: string;
}