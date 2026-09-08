import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../../lib/supabase';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const supabase = getServiceSupabase();

    const update = {
      category: body.category,
      badge: body.badge,
      title: body.title,
      short_title: body.short_title,
      icon_name: body.icon_name,
      description: body.description,
      image_url: body.image_url,
      dedicated_url: body.dedicated_url,
      features: Array.isArray(body.features) ? body.features : [],
      price: body.price,
      cta_text: body.cta_text,
      booking_type: body.booking_type,
      sort_order: Number(body.sort_order) || 0,
      is_active: body.is_active !== false,
    };

    if (body.slug) update.slug = body.slug;

    const { data, error } = await supabase
      .from('services')
      .update(update)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ service: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to update service.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to delete service.' }, { status: 500 });
  }
}
