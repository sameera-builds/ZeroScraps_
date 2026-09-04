import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function NGOLogin() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ngoName, setNgoName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (isSignup) {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) return setError(signUpError.message);

      const { error: profileError } = await supabase
        .from('ngos')
        .insert({ user_id: data.user.id, name: ngoName, email });
      if (profileError) return setError(profileError.message);
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) return setError(signInError.message);
    }
    navigate('/ngo');
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-surface-alt rounded-xl shadow-sm border border-border">
      <h2 className="font-heading font-bold text-2xl mb-4 text-text">{isSignup ? 'NGO Sign Up' : 'NGO Login'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {isSignup && (
          <input className="border border-border rounded-xl p-2" placeholder="NGO name"
            value={ngoName} onChange={(e) => setNgoName(e.target.value)} required />
        )}
        <input className="border border-border rounded-xl p-2" type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border border-border rounded-xl p-2" type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-risk-high text-sm">{error}</p>}
        <button type="submit" className="bg-accent text-white rounded-xl p-2 font-medium">
          {isSignup ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)} className="text-text-muted text-sm mt-3 underline">
        {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}