import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ services: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to load services.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = getServiceSupabase();

    const slug = (body.slug || body.title || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!slug || !body.title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('services')
      .insert([{
        slug,
        category: body.category || 'expeditions',
        badge: body.badge || '',
        title: body.title,
        short_title: body.short_title || body.title,
        icon_name: body.icon_name || 'Compass',
        description: body.description || '',
        image_url: body.image_url || '',
        dedicated_url: body.dedicated_url || '',
        features: Array.isArray(body.features) ? body.features : [],
        price: body.price || '',
        cta_text: body.cta_text || 'Inquire Now',
        booking_type: body.booking_type || 'service',
        sort_order: Number(body.sort_order) || 0,
        is_active: body.is_active !== false,
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ service: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to create service.' }, { status: 500 });
  }
}
