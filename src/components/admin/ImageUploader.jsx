"use client";

import React, { useRef, useState } from 'react';
import { ImageIcon, UploadCloud, Loader2 } from 'lucide-react';

export default function ImageUploader({ value, onChange, label = 'Image' }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed.');
      onChange(json.url);
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <label className="admin-form-label">{label}</label>}
      <div className="admin-image-upload">
        <div className="admin-image-preview">
          {value ? <img src={value} alt="Preview" /> : <ImageIcon size={24} />}
        </div>
        <div style={{ flex: 1 }}>
          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <Loader2 size={14} className="admin-spin" /> : <UploadCloud size={14} />}
            <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <p className="admin-helper-text">JPG, PNG or WEBP. Uploaded to Cloudinary automatically.</p>
          {error && <p style={{ color: '#DC2626', fontSize: '0.74rem', marginTop: '4px' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
