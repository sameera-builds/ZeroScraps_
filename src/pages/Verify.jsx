import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Verify() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListing() {
      const { data, error } = await supabase
        .from('surplus_listings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Product not found');
      } else {
        setListing(data);
      }
      setLoading(false);
    }

    fetchListing();
  }, [id]);

  if (loading) return <p className="p-8 text-text-muted font-body">Loading...</p>;
  if (error) return <p className="p-8 text-red-500 font-body">{error}</p>;

  // Shows whatever fields actually exist, however they're named —
  // safe fallback until we confirm exact column names with Person 1.
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="font-heading font-extrabold text-3xl text-text mb-6">✅ Verified Product</h1>

      <div className="bg-surface-alt rounded-xl shadow-sm border border-border p-6 space-y-2 font-body">
        {Object.entries(listing).map(([key, value]) => (
          <p key={key}>
            <span className="text-text-muted capitalize">{key.replace(/_/g, ' ')}:</span> {String(value)}
          </p>
        ))}
      </div>
    </div>
  );
}