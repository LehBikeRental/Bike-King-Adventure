import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../../lib/supabase';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const supabase = getServiceSupabase();

    const update = {
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
    };

    if (body.slug) update.slug = body.slug;

    const { data, error } = await supabase
      .from('taxi_vehicles')
      .update(update)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ vehicle: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to update taxi vehicle.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('taxi_vehicles').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to delete taxi vehicle.' }, { status: 500 });
  }
}
