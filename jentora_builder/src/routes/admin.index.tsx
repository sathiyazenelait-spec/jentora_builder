import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Users,
  Globe,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  MessageCircle,
  Phone,
  Mail,
  Search,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Save,
  Check,
  Building,
  Calendar,
  AlertTriangle,
  Send,
  Eye,
  X,
  UserCheck,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import {
  adminApi,
  authApi,
  authStorage,
  type ContactQuery,
  type DashboardStats,
  type User,
} from '@/lib/api';
import logo from '@/assets/jentora-logo.png';
import {
  company as defaultCompany,
  leadership,
  visionData,
  companyCommitment,
  socialLinks,
} from '@/data/company';

export const Route = createFileRoute('/admin/')({
  component: SuperAdminDashboard,
});

function SuperAdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'users' | 'cms'>('overview');

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [cmsData, setCmsData] = useState<any>(null);

  // Inquiry filter & search
  const [queryStatusFilter, setQueryStatusFilter] = useState<string>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
  const [queryNotes, setQueryNotes] = useState<string>('');
  const [savingNotes, setSavingNotes] = useState(false);

  // User management modals
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    role: 'ROLE_ADMIN',
  });
  const [editUserData, setEditUserData] = useState({
    email: '',
    fullName: '',
    role: 'ROLE_ADMIN',
    password: '',
    active: true,
  });

  // CMS Form state
  const [cmsForm, setCmsForm] = useState({
    companyName: defaultCompany.name || 'Jentora Builder Private Limited',
    tagline: 'PASSION · PRECISION · PERFECTION',
    yearsExperience: 17,
    projectsCompleted: defaultCompany.completedProjects || 2,
    managingDirector: leadership[0]?.name || 'Mr. SARAVANAN V',
    marketingLead: leadership[1]?.name || 'Mrs. GIRIJA',
    primaryPhone: defaultCompany.primaryPhone || '+91 9444484625',
    secondaryPhone: defaultCompany.secondaryPhone || '+91 9444434196',
    email: defaultCompany.email || 'info@jentora.co.in',
    operatingHours: defaultCompany.operatingHours || 'Monday to Saturday – 10.00 am to 6.00 pm',
    addressFull: defaultCompany.address?.full || 'Plot No.85, 2nd Floor, 4th Avenue Road, Shanthi Colony, Anna Nagar, Chennai – 600040.',
    googleMapsUrl: defaultCompany.googleMapsUrl || 'https://maps.app.goo.gl/jhPACJxwpdF3Prdp6',
    whatsappUrl: defaultCompany.whatsappUrl || 'https://wa.me/919444484625',
    visionP1: visionData.paragraphs?.[0] || 'To be a trusted and respected leader in the construction and real estate industry.',
    visionP2: visionData.paragraphs?.[1] || 'We envision building developments that go beyond physical structures.',
    commitmentP1: companyCommitment.tagline || 'Passion in every idea. Precision in every detail. Perfection in every project.',
    commitmentP2: companyCommitment.statement || 'At Jentora, our mission is not simply to construct buildings, but to create spaces, relationships, and landmarks built on trust and excellence.',
    facebook: socialLinks.facebook || '',
    instagram: socialLinks.instagram || '',
    linkedin: socialLinks.linkedin || '',
    youtube: socialLinks.youtube || '',
  });
  const [savingCms, setSavingCms] = useState(false);

  // Check auth on load
  useEffect(() => {
    const user = authStorage.getUser();
    if (!authStorage.isAuthenticated() || !user) {
      router.navigate({ to: '/admin/login' as any });
      return;
    }
    setCurrentUser(user);
    loadAllData();
  }, [router]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadAllData = async () => {
    try {
      setRefreshing(true);
      const [statsRes, queriesRes, usersRes, contentRes] = await Promise.allSettled([
        adminApi.getStats(),
        adminApi.getQueries(),
        adminApi.getUsers(),
        adminApi.getAllContent(),
      ]);

      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
      if (queriesRes.status === 'fulfilled') setQueries(queriesRes.value);
      if (usersRes.status === 'fulfilled') setUsers(usersRes.value);
      if (contentRes.status === 'fulfilled' && contentRes.value) {
        setCmsData(contentRes.value);
        const list = Array.isArray(contentRes.value) ? contentRes.value : [];
        const profileItem = list.find((item: any) => item.key === 'company_profile');
        if (profileItem && profileItem.jsonContent) {
          try {
            const parsed = typeof profileItem.jsonContent === 'string' ? JSON.parse(profileItem.jsonContent) : profileItem.jsonContent;
            setCmsForm((prev) => ({
              ...prev,
              ...parsed,
            }));
          } catch (e) {
            console.warn('Could not parse cms json', e);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    if (confirm('Are you sure you want to sign out of the Admin Portal?')) {
      await authApi.logout();
      router.navigate({ to: '/admin/login' as any });
    }
  };

  // Inquiry Operations
  const handleUpdateQueryStatus = async (id: number, status: string, notes?: string) => {
    try {
      await adminApi.updateQueryStatus(id, { status, adminNotes: notes });
      showToast(`Inquiry #${id} marked as ${status}`);
      // Refresh local queries
      setQueries((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: status as any, adminNotes: notes ?? q.adminNotes } : q))
      );
      if (selectedQuery?.id === id) {
        setSelectedQuery((prev) => (prev ? { ...prev, status: status as any, adminNotes: notes ?? prev.adminNotes } : null));
      }
      // Refresh stats
      adminApi.getStats().then(setStats).catch(console.error);
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedQuery) return;
    try {
      setSavingNotes(true);
      await adminApi.updateQueryStatus(selectedQuery.id, {
        status: selectedQuery.status,
        adminNotes: queryNotes,
      });
      showToast('Admin notes saved successfully.');
      setSelectedQuery({ ...selectedQuery, adminNotes: queryNotes });
      setQueries((prev) =>
        prev.map((q) => (q.id === selectedQuery.id ? { ...q, adminNotes: queryNotes } : q))
      );
    } catch (err: any) {
      alert('Error saving notes: ' + err.message);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDeleteQuery = async (id: number) => {
    if (!confirm('Are you sure you want to permanently delete this inquiry?')) return;
    try {
      await adminApi.deleteQuery(id);
      showToast('Inquiry deleted successfully.');
      setQueries((prev) => prev.filter((q) => q.id !== id));
      if (selectedQuery?.id === id) setSelectedQuery(null);
      adminApi.getStats().then(setStats).catch(console.error);
    } catch (err: any) {
      alert('Error deleting inquiry: ' + err.message);
    }
  };

  // User Management Operations
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.createUser(newUserData);
      showToast(`Administrator account "${newUserData.username}" created successfully.`);
      setShowCreateUserModal(false);
      setNewUserData({ username: '', email: '', fullName: '', password: '', role: 'ROLE_ADMIN' });
      const updatedUsers = await adminApi.getUsers();
      setUsers(updatedUsers);
      adminApi.getStats().then(setStats).catch(console.error);
    } catch (err: any) {
      alert('Failed to create user: ' + err.message);
    }
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userToEdit) return;
    try {
      await adminApi.updateUser(userToEdit.id, editUserData);
      showToast(`User "${userToEdit.username}" updated successfully.`);
      setShowEditUserModal(false);
      const updatedUsers = await adminApi.getUsers();
      setUsers(updatedUsers);
    } catch (err: any) {
      alert('Failed to update user: ' + err.message);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (user.id === currentUser?.id) {
      alert('You cannot delete your own active administrator account.');
      return;
    }
    if (!confirm(`Are you sure you want to delete administrator "${user.username}"?`)) return;
    try {
      await adminApi.deleteUser(user.id);
      showToast(`User "${user.username}" removed.`);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      adminApi.getStats().then(setStats).catch(console.error);
    } catch (err: any) {
      alert('Failed to delete user: ' + err.message);
    }
  };

  // CMS Save Operation
  const handleSaveCms = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingCms(true);
      await adminApi.updateContentSection('company_profile', cmsForm);
      showToast('Website content updated and published successfully in Spring Boot backend!');
    } catch (err: any) {
      alert('Failed to update website content: ' + err.message);
    } finally {
      setSavingCms(false);
    }
  };

  // Filtered queries list
  const filteredQueries = queries.filter((q) => {
    const matchesStatus = queryStatusFilter === 'ALL' || q.status === queryStatusFilter;
    const queryStr = `${q.fullName} ${q.email} ${q.phone} ${q.location} ${q.projectType} ${q.message}`.toLowerCase();
    const matchesKeyword = !searchKeyword.trim() || queryStr.includes(searchKeyword.toLowerCase().trim());
    return matchesStatus && matchesKeyword;
  });

  const isSuperAdmin = currentUser?.role === 'ROLE_SUPER_ADMIN';

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
          <RefreshCw className="animate-spin" size={36} style={{ color: '#c9a063', margin: '0 auto 16px' }} />
          <p style={{ fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Loading Jentora Admin Portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* TOAST ALERT */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            border: '1px solid #c9a063',
            color: '#f8fafc',
            padding: '14px 20px',
            borderRadius: '10px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            fontWeight: '500',
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          <CheckCircle size={18} style={{ color: '#c9a063' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '12px 24px',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '4px 8px', borderRadius: '6px' }}>
              <img src={logo} alt="Jentora Builder" style={{ height: '32px', width: 'auto' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.01em', color: '#ffffff' }}>
                  JENTORA SUPER ADMIN
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    background: isSuperAdmin ? 'rgba(201, 160, 99, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                    color: isSuperAdmin ? '#c9a063' : '#60a5fa',
                    border: `1px solid ${isSuperAdmin ? '#c9a063' : '#3b82f6'}`,
                    padding: '2px 8px',
                    borderRadius: '12px',
                  }}
                >
                  {isSuperAdmin ? 'SUPER ADMIN' : 'ADMINISTRATOR'}
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
                Spring Boot Security · Content & Lead Operations
              </p>
            </div>
          </div>

          {/* RIGHT CONTROLS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={loadAllData}
              disabled={refreshing}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                color: '#e2e8f0',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </Button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#94a3b8',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textDecoration: 'none',
              }}
            >
              <span>View Site</span>
              <ExternalLink size={13} />
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '12px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#f8fafc' }}>
                  {currentUser?.fullName || currentUser?.username}
                </span>
                <span style={{ display: 'block', fontSize: '10px', color: '#64748b' }}>
                  {currentUser?.email}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  borderColor: 'rgba(239, 68, 68, 0.4)',
                  color: '#fca5a5',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                }}
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '24px 20px', flex: 1 }}>
        {/* TABS NAVIGATION */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '12px',
            marginBottom: '24px',
            overflowX: 'auto',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'overview' ? '#c9a063' : 'transparent',
              color: activeTab === 'overview' ? '#0f172a' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'inquiries' ? '#c9a063' : 'transparent',
              color: activeTab === 'inquiries' ? '#0f172a' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            <Inbox size={16} />
            <span>Inquiries & Quotes</span>
            {stats && stats.newQueries > 0 && (
              <span
                style={{
                  background: activeTab === 'inquiries' ? '#0f172a' : '#ef4444',
                  color: activeTab === 'inquiries' ? '#c9a063' : '#ffffff',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '2px 6px',
                  borderRadius: '10px',
                }}
              >
                {stats.newQueries}
              </span>
            )}
          </button>

          {isSuperAdmin && (
            <button
              type="button"
              onClick={() => setActiveTab('users')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                border: 'none',
                background: activeTab === 'users' ? '#c9a063' : 'transparent',
                color: activeTab === 'users' ? '#0f172a' : '#94a3b8',
                transition: 'all 0.2s',
              }}
            >
              <Users size={16} />
              <span>User Management</span>
              <span
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.04em',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                SUPER
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('cms')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'cms' ? '#c9a063' : 'transparent',
              color: activeTab === 'cms' ? '#0f172a' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            <Globe size={16} />
            <span>Website CMS & Content</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* STATS CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#131b2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Total Inquiries Received
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '8px' }}>
                  <h3 style={{ fontSize: '32px', fontWeight: '700', margin: 0, color: '#f8fafc' }}>
                    {stats?.totalQueries ?? 0}
                  </h3>
                  <Inbox size={22} style={{ color: '#c9a063' }} />
                </div>
                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                  Contact form & quote requests
                </p>
              </div>

              <div style={{ background: '#131b2e', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '20px' }}>
                <span style={{ fontSize: '11px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  New Unread Requests
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '8px' }}>
                  <h3 style={{ fontSize: '32px', fontWeight: '700', margin: 0, color: '#f59e0b' }}>
                    {stats?.newQueries ?? 0}
                  </h3>
                  <Clock size={22} style={{ color: '#f59e0b' }} />
                </div>
                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                  Requires prompt customer callback
                </p>
              </div>

              <div style={{ background: '#131b2e', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px' }}>
                <span style={{ fontSize: '11px', color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Resolved / Handled
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '8px' }}>
                  <h3 style={{ fontSize: '32px', fontWeight: '700', margin: 0, color: '#22c55e' }}>
                    {stats?.resolvedQueries ?? 0}
                  </h3>
                  <CheckCircle size={22} style={{ color: '#22c55e' }} />
                </div>
                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                  Consultations completed
                </p>
              </div>

              <div style={{ background: '#131b2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Active Admins & Staff
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '8px' }}>
                  <h3 style={{ fontSize: '32px', fontWeight: '700', margin: 0, color: '#f8fafc' }}>
                    {stats?.totalUsers ?? users.length}
                  </h3>
                  <Users size={22} style={{ color: '#38bdf8' }} />
                </div>
                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                  With Spring Boot security
                </p>
              </div>
            </div>

            {/* RECENT INQUIRIES QUICK VIEW */}
            <div style={{ background: '#131b2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                    Recent Inquiries & Leads
                  </h4>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
                    Latest client inquiries submitted through public website
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('inquiries')}
                  style={{ fontSize: '12px', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  View All ({queries.length})
                </Button>
              </div>

              {queries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  <Inbox size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                  <p>No inquiries received yet. They will appear here immediately when clients submit forms.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {queries.slice(0, 5).map((q) => (
                    <div
                      key={q.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 16px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '8px',
                        flexWrap: 'wrap',
                        gap: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: q.status === 'NEW' ? '#f59e0b' : q.status === 'IN_PROGRESS' ? '#3b82f6' : '#22c55e',
                          }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong style={{ fontSize: '14px', color: '#ffffff' }}>{q.fullName}</strong>
                            <span style={{ fontSize: '11px', color: '#c9a063', background: 'rgba(201,160,99,0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                              {q.projectType}
                            </span>
                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>· {q.location}</span>
                          </div>
                          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0', maxWidth: '500px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            "{q.message}"
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <a
                          href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${q.fullName}, greetings from Jentora Builder Private Limited regarding your inquiry for ${q.projectType} in ${q.location}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 10px',
                            background: '#25D366',
                            color: '#ffffff',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '600',
                            textDecoration: 'none',
                          }}
                        >
                          <MessageCircle size={13} /> WhatsApp
                        </a>

                        <a
                          href={`tel:${q.phone.replace(/[^0-9+]/g, '')}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 10px',
                            background: 'rgba(255,255,255,0.08)',
                            color: '#ffffff',
                            borderRadius: '6px',
                            fontSize: '11px',
                            textDecoration: 'none',
                          }}
                        >
                          <Phone size={13} /> Call
                        </a>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedQuery(q);
                            setQueryNotes(q.adminNotes || '');
                          }}
                          style={{ fontSize: '11px', height: '30px' }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES & LEADS CRM */}
        {activeTab === 'inquiries' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* FILTER & SEARCH BAR */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                background: '#131b2e',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* STATUS FILTER PILLS */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['ALL', 'NEW', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setQueryStatusFilter(st)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: queryStatusFilter === st ? '#c9a063' : 'rgba(255,255,255,0.1)',
                      background: queryStatusFilter === st ? 'rgba(201, 160, 99, 0.2)' : 'rgba(255,255,255,0.03)',
                      color: queryStatusFilter === st ? '#c9a063' : '#94a3b8',
                    }}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* SEARCH INPUT */}
              <div style={{ position: 'relative', minWidth: '260px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type="text"
                  placeholder="Search name, email, phone, location..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  style={{
                    width: '100%',
                    height: '38px',
                    background: '#0f172a',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '6px',
                    padding: '0 12px 0 36px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* INQUIRIES LIST TABLE */}
            <div style={{ background: '#131b2e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      <th style={{ padding: '14px 16px' }}>Status</th>
                      <th style={{ padding: '14px 16px' }}>Client Info</th>
                      <th style={{ padding: '14px 16px' }}>Project Type & Location</th>
                      <th style={{ padding: '14px 16px' }}>Budget</th>
                      <th style={{ padding: '14px 16px' }}>Source & Date</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQueries.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                          No inquiries found matching current filters.
                        </td>
                      </tr>
                    ) : (
                      filteredQueries.map((q) => (
                        <tr
                          key={q.id}
                          style={{
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            transition: 'background 0.15s',
                          }}
                          className="hover:bg-slate-800/40"
                        >
                          <td style={{ padding: '14px 16px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                fontSize: '11px',
                                fontWeight: '700',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                background:
                                  q.status === 'NEW'
                                    ? 'rgba(245, 158, 11, 0.15)'
                                    : q.status === 'IN_PROGRESS'
                                    ? 'rgba(59, 130, 246, 0.15)'
                                    : q.status === 'RESOLVED'
                                    ? 'rgba(34, 197, 94, 0.15)'
                                    : 'rgba(148, 163, 184, 0.15)',
                                color:
                                  q.status === 'NEW'
                                    ? '#f59e0b'
                                    : q.status === 'IN_PROGRESS'
                                    ? '#60a5fa'
                                    : q.status === 'RESOLVED'
                                    ? '#4ade80'
                                    : '#94a3b8',
                                border: `1px solid ${
                                  q.status === 'NEW'
                                    ? '#f59e0b'
                                    : q.status === 'IN_PROGRESS'
                                    ? '#3b82f6'
                                    : q.status === 'RESOLVED'
                                    ? '#22c55e'
                                    : '#64748b'
                                }`,
                              }}
                            >
                              {q.status.replace('_', ' ')}
                            </span>
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontWeight: '600', color: '#f8fafc' }}>{q.fullName}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', gap: '8px', marginTop: '2px' }}>
                              <span>{q.phone}</span> · <span>{q.email}</span>
                            </div>
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ color: '#c9a063', fontWeight: '500' }}>{q.projectType}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{q.location}</div>
                          </td>

                          <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>
                            {q.estimatedBudget || 'Flexible / Standard'}
                          </td>

                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{q.source.replace(/_/g, ' ')}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>
                              {new Date(q.createdAt).toLocaleDateString()}
                            </div>
                          </td>

                          <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <a
                                href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${q.fullName}, thank you for contacting Jentora Builder Private Limited regarding your inquiry for ${q.projectType}. How may we assist you today?`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat on WhatsApp"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '32px',
                                  height: '32px',
                                  background: 'rgba(37, 211, 102, 0.15)',
                                  border: '1px solid rgba(37, 211, 102, 0.4)',
                                  color: '#25D366',
                                  borderRadius: '6px',
                                }}
                              >
                                <MessageCircle size={15} />
                              </a>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedQuery(q);
                                  setQueryNotes(q.adminNotes || '');
                                }}
                                style={{ height: '32px', fontSize: '12px' }}
                              >
                                View / Note
                              </Button>

                              {isSuperAdmin && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteQuery(q.id)}
                                  title="Delete inquiry"
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '32px',
                                    height: '32px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.25)',
                                    color: '#f87171',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: USER MANAGEMENT (SUPER ADMIN) */}
        {activeTab === 'users' && isSuperAdmin && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#131b2e',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                  Administrator & Staff Access
                </h3>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
                  Manage system administrators, roles, active privileges and password resets
                </p>
              </div>

              <Button
                onClick={() => setShowCreateUserModal(true)}
                style={{
                  background: '#c9a063',
                  color: '#0f172a',
                  fontWeight: '700',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Plus size={16} /> Add Administrator
              </Button>
            </div>

            {/* USERS TABLE */}
            <div style={{ background: '#131b2e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 16px' }}>User</th>
                    <th style={{ padding: '14px 16px' }}>Role</th>
                    <th style={{ padding: '14px 16px' }}>Status</th>
                    <th style={{ padding: '14px 16px' }}>Created Date</th>
                    <th style={{ padding: '14px 16px' }}>Last Sign In</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: '600', color: '#f8fafc' }}>{u.fullName || u.username}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                          @{u.username} · {u.email}
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: u.role === 'ROLE_SUPER_ADMIN' ? 'rgba(201,160,99,0.15)' : 'rgba(59,130,246,0.15)',
                            color: u.role === 'ROLE_SUPER_ADMIN' ? '#c9a063' : '#60a5fa',
                            border: `1px solid ${u.role === 'ROLE_SUPER_ADMIN' ? '#c9a063' : '#3b82f6'}`,
                          }}
                        >
                          {u.role.replace('ROLE_', '')}
                        </span>
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            color: u.active ? '#4ade80' : '#f87171',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: u.active ? '#22c55e' : '#ef4444' }} />
                          {u.active ? 'Active' : 'Disabled'}
                        </span>
                      </td>

                      <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '12px' }}>
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                      </td>

                      <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '12px' }}>
                        {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never'}
                      </td>

                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setUserToEdit(u);
                              setEditUserData({
                                email: u.email,
                                fullName: u.fullName,
                                role: u.role,
                                active: u.active,
                                password: '',
                              });
                              setShowEditUserModal(true);
                            }}
                            style={{ height: '30px', fontSize: '12px' }}
                          >
                            <Edit2 size={13} /> Edit
                          </Button>

                          {u.id !== currentUser?.id && (
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '30px',
                                height: '30px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                color: '#f87171',
                                borderRadius: '6px',
                                cursor: 'pointer',
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: WEBSITE CMS & CONTENT */}
        {activeTab === 'cms' && (
          <form onSubmit={handleSaveCms} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#131b2e',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                  Live Website Content Editor (CMS)
                </h3>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
                  Update brand identity, vision, mission, registered office, phone numbers, and leadership
                </p>
              </div>

              <Button
                type="submit"
                disabled={savingCms}
                style={{
                  background: '#c9a063',
                  color: '#0f172a',
                  fontWeight: '700',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Save size={16} />
                {savingCms ? 'Saving to Spring Boot...' : 'Publish Content Updates'}
              </Button>
            </div>

            {/* SECTION: COMPANY PROFILE & LEADERSHIP */}
            <div style={{ background: '#131b2e', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#c9a063', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                01. Company Profile & Leadership
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>COMPANY FULL NAME</label>
                  <input
                    type="text"
                    value={cmsForm.companyName}
                    onChange={(e) => setCmsForm({ ...cmsForm, companyName: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>TAGLINE / SLOGAN</label>
                  <input
                    type="text"
                    value={cmsForm.tagline}
                    onChange={(e) => setCmsForm({ ...cmsForm, tagline: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>YEARS OF INDUSTRY EXPERIENCE</label>
                  <input
                    type="number"
                    value={cmsForm.yearsExperience}
                    onChange={(e) => setCmsForm({ ...cmsForm, yearsExperience: parseInt(e.target.value) || 0 })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>TOTAL COMPLETED PROJECTS</label>
                  <input
                    type="number"
                    value={cmsForm.projectsCompleted}
                    onChange={(e) => setCmsForm({ ...cmsForm, projectsCompleted: parseInt(e.target.value) || 0 })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>MANAGING DIRECTOR</label>
                  <input
                    type="text"
                    value={cmsForm.managingDirector}
                    onChange={(e) => setCmsForm({ ...cmsForm, managingDirector: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>MARKETING LEAD</label>
                  <input
                    type="text"
                    value={cmsForm.marketingLead}
                    onChange={(e) => setCmsForm({ ...cmsForm, marketingLead: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>

            {/* SECTION: CONTACT DETAILS & REGISTERED OFFICE */}
            <div style={{ background: '#131b2e', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#c9a063', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                02. Registered Office & Contact Info
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>REGISTERED OFFICE ADDRESS</label>
                  <textarea
                    rows={2}
                    value={cmsForm.addressFull}
                    onChange={(e) => setCmsForm({ ...cmsForm, addressFull: e.target.value })}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>PRIMARY PHONE NUMBER</label>
                  <input
                    type="text"
                    value={cmsForm.primaryPhone}
                    onChange={(e) => setCmsForm({ ...cmsForm, primaryPhone: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>SECONDARY PHONE NUMBER</label>
                  <input
                    type="text"
                    value={cmsForm.secondaryPhone}
                    onChange={(e) => setCmsForm({ ...cmsForm, secondaryPhone: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>PRIMARY EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={cmsForm.email}
                    onChange={(e) => setCmsForm({ ...cmsForm, email: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>OPERATING HOURS</label>
                  <input
                    type="text"
                    value={cmsForm.operatingHours}
                    onChange={(e) => setCmsForm({ ...cmsForm, operatingHours: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>GOOGLE MAPS EMBED / SHARE URL</label>
                  <input
                    type="text"
                    value={cmsForm.googleMapsUrl}
                    onChange={(e) => setCmsForm({ ...cmsForm, googleMapsUrl: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>

            {/* SECTION: VISION & COMMITMENT */}
            <div style={{ background: '#131b2e', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#c9a063', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                03. Vision & Commitment Statements
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>OUR VISION — PARAGRAPH 1</label>
                  <textarea
                    rows={3}
                    value={cmsForm.visionP1}
                    onChange={(e) => setCmsForm({ ...cmsForm, visionP1: e.target.value })}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>OUR VISION — PARAGRAPH 2</label>
                  <textarea
                    rows={2}
                    value={cmsForm.visionP2}
                    onChange={(e) => setCmsForm({ ...cmsForm, visionP2: e.target.value })}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>OUR COMMITMENT — HEADLINE</label>
                  <input
                    type="text"
                    value={cmsForm.commitmentP1}
                    onChange={(e) => setCmsForm({ ...cmsForm, commitmentP1: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>OUR COMMITMENT — BODY</label>
                  <textarea
                    rows={2}
                    value={cmsForm.commitmentP2}
                    onChange={(e) => setCmsForm({ ...cmsForm, commitmentP2: e.target.value })}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>

            {/* SECTION: SOCIAL MEDIA */}
            <div style={{ background: '#131b2e', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#c9a063', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                04. Social Media URLs
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>FACEBOOK PAGE URL</label>
                  <input
                    type="text"
                    value={cmsForm.facebook}
                    onChange={(e) => setCmsForm({ ...cmsForm, facebook: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>INSTAGRAM PROFILE URL</label>
                  <input
                    type="text"
                    value={cmsForm.instagram}
                    onChange={(e) => setCmsForm({ ...cmsForm, instagram: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>LINKEDIN PAGE URL</label>
                  <input
                    type="text"
                    value={cmsForm.linkedin}
                    onChange={(e) => setCmsForm({ ...cmsForm, linkedin: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>YOUTUBE CHANNEL URL</label>
                  <input
                    type="text"
                    value={cmsForm.youtube}
                    onChange={(e) => setCmsForm({ ...cmsForm, youtube: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>

            {/* SAVE BUTTON BOTTOM */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '30px' }}>
              <Button
                type="submit"
                disabled={savingCms}
                style={{
                  background: '#c9a063',
                  color: '#0f172a',
                  fontWeight: '700',
                  fontSize: '14px',
                  padding: '14px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Save size={18} />
                {savingCms ? 'Saving...' : 'Save All Website Changes'}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* MODAL: INQUIRY DETAILS & INTERNAL NOTES */}
      <Dialog open={selectedQuery !== null} onOpenChange={(open) => { if (!open) setSelectedQuery(null); }}>
        <DialogContent
          style={{
            background: '#131b2e',
            color: '#f8fafc',
            border: '1px solid rgba(255,255,255,0.15)',
            maxWidth: '600px',
            padding: '28px',
          }}
        >
          {selectedQuery && (
            <div>
              <DialogHeader>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <DialogTitle style={{ fontSize: '20px', color: '#ffffff', margin: 0 }}>
                    Inquiry #{selectedQuery.id} Details
                  </DialogTitle>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: selectedQuery.status === 'NEW' ? '#f59e0b' : selectedQuery.status === 'IN_PROGRESS' ? '#3b82f6' : '#22c55e',
                      color: '#ffffff',
                    }}
                  >
                    {selectedQuery.status}
                  </span>
                </div>
                <DialogDescription style={{ color: '#94a3b8', fontSize: '12px' }}>
                  Received on {new Date(selectedQuery.createdAt).toLocaleString()} via {selectedQuery.source}
                </DialogDescription>
              </DialogHeader>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '18px' }}>
                {/* CLIENT INFO GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(15,23,42,0.6)', padding: '14px', borderRadius: '8px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Client Name</span>
                    <p style={{ margin: '2px 0 0', fontWeight: '600', color: '#ffffff' }}>{selectedQuery.fullName}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Phone Number</span>
                    <p style={{ margin: '2px 0 0', color: '#c9a063' }}>{selectedQuery.phone}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Email</span>
                    <p style={{ margin: '2px 0 0', color: '#cbd5e1' }}>{selectedQuery.email}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Location</span>
                    <p style={{ margin: '2px 0 0', color: '#cbd5e1' }}>{selectedQuery.location}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Project Type</span>
                    <p style={{ margin: '2px 0 0', color: '#38bdf8' }}>{selectedQuery.projectType}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Budget</span>
                    <p style={{ margin: '2px 0 0', color: '#4ade80' }}>{selectedQuery.estimatedBudget || 'Not specified'}</p>
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Client Message</span>
                  <div style={{ background: '#0f172a', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', marginTop: '4px', fontSize: '13px', lineHeight: '1.6', color: '#e2e8f0' }}>
                    {selectedQuery.message}
                  </div>
                </div>

                {/* FAST DIRECT ACTIONS */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/${selectedQuery.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedQuery.fullName}, greetings from Jentora Builder Private Limited regarding your inquiry for ${selectedQuery.projectType} in ${selectedQuery.location}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: '#25D366',
                      color: '#ffffff',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={15} /> Open WhatsApp
                  </a>

                  <a
                    href={`tel:${selectedQuery.phone.replace(/[^0-9+]/g, '')}`}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      textDecoration: 'none',
                    }}
                  >
                    <Phone size={15} /> Call Client
                  </a>

                  <a
                    href={`mailto:${selectedQuery.email}?subject=${encodeURIComponent(`Jentora Builder — Inquiry regarding ${selectedQuery.projectType}`)}`}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      textDecoration: 'none',
                    }}
                  >
                    <Mail size={15} /> Send Email
                  </a>
                </div>

                {/* STATUS TOGGLE */}
                <div>
                  <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Change Lead Status</span>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    {(['NEW', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleUpdateQueryStatus(selectedQuery.id, st, queryNotes)}
                        style={{
                          flex: 1,
                          padding: '8px 6px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700',
                          border: '1px solid',
                          borderColor: selectedQuery.status === st ? '#c9a063' : 'rgba(255,255,255,0.15)',
                          background: selectedQuery.status === st ? '#c9a063' : '#0f172a',
                          color: selectedQuery.status === st ? '#0f172a' : '#94a3b8',
                          cursor: 'pointer',
                        }}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* INTERNAL ADMIN NOTES */}
                <div>
                  <label htmlFor="admin-query-notes" style={{ display: 'block', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Internal Follow-Up Notes
                  </label>
                  <textarea
                    id="admin-query-notes"
                    rows={3}
                    placeholder="E.g., Called client on Oct 8, scheduled site inspection in Thiruvallur on Saturday..."
                    value={queryNotes}
                    onChange={(e) => setQueryNotes(e.target.value)}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px', marginTop: '4px' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                    <Button
                      size="sm"
                      onClick={handleSaveNotes}
                      disabled={savingNotes}
                      style={{ background: '#c9a063', color: '#0f172a', fontSize: '12px', fontWeight: '600' }}
                    >
                      {savingNotes ? 'Saving Notes...' : 'Save Follow-Up Notes'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL: CREATE USER (SUPER ADMIN) */}
      <Dialog open={showCreateUserModal} onOpenChange={setShowCreateUserModal}>
        <DialogContent style={{ background: '#131b2e', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.15)', maxWidth: '480px' }}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: '18px', color: '#ffffff' }}>Add New Administrator</DialogTitle>
            <DialogDescription style={{ color: '#94a3b8', fontSize: '12px' }}>
              Create an administrative user with role-based access control
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>FULL NAME</label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={newUserData.fullName}
                onChange={(e) => setNewUserData({ ...newUserData, fullName: e.target.value })}
                style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>USERNAME</label>
              <input
                type="text"
                required
                placeholder="e.g. manager2"
                value={newUserData.username}
                onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
                style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>EMAIL ADDRESS</label>
              <input
                type="email"
                required
                placeholder="e.g. manager@jentora.co.in"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>TEMPORARY PASSWORD</label>
              <input
                type="password"
                required
                placeholder="Minimum 6 characters"
                value={newUserData.password}
                onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>ROLE</label>
              <select
                value={newUserData.role}
                onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
              >
                <option value="ROLE_ADMIN">ROLE_ADMIN (Manage Inquiries & CMS)</option>
                <option value="ROLE_SUPER_ADMIN">ROLE_SUPER_ADMIN (Full Control + User Management)</option>
                <option value="ROLE_EDITOR">ROLE_EDITOR (CMS Content Only)</option>
              </select>
            </div>

            <DialogFooter style={{ marginTop: '12px' }}>
              <Button type="button" variant="outline" onClick={() => setShowCreateUserModal(false)} style={{ fontSize: '12px' }}>
                Cancel
              </Button>
              <Button type="submit" style={{ background: '#c9a063', color: '#0f172a', fontWeight: '700', fontSize: '12px' }}>
                Create Account
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL: EDIT USER (SUPER ADMIN) */}
      <Dialog open={showEditUserModal} onOpenChange={setShowEditUserModal}>
        <DialogContent style={{ background: '#131b2e', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.15)', maxWidth: '480px' }}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: '18px', color: '#ffffff' }}>
              Edit User: @{userToEdit?.username}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEditUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>FULL NAME</label>
              <input
                type="text"
                required
                value={editUserData.fullName}
                onChange={(e) => setEditUserData({ ...editUserData, fullName: e.target.value })}
                style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={editUserData.email}
                onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>RESET PASSWORD (OPTIONAL)</label>
              <input
                type="password"
                placeholder="Leave blank to keep existing password"
                value={editUserData.password}
                onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })}
                style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>ROLE</label>
              <select
                value={editUserData.role}
                onChange={(e) => setEditUserData({ ...editUserData, role: e.target.value })}
                style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
              >
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                <option value="ROLE_SUPER_ADMIN">ROLE_SUPER_ADMIN</option>
                <option value="ROLE_EDITOR">ROLE_EDITOR</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '6px' }}>
              <input
                type="checkbox"
                id="user-active"
                checked={editUserData.active}
                onChange={(e) => setEditUserData({ ...editUserData, active: e.target.checked })}
                style={{ width: '16px', height: '16px' }}
              />
              <label htmlFor="user-active" style={{ fontSize: '13px', color: '#f8fafc', cursor: 'pointer' }}>
                Account Active & Enabled
              </label>
            </div>

            <DialogFooter style={{ marginTop: '12px' }}>
              <Button type="button" variant="outline" onClick={() => setShowEditUserModal(false)} style={{ fontSize: '12px' }}>
                Cancel
              </Button>
              <Button type="submit" style={{ background: '#c9a063', color: '#0f172a', fontWeight: '700', fontSize: '12px' }}>
                Update Account
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
