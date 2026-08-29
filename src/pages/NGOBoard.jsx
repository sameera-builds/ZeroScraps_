import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const riskColor = { high: 'border-risk-high', medium: 'border-risk-medium', low: 'border-risk-low' };
const riskText = { high: 'text-risk-high', medium: 'text-risk-medium', low: 'text-risk-low' };

export default function NGOBoard() {
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState('all');
  const [ngoId, setNgoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: ngoRow } = await supabase.from('ngos').select('id').eq('user_id', user.id).single();
        if (ngoRow) setNgoId(ngoRow.id);
      }
      const { data, error } = await supabase.from('surplus_listings').select('*').eq('status', 'available');
      if (!error) setListings(data || []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleClaim(listingId) {
    if (!ngoId) return alert('Please log in as an NGO first.');
    const { data, error } = await supabase.rpc('claim_listing', {
      p_listing_id: listingId,
      p_ngo_id: ngoId,
    });
    if (error) {
      alert('Could not claim: ' + error.message);
    } else {
      setListings((prev) => prev.filter((l) => l.id !== listingId));
    }
  }

  const filtered = category === 'all' ? listings : listings.filter((l) => l.category === category);

  if (loading) return <p className="text-center mt-10 text-text-muted">Loading listings...</p>;

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="font-heading font-extrabold text-3xl mb-4 text-text">Available Surplus</h1>

      <select className="border border-border rounded-xl p-2 mb-6 bg-surface-alt"
        value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All categories</option>
        <option value="produce">Produce</option>
        <option value="dairy">Dairy</option>
        <option value="grains">Grains</option>
        <option value="packaged">Packaged</option>
        <option value="cooked">Cooked</option>
      </select>

      <div className="grid gap-4">
        {filtered.length === 0 && <p className="text-text-muted">No listings right now.</p>}
        {filtered.map((item) => (
          <div key={item.id}
            className={`bg-surface-alt rounded-xl shadow-sm border-2 p-4 flex justify-between items-center ${riskColor[item.risk_tier] || 'border-border'}`}>
            <div>
              <h3 className="font-heading font-semibold text-lg text-text">{item.product_name}</h3>
              <p className="text-text-muted text-sm">{item.quantity_kg}kg · Expires {item.expiry_date} · {item.category}</p>
              <span className={`text-sm font-medium ${riskText[item.risk_tier] || ''}`}>{item.risk_tier} risk</span>
            </div>
            <button onClick={() => handleClaim(item.id)}
              className="bg-accent text-white rounded-xl px-4 py-2 font-medium">
              Claim
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}