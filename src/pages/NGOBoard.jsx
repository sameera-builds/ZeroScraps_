import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { logClaimOnChain } from '../lib/blockchain';

const riskColor = {
  high: 'border-risk-high',
  medium: 'border-risk-medium',
  low: 'border-risk-low',
};

const riskText = {
  high: 'text-risk-high',
  medium: 'text-risk-medium',
  low: 'text-risk-low',
};

export default function NGOBoard() {
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState('all');
  const [ngoId, setNgoId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      // 1. Get currently logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log('CURRENT USER:', user);

      if (userError) {
        console.error('Auth error:', userError);
        setError('Could not check login status.');
        setLoading(false);
        return;
      }

      if (!user) {
        console.log('No authenticated user found.');
        setUser(null);
        setListings([]);
        setLoading(false);
        return;
      }

      setUser(user);

      // 2. Find the NGO profile belonging to this user
      const { data: ngoRow, error: ngoError } = await supabase
        .from('ngos')
        .select('id')
        .eq('user_id', user.id)
        .single();

      console.log('NGO PROFILE:', ngoRow);

      if (ngoError) {
        console.error('NGO profile error:', ngoError);
      }

      if (ngoRow) {
        setNgoId(ngoRow.id);
      }

      // 3. Load available surplus listings
      const { data, error: listingsError } = await supabase
        .from('surplus_listings')
        .select('*')
        .eq('status', 'available');

      console.log('LISTINGS ERROR:', listingsError);
      console.log('LOADED LISTINGS:', data);

      if (listingsError) {
        setError(
          `Could not load listings: ${listingsError.message}`
        );
      } else {
        setListings(data || []);
      }

      setLoading(false);
    }

    load();
  }, []);

  async function handleClaim(listingId) {
    if (!user) {
      alert('Please log in as an NGO first.');
      return;
    }

    if (!ngoId) {
      alert('NGO profile not found for this account.');
      return;
    }

    const { data, error } = await supabase.rpc('claim_listing', {
      p_listing_id: listingId,
      p_ngo_id: ngoId,
    });

    if (error) {
      console.error('Claim error:', error);
      alert('Could not claim listing: ' + error.message);
      return;
    }

    console.log('CLAIM RESULT:', data);

    // Remove claimed listing from the screen immediately
    setListings((prev) =>
      prev.filter((listing) => listing.id !== listingId)
    );

    // Blockchain logging
    try {
      await logClaimOnChain(ngoId, listingId);
    } catch (blockchainError) {
      console.error('Blockchain logging failed:', blockchainError);
    }

    alert('Listing claimed successfully!');
  }

  const filtered =
    category === 'all'
      ? listings
      : listings.filter((item) => item.category === category);

  if (loading) {
    return (
      <p className="text-center mt-10 text-text-muted">
        Loading listings...
      </p>
    );
  }

  // User isn't logged in
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center">
        <h1 className="font-heading font-extrabold text-3xl mb-4 text-text">
          Available Surplus
        </h1>

        <p className="text-text-muted mb-6">
          Please sign in as an NGO to view and claim available surplus.
        </p>

        <button
          onClick={() => {
            window.location.href = '/login';
          }}
          className="bg-accent text-white rounded-xl px-5 py-3 font-medium"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-10">
        <h1 className="font-heading font-extrabold text-3xl mb-4 text-text">
          Available Surplus
        </h1>

        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="font-heading font-extrabold text-3xl mb-4 text-text">
        Available Surplus
      </h1>

      <select
        className="border border-border rounded-xl p-2 mb-6 bg-surface-alt"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All categories</option>
        <option value="produce">Produce</option>
        <option value="dairy">Dairy</option>
        <option value="grains">Grains</option>
        <option value="packaged">Packaged</option>
        <option value="cooked">Cooked</option>
      </select>

      <div className="grid gap-4">
        {filtered.length === 0 && (
          <p className="text-text-muted">
            No available listings right now.
          </p>
        )}

        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-surface-alt rounded-xl shadow-sm border-2 p-4 flex justify-between items-center ${
              riskColor[item.risk_tier] || 'border-border'
            }`}
          >
            <div>
              <h3 className="font-heading font-semibold text-lg text-text">
                {item.product_name}
              </h3>

              <p className="text-text-muted text-sm">
                {item.quantity_kg} kg · Expires {item.expiry_date} ·{' '}
                {item.category}
              </p>

              <span
                className={`text-sm font-medium ${
                  riskText[item.risk_tier] || ''
                }`}
              >
                {item.risk_tier} risk
              </span>
            </div>

            <button
              onClick={() => handleClaim(item.id)}
              className="bg-accent text-white rounded-xl px-4 py-2 font-medium"
            >
              Claim
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}