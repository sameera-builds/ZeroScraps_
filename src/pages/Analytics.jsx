import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [byNgo, setByNgo] = useState(null);
  const [byCategory, setByCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      // Main summary stats
      const { data: summary, error: summaryError } = await supabase
        .from('analytics_summary')
        .select('*')
        .single();

      if (summaryError) {
        setError(summaryError.message);
      } else {
        setStats(summary);
      }

      // Breakdown by NGO — guessed view name, safe fallback if wrong/missing
      const { data: ngoData } = await supabase
        .from('analytics_by_ngo')
        .select('*');
      setByNgo(ngoData || null);

      // Breakdown by category — guessed view name, safe fallback if wrong/missing
      const { data: categoryData } = await supabase
        .from('analytics_by_category')
        .select('*');
      setByCategory(categoryData || null);

      setLoading(false);
    }

    fetchAll();
  }, []);

  if (loading) return <p className="p-8 text-text-muted font-body">Loading analytics...</p>;
  if (error) return <p className="p-8 text-red-500 font-body">Error: {error}</p>;
  if (!stats) return <p className="p-8 text-text-muted font-body">No data available yet.</p>;

  return (
    <div className="p-8">
      <h1 className="font-heading font-extrabold text-4xl text-text mb-6">Impact Dashboard</h1>

      {/* Main stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
          <p className="font-body text-sm text-text-muted">Total Food Saved</p>
          <p className="font-heading font-extrabold text-3xl text-text">{stats.total_kg_saved} kg</p>
        </div>
        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
          <p className="font-body text-sm text-text-muted">Active Listings</p>
          <p className="font-heading font-extrabold text-3xl text-text">{stats.active_listings}</p>
        </div>
        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
          <p className="font-body text-sm text-text-muted">Claimed Donations</p>
          <p className="font-heading font-extrabold text-3xl text-text">{stats.claimed_donations}</p>
        </div>
        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
          <p className="font-body text-sm text-text-muted">Estimated Meals</p>
          <p className="font-heading font-extrabold text-3xl text-text">{stats.estimated_meals}</p>
        </div>
      </div>

      {/* Breakdown by NGO */}
      <div className="mb-10">
        <h2 className="font-heading font-bold text-2xl text-text mb-4">Food Saved by NGO</h2>
        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
          {byNgo && byNgo.length > 0 ? (
            <ul className="font-body space-y-2">
              {byNgo.map((row, i) => (
                <li key={i} className="flex justify-between border-b border-border pb-2">
                  <span>{Object.values(row)[0]}</span>
                  <span className="font-medium">{Object.values(row)[1]} kg</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-body text-text-muted">No NGO breakdown data yet.</p>
          )}
        </div>
      </div>

      {/* Breakdown by category */}
      <div className="mb-10">
        <h2 className="font-heading font-bold text-2xl text-text mb-4">Food Saved by Category</h2>
        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
          {byCategory && byCategory.length > 0 ? (
            <ul className="font-body space-y-2">
              {byCategory.map((row, i) => (
                <li key={i} className="flex justify-between border-b border-border pb-2">
                  <span>{Object.values(row)[0]}</span>
                  <span className="font-medium">{Object.values(row)[1]} kg</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-body text-text-muted">No category breakdown data yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}