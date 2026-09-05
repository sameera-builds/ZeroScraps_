import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const STATUS_FLOW = ['Picked Up', 'In Transit', 'Arrived at Market', 'Delivered'];

export default function ShipmentActions() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchShipments();
  }, []);

  async function fetchShipments() {
    const { data, error } = await supabase
  .from('shipments')
  .select(`
    id,
    status,
    source,
    destination,
    created_at,
    batches (
      product_name,
      quantity_kg
    )
  `)
  .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setShipments(data || []);
    }
    setLoading(false);
  }

  async function updateStatus(shipmentId, newStatus) {
    setUpdatingId(shipmentId);

    const { error } = await supabase
      .from('shipments')
      .update({ status: newStatus })
      .eq('id', shipmentId);

    if (error) {
      alert('Failed to update status: ' + error.message);
    } else {
      await fetchShipments();
    }
    setUpdatingId(null);
  }

  if (loading) return <p className="p-8 text-text-muted font-body">Loading shipments...</p>;
  if (error) return <p className="p-8 text-red-500 font-body">Error: {error}</p>;

  return (
    <div className="p-8">
      <h1 className="font-heading font-extrabold text-4xl text-text mb-6">Update Shipment Status</h1>

      {shipments.length === 0 ? (
        <p className="font-body text-text-muted">No shipments yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {shipments.map((shipment) => {
            const currentIndex = STATUS_FLOW.indexOf(shipment.status);
            const nextStatus = STATUS_FLOW[currentIndex + 1];

            return (
              <div key={shipment.id} className="bg-surface-alt rounded-xl shadow-sm border border-border p-6">
                <p className="font-heading font-semibold text-lg text-text">
  🍅 {shipment.batches?.product_name || 'Unknown product'} — {shipment.batches?.quantity_kg ?? '—'} kg
</p>
                <p className="font-body text-text-muted text-sm mb-4">
                  Current status: <span className="font-medium text-text">{shipment.status}</span>
                </p>

                {nextStatus ? (
                  <button
                    onClick={() => updateStatus(shipment.id, nextStatus)}
                    disabled={updatingId === shipment.id}
                    className="bg-accent text-white font-body font-medium px-4 py-2 rounded-xl shadow-sm hover:opacity-90 disabled:opacity-50"
                  >
                    {updatingId === shipment.id ? 'Updating...' : `Mark as ${nextStatus}`}
                  </button>
                ) : (
                  <p className="font-body text-brand font-medium">✓ Fully Delivered</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}