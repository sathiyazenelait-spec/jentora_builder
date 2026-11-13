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
  Hammer,
  FolderKanban,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import {
  adminApi,
  authApi,
  authStorage,
  publicApi,
  type ContactQuery,
  type DashboardStats,
  type User,
} from '@/lib/api';
import logo from '@/assets/jentora-logo.png';
import villas from '@/assets/villas.jpg';
import apartment from '@/assets/apartment.jpg';
import interior from '@/assets/interior.jpg';
import serviceCommercial from '@/assets/service-commercial.jpg';
import serviceIndustrial from '@/assets/service-industrial.jpg';
import serviceCivil from '@/assets/service-civil.jpg';
import serviceBlueprint from '@/assets/service-blueprint.jpg';
import serviceManager from '@/assets/service-manager.jpg';
import {
  company as defaultCompany,
  leadership,
  visionData,
  companyCommitment,
  socialLinks,
  footerConfig as defaultFooterConfig,
  servicesPageConfig as defaultServicesPageConfig,
  serviceItems as defaultServiceItems,
  projects as defaultProjects,
  applyDynamicContent,
  type ServiceItem,
  type Project,
  type FooterConfig,
  type ServicesPageConfig,
} from '@/data/company';

export const Route = createFileRoute('/admin/')({
  component: SuperAdminDashboard,
});

function SuperAdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(() => authStorage.getUser());
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'services' | 'projects' | 'cms' | 'users'>('overview');

  // Loading & error states - initialized to false if user session is already cached
  const [loading, setLoading] = useState(() => !authStorage.isAuthenticated());
  const [refreshing, setRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [cmsData, setCmsData] = useState<any>(null);

  // Services Management State
  const [servicesList, setServicesList] = useState<ServiceItem[]>(() => [...defaultServiceItems]);
  const [servicesPageForm, setServicesPageForm] = useState<ServicesPageConfig>(() => ({ ...defaultServicesPageConfig }));
  const [savingServices, setSavingServices] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [serviceModalForm, setServiceModalForm] = useState<ServiceItem>({
    id: '',
    number: '',
    title: '',
    desc: '',
    exploredContent: '',
    image: villas,
    features: [],
    active: true,
  });
  const [serviceFeaturesInput, setServiceFeaturesInput] = useState<string>('');

  // Projects Management State
  const [projectsList, setProjectsList] = useState<Project[]>(() => [...defaultProjects]);
  const [savingProjects, setSavingProjects] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [projectModalForm, setProjectModalForm] = useState<Project>({
    id: '',
    number: '',
    name: '',
    location: '',
    category: 'Apartment',
    status: 'Completed',
    units: '',
    floors: '',
    year: '',
    image: '/site-photos/vadapalani/vadapalani-1.jpg',
    gallery: [],
  });
  const [projectGalleryInput, setProjectGalleryInput] = useState<string>('');

  // Footer Configuration State
  const [footerForm, setFooterForm] = useState<FooterConfig>({
    serviceListStyle: defaultFooterConfig.serviceListStyle || 'numbers',
    navListStyle: defaultFooterConfig.navListStyle || 'numbers',
    brandHeadline: defaultFooterConfig.brandHeadline || 'START YOUR PROJECT',
    brandTagline: defaultFooterConfig.brandTagline || 'PASSION · PRECISION · PERFECTION',
    brandAboutText: defaultFooterConfig.brandAboutText || '20 Years of industry experience delivering premium residential, commercial, and industrial landmarks built on trust and superior craftsmanship.',
    turnkeyTitle: defaultFooterConfig.turnkeyTitle || 'TURNKEY ASSURANCE',
    turnkeyText: defaultFooterConfig.turnkeyText || 'End-to-end structural engineering, architectural blueprints, and handover guarantee across Tamil Nadu.',
    operatingRegionsTitle: defaultFooterConfig.operatingRegionsTitle || 'OPERATING REGIONS',
    operatingRegionsText: defaultFooterConfig.operatingRegionsText || 'Chennai · Coimbatore',
    showProjectsInFooter: Boolean(defaultFooterConfig.showProjectsInFooter),
  });

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
    yearsExperience: 20,
    projectsCompleted: defaultCompany.completedProjects || 157,
    managingDirector: leadership[0]?.name || 'Mr. SARAVANAN V',
    marketingLead: leadership[1]?.name || 'Mrs. GIRIJA',
    primaryPhone: defaultCompany.primaryPhone || '+91 9444434196',
    secondaryPhone: defaultCompany.secondaryPhone || '',
    email: defaultCompany.email || 'admin@jentorabuilder.com',
    operatingHours: defaultCompany.operatingHours || 'Monday to Saturday – 10.00 am to 6.00 pm',
    addressFull: defaultCompany.address?.full || 'Plot No.85, 2nd Floor, 4th Avenue Road, Shanthi Colony, Anna Nagar, Chennai – 600040.',
    googleMapsUrl: defaultCompany.googleMapsUrl || 'https://maps.app.goo.gl/jhPACJxwpdF3Prdp6',
    whatsappUrl: defaultCompany.whatsappUrl || 'https://wa.me/919444434196',
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

    // Keep Render container alive while admin is working on the dashboard
    const heartbeat = setInterval(() => {
      publicApi.getPublicContent().catch(() => {});
    }, 8 * 60 * 1000); // ping every 8 mins to prevent 15-min Render idle sleep

    return () => clearInterval(heartbeat);
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
        const profileItem = list.find((item: any) => item.key === 'company_profile') || list.find((item: any) => item.key === 'company_info');
        if (profileItem && profileItem.jsonContent) {
          try {
            const parsed = typeof profileItem.jsonContent === 'string' ? JSON.parse(profileItem.jsonContent) : profileItem.jsonContent;
            setCmsForm((prev) => ({
              ...prev,
              ...parsed,
              companyName: parsed.companyName || parsed.name || prev.companyName,
              tagline: parsed.tagline || prev.tagline,
              yearsExperience: parsed.yearsExperience || (parsed.experience ? parseInt(parsed.experience) : prev.yearsExperience),
              projectsCompleted: parsed.projectsCompleted || parsed.completedProjects || prev.projectsCompleted,
              primaryPhone: parsed.primaryPhone || prev.primaryPhone,
              secondaryPhone: parsed.secondaryPhone || prev.secondaryPhone,
              email: parsed.email || prev.email,
              operatingHours: parsed.operatingHours || prev.operatingHours,
              addressFull: parsed.addressFull || parsed.address || prev.addressFull,
            }));
          } catch (e) {
            console.warn('Could not parse cms json', e);
          }
        }

        // Hydrate services_list
        const servicesItem = list.find((item: any) => item.key === 'services_list');
        if (servicesItem && servicesItem.jsonContent) {
          try {
            const parsed = typeof servicesItem.jsonContent === 'string' ? JSON.parse(servicesItem.jsonContent) : servicesItem.jsonContent;
            if (Array.isArray(parsed) && parsed.length > 0) {
              setServicesList(parsed);
            }
          } catch (e) {
            console.warn('Could not parse services json', e);
          }
        }

        // Hydrate services_page_config
        const servicesPageItem = list.find((item: any) => item.key === 'services_page_config');
        if (servicesPageItem && servicesPageItem.jsonContent) {
          try {
            const parsed = typeof servicesPageItem.jsonContent === 'string' ? JSON.parse(servicesPageItem.jsonContent) : servicesPageItem.jsonContent;
            if (parsed && typeof parsed === 'object') {
              setServicesPageForm((prev) => ({ ...prev, ...parsed }));
            }
          } catch (e) {
            console.warn('Could not parse services page config json', e);
          }
        }

        // Hydrate projects_list
        const projectsItem = list.find((item: any) => item.key === 'projects_list');
        if (projectsItem && projectsItem.jsonContent) {
          try {
            const parsed = typeof projectsItem.jsonContent === 'string' ? JSON.parse(projectsItem.jsonContent) : projectsItem.jsonContent;
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProjectsList(parsed);
            }
          } catch (e) {
            console.warn('Could not parse projects json', e);
          }
        }

        // Hydrate footer_config
        const footerItem = list.find((item: any) => item.key === 'footer_config');
        if (footerItem && footerItem.jsonContent) {
          try {
            const parsed = typeof footerItem.jsonContent === 'string' ? JSON.parse(footerItem.jsonContent) : footerItem.jsonContent;
            if (parsed && typeof parsed === 'object') {
              setFooterForm((prev) => ({ ...prev, ...parsed }));
            }
          } catch (e) {
            console.warn('Could not parse footer json', e);
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
      await adminApi.updateQueryStatus(id, { status, adminNotes: notes, internalNotes: notes });
      showToast(`Inquiry #${id} marked as ${status}`);
      // Refresh local queries
      setQueries((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: status as any, adminNotes: notes ?? q.adminNotes, internalNotes: notes ?? q.internalNotes } : q))
      );
      if (selectedQuery?.id === id) {
        setSelectedQuery((prev) => (prev ? { ...prev, status: status as any, adminNotes: notes ?? prev.adminNotes, internalNotes: notes ?? prev.internalNotes } : null));
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
        internalNotes: queryNotes,
      });
      showToast('Admin notes saved successfully.');
      setSelectedQuery({ ...selectedQuery, adminNotes: queryNotes, internalNotes: queryNotes });
      setQueries((prev) =>
        prev.map((q) => (q.id === selectedQuery.id ? { ...q, adminNotes: queryNotes, internalNotes: queryNotes } : q))
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

  // CMS Save Operation (Profile, Info, Footer)
  const handleSaveCms = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingCms(true);
      await adminApi.updateContentSection('company_profile', cmsForm);

      // Keep company_info in sync so public endpoint has latest company info
      const companyInfoMapped = {
        name: cmsForm.companyName,
        tagline: cmsForm.tagline,
        experience: `${cmsForm.yearsExperience}+`,
        completedProjects: cmsForm.projectsCompleted,
        primaryPhone: cmsForm.primaryPhone,
        secondaryPhone: cmsForm.secondaryPhone,
        email: cmsForm.email,
        whatsapp: cmsForm.primaryPhone,
        address: cmsForm.addressFull,
        operatingHours: cmsForm.operatingHours,
      };
      await adminApi.updateContentSection('company_info', companyInfoMapped).catch(() => {});
      await adminApi.updateContentSection('footer_config', footerForm).catch(() => {});

      // Immediately synchronize and update live website content across all open pages & tabs
      applyDynamicContent({
        company_profile: cmsForm,
        company_info: companyInfoMapped,
        footer_config: footerForm,
      });

      showToast('Website content and footer configuration updated & published successfully!');
    } catch (err: any) {
      alert('Failed to update website content: ' + err.message);
    } finally {
      setSavingCms(false);
    }
  };

  // Services Save Operation
  const handleSaveServices = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setSavingServices(true);
      await adminApi.updateContentSection('services_list', servicesList);
      await adminApi.updateContentSection('services_page_config', servicesPageForm);

      applyDynamicContent({
        services_list: servicesList,
        services_page_config: servicesPageForm,
      });

      showToast('All services and services page configuration published to live website!');
    } catch (err: any) {
      alert('Failed to save services: ' + err.message);
    } finally {
      setSavingServices(false);
    }
  };

  // Service CRUD operations
  const handleOpenAddService = () => {
    const nextNum = servicesList.length + 1;
    setServiceModalForm({
      id: `service-${Date.now()}`,
      number: nextNum < 10 ? `0${nextNum}` : `${nextNum}`,
      title: '',
      desc: '',
      exploredContent: '',
      image: villas,
      features: ['Architectural Consultation', 'Quality Assurance & Lab Testing', 'Turnkey Material Delivery'],
      active: true,
    });
    setServiceFeaturesInput('Architectural Consultation, Quality Assurance & Lab Testing, Turnkey Material Delivery');
    setEditingServiceIndex(null);
    setShowServiceModal(true);
  };

  const handleOpenEditService = (index: number) => {
    const item = servicesList[index];
    if (!item) return;
    setServiceModalForm({ ...item });
    setServiceFeaturesInput(Array.isArray(item.features) ? item.features.join(', ') : '');
    setEditingServiceIndex(index);
    setShowServiceModal(true);
  };

  const handleSaveServiceModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceModalForm.title.trim()) {
      alert('Please enter a service title.');
      return;
    }
    const featuresList = serviceFeaturesInput
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const updatedItem: ServiceItem = {
      ...serviceModalForm,
      features: featuresList,
    };

    if (editingServiceIndex !== null) {
      setServicesList((prev) => {
        const next = [...prev];
        next[editingServiceIndex] = updatedItem;
        return next;
      });
      showToast(`Service "${updatedItem.title}" updated in working draft.`);
    } else {
      setServicesList((prev) => [...prev, updatedItem]);
      showToast(`New service "${updatedItem.title}" added to working draft.`);
    }
    setShowServiceModal(false);
  };

  const handleDeleteService = (index: number) => {
    const item = servicesList[index];
    if (!item) return;
    if (!confirm(`Are you sure you want to delete service "${item.title}"?`)) return;
    setServicesList((prev) => prev.filter((_, i) => i !== index));
    showToast(`Service "${item.title}" removed.`);
  };

  const handleMoveService = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= servicesList.length) return;
    setServicesList((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next.map((item, idx) => ({
        ...item,
        number: idx < 9 ? `0${idx + 1}` : `${idx + 1}`,
      }));
    });
  };

  const handleToggleServiceActive = (index: number) => {
    setServicesList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], active: next[index].active === false ? true : false };
      return next;
    });
  };

  // Projects Save Operation
  const handleSaveProjects = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setSavingProjects(true);
      await adminApi.updateContentSection('projects_list', projectsList);

      applyDynamicContent({
        projects_list: projectsList,
      });

      showToast('Projects portfolio published to live website successfully!');
    } catch (err: any) {
      alert('Failed to save projects: ' + err.message);
    } finally {
      setSavingProjects(false);
    }
  };

  // Project CRUD operations
  const handleOpenAddProject = () => {
    const nextNum = projectsList.length + 1;
    setProjectModalForm({
      id: `jentora-project-${Date.now()}`,
      number: nextNum < 10 ? `0${nextNum}` : `${nextNum}`,
      name: '',
      location: 'Chennai',
      category: 'Apartment',
      status: 'Completed',
      units: 6,
      floors: 3,
      year: new Date().getFullYear().toString(),
      image: '/site-photos/vadapalani/vadapalani-1.jpg',
      gallery: ['/site-photos/vadapalani/vadapalani-1.jpg'],
    });
    setProjectGalleryInput('/site-photos/vadapalani/vadapalani-1.jpg');
    setEditingProjectIndex(null);
    setShowProjectModal(true);
  };

  const handleOpenEditProject = (index: number) => {
    const item = projectsList[index];
    if (!item) return;
    setProjectModalForm({ ...item });
    setProjectGalleryInput(Array.isArray(item.gallery) ? item.gallery.join('\n') : item.image);
    setEditingProjectIndex(index);
    setShowProjectModal(true);
  };

  const handleSaveProjectModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectModalForm.name.trim()) {
      alert('Please enter a project name.');
      return;
    }
    const galleryUrls = projectGalleryInput
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean);

    const updatedProject: Project = {
      ...projectModalForm,
      gallery: galleryUrls.length > 0 ? galleryUrls : [projectModalForm.image],
    };

    if (editingProjectIndex !== null) {
      setProjectsList((prev) => {
        const next = [...prev];
        next[editingProjectIndex] = updatedProject;
        return next;
      });
      showToast(`Project "${updatedProject.name}" updated in working draft.`);
    } else {
      setProjectsList((prev) => [...prev, updatedProject]);
      showToast(`New project "${updatedProject.name}" added to working draft.`);
    }
    setShowProjectModal(false);
  };

  const handleDeleteProject = (index: number) => {
    const item = projectsList[index];
    if (!item) return;
    if (!confirm(`Are you sure you want to delete project "${item.name}"?`)) return;
    setProjectsList((prev) => prev.filter((_, i) => i !== index));
    showToast(`Project "${item.name}" removed.`);
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projectsList.length) return;
    setProjectsList((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next.map((item, idx) => ({
        ...item,
        number: idx < 9 ? `0${idx + 1}` : `${idx + 1}`,
      }));
    });
  };

  // Filtered queries list
  const filteredQueries = queries.filter((q) => {
    const matchesStatus = queryStatusFilter === 'ALL' || q.status === queryStatusFilter;
    const nameVal = q.name || q.fullName || '';
    const locVal = q.location || q.projectName || '';
    const queryStr = `${nameVal} ${q.email} ${q.phone} ${locVal} ${q.projectType} ${q.message}`.toLowerCase();
    const matchesKeyword = !searchKeyword.trim() || queryStr.includes(searchKeyword.toLowerCase().trim());
    return matchesStatus && matchesKeyword;
  });

  const isSuperAdmin = currentUser?.role === 'ROLE_SUPER_ADMIN';

  if (loading && !currentUser) {
    return (
      <div className="admin-dashboard-container" style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc' }}>
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
    <div className="admin-dashboard-container" style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
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

          <button
            type="button"
            onClick={() => setActiveTab('services')}
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
              background: activeTab === 'services' ? '#c9a063' : 'transparent',
              color: activeTab === 'services' ? '#0f172a' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            <Hammer size={16} />
            <span>Services & Capabilities</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                background: activeTab === 'services' ? '#0f172a' : 'rgba(255,255,255,0.1)',
                color: activeTab === 'services' ? '#c9a063' : '#94a3b8',
                padding: '2px 7px',
                borderRadius: '10px',
              }}
            >
              {servicesList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
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
              background: activeTab === 'projects' ? '#c9a063' : 'transparent',
              color: activeTab === 'projects' ? '#0f172a' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            <FolderKanban size={16} />
            <span>Projects Portfolio</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                background: activeTab === 'projects' ? '#0f172a' : 'rgba(255,255,255,0.1)',
                color: activeTab === 'projects' ? '#c9a063' : '#94a3b8',
                padding: '2px 7px',
                borderRadius: '10px',
              }}
            >
              {projectsList.length}
            </span>
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
                                border: `1px solid ${q.status === 'NEW'
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

        {/* TAB: SERVICES & CAPABILITIES MANAGEMENT */}
        {activeTab === 'services' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* TOP HEADER BAR */}
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
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Hammer size={20} style={{ color: '#c9a063' }} />
                  Services & Capabilities Manager
                </h3>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
                  Add new services, update explored inside content, images, key deliverables, and maintain the Services page
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Button
                  type="button"
                  onClick={handleOpenAddService}
                  style={{
                    background: 'rgba(201, 160, 99, 0.2)',
                    border: '1px solid #c9a063',
                    color: '#c9a063',
                    fontWeight: '600',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Plus size={16} /> Add New Service
                </Button>

                <Button
                  type="button"
                  onClick={handleSaveServices}
                  disabled={savingServices}
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
                  {savingServices ? 'Publishing to Website...' : 'Save & Publish Services'}
                </Button>
              </div>
            </div>

            {/* SERVICES PAGE CONTENT CONFIGURATION BOX */}
            <div style={{ background: '#131b2e', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#c9a063', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Services Page Header & Section Text
                </h4>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  These texts control the headlines on the public /services page
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>HERO SUBTITLE</label>
                  <input
                    type="text"
                    value={servicesPageForm.heroSubtitle}
                    onChange={(e) => setServicesPageForm({ ...servicesPageForm, heroSubtitle: e.target.value })}
                    style={{ width: '100%', height: '36px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 10px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>HERO MAIN TITLE</label>
                  <input
                    type="text"
                    value={servicesPageForm.heroTitle}
                    onChange={(e) => setServicesPageForm({ ...servicesPageForm, heroTitle: e.target.value })}
                    style={{ width: '100%', height: '36px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 10px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>HERO DESCRIPTION</label>
                  <input
                    type="text"
                    value={servicesPageForm.heroDescription}
                    onChange={(e) => setServicesPageForm({ ...servicesPageForm, heroDescription: e.target.value })}
                    style={{ width: '100%', height: '36px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 10px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>CAPABILITIES LABEL</label>
                  <input
                    type="text"
                    value={servicesPageForm.zigzagLabel}
                    onChange={(e) => setServicesPageForm({ ...servicesPageForm, zigzagLabel: e.target.value })}
                    style={{ width: '100%', height: '36px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 10px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>CAPABILITIES HEADING</label>
                  <input
                    type="text"
                    value={servicesPageForm.zigzagMainHeading}
                    onChange={(e) => setServicesPageForm({ ...servicesPageForm, zigzagMainHeading: e.target.value })}
                    style={{ width: '100%', height: '36px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 10px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>

            {/* SERVICES LIST CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#f8fafc', margin: 0 }}>
                  Active Construction & Design Services ({servicesList.length})
                </h4>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Use arrows to reorder. Click "Edit" to customize inside explored content & features.
                </span>
              </div>

              {servicesList.map((item, index) => (
                <div
                  key={item.id || index}
                  style={{
                    background: '#131b2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    flexWrap: 'wrap',
                    opacity: item.active === false ? 0.6 : 1,
                    transition: 'all 0.2s',
                  }}
                >
                  {/* REORDER BUTTONS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveService(index, 'up')}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: 'none',
                        color: index === 0 ? '#475569' : '#e2e8f0',
                        borderRadius: '4px',
                        padding: '4px',
                        cursor: index === 0 ? 'default' : 'pointer',
                      }}
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      disabled={index === servicesList.length - 1}
                      onClick={() => handleMoveService(index, 'down')}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: 'none',
                        color: index === servicesList.length - 1 ? '#475569' : '#e2e8f0',
                        borderRadius: '4px',
                        padding: '4px',
                        cursor: index === servicesList.length - 1 ? 'default' : 'pointer',
                      }}
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  {/* NUMBER & THUMBNAIL */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        background: '#0f172a',
                        color: '#c9a063',
                        border: '1px solid rgba(201, 160, 99, 0.4)',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        minWidth: '38px',
                        textAlign: 'center',
                      }}
                    >
                      {item.number}
                    </span>
                    <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <div style={{ flex: '1 1 300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', margin: 0 }}>
                        {item.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleToggleServiceActive(index)}
                        style={{
                          fontSize: '10px',
                          fontWeight: '700',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          border: 'none',
                          cursor: 'pointer',
                          background: item.active !== false ? 'rgba(34, 197, 94, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                          color: item.active !== false ? '#4ade80' : '#94a3b8',
                        }}
                      >
                        {item.active !== false ? 'ACTIVE' : 'HIDDEN'}
                      </button>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '4px 0 6px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.desc}
                    </p>
                    {item.features && item.features.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {item.features.slice(0, 3).map((f, fi) => (
                          <span key={fi} style={{ fontSize: '11px', background: 'rgba(201, 160, 99, 0.1)', color: '#c9a063', padding: '1px 6px', borderRadius: '4px' }}>
                            ✓ {f}
                          </span>
                        ))}
                        {item.features.length > 3 && (
                          <span style={{ fontSize: '11px', color: '#64748b' }}>
                            +{item.features.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEditService(index)}
                      style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)', color: '#e2e8f0' }}
                    >
                      <Edit2 size={13} style={{ marginRight: '4px' }} /> Edit
                    </Button>
                    <button
                      type="button"
                      onClick={() => handleDeleteService(index)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                      title="Delete Service"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PROJECTS PORTFOLIO MANAGEMENT */}
        {activeTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* TOP HEADER BAR */}
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
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FolderKanban size={20} style={{ color: '#c9a063' }} />
                  Projects Portfolio Manager
                </h3>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
                  Manage residential apartments, individual villas, commercial spaces, photos, and project statuses
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Button
                  type="button"
                  onClick={handleOpenAddProject}
                  style={{
                    background: 'rgba(201, 160, 99, 0.2)',
                    border: '1px solid #c9a063',
                    color: '#c9a063',
                    fontWeight: '600',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Plus size={16} /> Add New Project
                </Button>

                <Button
                  type="button"
                  onClick={handleSaveProjects}
                  disabled={savingProjects}
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
                  {savingProjects ? 'Publishing Projects...' : 'Save & Publish Projects'}
                </Button>
              </div>
            </div>

            {/* PROJECTS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
              {projectsList.map((item, index) => (
                <div
                  key={item.id || index}
                  style={{
                    background: '#131b2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* PROJECT IMAGE */}
                  <div style={{ position: 'relative', height: '170px', background: '#0a101d' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as any).src = '/site-photos/vadapalani/vadapalani-1.jpg';
                      }}
                    />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', background: 'rgba(7,10,18,0.85)', color: '#c9a063', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(201,160,99,0.4)' }}>
                        #{item.number}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: item.status === 'Completed' ? 'rgba(34,197,94,0.85)' : item.status === 'Under Construction' ? 'rgba(59,130,246,0.85)' : 'rgba(245,158,11,0.85)',
                          color: '#ffffff',
                        }}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '4px' }}>
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMoveProject(index, 'up')}
                        style={{ background: 'rgba(7,10,18,0.8)', border: 'none', color: '#ffffff', borderRadius: '4px', padding: '4px', cursor: 'pointer' }}
                        title="Move Left/Up"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        type="button"
                        disabled={index === projectsList.length - 1}
                        onClick={() => handleMoveProject(index, 'down')}
                        style={{ background: 'rgba(7,10,18,0.8)', border: 'none', color: '#ffffff', borderRadius: '4px', padding: '4px', cursor: 'pointer' }}
                        title="Move Right/Down"
                      >
                        <ArrowDown size={13} />
                      </button>
                    </div>
                  </div>

                  {/* PROJECT DETAILS */}
                  <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#c9a063', fontWeight: '700', letterSpacing: '0.06em' }}>
                          {item.category}
                        </span>
                        {item.year && (
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                            {item.year}
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#ffffff', margin: '0 0 6px' }}>
                        {item.name}
                      </h4>
                      <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '0 0 12px' }}>
                        📍 {item.location}
                      </p>

                      <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#cbd5e1', marginBottom: '14px', flexWrap: 'wrap' }}>
                        {item.units && <span><strong>{item.units}</strong> Units</span>}
                        {item.floors && <span>• <strong>{item.floors}</strong> Floors</span>}
                        <span>• <strong>{item.gallery ? item.gallery.length : 1}</strong> Photos</span>
                      </div>
                    </div>

                    {/* CARD ACTIONS */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEditProject(index)}
                        style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)', color: '#e2e8f0' }}
                      >
                        <Edit2 size={13} style={{ marginRight: '4px' }} /> Edit Details
                      </Button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(index)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '32px',
                          height: '32px',
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#f87171',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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

            {/* SECTION: FOOTER CUSTOMIZATION & LIST STYLES */}
            <div style={{ background: '#131b2e', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#c9a063', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  05. Website Footer Customization & List Styles
                </h4>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Control list prefixes (numbers, bullets, arrows, pills) & footer texts
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                {/* SERVICE LIST STYLE */}
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#c9a063', fontWeight: '700', marginBottom: '6px' }}>
                    SERVICES LIST BUTTON / MARKER STYLE
                  </label>
                  <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px' }}>
                    Select how services are styled in the footer
                  </p>
                  <select
                    value={footerForm.serviceListStyle}
                    onChange={(e) => setFooterForm({ ...footerForm, serviceListStyle: e.target.value as any })}
                    style={{ width: '100%', height: '40px', background: '#131b2e', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  >
                    <option value="numbers">Numbers Badge (01, 02, 03...)</option>
                    <option value="bullets">Golden Bullets (✦)</option>
                    <option value="arrows">Gold Arrows (→)</option>
                    <option value="pills">Pill Badges (#1, #2, #3...)</option>
                    <option value="plain">Clean / Plain (No Prefix)</option>
                  </select>
                </div>

                {/* NAVIGATION LIST STYLE */}
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#c9a063', fontWeight: '700', marginBottom: '6px' }}>
                    NAVIGATION / EXPLORE LIST MARKER STYLE
                  </label>
                  <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px' }}>
                    Select how site navigation links are numbered or marked
                  </p>
                  <select
                    value={footerForm.navListStyle}
                    onChange={(e) => setFooterForm({ ...footerForm, navListStyle: e.target.value as any })}
                    style={{ width: '100%', height: '40px', background: '#131b2e', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  >
                    <option value="numbers">Numbers Badge (01, 02, 03...)</option>
                    <option value="bullets">Golden Bullets (✦)</option>
                    <option value="arrows">Gold Arrows (→)</option>
                    <option value="pills">Pill Badges (#1, #2, #3...)</option>
                    <option value="plain">Clean / Plain (No Prefix)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>FOOTER TOP CTA HEADLINE</label>
                  <input
                    type="text"
                    value={footerForm.brandHeadline}
                    onChange={(e) => setFooterForm({ ...footerForm, brandHeadline: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>FOOTER BRAND TAGLINE</label>
                  <input
                    type="text"
                    value={footerForm.brandTagline}
                    onChange={(e) => setFooterForm({ ...footerForm, brandTagline: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>FOOTER BRAND ABOUT STATEMENT</label>
                  <textarea
                    rows={2}
                    value={footerForm.brandAboutText}
                    onChange={(e) => setFooterForm({ ...footerForm, brandAboutText: e.target.value })}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>OPERATING REGIONS TITLE</label>
                  <input
                    type="text"
                    value={footerForm.operatingRegionsTitle}
                    onChange={(e) => setFooterForm({ ...footerForm, operatingRegionsTitle: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>OPERATING REGIONS TEXT</label>
                  <input
                    type="text"
                    value={footerForm.operatingRegionsText}
                    onChange={(e) => setFooterForm({ ...footerForm, operatingRegionsText: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>TURNKEY ASSURANCE TITLE</label>
                  <input
                    type="text"
                    value={footerForm.turnkeyTitle}
                    onChange={(e) => setFooterForm({ ...footerForm, turnkeyTitle: e.target.value })}
                    style={{ width: '100%', height: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>TURNKEY ASSURANCE DESCRIPTION</label>
                  <textarea
                    rows={2}
                    value={footerForm.turnkeyText}
                    onChange={(e) => setFooterForm({ ...footerForm, turnkeyText: e.target.value })}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '8px' }}>
                  <input
                    type="checkbox"
                    id="showProjectsFooter"
                    checked={footerForm.showProjectsInFooter}
                    onChange={(e) => setFooterForm({ ...footerForm, showProjectsInFooter: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="showProjectsFooter" style={{ fontSize: '13px', color: '#ffffff', cursor: 'pointer' }}>
                    Show "Featured Projects" section in the website footer
                  </label>
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
          className="admin-dialog-content"
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
        <DialogContent className="admin-dialog-content" style={{ background: '#131b2e', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.15)', maxWidth: '480px' }}>
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
        <DialogContent className="admin-dialog-content" style={{ background: '#131b2e', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.15)', maxWidth: '480px' }}>
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

      {/* MODAL: ADD / EDIT SERVICE */}
      <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
        <DialogContent
          className="admin-dialog-content"
          style={{
            background: '#131b2e',
            color: '#f8fafc',
            border: '1px solid rgba(255,255,255,0.15)',
            maxWidth: '650px',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ fontSize: '18px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Hammer size={18} style={{ color: '#c9a063' }} />
              {editingServiceIndex !== null ? `Edit Service #${serviceModalForm.number}` : 'Add New Service'}
            </DialogTitle>
            <DialogDescription style={{ fontSize: '12px', color: '#94a3b8' }}>
              Configure service details, inside explored content, deliverables, and preview photo.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveServiceModal} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>NUMBER</label>
                <input
                  type="text"
                  required
                  value={serviceModalForm.number}
                  onChange={(e) => setServiceModalForm({ ...serviceModalForm, number: e.target.value })}
                  style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 10px', color: '#ffffff', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>SERVICE TITLE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Residential Construction"
                  value={serviceModalForm.title}
                  onChange={(e) => setServiceModalForm({ ...serviceModalForm, title: e.target.value })}
                  style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>CARD SHORT SUMMARY (OVERVIEW)</label>
              <textarea
                rows={2}
                required
                placeholder="Brief summary visible on the services card list..."
                value={serviceModalForm.desc}
                onChange={(e) => setServiceModalForm({ ...serviceModalForm, desc: e.target.value })}
                style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#c9a063', fontWeight: '700', marginBottom: '4px' }}>
                EXPLORED SERVICE INSIDE CONTENT (FULL DETAILS)
              </label>
              <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 6px' }}>
                This rich content is shown in the interactive pop-up when the client clicks "EXPLORE SERVICE"
              </p>
              <textarea
                rows={4}
                placeholder="Comprehensive technical breakdown, engineering methodology, vastu planning, materials, and handover timeline..."
                value={serviceModalForm.exploredContent || ''}
                onChange={(e) => setServiceModalForm({ ...serviceModalForm, exploredContent: e.target.value })}
                style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(201, 160, 99, 0.4)', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px', lineHeight: '1.6' }}
              />
            </div>

            {/* PRESET IMAGE SELECTOR */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>SERVICE PHOTO PRESET OR URL</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '8px' }}>
                {[
                  { name: 'Luxury Villas', src: villas },
                  { name: 'Commercial', src: serviceCommercial },
                  { name: 'Industrial', src: serviceIndustrial },
                  { name: 'Turnkey Apt', src: apartment },
                  { name: 'Interior', src: interior },
                  { name: 'Civil Works', src: serviceCivil },
                  { name: 'Blueprints', src: serviceBlueprint },
                  { name: 'Project Desk', src: serviceManager },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setServiceModalForm({ ...serviceModalForm, image: preset.src })}
                    style={{
                      background: serviceModalForm.image === preset.src ? 'rgba(201,160,99,0.25)' : '#0f172a',
                      border: `1px solid ${serviceModalForm.image === preset.src ? '#c9a063' : 'rgba(255,255,255,0.15)'}`,
                      borderRadius: '6px',
                      padding: '6px',
                      color: '#ffffff',
                      fontSize: '11px',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Or paste custom image URL (e.g. /site-photos/... or https://...)"
                value={typeof serviceModalForm.image === 'string' ? serviceModalForm.image : ''}
                onChange={(e) => setServiceModalForm({ ...serviceModalForm, image: e.target.value })}
                style={{ width: '100%', height: '36px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 10px', color: '#ffffff', fontSize: '12px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                KEY ENGINEERING DELIVERABLES / FEATURES (COMMA-SEPARATED)
              </label>
              <input
                type="text"
                placeholder="e.g. Soil & Lab Testing, Vastu Planning, 3D Elevation, Turnkey Handover"
                value={serviceFeaturesInput}
                onChange={(e) => setServiceFeaturesInput(e.target.value)}
                style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px' }}>
              <input
                type="checkbox"
                id="service-active"
                checked={serviceModalForm.active !== false}
                onChange={(e) => setServiceModalForm({ ...serviceModalForm, active: e.target.checked })}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor="service-active" style={{ fontSize: '13px', color: '#f8fafc', cursor: 'pointer' }}>
                Show this service publicly on the website
              </label>
            </div>

            <DialogFooter style={{ marginTop: '12px' }}>
              <Button type="button" variant="outline" onClick={() => setShowServiceModal(false)} style={{ fontSize: '12px' }}>
                Cancel
              </Button>
              <Button type="submit" style={{ background: '#c9a063', color: '#0f172a', fontWeight: '700', fontSize: '12px' }}>
                {editingServiceIndex !== null ? 'Save Service Draft' : 'Add Service'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL: ADD / EDIT PROJECT */}
      <Dialog open={showProjectModal} onOpenChange={setShowProjectModal}>
        <DialogContent
          className="admin-dialog-content"
          style={{
            background: '#131b2e',
            color: '#f8fafc',
            border: '1px solid rgba(255,255,255,0.15)',
            maxWidth: '650px',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ fontSize: '18px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FolderKanban size={18} style={{ color: '#c9a063' }} />
              {editingProjectIndex !== null ? `Edit Project: ${projectModalForm.name}` : 'Add New Project'}
            </DialogTitle>
            <DialogDescription style={{ fontSize: '12px', color: '#94a3b8' }}>
              Configure project landmark name, category, location, status, and photos.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveProjectModal} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>NUMBER</label>
                <input
                  type="text"
                  required
                  value={projectModalForm.number}
                  onChange={(e) => setProjectModalForm({ ...projectModalForm, number: e.target.value })}
                  style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 10px', color: '#ffffff', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>PROJECT NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jentora Vadapalani"
                  value={projectModalForm.name}
                  onChange={(e) => setProjectModalForm({ ...projectModalForm, name: e.target.value })}
                  style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>LOCATION</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vadapalani, Chennai"
                  value={projectModalForm.location}
                  onChange={(e) => setProjectModalForm({ ...projectModalForm, location: e.target.value })}
                  style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>CATEGORY</label>
                <select
                  value={projectModalForm.category}
                  onChange={(e) => setProjectModalForm({ ...projectModalForm, category: e.target.value })}
                  style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Individual Villas">Individual Villas</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Turnkey Projects">Turnkey Projects</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>STATUS</label>
                <select
                  value={projectModalForm.status}
                  onChange={(e) => setProjectModalForm({ ...projectModalForm, status: e.target.value })}
                  style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                >
                  <option value="Completed">Completed</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>YEAR</label>
                <input
                  type="text"
                  placeholder="e.g. 2025"
                  value={projectModalForm.year || ''}
                  onChange={(e) => setProjectModalForm({ ...projectModalForm, year: e.target.value })}
                  style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>TOTAL UNITS</label>
                <input
                  type="text"
                  placeholder="e.g. 6 or 100"
                  value={projectModalForm.units || ''}
                  onChange={(e) => setProjectModalForm({ ...projectModalForm, units: e.target.value })}
                  style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>FLOORS</label>
                <input
                  type="text"
                  placeholder="e.g. 3"
                  value={projectModalForm.floors || ''}
                  onChange={(e) => setProjectModalForm({ ...projectModalForm, floors: e.target.value })}
                  style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>PRIMARY FEATURED PHOTO URL</label>
              <input
                type="text"
                required
                placeholder="e.g. /site-photos/vadapalani/vadapalani-1.jpg"
                value={projectModalForm.image}
                onChange={(e) => setProjectModalForm({ ...projectModalForm, image: e.target.value })}
                style={{ width: '100%', height: '38px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '0 12px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                GALLERY PHOTO URLS (ONE PER LINE)
              </label>
              <textarea
                rows={3}
                placeholder="/site-photos/vadapalani/vadapalani-1.jpg&#10;/site-photos/vadapalani/vadapalani-2.jpg"
                value={projectGalleryInput}
                onChange={(e) => setProjectGalleryInput(e.target.value)}
                style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <DialogFooter style={{ marginTop: '12px' }}>
              <Button type="button" variant="outline" onClick={() => setShowProjectModal(false)} style={{ fontSize: '12px' }}>
                Cancel
              </Button>
              <Button type="submit" style={{ background: '#c9a063', color: '#0f172a', fontWeight: '700', fontSize: '12px' }}>
                {editingProjectIndex !== null ? 'Save Project Draft' : 'Add Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
