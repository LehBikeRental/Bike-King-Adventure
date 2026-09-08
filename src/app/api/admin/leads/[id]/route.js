import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../../lib/supabase';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const supabase = getServiceSupabase();

    const { data, error } = await supabase
      .from('leads')
      .update({ status: body.status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ lead: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to update lead.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to delete lead.' }, { status: 500 });
  }
}
