import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../../lib/supabase';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('type_options').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to delete type.' }, { status: 500 });
  }
}
