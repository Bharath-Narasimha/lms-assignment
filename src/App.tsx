import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { EmployeesPage } from './pages/Employees';
import { AttendancePage } from './pages/Attendance';
import { LeavesPage } from './pages/Leaves';
import { PayrollPage } from './pages/Payroll';
import { SettingsPage } from './pages/Settings';
import { AuthState } from './types';

function App() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null
  });

  const handleLogin = async (email: string, password: string) => {
    setAuth(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      setAuth({
        user: {
          id: '1',
          email,
          name: 'John Doe',
          role: 'admin'
        },
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuth(prev => ({
        ...prev,
        isLoading: false,
        error: 'Invalid credentials'
      }));
    }
  };

  const handleLogout = () => {
    setAuth({
      user: null,
      isLoading: false,
      error: null
    });
  };

  // Protected Route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!auth.user) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          auth.user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginForm onSubmit={handleLogin} error={auth.error || undefined} />
          )
        } />
        
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout user={auth.user!} onLogout={handleLogout}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* KPI Cards */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">Total Employees</h3>
                  <p className="text-3xl font-bold text-blue-600 mt-2">150</p>
                  <p className="text-sm text-gray-600 mt-1">+12 this month</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">Present Today</h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">142</p>
                  <p className="text-sm text-gray-600 mt-1">95% attendance</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">Pending Leaves</h3>
                  <p className="text-3xl font-bold text-orange-600 mt-2">8</p>
                  <p className="text-sm text-gray-600 mt-1">Requires attention</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition duration-200">
                    Add New Employee
                  </button>
                  <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition duration-200">
                    Mark Attendance
                  </button>
                  <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition duration-200">
                    Review Leaves
                  </button>
                  <button className="p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition duration-200">
                    Generate Payroll
                  </button>
                </div>
              </div>
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout user={auth.user!} onLogout={handleLogout}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* KPI Cards */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">Total Employees</h3>
                  <p className="text-3xl font-bold text-blue-600 mt-2">150</p>
                  <p className="text-sm text-gray-600 mt-1">+12 this month</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">Present Today</h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">142</p>
                  <p className="text-sm text-gray-600 mt-1">95% attendance</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">Pending Leaves</h3>
                  <p className="text-3xl font-bold text-orange-600 mt-2">8</p>
                  <p className="text-sm text-gray-600 mt-1">Requires attention</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition duration-200">
                    Add New Employee
                  </button>
                  <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition duration-200">
                    Mark Attendance
                  </button>
                  <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition duration-200">
                    Review Leaves
                  </button>
                  <button className="p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition duration-200">
                    Generate Payroll
                  </button>
                </div>
              </div>
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/employees" element={
          <ProtectedRoute>
            <DashboardLayout user={auth.user!} onLogout={handleLogout}>
              <EmployeesPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/attendance" element={
          <ProtectedRoute>
            <DashboardLayout user={auth.user!} onLogout={handleLogout}>
              <AttendancePage />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/leaves" element={
          <ProtectedRoute>
            <DashboardLayout user={auth.user!} onLogout={handleLogout}>
              <LeavesPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/payroll" element={
          <ProtectedRoute>
            <DashboardLayout user={auth.user!} onLogout={handleLogout}>
              <PayrollPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <DashboardLayout user={auth.user!} onLogout={handleLogout}>
              <SettingsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;