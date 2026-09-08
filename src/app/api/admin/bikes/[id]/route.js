import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../../lib/supabase';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const supabase = getServiceSupabase();

    const update = {
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
    };

    if (body.slug) update.slug = body.slug;

    const { data, error } = await supabase
      .from('bikes')
      .update(update)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ bike: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to update bike.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('bikes').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to delete bike.' }, { status: 500 });
  }
}
