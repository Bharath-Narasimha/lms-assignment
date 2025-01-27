import React, { useState } from 'react';
import { Download, FileText, DollarSign, Calendar } from 'lucide-react';

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  paymentDate: string;
  status: 'pending' | 'processed' | 'paid';
}

interface PayrollManagementProps {
  records: PayrollRecord[];
  onGeneratePayslip: (id: string) => void;
  onProcessPayroll: (id: string) => void;
}

export function PayrollManagement({ records, onGeneratePayslip, onProcessPayroll }: PayrollManagementProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const filteredRecords = records.filter(record => 
    record.paymentDate.startsWith(selectedMonth)
  );

  const totalPayroll = filteredRecords.reduce((sum, record) => sum + record.netSalary, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Total Payroll</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            ${totalPayroll.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mt-1">for {selectedMonth}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Processed</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {filteredRecords.filter(r => r.status === 'processed').length}
          </p>
          <p className="text-sm text-gray-600 mt-1">payslips generated</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {filteredRecords.filter(r => r.status === 'pending').length}
          </p>
          <p className="text-sm text-gray-600 mt-1">to be processed</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allowances
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      ${record.basicSalary.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      ${record.allowances.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      ${record.deductions.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${record.netSalary.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'processed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onGeneratePayslip(record.id)}
                        className="p-1 text-blue-600 hover:text-blue-900"
                        title="Generate Payslip"
                      >
                        <FileText size={18} />
                      </button>
                      {record.status === 'pending' && (
                        <button
                          onClick={() => onProcessPayroll(record.id)}
                          className="p-1 text-green-600 hover:text-green-900"
                          title="Process Payroll"
                        >
                          <DollarSign size={18} />
                        </button>
                      )}
                      {record.status === 'processed' && (
                        <button
                          onClick={() => onGeneratePayslip(record.id)}
                          className="p-1 text-purple-600 hover:text-purple-900"
                          title="Download Payslip"
                        >
                          <Download size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}