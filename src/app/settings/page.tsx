'use client';

import BaseTemplate from '@/components/BaseTemplate';

export default function SettingsPage() {
  return (
    <BaseTemplate title="Settings" showBackButton>
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Settings</h2>
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          App settings and configuration options will be available here.
        </p>
      </div>
    </BaseTemplate>
  );
}
