"use client";

import React, { useEffect, useState } from 'react';
import { Save, Plus, X, Home as HomeIcon, CheckCircle2 } from 'lucide-react';
import AdminShell from '../../../components/admin/AdminShell';
import ImageUploader from '../../../components/admin/ImageUploader';
import AdminLoader from '../../../components/admin/AdminLoader';

const TABS = [
  { key: 'topbar', label: 'Top Announcement Bar' },
  { key: 'hero', label: 'Hero Section' },
  { key: 'quick_services', label: 'Quick Services' },
  { key: 'bike_ad', label: 'Bike Fleet Ad' },
  { key: 'packages_header', label: 'Tour Packages' },
  { key: 'why_choose_us', label: 'Why Choose Us' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'cta_banner', label: 'CTA Banner' },
  { key: 'footer', label: 'Footer' },
];

const DEFAULTS = {
  topbar: { announcements: [] },
  hero: {
    trustBadgeText: '', titleLine1: '', titleLine2: '', subtitle: '',
    backgroundImage: '', banners: [], badges: [], primaryButtonText: '', secondaryButtonText: '',
  },
  quick_services: { items: [] },
  bike_ad: {
    badgeText: '', title: '', subtitle: '', bottomTitle: '', bottomSubtitle: '',
    primaryButtonText: '', secondaryButtonText: '',
  },
  packages_header: { badgeText: '', title: '', subtitle: '', buttonText: '' },
  why_choose_us: { heading: '', brandLine: '', items: [] },
  reviews: {
    eyebrow: '', title: '', googleRating: '', googleReviewsCount: '', googleMapsUrl: '', items: [],
  },
  cta_banner: {
    tagText: '', title: '', description: '', backgroundImage: '',
    primaryButtonText: '', whatsappButtonText: '',
  },
  footer: {
    tagline: '', newsletterTitle: '', newsletterSubtitle: '', copyrightText: '',
  },
};

function SavedTick({ show }) {
  if (!show) return null;
  return (
    <span style={{ color: '#16A34A', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <CheckCircle2 size={14} /> Saved
    </span>
  );
}

export default function AdminHomepagePage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [sections, setSections] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedTab, setSavedTab] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/home-content');
        const json = await res.json();
        setSections({ ...DEFAULTS, ...json.sections });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateSection = (key, data) => {
    setSections((prev) => ({ ...prev, [key]: data }));
  };

  const handleSave = async (key) => {
    setSaving(true);
    setError('');
    setSavedTab('');
    try {
      const res = await fetch('/api/admin/home-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section_key: key, data: sections[key] }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save.');
      setSavedTab(key);
      setTimeout(() => setSavedTab(''), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminShell title="Homepage Content" subtitle="Customize the sections shown on your homepage.">
        <AdminLoader label="Loading homepage content..." />
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Homepage Content" subtitle="Customize the text, images and buttons shown on your homepage — changes go live instantly.">
      <div className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`admin-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && <div className="admin-error-box">{error}</div>}

      {activeTab === 'topbar' && (
        <TopBarEditor data={sections.topbar} onChange={(d) => updateSection('topbar', d)} onSave={() => handleSave('topbar')} saving={saving} saved={savedTab === 'topbar'} />
      )}
      {activeTab === 'hero' && (
        <HeroEditor data={sections.hero} onChange={(d) => updateSection('hero', d)} onSave={() => handleSave('hero')} saving={saving} saved={savedTab === 'hero'} />
      )}
      {activeTab === 'quick_services' && (
        <QuickServicesEditor data={sections.quick_services} onChange={(d) => updateSection('quick_services', d)} onSave={() => handleSave('quick_services')} saving={saving} saved={savedTab === 'quick_services'} />
      )}
      {activeTab === 'bike_ad' && (
        <BikeAdEditor data={sections.bike_ad} onChange={(d) => updateSection('bike_ad', d)} onSave={() => handleSave('bike_ad')} saving={saving} saved={savedTab === 'bike_ad'} />
      )}
      {activeTab === 'packages_header' && (
        <PackagesHeaderEditor data={sections.packages_header} onChange={(d) => updateSection('packages_header', d)} onSave={() => handleSave('packages_header')} saving={saving} saved={savedTab === 'packages_header'} />
      )}
      {activeTab === 'why_choose_us' && (
        <WhyChooseEditor data={sections.why_choose_us} onChange={(d) => updateSection('why_choose_us', d)} onSave={() => handleSave('why_choose_us')} saving={saving} saved={savedTab === 'why_choose_us'} />
      )}
      {activeTab === 'reviews' && (
        <ReviewsEditor data={sections.reviews} onChange={(d) => updateSection('reviews', d)} onSave={() => handleSave('reviews')} saving={saving} saved={savedTab === 'reviews'} />
      )}
      {activeTab === 'cta_banner' && (
        <CtaBannerEditor data={sections.cta_banner} onChange={(d) => updateSection('cta_banner', d)} onSave={() => handleSave('cta_banner')} saving={saving} saved={savedTab === 'cta_banner'} />
      )}
      {activeTab === 'footer' && (
        <FooterEditor data={sections.footer} onChange={(d) => updateSection('footer', d)} onSave={() => handleSave('footer')} saving={saving} saved={savedTab === 'footer'} />
      )}
    </AdminShell>
  );
}

function SectionCard({ title, onSave, saving, saved, children }) {
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <span className="admin-card-title">{title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <SavedTick show={saved} />
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={onSave} disabled={saving}>
            <Save size={14} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
      <div className="admin-card-body">{children}</div>
    </div>
  );
}

function HeroEditor({ data, onChange, onSave, saving, saved }) {
  const set = (key, value) => onChange({ ...data, [key]: value });
  const banners = data.banners || [];

  const updateBadge = (idx, value) => {
    const badges = [...(data.badges || [])];
    badges[idx] = { ...badges[idx], label: value };
    set('badges', badges);
  };
  const addBadge = () => set('badges', [...(data.badges || []), { label: '', icon: 'ShieldCheck' }]);
  const removeBadge = (idx) => set('badges', (data.badges || []).filter((_, i) => i !== idx));

  const updateBanner = (idx, field, value) => {
    const updated = [...banners];
    updated[idx] = { ...updated[idx], [field]: value };
    set('banners', updated);
  };
  const addBanner = () => set('banners', [...banners, { id: Date.now(), image: '', titleLine1: '', titleLine2: '', subtitle: '' }]);
  const removeBanner = (idx) => set('banners', banners.filter((_, i) => i !== idx));

  return (
    <SectionCard title="Hero Section (Homepage Top Banner)" onSave={onSave} saving={saving} saved={saved}>
      <div className="admin-form-group">
        <label className="admin-form-label">Trust Ribbon Text</label>
        <input className="admin-input" value={data.trustBadgeText || ''} onChange={(e) => set('trustBadgeText', e.target.value)} placeholder="e.g. 4.9/5 Rated • 5,000+ Happy Riders" />
      </div>

      <div className="admin-form-row-2">
        <div className="admin-form-group">
          <label className="admin-form-label">Title Line 1 (Default)</label>
          <input className="admin-input" value={data.titleLine1 || ''} onChange={(e) => set('titleLine1', e.target.value)} />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Title Line 2 (Default, Orange Highlight)</label>
          <input className="admin-input" value={data.titleLine2 || ''} onChange={(e) => set('titleLine2', e.target.value)} />
        </div>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Subtitle (Default)</label>
        <textarea className="admin-textarea" value={data.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} />
      </div>
      <p className="admin-helper-text" style={{ marginBottom: '4px' }}>
        This title/subtitle is used whenever a banner below doesn't have its own text.
      </p>

      <hr className="admin-section-divider" />

      <label className="admin-form-label">Hero Banner Slider</label>
      <p className="admin-helper-text" style={{ marginBottom: '12px' }}>
        Add multiple banners to auto-rotate them (infinite loop, ~5s per slide) — each banner can have its own image, title and description that change together as it slides. Leave a banner's text blank to fall back to the default title/subtitle above. If no banners are added, the single fallback image below is used with the default text.
      </p>
      {banners.map((banner, idx) => (
        <div key={banner.id || idx} className="admin-repeat-card">
          <div className="admin-repeat-card-head">
            <span>Banner {idx + 1}</span>
            <button type="button" className="admin-icon-remove" onClick={() => removeBanner(idx)}><X size={14} /></button>
          </div>
          <div className="admin-form-group">
            <ImageUploader label="Banner Image" value={banner.image} onChange={(url) => updateBanner(idx, 'image', url)} />
          </div>
          <div className="admin-form-row-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Title Line 1</label>
              <input className="admin-input" value={banner.titleLine1 || ''} onChange={(e) => updateBanner(idx, 'titleLine1', e.target.value)} placeholder={data.titleLine1 || 'Uses default'} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Title Line 2 (Orange Highlight)</label>
              <input className="admin-input" value={banner.titleLine2 || ''} onChange={(e) => updateBanner(idx, 'titleLine2', e.target.value)} placeholder={data.titleLine2 || 'Uses default'} />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Subtitle</label>
            <textarea className="admin-textarea" value={banner.subtitle || ''} onChange={(e) => updateBanner(idx, 'subtitle', e.target.value)} placeholder={data.subtitle || 'Uses default'} />
          </div>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addBanner} style={{ marginBottom: '16px' }}>
        <Plus size={13} /><span>Add Banner</span>
      </button>

      <div className="admin-form-group">
        <ImageUploader label="Fallback Background Image (used only when no banners are added above)" value={data.backgroundImage} onChange={(url) => set('backgroundImage', url)} />
      </div>

      <div className="admin-form-row-2">
        <div className="admin-form-group">
          <label className="admin-form-label">Primary Button Text</label>
          <input className="admin-input" value={data.primaryButtonText || ''} onChange={(e) => set('primaryButtonText', e.target.value)} />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Secondary Button Text</label>
          <input className="admin-input" value={data.secondaryButtonText || ''} onChange={(e) => set('secondaryButtonText', e.target.value)} />
        </div>
      </div>

      <hr className="admin-section-divider" />

      <label className="admin-form-label">Feature Badges</label>
      {(data.badges || []).map((badge, idx) => (
        <div key={idx} className="admin-list-editor-row">
          <input className="admin-input" value={badge.label} onChange={(e) => updateBadge(idx, e.target.value)} placeholder={`Badge ${idx + 1}`} />
          <button type="button" className="admin-icon-remove" onClick={() => removeBadge(idx)}><X size={15} /></button>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addBadge}>
        <Plus size={13} /><span>Add Badge</span>
      </button>
    </SectionCard>
  );
}

function QuickServicesEditor({ data, onChange, onSave, saving, saved }) {
  const items = data.items || [];

  const updateItem = (idx, field, value) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange({ ...data, items: updated });
  };
  const addItem = () => onChange({ ...data, items: [...items, { id: `item-${Date.now()}`, title: '', desc: '', iconType: 'bike', link: '/services' }] });
  const removeItem = (idx) => onChange({ ...data, items: items.filter((_, i) => i !== idx) });

  return (
    <SectionCard title="Quick Services Bar" onSave={onSave} saving={saving} saved={saved}>
      <p className="admin-helper-text" style={{ marginBottom: '16px' }}>These are the quick-access cards shown right below the hero banner.</p>
      {items.map((item, idx) => (
        <div key={item.id || idx} className="admin-repeat-card">
          <div className="admin-repeat-card-head">
            <span>Card {idx + 1}</span>
            <button type="button" className="admin-icon-remove" onClick={() => removeItem(idx)}><X size={14} /></button>
          </div>
          <div className="admin-form-row-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Title</label>
              <input className="admin-input" value={item.title} onChange={(e) => updateItem(idx, 'title', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Icon</label>
              <select className="admin-select" value={item.iconType} onChange={(e) => updateItem(idx, 'iconType', e.target.value)}>
                <option value="bike">Bike</option>
                <option value="car">Car</option>
                <option value="traveler">Compass</option>
                <option value="hotel">Building</option>
                <option value="snow-leopard">Snowflake</option>
                <option value="frozen-lake">Sparkles</option>
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Description</label>
            <input className="admin-input" value={item.desc} onChange={(e) => updateItem(idx, 'desc', e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Link URL</label>
            <input className="admin-input" value={item.link} onChange={(e) => updateItem(idx, 'link', e.target.value)} placeholder="/bikes" />
          </div>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addItem}>
        <Plus size={13} /><span>Add Card</span>
      </button>
    </SectionCard>
  );
}

const WHY_CHOOSE_ICONS = ['Compass', 'Bike', 'ShieldCheck', 'Sun', 'Headphones'];

function WhyChooseEditor({ data, onChange, onSave, saving, saved }) {
  const items = data.items || [];

  const updateItem = (idx, field, value) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange({ ...data, items: updated });
  };
  const addItem = () => onChange({ ...data, items: [...items, { id: `reason-${Date.now()}`, title: '', desc: '', icon: 'Compass' }] });
  const removeItem = (idx) => onChange({ ...data, items: items.filter((_, i) => i !== idx) });

  return (
    <SectionCard title="Why Choose Us Section" onSave={onSave} saving={saving} saved={saved}>
      <div className="admin-form-row-2">
        <div className="admin-form-group">
          <label className="admin-form-label">Heading (Line 1)</label>
          <input className="admin-input" value={data.heading || ''} onChange={(e) => onChange({ ...data, heading: e.target.value })} placeholder="WHY CHOOSE" />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Brand Line (Line 2)</label>
          <input className="admin-input" value={data.brandLine || ''} onChange={(e) => onChange({ ...data, brandLine: e.target.value })} placeholder="BIKER KING ADVENTURE?" />
        </div>
      </div>

      <hr className="admin-section-divider" />

      {items.map((item, idx) => (
        <div key={item.id || idx} className="admin-repeat-card">
          <div className="admin-repeat-card-head">
            <span>Reason {idx + 1}</span>
            <button type="button" className="admin-icon-remove" onClick={() => removeItem(idx)}><X size={14} /></button>
          </div>
          <div className="admin-form-row-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Title</label>
              <input className="admin-input" value={item.title} onChange={(e) => updateItem(idx, 'title', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Icon</label>
              <select className="admin-select" value={item.icon} onChange={(e) => updateItem(idx, 'icon', e.target.value)}>
                {WHY_CHOOSE_ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Description</label>
            <input className="admin-input" value={item.desc} onChange={(e) => updateItem(idx, 'desc', e.target.value)} />
          </div>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addItem}>
        <Plus size={13} /><span>Add Reason</span>
      </button>
    </SectionCard>
  );
}

function CtaBannerEditor({ data, onChange, onSave, saving, saved }) {
  const set = (key, value) => onChange({ ...data, [key]: value });

  return (
    <SectionCard title="Bottom CTA Banner" onSave={onSave} saving={saving} saved={saved}>
      <div className="admin-form-group">
        <label className="admin-form-label">Tag Text</label>
        <input className="admin-input" value={data.tagText || ''} onChange={(e) => set('tagText', e.target.value)} placeholder="e.g. Season 2026 Reservations Active" />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Title</label>
        <input className="admin-input" value={data.title || ''} onChange={(e) => set('title', e.target.value)} />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Description</label>
        <textarea className="admin-textarea" value={data.description || ''} onChange={(e) => set('description', e.target.value)} />
      </div>
      <div className="admin-form-group">
        <ImageUploader label="Background Image" value={data.backgroundImage} onChange={(url) => set('backgroundImage', url)} />
      </div>
      <div className="admin-form-row-2">
        <div className="admin-form-group">
          <label className="admin-form-label">Primary Button Text</label>
          <input className="admin-input" value={data.primaryButtonText || ''} onChange={(e) => set('primaryButtonText', e.target.value)} />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">WhatsApp Button Text</label>
          <input className="admin-input" value={data.whatsappButtonText || ''} onChange={(e) => set('whatsappButtonText', e.target.value)} />
        </div>
      </div>
      <p className="admin-helper-text">The WhatsApp number itself is managed on the Contact Info page and applies everywhere on the site.</p>
    </SectionCard>
  );
}

const TOPBAR_ICONS = ['Flame', 'Sparkles', 'ShieldCheck', 'PhoneCall'];
const TOPBAR_ACTION_TYPES = ['link', 'external', 'booking'];

function TopBarEditor({ data, onChange, onSave, saving, saved }) {
  const items = data.announcements || [];

  const updateItem = (idx, field, value) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange({ ...data, announcements: updated });
  };
  const addItem = () => onChange({
    ...data,
    announcements: [...items, { id: Date.now(), badge: '', icon: 'Flame', desktopText: '', mobileText: '', ctaText: '', actionType: 'link', href: '/services' }],
  });
  const removeItem = (idx) => onChange({ ...data, announcements: items.filter((_, i) => i !== idx) });

  return (
    <SectionCard title="Top Announcement Bar (shown on every page)" onSave={onSave} saving={saving} saved={saved}>
      <p className="admin-helper-text" style={{ marginBottom: '16px' }}>This rotating strip appears at the very top of every page on your website, above the main navigation.</p>
      {items.map((item, idx) => (
        <div key={item.id || idx} className="admin-repeat-card">
          <div className="admin-repeat-card-head">
            <span>Announcement {idx + 1}</span>
            <button type="button" className="admin-icon-remove" onClick={() => removeItem(idx)}><X size={14} /></button>
          </div>
          <div className="admin-form-row-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Badge Text</label>
              <input className="admin-input" value={item.badge} onChange={(e) => updateItem(idx, 'badge', e.target.value)} placeholder="e.g. Season 2026 Deal" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Icon</label>
              <select className="admin-select" value={item.icon} onChange={(e) => updateItem(idx, 'icon', e.target.value)}>
                {TOPBAR_ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Desktop Text</label>
            <input className="admin-input" value={item.desktopText} onChange={(e) => updateItem(idx, 'desktopText', e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Mobile Text (shorter)</label>
            <input className="admin-input" value={item.mobileText} onChange={(e) => updateItem(idx, 'mobileText', e.target.value)} />
          </div>
          <div className="admin-form-row-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Button Text</label>
              <input className="admin-input" value={item.ctaText} onChange={(e) => updateItem(idx, 'ctaText', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Action Type</label>
              <select className="admin-select" value={item.actionType} onChange={(e) => updateItem(idx, 'actionType', e.target.value)}>
                {TOPBAR_ACTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Link URL (or WhatsApp link if external)</label>
            <input className="admin-input" value={item.href} onChange={(e) => updateItem(idx, 'href', e.target.value)} placeholder="/services or https://wa.me/..." />
          </div>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addItem}>
        <Plus size={13} /><span>Add Announcement</span>
      </button>
    </SectionCard>
  );
}

function BikeAdEditor({ data, onChange, onSave, saving, saved }) {
  const set = (key, value) => onChange({ ...data, [key]: value });

  return (
    <SectionCard title="Bike Fleet Advertisement" onSave={onSave} saving={saving} saved={saved}>
      <div className="admin-form-group">
        <label className="admin-form-label">Badge Text</label>
        <input className="admin-input" value={data.badgeText || ''} onChange={(e) => set('badgeText', e.target.value)} />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Title</label>
        <input className="admin-input" value={data.title || ''} onChange={(e) => set('title', e.target.value)} />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Subtitle</label>
        <textarea className="admin-textarea" value={data.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} />
      </div>

      <hr className="admin-section-divider" />

      <p className="admin-helper-text" style={{ marginBottom: '10px' }}>Bottom call-to-action strip (below the 3 featured bikes).</p>
      <div className="admin-form-group">
        <label className="admin-form-label">Bottom Title</label>
        <input className="admin-input" value={data.bottomTitle || ''} onChange={(e) => set('bottomTitle', e.target.value)} />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Bottom Subtitle</label>
        <input className="admin-input" value={data.bottomSubtitle || ''} onChange={(e) => set('bottomSubtitle', e.target.value)} />
      </div>
      <div className="admin-form-row-2">
        <div className="admin-form-group">
          <label className="admin-form-label">Primary Button Text</label>
          <input className="admin-input" value={data.primaryButtonText || ''} onChange={(e) => set('primaryButtonText', e.target.value)} />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Secondary Button Text</label>
          <input className="admin-input" value={data.secondaryButtonText || ''} onChange={(e) => set('secondaryButtonText', e.target.value)} />
        </div>
      </div>
      <p className="admin-helper-text">The 3 featured bike cards themselves pull live from your Bike Fleet data and cannot be edited here.</p>
    </SectionCard>
  );
}

function PackagesHeaderEditor({ data, onChange, onSave, saving, saved }) {
  const set = (key, value) => onChange({ ...data, [key]: value });

  return (
    <SectionCard title="Tour Packages Section Header" onSave={onSave} saving={saving} saved={saved}>
      <div className="admin-form-group">
        <label className="admin-form-label">Badge Text</label>
        <input className="admin-input" value={data.badgeText || ''} onChange={(e) => set('badgeText', e.target.value)} />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Title</label>
        <input className="admin-input" value={data.title || ''} onChange={(e) => set('title', e.target.value)} />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Subtitle</label>
        <textarea className="admin-textarea" value={data.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Bottom Button Text</label>
        <input className="admin-input" value={data.buttonText || ''} onChange={(e) => set('buttonText', e.target.value)} />
      </div>
      <p className="admin-helper-text">The package cards themselves are managed on the Packages page data and cannot be edited here yet.</p>
    </SectionCard>
  );
}

function ReviewsEditor({ data, onChange, onSave, saving, saved }) {
  const items = data.items || [];

  const updateItem = (idx, field, value) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange({ ...data, items: updated });
  };
  const addItem = () => onChange({
    ...data,
    items: [...items, { id: Date.now(), name: '', location: '', trip: '', rating: 5, avatar: '', verified: true, review: '' }],
  });
  const removeItem = (idx) => onChange({ ...data, items: items.filter((_, i) => i !== idx) });

  return (
    <SectionCard title="Rider Reviews / Testimonials" onSave={onSave} saving={saving} saved={saved}>
      <div className="admin-form-row-2">
        <div className="admin-form-group">
          <label className="admin-form-label">Eyebrow Text</label>
          <input className="admin-input" value={data.eyebrow || ''} onChange={(e) => onChange({ ...data, eyebrow: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Section Title</label>
          <input className="admin-input" value={data.title || ''} onChange={(e) => onChange({ ...data, title: e.target.value })} />
        </div>
      </div>

      <div className="admin-form-row-2">
        <div className="admin-form-group">
          <label className="admin-form-label">Google Rating</label>
          <input className="admin-input" value={data.googleRating || ''} onChange={(e) => onChange({ ...data, googleRating: e.target.value })} placeholder="4.9" />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Google Reviews Count Text</label>
          <input className="admin-input" value={data.googleReviewsCount || ''} onChange={(e) => onChange({ ...data, googleReviewsCount: e.target.value })} placeholder="(350+ Reviews in Leh)" />
        </div>
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Google Maps Reviews Link</label>
        <input className="admin-input" value={data.googleMapsUrl || ''} onChange={(e) => onChange({ ...data, googleMapsUrl: e.target.value })} />
      </div>

      <hr className="admin-section-divider" />

      {items.map((item, idx) => (
        <div key={item.id || idx} className="admin-repeat-card">
          <div className="admin-repeat-card-head">
            <span>Review {idx + 1}</span>
            <button type="button" className="admin-icon-remove" onClick={() => removeItem(idx)}><X size={14} /></button>
          </div>
          <div className="admin-form-row-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Rider Name</label>
              <input className="admin-input" value={item.name} onChange={(e) => updateItem(idx, 'name', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Location</label>
              <input className="admin-input" value={item.location} onChange={(e) => updateItem(idx, 'location', e.target.value)} />
            </div>
          </div>
          <div className="admin-form-row-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Trip Name</label>
              <input className="admin-input" value={item.trip} onChange={(e) => updateItem(idx, 'trip', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Rating (1-5)</label>
              <input type="number" min="1" max="5" className="admin-input" value={item.rating} onChange={(e) => updateItem(idx, 'rating', Number(e.target.value))} />
            </div>
          </div>
          <div className="admin-form-group">
            <ImageUploader label="Rider Photo" value={item.avatar} onChange={(url) => updateItem(idx, 'avatar', url)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Review Text</label>
            <textarea className="admin-textarea" value={item.review} onChange={(e) => updateItem(idx, 'review', e.target.value)} />
          </div>
          <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id={`verified-${idx}`}
              checked={!!item.verified}
              onChange={(e) => updateItem(idx, 'verified', e.target.checked)}
              style={{ width: '17px', height: '17px' }}
            />
            <label htmlFor={`verified-${idx}`} style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
              Show "Verified Rider" badge
            </label>
          </div>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addItem}>
        <Plus size={13} /><span>Add Review</span>
      </button>
    </SectionCard>
  );
}

function FooterEditor({ data, onChange, onSave, saving, saved }) {
  const set = (key, value) => onChange({ ...data, [key]: value });

  return (
    <SectionCard title="Footer" onSave={onSave} saving={saving} saved={saved}>
      <div className="admin-form-group">
        <label className="admin-form-label">Tagline (under logo)</label>
        <input className="admin-input" value={data.tagline || ''} onChange={(e) => set('tagline', e.target.value)} />
      </div>

      <p className="admin-helper-text" style={{ marginBottom: '16px' }}>
        Social media links, phone, email and WhatsApp number are now managed on the <strong>Contact Info</strong> page and apply everywhere on the site, including this footer.
      </p>

      <hr className="admin-section-divider" />

      <div className="admin-form-row-2">
        <div className="admin-form-group">
          <label className="admin-form-label">Newsletter Title</label>
          <input className="admin-input" value={data.newsletterTitle || ''} onChange={(e) => set('newsletterTitle', e.target.value)} />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Newsletter Subtitle</label>
          <input className="admin-input" value={data.newsletterSubtitle || ''} onChange={(e) => set('newsletterSubtitle', e.target.value)} />
        </div>
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Copyright Text (after the year)</label>
        <input className="admin-input" value={data.copyrightText || ''} onChange={(e) => set('copyrightText', e.target.value)} placeholder="Biker King Adventure. All Rights Reserved." />
      </div>
      <p className="admin-helper-text">The Quick Links / Other Links / Our Services navigation columns are structural and cannot be edited here.</p>
    </SectionCard>
  );
}
