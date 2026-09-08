"use client";

import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export const DEFAULT_CONTACT_INFO = {
  phone: '9797948265',
  phoneDisplay: '+91 9797948265',
  phoneBackup: '9419178265',
  phoneBackupDisplay: '+91 9419178265',
  whatsappNumber: '919797948265',
  email: 'bikerkingadventure98@gmail.com',
  addressLine1: 'Malpax Complex, Leh Main Market',
  addressLine2: 'Leh Ladakh, UT – 194101, India',
  landmark: 'Near Leh Main Post Office & SBI Bank',
  mapsUrl: 'https://maps.google.com/?q=Malpax+Complex+Leh+Ladakh',
  instagramUrl: 'https://www.instagram.com/ridewithbk?igsi=cGFxMWUxbDh3dGRx&utm_source=qr',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
};

export function useContactInfo() {
  const [contact, setContact] = useState(DEFAULT_CONTACT_INFO);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('home_content')
          .select('data')
          .eq('section_key', 'contact_info')
          .single();
        if (!error && isMounted && data?.data) {
          setContact({ ...DEFAULT_CONTACT_INFO, ...data.data });
        }
      } catch (err) {
        console.warn('Falling back to default contact info:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return contact;
}
