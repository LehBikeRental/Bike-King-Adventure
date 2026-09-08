import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../../lib/supabase';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const supabase = getServiceSupabase();

    const update = {
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
    };

    if (body.slug) update.slug = body.slug;

    const { data, error } = await supabase
      .from('packages')
      .update(update)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ package: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to update package.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('packages').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to delete package.' }, { status: 500 });
  }
}
