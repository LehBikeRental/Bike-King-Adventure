import { NextResponse } from 'next/server';
import { getServiceSupabase } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getServiceSupabase();

    const [servicesRes, packagesRes, bikesRes, taxiVehiclesRes, leadsRes, bookingsRes, newsletterRes, newLeadsRes, pendingBookingsRes] = await Promise.all([
      supabase.from('services').select('id', { count: 'exact', head: true }),
      supabase.from('packages').select('id', { count: 'exact', head: true }),
      supabase.from('bikes').select('id', { count: 'exact', head: true }),
      supabase.from('taxi_vehicles').select('id', { count: 'exact', head: true }),
      supabase.from('leads').select('id', { count: 'exact', head: true }),
      supabase.from('bookings').select('id', { count: 'exact', head: true }),
      supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
      supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    ]);

    const [recentLeadsRes, recentBookingsRes] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
    ]);

    return NextResponse.json({
      totalServices: servicesRes.count || 0,
      totalPackages: packagesRes.count || 0,
      totalBikes: bikesRes.count || 0,
      totalTaxiVehicles: taxiVehiclesRes.count || 0,
      totalLeads: leadsRes.count || 0,
      totalBookings: bookingsRes.count || 0,
      totalNewsletterSubscribers: newsletterRes.count || 0,
      newLeads: newLeadsRes.count || 0,
      pendingBookings: pendingBookingsRes.count || 0,
      recentLeads: recentLeadsRes.data || [],
      recentBookings: recentBookingsRes.data || [],
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to load stats.' }, { status: 500 });
  }
}
