import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('taxi_routes')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ routes: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to load taxi routes.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('taxi_routes')
      .insert([{
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
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ route: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to create taxi route.' }, { status: 500 });
  }
}
