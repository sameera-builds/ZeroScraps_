import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const STEPS = ['Picked Up', 'In Transit', 'Arrived at Market', 'Delivered'];

function ShipmentProgress({ currentStatus }) {
  const currentIndex = STEPS.indexOf(currentStatus);

  return (
    <div className="flex flex-col gap-1 mt-3">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-2 font-body text-sm">
          <span className={i <= currentIndex ? 'text-brand' : 'text-text-muted'}>
            {i < currentIndex ? '✓' : i === currentIndex ? '●' : '○'}
          </span>
          <span className={i <= currentIndex ? 'text-text font-medium' : 'text-text-muted'}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function MyShipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchShipments() {
      // Guessed table name 'shipments' — confirm exact name with Person 4/Person 1
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setShipments(data || []);
      }
      setLoading(false);
    }

    fetchShipments();
  }, []);

  if (loading) return <p className="p-8 text-text-muted font-body">Loading shipments...</p>;
  if (error) return <p className="p-8 text-red-500 font-body">Error: {error}</p>;

  return (
    <div className="p-8">
      <h1 className="font-heading font-extrabold text-4xl text-text mb-6">My Shipments</h1>

      {shipments.length === 0 ? (
        <p className="font-body text-text-muted">No shipments yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
              <p className="font-heading font-semibold text-lg text-text">
                🍅 {shipment.crop} — Batch #{shipment.batch_number}
              </p>
              <p className="font-body text-text-muted text-sm mb-2">
                {shipment.quantity} {shipment.unit}
              </p>
              <ShipmentProgress currentStatus={shipment.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}