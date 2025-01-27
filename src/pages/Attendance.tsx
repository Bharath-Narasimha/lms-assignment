import React, { useState } from 'react';
import { AttendanceLog } from '../components/attendance/AttendanceLog';

const mockAttendanceRecords = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'John Doe',
    date: '2024-03-14',
    timeIn: '09:00',
    timeOut: '17:00',
    status: 'present' as const
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Jane Smith',
    date: '2024-03-14',
    timeIn: '09:15',
    timeOut: '17:30',
    status: 'late' as const
  },
  // Add more mock data as needed
];

export function AttendancePage() {
  const [records, setRecords] = useState(mockAttendanceRecords);

  const handleMarkAttendance = (employeeId: string, status: 'present' | 'absent' | 'late') => {
    setRecords(records.map(record =>
      record.employeeId === employeeId
        ? { ...record, status }
        : record
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
      <AttendanceLog
        records={records}
        onMarkAttendance={handleMarkAttendance}
      />
    </div>
  );
}