"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLoader({ label = 'Loading...' }) {
  return (
    <div className="admin-loader">
      <Loader2 size={30} className="admin-spin" />
      <span>{label}</span>
    </div>
  );
}
