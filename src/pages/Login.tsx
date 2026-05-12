import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useAuth } from '../stores/auth';

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') ?? '/account';
  const login = useAuth((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.ok) navigate(redirect, { replace: true });
    else setError(res.error);
  };

  return (
    <PageWrapper>
      <section className="container-x py-16 lg:py-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <div className="eyebrow justify-center mb-5">Welcome back</div>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.04]">
              Sign <span className="italic text-rouge">in</span>
            </h1>
            <p className="mt-4 text-ink/60">
              {redirect === '/checkout'
                ? 'Sign in to complete your order.'
                : 'Return to your atelier account.'}
            </p>
          </div>

          <form onSubmit={submit} className="bg-ivory border border-gold/20 p-8 lg:p-10 space-y-6">
            <div>
              <label className="label">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                  className="absolute right-0 bottom-3 text-ink/40 hover:text-gold-500"
                >
                  {showPw ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-rouge bg-rouge/5 border border-rouge/20 px-4 py-3">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              <LogIn className="h-4 w-4" strokeWidth={1.5} />
              {loading ? 'Signing in…' : 'Sign In'}
            </button>

            <div className="text-center text-sm text-ink/60">
              No account yet?{' '}
              <Link
                to={`/register${redirect !== '/account' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                className="text-rouge underline-offset-4 hover:underline"
              >
                Create one
              </Link>
            </div>
          </form>

          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/40 text-center mt-6 leading-relaxed">
            Your details are stored locally on this device.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
