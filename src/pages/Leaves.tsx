import React, { useState } from 'react';
import { LeaveManagement } from '../components/leaves/LeaveManagement';

const mockLeaveRequests = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'John Doe',
    type: 'annual' as const,
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    status: 'pending' as const,
    reason: 'Family vacation'
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Jane Smith',
    type: 'sick' as const,
    startDate: '2024-03-15',
    endDate: '2024-03-16',
    status: 'approved' as const,
    reason: 'Medical appointment'
  },
  // Add more mock data as needed
];

const mockLeaveBalance = {
  annual: 15,
  sick: 10,
  personal: 5
};

export function LeavesPage() {
  const [requests, setRequests] = useState(mockLeaveRequests);

  const handleApprove = (id: string) => {
    setRequests(requests.map(request =>
      request.id === id
        ? { ...request, status: 'approved' as const }
        : request
    ));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(request =>
      request.id === id
        ? { ...request, status: 'rejected' as const }
        : request
    ));
  };

  const handleSubmit = (request: Omit<typeof mockLeaveRequests[0], 'id' | 'status'>) => {
    setRequests([
      ...requests,
      {
        ...request,
        id: (requests.length + 1).toString(),
        status: 'pending'
      }
    ]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Leave Management</h1>
      <LeaveManagement
        requests={requests}
        balance={mockLeaveBalance}
        onApprove={handleApprove}
        onReject={handleReject}
        onSubmit={handleSubmit}
      />
    </div>
  );
}