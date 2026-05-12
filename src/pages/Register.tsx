import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useAuth } from '../stores/auth';

export default function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') ?? '/account';
  const register = useAuth((s) => s.register);

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const pwStrength = (() => {
    const p = form.password;
    if (!p) return { score: 0, label: '' };
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return {
      score: s,
      label: ['Too short', 'Weak', 'Fair', 'Strong', 'Excellent'][s] ?? '',
    };
  })();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('Please agree to the studio terms.');
      return;
    }
    setLoading(true);
    const res = await register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
    setLoading(false);
    if (res.ok) navigate(redirect, { replace: true });
    else setError(res.error);
  };

  return (
    <PageWrapper>
      <section className="container-x py-16 lg:py-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <div className="eyebrow justify-center mb-5">Create your account</div>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.04]">
              Begin <span className="italic text-rouge">here</span>
            </h1>
            <p className="mt-4 text-ink/60">
              An account keeps your details, orders and wishlist close.
            </p>
          </div>

          <form onSubmit={submit} className="bg-ivory border border-gold/20 p-8 lg:p-10 space-y-6">
            <div>
              <label className="label">Full name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="label">Mobile number</label>
              <input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input"
                placeholder="+27 …"
                autoComplete="tel"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input pr-10"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label="Toggle password visibility"
                  className="absolute right-0 bottom-3 text-ink/40 hover:text-gold-500"
                >
                  {showPw ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-ink/10 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        pwStrength.score <= 1
                          ? 'bg-rouge'
                          : pwStrength.score === 2
                          ? 'bg-orange-400'
                          : pwStrength.score === 3
                          ? 'bg-gold'
                          : 'bg-green-600'
                      }`}
                      style={{ width: `${(pwStrength.score / 4) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-ink/50">{pwStrength.label}</span>
                </div>
              )}
            </div>
            <div>
              <label className="label">Confirm password</label>
              <input
                required
                type={showPw ? 'text' : 'password'}
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="input"
                placeholder="Repeat password"
                autoComplete="new-password"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 accent-gold"
              />
              <span className="text-xs text-ink/65 leading-relaxed">
                I agree to receive order confirmations and the occasional studio letter.
                My details remain private and are not shared.
              </span>
            </label>

            {error && (
              <div className="text-sm text-rouge bg-rouge/5 border border-rouge/20 px-4 py-3">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              <UserPlus className="h-4 w-4" strokeWidth={1.5} />
              {loading ? 'Creating your account…' : 'Create Account'}
            </button>

            <div className="text-center text-sm text-ink/60">
              Already with us?{' '}
              <Link
                to={`/login${redirect !== '/account' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                className="text-rouge underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
}
