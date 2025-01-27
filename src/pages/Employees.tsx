import React, { useState } from 'react';
import { EmployeeTable } from '../components/employees/EmployeeTable';
import { Employee } from '../types';

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Engineering',
    position: 'Senior Developer',
    joiningDate: '2023-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    department: 'HR',
    position: 'HR Manager',
    joiningDate: '2023-02-01',
    status: 'active'
  },
  // Add more mock data as needed
];

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

  const handleEdit = (employee: Employee) => {
    // Implement edit functionality
    console.log('Edit employee:', employee);
  };

  const handleDelete = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}