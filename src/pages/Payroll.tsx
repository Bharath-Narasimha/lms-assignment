import React, { useState } from 'react';
import { PayrollManagement } from '../components/payroll/PayrollManagement';

const mockPayrollRecords = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'John Doe',
    basicSalary: 5000,
    allowances: 500,
    deductions: 200,
    netSalary: 5300,
    paymentDate: '2024-03-01',
    status: 'processed' as const
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Jane Smith',
    basicSalary: 6000,
    allowances: 600,
    deductions: 250,
    netSalary: 6350,
    paymentDate: '2024-03-01',
    status: 'pending' as const
  },
  // Add more mock data as needed
];

export function PayrollPage() {
  const [records, setRecords] = useState(mockPayrollRecords);

  const handleGeneratePayslip = (id: string) => {
    // Implement payslip generation logic
    console.log('Generate payslip for:', id);
  };

  const handleProcessPayroll = (id: string) => {
    setRecords(records.map(record =>
      record.id === id
        ? { ...record, status: 'processed' as const }
        : record
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Payroll Management</h1>
      <PayrollManagement
        records={records}
        onGeneratePayslip={handleGeneratePayslip}
        onProcessPayroll={handleProcessPayroll}
      />
    </div>
  );
}