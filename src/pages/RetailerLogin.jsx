import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function RetailerLogin() {
  const navigate = useNavigate();

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // -------------------------
  // SIGN UP
  // -------------------------
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

    // Create Supabase Auth user
    const {
      data: authData,
      error: signUpError,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    /*
      If email confirmation is enabled, Supabase sends
      a confirmation link to the user's email.

      We do NOT insert the retailer profile here if there
      is no authenticated session yet.

      The profile will be created after the user logs in.
    */

    setLoading(false);

    setMessage(
      'Account created! Please check your email and click the confirmation link to verify your account. Then come back and log in.'
    );

    setMode('login');
  };

  // -------------------------
  // LOGIN
  // -------------------------
  const handleLogIn = async () => {
    setError('');
    setMessage('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    const {
      data: loginData,
      error: loginError,
    } = await supabase.auth.signInWithPassword({
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

    /*
      Check whether this Auth user already has
      a retailer profile.
    */

    const {
      data: existingRetailer,
      error: retailerLookupError,
    } = await supabase
      .from('retailers')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (retailerLookupError) {
      setLoading(false);
      setError(retailerLookupError.message);
      return;
    }

    /*
      If this is the first login after signup,
      create the retailer profile now.

      This works because the user is authenticated
      at this point.
    */

    if (!existingRetailer) {
      const {
        error: insertError,
      } = await supabase
        .from('retailers')
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

    navigate('/retailer');
  };

  // -------------------------
  // LOGOUT
  // -------------------------
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-surface)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          padding: '2rem',
          borderRadius: 12,
          background: 'var(--color-surface-alt)',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* TITLE */}
        <h2
          style={{
            fontFamily: 'Sora, sans-serif',
            marginBottom: '1rem',
          }}
        >
          Retailer {mode === 'signup' ? 'Sign Up' : 'Log In'}
        </h2>

        {/* LOGIN / SIGNUP TABS */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: '1rem',
          }}
        >
          <button
            onClick={() => {
              setMode('login');
              setError('');
              setMessage('');
            }}
            style={tabStyle(mode === 'login')}
          >
            Log In
          </button>

          <button
            onClick={() => {
              setMode('signup');
              setError('');
              setMessage('');
            }}
            style={tabStyle(mode === 'signup')}
          >
            Sign Up
          </button>
        </div>

        {/* SIGNUP NAME */}
        {mode === 'signup' && (
          <input
            placeholder="Store / retailer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        )}

        {/* EMAIL */}
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        {/* PASSWORD */}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {/* SUBMIT BUTTON */}
        <button
          disabled={loading}
          onClick={mode === 'signup' ? handleSignUp : handleLogIn}
          style={{
            ...submitStyle,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? '...'
            : mode === 'signup'
            ? 'Create Account'
            : 'Log In'}
        </button>

        {/* SUCCESS MESSAGE */}
        {message && (
          <p
            style={{
              color: 'green',
              fontSize: '0.85rem',
              marginTop: 12,
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <p
            style={{
              color: 'var(--color-risk-high)',
              fontSize: '0.85rem',
              marginTop: 12,
              lineHeight: 1.5,
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

// -------------------------
// STYLES
// -------------------------

const inputStyle = {
  width: '100%',
  padding: '0.7rem',
  marginBottom: '0.7rem',
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  fontFamily: 'Inter, sans-serif',
};

const submitStyle = {
  width: '100%',
  padding: '0.8rem',
  borderRadius: 8,
  border: 'none',
  background: 'var(--color-brand)',
  color: '#fff',
  fontFamily: 'Inter, sans-serif',
  cursor: 'pointer',
};

const tabStyle = (active) => ({
  flex: 1,
  padding: '0.5rem',
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  background: active
    ? 'var(--color-brand)'
    : 'transparent',
  color: active
    ? '#fff'
    : 'var(--color-text)',
  cursor: 'pointer',
});