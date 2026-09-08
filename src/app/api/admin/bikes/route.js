import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('bikes')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ bikes: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to load bikes.' }, { status: 500 });
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
      .from('bikes')
      .insert([{
        slug,
        name: body.name,
        specs: body.specs || '',
        engine: body.engine || '',
        power: body.power || '',
        ground_clearance: body.ground_clearance || '',
        fuel_capacity: body.fuel_capacity || '',
        type: body.type || 'Adventure',
        price: Number(body.price) || 0,
        price_display: body.price_display || '',
        image_url: body.image_url || '',
        badge: body.badge || '',
        description: body.description || '',
        features: Array.isArray(body.features) ? body.features : [],
        sort_order: Number(body.sort_order) || 0,
        is_active: body.is_active !== false,
        show_on_homepage: body.show_on_homepage !== false,
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ bike: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to create bike.' }, { status: 500 });
  }
}
