import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [byNgo, setByNgo] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      setError(null);

      // Main summary statistics
      const { data: summary, error: summaryError } = await supabase
        .from('analytics_summary')
        .select('*')
        .single();

      if (summaryError) {
        console.error('Analytics summary error:', summaryError);
        setError(summaryError.message);
        setLoading(false);
        return;
      }

      setStats(summary);

      // Food saved by NGO
      const { data: ngoData, error: ngoError } = await supabase
        .from('analytics_by_ngo')
        .select('ngo_id, ngo_name, kg_saved, estimated_meals');

      if (ngoError) {
        console.error('NGO analytics error:', ngoError);
      } else {
        setByNgo(ngoData || []);
      }

      // Food saved by category
      const { data: categoryData, error: categoryError } = await supabase
        .from('analytics_by_category')
        .select('category, kg_saved, estimated_meals');

      if (categoryError) {
        console.error('Category analytics error:', categoryError);
      } else {
        setByCategory(categoryData || []);
      }

      setLoading(false);
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <p className="p-8 text-text-muted font-body">
        Loading analytics...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-8 text-red-500 font-body">
        Error: {error}
      </p>
    );
  }

  if (!stats) {
    return (
      <p className="p-8 text-text-muted font-body">
        No data available yet.
      </p>
    );
  }

  return (
    <div className="p-8">
      <h1 className="font-heading font-extrabold text-4xl text-text mb-6">
        Impact Dashboard
      </h1>

      {/* Main stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
          <p className="font-body text-sm text-text-muted">
            Total Food Saved
          </p>
          <p className="font-heading font-extrabold text-3xl text-text">
            {stats.total_kg_saved ?? 0} kg
          </p>
        </div>

        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
          <p className="font-body text-sm text-text-muted">
            Active Listings
          </p>
          <p className="font-heading font-extrabold text-3xl text-text">
            {stats.active_listings ?? 0}
          </p>
        </div>

        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
          <p className="font-body text-sm text-text-muted">
            Claimed Donations
          </p>
          <p className="font-heading font-extrabold text-3xl text-text">
            {stats.claimed_donations ?? 0}
          </p>
        </div>

        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
          <p className="font-body text-sm text-text-muted">
            Estimated Meals
          </p>
          <p className="font-heading font-extrabold text-3xl text-text">
            {stats.estimated_meals ?? 0}
          </p>
        </div>

      </div>

      {/* Food Saved by NGO */}
      <div className="mb-10">
        <h2 className="font-heading font-bold text-2xl text-text mb-4">
          Food Saved by NGO
        </h2>

        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">

          {byNgo.length > 0 ? (
            <ul className="font-body space-y-2">

              {byNgo.map((row) => (
                <li
                  key={row.ngo_id}
                  className="flex justify-between border-b border-border pb-2"
                >
                  <span>
                    {row.ngo_name || 'Unknown NGO'}
                  </span>

                  <span className="font-medium">
                    {row.kg_saved ?? 0} kg
                  </span>
                </li>
              ))}

            </ul>
          ) : (
            <p className="font-body text-text-muted">
              No NGO breakdown data yet.
            </p>
          )}

        </div>
      </div>

      {/* Food Saved by Category */}
      <div className="mb-10">
        <h2 className="font-heading font-bold text-2xl text-text mb-4">
          Food Saved by Category
        </h2>

        <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">

          {byCategory.length > 0 ? (
            <ul className="font-body space-y-2">

              {byCategory.map((row) => (
                <li
                  key={row.category}
                  className="flex justify-between border-b border-border pb-2"
                >
                  <span>
                    {row.category || 'Unknown'}
                  </span>

                  <span className="font-medium">
                    {row.kg_saved ?? 0} kg
                  </span>
                </li>
              ))}

            </ul>
          ) : (
            <p className="font-body text-text-muted">
              No category breakdown data yet.
            </p>
          )}

        </div>
      </div>

    </div>
  );
}