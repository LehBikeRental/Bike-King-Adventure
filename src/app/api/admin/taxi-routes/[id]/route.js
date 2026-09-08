import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../../lib/supabase';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const supabase = getServiceSupabase();

    const update = {
      title: body.title,
      distance: body.distance || '',
      duration: body.duration || '',
      passes: body.passes || '',
      highlights: body.highlights || '',
      innova_price: Number(body.innova_price) || 0,
      scorpio_price: Number(body.scorpio_price) || 0,
      tempo_price: Number(body.tempo_price) || 0,
      sort_order: Number(body.sort_order) || 0,
      is_active: body.is_active !== false,
    };

    const { data, error } = await supabase
      .from('taxi_routes')
      .update(update)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ route: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to update taxi route.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('taxi_routes').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to delete taxi route.' }, { status: 500 });
  }
}
