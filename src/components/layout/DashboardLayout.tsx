import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  DollarSign,
  Settings,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { User } from '../../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

export function DashboardLayout({ children, user, onLogout }: DashboardLayoutProps) {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: Users, label: 'Employees', to: '/employees' },
    { icon: Calendar, label: 'Attendance', to: '/attendance' },
    { icon: ClipboardList, label: 'Leave Management', to: '/leaves' },
    { icon: DollarSign, label: 'Payroll', to: '/payroll' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">HR System</h2>
          <p className="text-sm text-gray-600 mt-1">{user.name}</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition duration-200 ${
                    location.pathname === item.to
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition duration-200 w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}