import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../../lib/supabase';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to delete subscriber.' }, { status: 500 });
  }
}
