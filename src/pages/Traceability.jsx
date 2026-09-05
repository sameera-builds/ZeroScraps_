import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { logStageOnChain } from '../lib/blockchain';

const STAGES = [
  { key: 'harvest', label: 'Harvest', column: 'harvest_tx_hash' },
  { key: 'collection', label: 'Collection', column: 'collection_tx_hash' },
  { key: 'transport', label: 'Transport', column: 'transport_tx_hash' },
  { key: 'retail', label: 'Retail', column: 'retail_tx_hash' },
];

export default function Traceability() {
  const [batches, setBatches] = useState([]);
  const [loadingKey, setLoadingKey] = useState(null); // `${batchId}-${stageKey}`
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    const { data, error: fetchError } = await supabase
      .from('batches')
      .select('*')
      .order('created_at', { ascending: false });
    if (fetchError) return setError(fetchError.message);
    setBatches(data || []);
  };

  const handleLogStage = async (batch, stage) => {
    setError('');
    const key = `${batch.id}-${stage.key}`;
    setLoadingKey(key);
    try {
      const txHash = await logStageOnChain(batch.id, stage.key);
      const { error: updateError } = await supabase
        .from('batches')
        .update({ [stage.column]: txHash })
        .eq('id', batch.id);
      if (updateError) throw updateError;

      setBatches((prev) =>
        prev.map((b) => (b.id === batch.id ? { ...b, [stage.column]: txHash } : b))
      );
    } catch (err) {
      setError(err.message || 'Failed to log stage on-chain.');
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: 'var(--color-surface)' }}>
      <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-text)' }}>
        Farm-to-Market Traceability
      </h1>

      {error && (
        <p style={{ color: 'var(--color-risk-high)', marginBottom: '1rem' }}>{error}</p>
      )}

      {batches.length === 0 && !error && (
        <p style={{ color: 'var(--color-text-muted)' }}>No batches yet.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {batches.map((batch) => (
          <div
            key={batch.id}
            style={{
              padding: '1.5rem',
              borderRadius: 12,
              background: 'var(--color-surface-alt)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontFamily: 'Sora, sans-serif', margin: 0 }}>{batch.crop_name}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: '0.25rem 0 0' }}>
                  {batch.quantity_kg} kg &middot; {batch.farmer_name} &middot; harvested {batch.harvest_date}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {STAGES.map((stage) => {
                const txHash = batch[stage.column];
                const key = `${batch.id}-${stage.key}`;
                const isLoading = loadingKey === key;

                if (txHash) {
                  return (
                    <a
                      key={stage.key}
                      href={`https://sepolia.etherscan.io/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '0.6rem 1rem', borderRadius: 8, fontSize: '0.85rem',
                        background: 'var(--color-risk-low)', color: '#fff', textDecoration: 'none',
                      }}
                    >
                      {stage.label}: Verify on-chain ✓
                    </a>
                  );
                }

                return (
                  <button
                    key={stage.key}
                    disabled={isLoading}
                    onClick={() => handleLogStage(batch, stage)}
                    style={{
                      padding: '0.6rem 1rem', borderRadius: 8, fontSize: '0.85rem', border: '1px solid var(--color-border)',
                      background: isLoading ? 'var(--color-border)' : 'var(--color-brand)',
                      color: isLoading ? 'var(--color-text-muted)' : '#fff',
                      cursor: isLoading ? 'default' : 'pointer',
                    }}
                  >
                    {isLoading ? 'Confirming in MetaMask...' : `Log ${stage.label}`}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
