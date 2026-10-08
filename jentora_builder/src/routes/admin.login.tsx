import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authApi, authStorage } from '@/lib/api';
import logo from '@/assets/jentora-logo.png';

export const Route = createFileRoute('/admin/login')({
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // If already authenticated, redirect to /admin
    if (authStorage.isAuthenticated()) {
      router.navigate({ to: '/admin' as any });
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const user = await authApi.login({ username: username.trim(), password: password.trim() });
      setSuccess(true);
      setTimeout(() => {
        router.navigate({ to: '/admin' as any });
      }, 600);
    } catch (err: any) {
      setError(err.message || 'Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickCredentials = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 60%, #080d1a 100%)',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 16px',
        position: 'relative',
      }}
    >
      {/* BACKGROUND ACCENT GLOW */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(201, 160, 99, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(30, 41, 59, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          padding: '40px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(201, 160, 99, 0.1)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* LOGO & TITLE */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', padding: '8px', borderRadius: '8px', background: '#ffffff', marginBottom: '16px' }}>
            <img src={logo} alt="Jentora Builder" style={{ height: '42px', width: 'auto' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
            <ShieldCheck size={18} style={{ color: '#c9a063' }} />
            <span style={{ fontSize: '11px', letterSpacing: '0.15em', fontWeight: '700', color: '#c9a063', textTransform: 'uppercase' }}>
              Management Portal
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '600', letterSpacing: '-0.02em', margin: 0, color: '#ffffff' }}>
            Super Admin Sign In
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>
            Manage website content, inquiries & administration
          </p>
        </div>

        {/* ERROR / SUCCESS FEEDBACK */}
        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 14px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '8px',
              color: '#fca5a5',
              fontSize: '13px',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 14px',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              borderRadius: '8px',
              color: '#86efac',
              fontSize: '13px',
              marginBottom: '20px',
            }}
          >
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span>Authentication successful. Redirecting...</span>
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label
              htmlFor="admin-username"
              style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.04em' }}
            >
              USERNAME OR EMAIL
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="superadmin or admin@jentora.co.in"
                required
                style={{
                  width: '100%',
                  height: '46px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '0 14px 0 44px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#c9a063')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.04em' }}
            >
              SECURITY PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  width: '100%',
                  height: '46px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '0 44px 0 44px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#c9a063')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            style={{
              height: '48px',
              background: '#c9a063',
              color: '#0f172a',
              fontWeight: '700',
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '8px',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Authenticating with Spring Boot...' : 'Sign In To Dashboard'}
            {!loading && <ArrowRight size={16} />}
          </Button>
        </form>

        {/* DEMO CREDENTIALS QUICK FILL BAR */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '12px',
          }}
        >
          <p style={{ color: '#94a3b8', margin: '0 0 10px 0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Quick Credentials (Click to pre-fill):
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              type="button"
              onClick={() => fillQuickCredentials('superadmin', 'Admin@Jentora2026!')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(201, 160, 99, 0.3)',
                borderRadius: '6px',
                color: '#f8fafc',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '12px',
              }}
            >
              <div>
                <strong style={{ color: '#c9a063' }}>Super Admin:</strong> superadmin
              </div>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>Full Control</span>
            </button>

            <button
              type="button"
              onClick={() => fillQuickCredentials('manager', 'Manager@Jentora2026!')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                color: '#f8fafc',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '12px',
              }}
            >
              <div>
                <strong style={{ color: '#94a3b8' }}>Admin Manager:</strong> manager
              </div>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>Inquiries & CMS</span>
            </button>
          </div>
        </div>

        {/* RETURN TO PUBLIC WEBSITE */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a
            href="/"
            style={{
              color: '#94a3b8',
              fontSize: '12px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ← Return to Jentora Builder Website
          </a>
        </div>
      </div>

      {/* SECURITY FOOTER NOTE */}
      <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '11px', color: '#64748b' }}>
        <span>Protected by Spring Boot 3 & JWT Role-Based Access Control · Jentora Builder Pvt Ltd</span>
      </div>
    </div>
  );
}
