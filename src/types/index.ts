export interface User {
  id: string;
  email: string;
  role: 'admin' | 'hr' | 'employee';
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joiningDate: string;
  status: 'active' | 'inactive';
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}