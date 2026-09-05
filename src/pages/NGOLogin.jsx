import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function NGOLogin() {
  const navigate = useNavigate();

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    setError('');
    setMessage('');

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    setLoading(false);
    setMessage(
      'Account created! Please check your email and click the confirmation link to verify your account. Then come back and log in.'
    );
    setMode('login');
  };

  const handleLogIn = async () => {
    setError('');
    setMessage('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setLoading(false);
      setError(loginError.message);
      return;
    }

    const user = loginData.user;
    if (!user) {
      setLoading(false);
      setError('Login failed. Please try again.');
      return;
    }

    const { data: existingNgo, error: ngoLookupError } = await supabase
      .from('ngos')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (ngoLookupError) {
      setLoading(false);
      setError(ngoLookupError.message);
      return;
    }

    if (!existingNgo) {
      const { error: insertError } = await supabase
        .from('ngos')
        .insert({
          user_id: user.id,
          name: name || email.split('@')[0],
          email: user.email,
        });

      if (insertError) {
        setLoading(false);
        setError(insertError.message);
        return;
      }
    }

    setLoading(false);
    navigate('/ngo');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-surface)' }}>
      <div style={{ width: '100%', maxWidth: 380, padding: '2rem', borderRadius: 12, background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', marginBottom: '1rem' }}>
          NGO {mode === 'signup' ? 'Sign Up' : 'Log In'}
        </h2>

        <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
          <button onClick={() => { setMode('login'); setError(''); setMessage(''); }} style={tabStyle(mode === 'login')}>
            Log In
          </button>
          <button onClick={() => { setMode('signup'); setError(''); setMessage(''); }} style={tabStyle(mode === 'signup')}>
            Sign Up
          </button>
        </div>

        {mode === 'signup' && (
          <input placeholder="NGO name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        )}

        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />

        <button
          disabled={loading}
          onClick={mode === 'signup' ? handleSignUp : handleLogIn}
          style={{ ...submitStyle, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? '...' : mode === 'signup' ? 'Create Account' : 'Log In'}
        </button>

        {message && <p style={{ color: 'green', fontSize: '0.85rem', marginTop: 12, lineHeight: 1.5 }}>{message}</p>}
        {error && <p style={{ color: 'var(--color-risk-high)', fontSize: '0.85rem', marginTop: 12, lineHeight: 1.5 }}>{error}</p>}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '0.7rem', marginBottom: '0.7rem', borderRadius: 8,
  border: '1px solid var(--color-border)', fontFamily: 'Inter, sans-serif',
};
const submitStyle = {
  width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none',
  background: 'var(--color-brand)', color: '#fff', fontFamily: 'Inter, sans-serif', cursor: 'pointer',
};
const tabStyle = (active) => ({
  flex: 1, padding: '0.5rem', borderRadius: 8, border: '1px solid var(--color-border)',
  background: active ? 'var(--color-brand)' : 'transparent', color: active ? '#fff' : 'var(--color-text)',
  cursor: 'pointer',
});
