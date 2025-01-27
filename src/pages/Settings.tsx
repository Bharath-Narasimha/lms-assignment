import React from 'react';
import { Settings as SettingsComponent } from '../components/settings/Settings';

const mockCompanySettings = {
  name: 'TechCorp Inc.',
  address: '123 Tech Street, Silicon Valley, CA 94025',
  email: 'contact@techcorp.com',
  phone: '+1 (555) 123-4567',
  taxId: 'TC-12345678'
};

export function SettingsPage() {
  const handleSave = (settings: typeof mockCompanySettings) => {
    // Implement settings save logic
    console.log('Save settings:', settings);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      <SettingsComponent
        companySettings={mockCompanySettings}
        onSave={handleSave}
      />
    </div>
  );
}