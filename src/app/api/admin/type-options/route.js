import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    if (!category || !['bike', 'taxi', 'service'].includes(category)) {
      return NextResponse.json({ error: 'A valid category (bike, taxi or service) is required.' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('type_options')
      .select('*')
      .eq('category', category)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ options: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to load type options.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const category = body.category;
    const name = (body.name || '').trim();

    if (!category || !['bike', 'taxi', 'service'].includes(category)) {
      return NextResponse.json({ error: 'A valid category (bike, taxi or service) is required.' }, { status: 400 });
    }
    if (!name) {
      return NextResponse.json({ error: 'Type name is required.' }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    const { count } = await supabase
      .from('type_options')
      .select('id', { count: 'exact', head: true })
      .eq('category', category);

    const { data, error } = await supabase
      .from('type_options')
      .insert([{ category, name, sort_order: count || 0 }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'This type already exists.' }, { status: 409 });
      }
      throw error;
    }
    return NextResponse.json({ option: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to create type.' }, { status: 500 });
  }
}
