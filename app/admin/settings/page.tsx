'use client';

import React, { useEffect, useState } from 'react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'social' | 'system'>('general');
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings || {});
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback('');

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      if (res.ok) {
        setFeedback('Settings updated successfully!');
      } else {
        const d = await res.json();
        setFeedback(d.error || 'Failed to save settings');
      }
    } catch {
      setFeedback('Error connecting to server');
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>Loading settings...</div>;
  }

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Website Settings & Appearance
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Configure corporate contact details, brand logos, social presence, and system parameters
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn admin-btn-primary"
        >
          {saving ? 'Saving Settings...' : 'Save All Settings'}
        </button>
      </div>

      {feedback && (
        <div style={{
          padding: '0.75rem 1.25rem',
          borderRadius: 8,
          marginBottom: '1.25rem',
          fontSize: '0.85rem',
          backgroundColor: feedback.includes('success') ? '#DCFCE7' : '#FEE2E2',
          color: feedback.includes('success') ? '#15803D' : '#B91C1C'
        }}>
          {feedback}
        </div>
      )}

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab('general')}
          className={`admin-tab ${activeTab === 'general' ? 'is-active' : ''}`}
        >
          General & Branding
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`admin-tab ${activeTab === 'contact' ? 'is-active' : ''}`}
        >
          Contact & Locations
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`admin-tab ${activeTab === 'social' ? 'is-active' : ''}`}
        >
          Social Media Links
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`admin-tab ${activeTab === 'system' ? 'is-active' : ''}`}
        >
          System & Notifications
        </button>
      </div>

      {/* Tab 1: General & Branding */}
      {activeTab === 'general' && (
        <div className="admin-card" style={{ maxWidth: '780px' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">Corporate Identity & Appearance</h3>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Company / Website Name</label>
            <input
              type="text"
              value={settings['site_title'] || 'Neptune Automatic Pvt. Ltd.'}
              onChange={(e) => handleChange('site_title', e.target.value)}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Tagline</label>
            <input
              type="text"
              value={settings['site_tagline'] || 'Engineering Excellence in Industrial Automation & Washing Systems'}
              onChange={(e) => handleChange('site_tagline', e.target.value)}
              className="admin-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Primary Brand Color</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={settings['brand_color_primary'] || '#01358b'}
                  onChange={(e) => handleChange('brand_color_primary', e.target.value)}
                  style={{ width: 42, height: 38, border: 'none', borderRadius: 4, cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={settings['brand_color_primary'] || '#01358b'}
                  onChange={(e) => handleChange('brand_color_primary', e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Accent Red Color</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={settings['brand_color_accent'] || '#D32628'}
                  onChange={(e) => handleChange('brand_color_accent', e.target.value)}
                  style={{ width: 42, height: 38, border: 'none', borderRadius: 4, cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={settings['brand_color_accent'] || '#D32628'}
                  onChange={(e) => handleChange('brand_color_accent', e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Logo Path / URL</label>
            <input
              type="text"
              value={settings['logo_url'] || '/assets/images/logo/logo.png'}
              onChange={(e) => handleChange('logo_url', e.target.value)}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Footer Copyright Notice</label>
            <input
              type="text"
              value={settings['footer_copyright'] || '© 2026 Neptune Automatic Pvt. Ltd. All Rights Reserved.'}
              onChange={(e) => handleChange('footer_copyright', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Contact Info */}
      {activeTab === 'contact' && (
        <div className="admin-card" style={{ maxWidth: '780px' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">Corporate Contact & Head Office</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Official Email Address</label>
              <input
                type="email"
                value={settings['contact_email'] || 'info@neptuneautomatic.com'}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Primary Phone / Toll Free</label>
              <input
                type="text"
                value={settings['contact_phone'] || '+91 11 4100 4100'}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Headquarters Address</label>
            <textarea
              rows={3}
              value={settings['contact_address'] || 'Neptune Automatic Pvt. Ltd., Plot No. 12, Okhla Industrial Area, Phase-III, New Delhi - 110020, India'}
              onChange={(e) => handleChange('contact_address', e.target.value)}
              className="admin-textarea"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Operating Hours</label>
            <input
              type="text"
              value={settings['contact_hours'] || 'Mon - Sat: 9:00 AM - 6:30 PM (IST)'}
              onChange={(e) => handleChange('contact_hours', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Social Media */}
      {activeTab === 'social' && (
        <div className="admin-card" style={{ maxWidth: '780px' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">Social Media Profiles</h3>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">LinkedIn Company Page</label>
            <input
              type="text"
              value={settings['social_linkedin'] || 'https://www.linkedin.com/company/neptune-automatic'}
              onChange={(e) => handleChange('social_linkedin', e.target.value)}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">YouTube Channel</label>
            <input
              type="text"
              value={settings['social_youtube'] || 'https://www.youtube.com/@neptuneautomatic'}
              onChange={(e) => handleChange('social_youtube', e.target.value)}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Facebook Profile</label>
            <input
              type="text"
              value={settings['social_facebook'] || 'https://www.facebook.com/neptuneautomatic'}
              onChange={(e) => handleChange('social_facebook', e.target.value)}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Twitter / X Profile</label>
            <input
              type="text"
              value={settings['social_twitter'] || 'https://twitter.com/neptuneauto'}
              onChange={(e) => handleChange('social_twitter', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
      )}

      {/* Tab 4: System & Notifications */}
      {activeTab === 'system' && (
        <div className="admin-card" style={{ maxWidth: '780px' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">System & Notifications Routing</h3>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Inquiry Notification Recipient Email</label>
            <input
              type="email"
              value={settings['inquiry_notify_email'] || 'sales@neptuneautomatic.com'}
              onChange={(e) => handleChange('inquiry_notify_email', e.target.value)}
              className="admin-input"
            />
            <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '4px 0 0 0' }}>
              All customer inquiries and RFQ submissions will notify this email address.
            </p>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Maintenance Mode</label>
            <select
              value={settings['maintenance_mode'] || 'disabled'}
              onChange={(e) => handleChange('maintenance_mode', e.target.value)}
              className="admin-select"
            >
              <option value="disabled">Disabled (Site is Live)</option>
              <option value="enabled">Enabled (Display Maintenance Screen)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
