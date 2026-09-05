import { useNavigate } from 'react-router-dom';

export default function RoleSelect() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', background: 'var(--color-surface)' }}>
      <h1 style={{ fontFamily: 'Sora, sans-serif', color: 'var(--color-text)', fontSize: '1.75rem' }}>Sign in as</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => navigate('/retailer-login')}
          style={{
            padding: '1.5rem 2.5rem', borderRadius: 12, border: '1px solid var(--color-border)',
            background: 'var(--color-surface-alt)', color: 'var(--color-text)', fontSize: '1.1rem',
            fontFamily: 'Inter, sans-serif', cursor: 'pointer',
          }}
        >
          Retailer
        </button>
        <button
          onClick={() => navigate('/ngo-login')}
          style={{
            padding: '1.5rem 2.5rem', borderRadius: 12, border: 'none',
            background: 'var(--color-brand)', color: '#fff', fontSize: '1.1rem',
            fontFamily: 'Inter, sans-serif', cursor: 'pointer',
          }}
        >
          NGO
        </button>
      </div>
    </div>
  );
}
