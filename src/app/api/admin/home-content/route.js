import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('home_content').select('*');
    if (error) throw error;

    const sections = {};
    for (const row of data) {
      sections[row.section_key] = row.data;
    }
    return NextResponse.json({ sections });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to load home content.' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { section_key, data } = body;

    if (!section_key || typeof data !== 'object') {
      return NextResponse.json({ error: 'section_key and data are required.' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { data: row, error } = await supabase
      .from('home_content')
      .upsert({ section_key, data }, { onConflict: 'section_key' })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ section: row });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to save home content.' }, { status: 500 });
  }
}
