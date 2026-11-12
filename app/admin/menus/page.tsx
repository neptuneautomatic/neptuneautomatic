'use client';

import React, { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/adminApi';

interface MenuItem {
  id?: string;
  title: string;
  url: string;
  order: number;
  target?: string;
}

interface Menu {
  id: string;
  name: string;
  location: string;
  items: MenuItem[];
}

export default function AdminMenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuName, setMenuName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  // New item inputs
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('/');

  const fetchMenus = async () => {
    try {
      const res = await adminFetch('/api/menus/');
      if (res.ok) {
        const data = await res.json();
        const loadedMenus = data.menus || [];
        setMenus(loadedMenus);
        if (loadedMenus.length > 0 && !selectedMenuId) {
          selectMenu(loadedMenus[0]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const selectMenu = (m: Menu) => {
    setSelectedMenuId(m.id);
    setMenuName(m.name);
    setMenuItems([...(m.items || [])]);
  };

  const handleMenuSelectChange = (id: string) => {
    const found = menus.find((m) => m.id === id);
    if (found) selectMenu(found);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...menuItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // Reassign order
    newItems.forEach((item, idx) => {
      item.order = idx;
    });

    setMenuItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = menuItems.filter((_, idx) => idx !== index);
    newItems.forEach((item, idx) => {
      item.order = idx;
    });
    setMenuItems(newItems);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim() || !newItemUrl.trim()) return;

    const newItem: MenuItem = {
      title: newItemTitle.trim(),
      url: newItemUrl.trim(),
      order: menuItems.length,
      target: '_self',
    };

    setMenuItems([...menuItems, newItem]);
    setNewItemTitle('');
    setNewItemUrl('/');
  };

  const handleSaveMenu = async () => {
    setSaving(true);
    setFeedback('');

    try {
      const res = await adminFetch('/api/menus/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedMenuId,
          name: menuName,
          items: menuItems,
        }),
      });

      if (res.ok) {
        setFeedback('Menu structure saved successfully!');
        await fetchMenus();
      } else {
        const d = await res.json();
        setFeedback(d.error || 'Failed to save menu');
      }
    } catch {
      setFeedback('Error connecting to server');
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>Loading menus...</div>;
  }

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Navigation Menus
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Configure header and footer navigation links, hierarchy, and ordering
          </p>
        </div>
      </div>

      {/* Menu Selector Banner */}
      <div className="admin-card" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label className="admin-label" style={{ margin: 0 }}>Select Menu to Edit:</label>
          <select
            value={selectedMenuId}
            onChange={(e) => handleMenuSelectChange(e.target.value)}
            className="admin-select"
            style={{ width: '260px' }}
          >
            {menus.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.location})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSaveMenu}
          disabled={saving}
          className="admin-btn admin-btn-primary"
        >
          {saving ? 'Saving...' : 'Save Menu Changes'}
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

      {/* 2-Column Menu Editor */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Column: Add Menu Items */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Add Menu Item</h3>
          </div>

          <form onSubmit={handleAddItem}>
            <div className="admin-form-group">
              <label className="admin-label">Navigation Label *</label>
              <input
                type="text"
                required
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                placeholder="e.g. Products or About Us"
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Destination URL *</label>
              <input
                type="text"
                required
                value={newItemUrl}
                onChange={(e) => setNewItemUrl(e.target.value)}
                placeholder="/products or /about"
                className="admin-input"
              />
            </div>

            <button type="submit" className="admin-btn admin-btn-secondary" style={{ width: '100%' }}>
              + Add to Menu
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid #E5E7EB', paddingTop: '1rem', fontSize: '0.8rem', color: '#6B7280' }}>
            <div style={{ fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>Quick Suggested Links:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <button
                type="button"
                onClick={() => { setNewItemTitle('Home'); setNewItemUrl('/'); }}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: '#01358b', cursor: 'pointer', padding: 0 }}
              >
                + Home (/)
              </button>
              <button
                type="button"
                onClick={() => { setNewItemTitle('About Us'); setNewItemUrl('/about'); }}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: '#01358b', cursor: 'pointer', padding: 0 }}
              >
                + About Us (/about)
              </button>
              <button
                type="button"
                onClick={() => { setNewItemTitle('Products'); setNewItemUrl('/products'); }}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: '#01358b', cursor: 'pointer', padding: 0 }}
              >
                + Products (/products)
              </button>
              <button
                type="button"
                onClick={() => { setNewItemTitle('Blog'); setNewItemUrl('/blog'); }}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: '#01358b', cursor: 'pointer', padding: 0 }}
              >
                + Blog (/blog)
              </button>
              <button
                type="button"
                onClick={() => { setNewItemTitle('Contact'); setNewItemUrl('/contact'); }}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: '#01358b', cursor: 'pointer', padding: 0 }}
              >
                + Contact (/contact)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Menu Structure & Reordering */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Menu Structure ({menuItems.length} Links)</h3>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
              Use arrows to reorder items
            </span>
          </div>

          {menuItems.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF', fontSize: '0.85rem' }}>
              No links in this menu yet. Add items using the left form.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: '#E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#4B5563'
                    }}>
                      {idx + 1}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.88rem' }}>
                        {item.title}
                      </div>
                      <code style={{ fontSize: '0.75rem', color: '#01358b' }}>
                        {item.url}
                      </code>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveItem(idx, 'up')}
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={idx === menuItems.length - 1}
                      onClick={() => moveItem(idx, 'down')}
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      title="Move Down"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
