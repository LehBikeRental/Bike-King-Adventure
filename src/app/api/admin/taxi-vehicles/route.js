import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('taxi_vehicles')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ vehicles: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to load taxi vehicles.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = getServiceSupabase();

    const slug = (body.slug || body.name || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!slug || !body.name) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('taxi_vehicles')
      .insert([{
        slug,
        name: body.name,
        badge: body.badge || '',
        image_url: body.image_url || '',
        seats: body.seats || '',
        luggage: body.luggage || '',
        features: Array.isArray(body.features) ? body.features : [],
        ideal_for: body.ideal_for || '',
        starting_rate: body.starting_rate || '',
        vehicle_type: body.vehicle_type || 'innova',
        sort_order: Number(body.sort_order) || 0,
        is_active: body.is_active !== false,
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ vehicle: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to create taxi vehicle.' }, { status: 500 });
  }
}
