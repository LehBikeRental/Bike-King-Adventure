import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ packages: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to load packages.' }, { status: 500 });
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
      .from('packages')
      .insert([{
        slug,
        title: body.title,
        duration: body.duration || '',
        days_count: Number(body.days_count) || 1,
        route: body.route || '',
        price: Number(body.price) || 0,
        price_display: body.price_display || '',
        image_url: body.image_url || '',
        category: body.category || '',
        inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
        highlights: Array.isArray(body.highlights) ? body.highlights : [],
        itinerary: Array.isArray(body.itinerary) ? body.itinerary : [],
        sort_order: Number(body.sort_order) || 0,
        is_active: body.is_active !== false,
        show_on_homepage: body.show_on_homepage !== false,
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ package: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to create package.' }, { status: 500 });
  }
}
