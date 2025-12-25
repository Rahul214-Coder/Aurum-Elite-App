
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  LayoutGrid, Diamond, Tags, ShieldCheck, FileDown, 
  Search, Plus, Trash2, Edit2, CheckCircle2, 
  Loader2, ChevronLeft, ChevronRight, Sparkles, 
  X, Filter, MoreVertical, LogOut, Bell, Settings,
  AlertCircle, Download, Lock, Mail, Eye, EyeOff,
  Gem, Award, Watch, Briefcase, History, Terminal,
  Code, Server, Database as DbIcon, Globe, FileJson
} from 'lucide-react';
import { Database } from './services/db';
import { GeminiService } from './services/geminiService';
import { Category, Product, PaginatedResponse, PaginationParams, JobStatus, User } from './types';

// --- Auth Component ---

const AuthView = ({ onLoginSuccess }: { onLoginSuccess: (user: User) => void }) => {
  const [email, setEmail] = useState('admin@aurumelite.io');
  const [password, setPassword] = useState('gold123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await Database.login(email, password);
      onLoginSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 overflow-hidden relative font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-200/20 blur-[150px] rounded-full" />

      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-1000 relative z-10">
        <div className="bg-white/80 backdrop-blur-3xl border border-white rounded-[3rem] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-500/30 mx-auto mb-8 transform rotate-12">
               <Diamond className="text-white w-10 h-10 -rotate-12" />
            </div>
            <h1 className="text-4xl font-luxury text-slate-900 tracking-widest mb-3 uppercase">Aurum Elite</h1>
            <p className="text-amber-600 font-bold uppercase text-[10px] tracking-[0.4em]">Jewellery Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={18} />
                <input 
                  type="email" required
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
                  placeholder="admin@aurumelite.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={18} />
                <input 
                  type={showPass ? 'text' : 'password'} required
                  className="w-full pl-14 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-600 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3 text-red-600 text-sm font-bold animate-in slide-in-from-top-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 py-5 rounded-2xl text-white font-black text-[11px] uppercase tracking-[0.4em] shadow-xl shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Login'}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em]">
              Authorized Personnel Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const Sidebar = ({ currentTab, setTab, collapsed, onLogout }: { currentTab: string, setTab: (t: any) => void, collapsed: boolean, onLogout: () => void }) => {
  const items = [
    { id: 'dashboard', label: 'Overview', icon: LayoutGrid },
    { id: 'products', label: 'Items', icon: Diamond },
    { id: 'categories', label: 'Groups', icon: ShieldCheck },
    { id: 'bulk', label: 'System Tools', icon: Settings },
  ];

  return (
    <aside className={`${collapsed ? 'w-24' : 'w-64'} bg-white flex flex-col transition-all duration-500 border-r border-slate-200 z-50 overflow-hidden`}>
      <div className="h-24 flex items-center px-8 mb-4 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 transform rotate-6">
            <Gem className="text-white w-6 h-6 -rotate-6" />
          </div>
          {!collapsed && <span className="font-luxury text-slate-900 text-base tracking-[0.2em] uppercase">Aurum</span>}
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
              currentTab === id 
                ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 transition-transform ${currentTab === id ? 'scale-110' : 'group-hover:scale-110'}`} />
            {!collapsed && <span className="font-bold text-[11px] uppercase tracking-[0.2em]">{label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100 space-y-2 mb-4">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-4 text-slate-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-[10px] font-black uppercase tracking-[0.3em]">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

const Header = ({ search, setSearch, user }: { search: string, setSearch: (s: string) => void, user: User }) => (
  <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-12 sticky top-0 z-40">
    <div className="relative group max-w-lg w-full">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors w-4 h-4" />
      <input 
        type="text" 
        placeholder="Search for items, IDs or details..." 
        className="w-full pl-14 pr-8 py-3.5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm text-slate-900 focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 outline-none transition-all placeholder:text-slate-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    
    <div className="flex items-center gap-8">
      <div className="hidden lg:flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
        <span className="text-[9px] font-black text-emerald-700 uppercase tracking-[0.2em]">Live Connection</span>
      </div>
      <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-luxury text-slate-900 leading-tight uppercase tracking-widest">{user.name}</p>
          <p className="text-[9px] font-black text-amber-600 uppercase tracking-[0.4em] mt-1">{user.role}</p>
        </div>
        <img src={user.avatar} className="w-12 h-12 bg-slate-100 rounded-2xl border border-slate-200 p-0.5 object-cover" />
      </div>
    </div>
  </header>
);

const ProductModal = ({ isOpen, onClose, categories, onSave }: any) => {
  const [formData, setFormData] = useState({ name: '', price: 0, categoryId: '', image: '' });
  const [aiTagline, setAiTagline] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleAiDescribe = async () => {
    if (!formData.name) return;
    setIsGenerating(true);
    const desc = await GeminiService.suggestProductDescription(formData.name);
    setAiTagline(desc);
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-[0_30px_100px_rgba(0,0,0,0.2)] overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
        <div className="px-12 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-2xl font-luxury text-slate-900 tracking-widest uppercase">New Addition</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Catalog a new piece to the collection</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <X size={24}/>
          </button>
        </div>
        <form className="p-12 space-y-8" onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
          onClose();
        }}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Item Description</label>
            <div className="relative">
              <input 
                required autoFocus
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                placeholder="e.g. 22K Gold Bangle (25g)"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <button 
                type="button"
                onClick={handleAiDescribe}
                disabled={isGenerating}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 bg-amber-50 hover:bg-amber-100 p-2.5 rounded-xl transition-all disabled:opacity-50"
              >
                {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              </button>
            </div>
            {aiTagline && (
              <p className="text-[10px] text-amber-700 font-bold bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 italic animate-in slide-in-from-top-2 tracking-wide">
                AI Suggestion: "{aiTagline}"
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Price</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                  required type="number" step="0.01"
                  className="w-full pl-10 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-mono font-black text-slate-900"
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Group</label>
              <select 
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold text-slate-900 cursor-pointer appearance-none"
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
              >
                <option value="">Select Group</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="pt-8 flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-4 border border-slate-200 text-slate-400 font-black rounded-2xl hover:bg-slate-50 hover:text-slate-600 transition-all uppercase tracking-[0.2em] text-[10px]"
            >
              Cancel
            </button>
            <button className="flex-[2] bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all uppercase tracking-[0.2em] text-[10px]">
              Save to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main App Orchestrator ---

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'bulk'>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [activeJob, setActiveJob] = useState<JobStatus | null>(null);

  const [productsResponse, setProductsResponse] = useState<PaginatedResponse<Product>>({ data: [], total: 0, page: 1, totalPages: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState<PaginationParams>({
    page: 1,
    limit: 8,
    sortBy: 'createdAt',
    order: 'desc',
    search: '',
  });

  useEffect(() => {
    const session = Database.getSession();
    if (session) setCurrentUser(session.user);
  }, []);

  const totalValuation = useMemo(() => 
    productsResponse.data.reduce((acc, p) => acc + p.price, 0), 
    [productsResponse.data]
  );

  const fetchCategories = useCallback(async () => {
    const data = await Database.listCategories();
    setCategories(data);
  }, []);

  const fetchProducts = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const data = await Database.listProducts(filters);
      setProductsResponse(data);
    } finally {
      setIsLoading(false);
    }
  }, [filters, currentUser]);

  useEffect(() => {
    if (currentUser) fetchCategories();
  }, [fetchCategories, currentUser]);

  useEffect(() => {
    if (currentUser && activeTab === 'products') fetchProducts();
  }, [fetchProducts, activeTab, currentUser]);

  const handleAddProduct = async (data: any) => {
    await Database.addProduct({
      ...data,
      image: `https://picsum.photos/seed/${Math.random()}/600`
    });
    fetchProducts();
    fetchCategories();
  };

  const handleBulkAI = async () => {
    if (!categories.length) return;
    const cat = categories[Math.floor(Math.random() * categories.length)];
    setActiveJob({ id: 'job_gen', type: 'GENERATE', progress: 0, status: 'PROCESSING' });
    
    try {
      const items = await GeminiService.generateDemoProducts(10, cat.name);
      setActiveJob(prev => prev ? { ...prev, progress: 30 } : null);
      
      const prepared = items.map(item => ({
        ...item,
        categoryId: cat.id
      }));

      await Database.bulkAddProducts(prepared, (p) => {
        setActiveJob(prev => prev ? { ...prev, progress: 30 + (p * 0.7) } : null);
      });
      
      setActiveJob(prev => prev ? { ...prev, progress: 100, status: 'COMPLETED' } : null);
      setTimeout(() => setActiveJob(null), 2500);
      fetchProducts();
      fetchCategories();
    } catch (e) {
      setActiveJob(prev => prev ? { ...prev, status: 'FAILED', message: 'Engine Timeout' } : null);
      setTimeout(() => setActiveJob(null), 3000);
    }
  };

  const handleDownloadReport = async () => {
    setActiveJob({ id: 'job_rep', type: 'REPORT', progress: 0, status: 'PROCESSING' });
    try {
      const csv = await Database.generateReportCSV();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aurum_stock_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      setActiveJob(prev => prev ? { ...prev, status: 'COMPLETED', progress: 100 } : null);
      setTimeout(() => setActiveJob(null), 2000);
    } catch (e) {
      setActiveJob(null);
    }
  };

  const handleDownloadPostman = async () => {
    try {
      // In a real app, you might fetch this file. Here we generate it from a pre-defined string or simply simulate the logic.
      const postmanContent = {
        "info": { "name": "Aurum Elite API", "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json" },
        "item": [
          { "name": "Auth - Login", "request": { "method": "POST", "url": "{{base_url}}/api/auth/login" } },
          { "name": "Items - List", "request": { "method": "GET", "url": "{{base_url}}/api/items" } }
        ]
      };
      const blob = new Blob([JSON.stringify(postmanContent, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aurum_elite.postman_collection.json`;
      a.click();
    } catch (e) {
      console.error("Download failed", e);
    }
  };

  const handleLogout = () => {
    Database.logout();
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <AuthView onLoginSuccess={setCurrentUser} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 antialiased overflow-hidden selection:bg-amber-100 selection:text-amber-700">
      <Sidebar currentTab={activeTab} setTab={setActiveTab} collapsed={sidebarCollapsed} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header 
          search={filters.search} 
          setSearch={(s) => setFilters(f => ({ ...f, search: s, page: 1 }))} 
          user={currentUser}
        />

        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          {activeJob && (
            <div className="mb-12 bg-white rounded-[2.5rem] p-10 text-slate-900 shadow-xl border border-amber-100 flex items-center gap-10 animate-in slide-in-from-top-6 duration-700">
              <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100">
                {activeJob.status === 'COMPLETED' ? <CheckCircle2 size={40} className="text-amber-600" /> : <Loader2 className="animate-spin text-amber-600" size={40} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                   <p className="font-luxury text-xl tracking-widest text-slate-900 uppercase">Processing: {activeJob.type}</p>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full">{activeJob.status}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-amber-500 shadow-[0_0_15px_rgba(217,119,6,0.3)] transition-all duration-1000 ease-out" style={{width: `${activeJob.progress}%`}} />
                </div>
              </div>
              <p className="text-4xl font-luxury text-amber-600 tracking-tighter tabular-nums">{Math.round(activeJob.progress)}%</p>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-16 animate-in fade-in duration-1000">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {[
                  { label: 'Total Items', val: productsResponse.total, icon: Diamond, col: 'bg-amber-50 text-amber-600 border-amber-100' },
                  { label: 'Groups', val: categories.length, icon: ShieldCheck, col: 'bg-slate-50 text-slate-600 border-slate-200' },
                  { label: 'Portfolio Value', val: `$${totalValuation.toLocaleString()}`, icon: Gem, col: 'bg-amber-50 text-amber-600 border-amber-100' },
                  { label: 'Active Rating', val: '99.9%', icon: Award, col: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                    <div className={`p-5 rounded-2xl ${stat.col} border mb-8 w-fit transform group-hover:scale-110 transition-transform`}>
                      <stat.icon size={28} />
                    </div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">{stat.label}</h4>
                    <p className="text-4xl font-luxury text-slate-900 tracking-tighter">{stat.val}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                <div className="xl:col-span-2 bg-white rounded-[3rem] p-16 border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-16">
                    <div>
                      <h3 className="text-3xl font-luxury text-slate-900 tracking-widest uppercase">Value Fluctuations</h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-3">Portfolio Growth Analytics</p>
                    </div>
                    <button onClick={handleDownloadReport} className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10">
                      <Download size={20}/> Export List
                    </button>
                  </div>
                  <div className="h-96 flex items-end justify-between gap-8 px-6">
                    {[50, 80, 60, 100, 40, 90, 70, 95, 85, 55].map((h, i) => (
                      <div key={i} className="flex-1 bg-slate-50 rounded-t-[2rem] relative group h-full">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500/10 to-amber-500 group-hover:from-amber-400 group-hover:to-amber-300 transition-all duration-700 rounded-t-[2rem] shadow-sm group-hover:shadow-amber-500/20" 
                          style={{height: `${h}%`}}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-600 to-amber-500 rounded-[3rem] p-16 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 p-24 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                    <History size={300} />
                  </div>
                  <div>
                    <div className="inline-flex p-6 bg-white/20 rounded-3xl mb-12 border border-white/30">
                      <Sparkles className="text-white" size={48} />
                    </div>
                    <h3 className="text-3xl font-luxury mb-8 tracking-widest uppercase">Quick Insight</h3>
                    <p className="text-amber-50 text-xl leading-relaxed font-bold italic font-serif">
                      "Precious metal trends show steady growth. It's an optimal time to re-evaluate {categories[0]?.name || 'current stock'} appraisals."
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('bulk')}
                    className="w-full bg-white text-amber-600 hover:bg-slate-50 py-6 rounded-3xl font-black text-[11px] tracking-[0.4em] uppercase shadow-lg active:scale-95 transition-all mt-16"
                  >
                    Open Management Suite
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="px-16 py-10 border-b border-slate-100 flex flex-wrap items-center justify-between gap-10 bg-slate-50/30">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-6 py-3 shadow-sm focus-within:ring-4 focus-within:ring-amber-500/10 transition-all">
                    <Filter size={16} className="text-slate-400" />
                    <select 
                      className="bg-transparent text-[10px] font-black outline-none text-slate-700 uppercase tracking-widest"
                      value={filters.categoryId || ''}
                      onChange={(e) => setFilters(f => ({...f, categoryId: e.target.value, page: 1}))}
                    >
                      <option value="">All Groups</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <select 
                    className="bg-white border border-slate-200 rounded-full px-6 py-3 text-[10px] font-black text-slate-700 uppercase tracking-widest outline-none shadow-sm"
                    onChange={(e) => setFilters(f => ({...f, sortBy: e.target.value as any}))}
                  >
                    <option value="createdAt">Arrival Date</option>
                    <option value="price">Price Level</option>
                    <option value="name">Item Name</option>
                  </select>
                </div>
                <button 
                  onClick={() => setIsProductModalOpen(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full font-black flex items-center gap-4 shadow-lg shadow-amber-500/20 active:scale-95 transition-all uppercase tracking-[0.3em] text-[11px]"
                >
                  <Plus size={22} /> Add New Piece
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-black text-slate-400 tracking-[0.3em]">
                    <tr>
                      <th className="px-16 py-8">Product Details</th>
                      <th className="px-16 py-8">Group</th>
                      <th className="px-16 py-8 text-right">Price</th>
                      <th className="px-16 py-8">Added On</th>
                      <th className="px-16 py-8 text-center">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="py-48 text-center">
                          <div className="flex flex-col items-center gap-6">
                            <Loader2 className="animate-spin text-amber-500" size={56} />
                            <p className="text-slate-400 font-black tracking-[0.4em] uppercase text-xs animate-pulse">Loading Collection...</p>
                          </div>
                        </td>
                      </tr>
                    ) : productsResponse.data.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-48 text-center">
                           <div className="flex flex-col items-center gap-4 text-slate-200">
                              <ShieldCheck size={72} strokeWidth={1} />
                              <p className="font-luxury uppercase tracking-[0.3em] text-sm text-slate-300">No items registered</p>
                           </div>
                        </td>
                      </tr>
                    ) : productsResponse.data.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-all group cursor-pointer border-l-4 border-transparent hover:border-amber-500">
                        <td className="px-16 py-6">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shadow-sm group-hover:scale-105 transition-all duration-500 border border-slate-200 p-0.5 flex-shrink-0">
                              <img src={p.image} className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                            <div>
                               <p className="font-luxury text-slate-900 group-hover:text-amber-600 transition-colors text-lg tracking-widest uppercase">{p.name}</p>
                               <p className="text-[10px] text-slate-400 font-mono font-bold mt-1 uppercase tracking-widest">HL-ID: {p.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-16 py-6">
                          <span className="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-slate-200">
                            {p.categoryName}
                          </span>
                        </td>
                        <td className="px-16 py-6 text-right">
                          <span className="font-mono font-black text-slate-900 text-xl tracking-tighter">${p.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </td>
                        <td className="px-16 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest font-mono">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-16 py-6">
                          <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                            <button className="p-3 text-slate-400 hover:text-amber-600 hover:bg-white hover:shadow-md rounded-xl transition-all border border-transparent hover:border-slate-100"><Edit2 size={16}/></button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); Database.deleteProduct(p.id).then(() => { fetchProducts(); fetchCategories(); }); }}
                              className="p-3 text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-md rounded-xl transition-all border border-transparent hover:border-slate-100"
                            ><Trash2 size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-16 py-8 bg-slate-50/50 flex items-center justify-between border-t border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Showing <span className="text-slate-900 mx-1">{productsResponse.data.length}</span> of <span className="text-slate-900 mx-1">{productsResponse.total}</span> entries
                </p>
                <div className="flex items-center gap-4">
                  <button 
                    disabled={filters.page === 1}
                    onClick={() => setFilters(f => ({...f, page: f.page - 1}))}
                    className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all active:scale-90 shadow-sm"
                  ><ChevronLeft size={20} className="text-slate-600" /></button>
                  <div className="flex items-center gap-4 bg-white px-6 py-2.5 rounded-full border border-slate-200 font-black shadow-sm">
                    <span className="text-xs text-amber-600">{filters.page}</span>
                    <span className="text-slate-300 text-[10px]">/</span>
                    <span className="text-xs text-slate-500">{productsResponse.totalPages}</span>
                  </div>
                  <button 
                    disabled={filters.page >= productsResponse.totalPages}
                    onClick={() => setFilters(f => ({...f, page: f.page + 1}))}
                    className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all active:scale-90 shadow-sm"
                  ><ChevronRight size={20} className="text-slate-600" /></button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bulk' && (
            <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in zoom-in-95 duration-1000">
              <div className="text-center">
                <div className="inline-flex p-10 bg-amber-50 text-amber-600 rounded-[3rem] mb-12 border border-amber-100 shadow-sm">
                  <Settings size={64} strokeWidth={1} />
                </div>
                <h2 className="text-6xl font-luxury text-slate-900 mb-8 tracking-[0.2em] uppercase">System Tools</h2>
                <p className="text-slate-400 mb-0 max-w-2xl mx-auto text-2xl leading-relaxed font-bold italic font-serif">
                  Manage your enterprise backend and simulated API architecture.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 {/* AI and Sync Tools */}
                <div className="space-y-12">
                   <div 
                    onClick={handleBulkAI}
                    className="bg-white p-12 rounded-[3rem] text-slate-900 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-2xl active:scale-[0.98] transition-all border border-slate-200 relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center mb-6 border border-amber-100 relative z-10">
                      <Sparkles size={40} className="text-amber-600" />
                    </div>
                    <h4 className="text-3xl font-luxury mb-4 tracking-widest uppercase relative z-10">AI Generator</h4>
                    <p className="text-slate-400 text-[10px] leading-relaxed mb-8 px-10 font-black uppercase tracking-[0.4em] relative z-10">Automate stock registry</p>
                    <div className="flex items-center gap-3 text-amber-600 font-black uppercase tracking-[0.4em] text-[10px] relative z-10">
                      Run AI Task <ChevronRight size={16} />
                    </div>
                  </div>

                  <div className="bg-white p-12 rounded-[3rem] border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-2xl transition-all group">
                    <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-100">
                      <Globe size={40} className="text-slate-400" />
                    </div>
                    <h4 className="text-3xl font-luxury text-slate-900 mb-4 tracking-widest uppercase">Global Sync</h4>
                    <p className="text-slate-400 text-[10px] leading-relaxed px-12 font-black uppercase tracking-[0.4em] mb-8">Supplier API Connector</p>
                    <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-lg">
                      Sync Database
                    </button>
                  </div>
                </div>

                {/* API Documentation / "Postman Info" Section */}
                <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Terminal size={240} />
                  </div>
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                        <Code size={24} className="text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-luxury tracking-widest uppercase">API Blueprint</h4>
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Postman Collection Reference</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleDownloadPostman}
                      className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-2xl transition-all active:scale-90 shadow-lg shadow-amber-500/20 flex items-center gap-2 group"
                      title="Download Postman Collection"
                    >
                      <FileJson size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest pr-1">Download</span>
                    </button>
                  </div>

                  <div className="space-y-6 flex-1">
                    <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">GET</span>
                        <code className="text-[11px] text-slate-400">/api/items</code>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">Fetch all items with pagination and search parameters.</p>
                      <pre className="text-[10px] text-amber-200/80 bg-black/60 p-4 rounded-xl overflow-x-auto">
{`{
  "page": 1,
  "limit": 10,
  "search": "Gold Ring"
}`}
                      </pre>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-black uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">POST</span>
                        <code className="text-[11px] text-slate-400">/api/items/create</code>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">Registers a new masterpiece to the RDBMS.</p>
                      <pre className="text-[10px] text-amber-200/80 bg-black/60 p-4 rounded-xl overflow-x-auto">
{`{
  "name": "Luxury Watch",
  "price": 4500.00,
  "categoryId": "cat_01"
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4 text-slate-500">
                    <DbIcon size={18} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Backend Environment: Node.js + PostgreSQL</span>
                  </div>
                </div>
              </div>

              {/* System Specs Section */}
              <div className="bg-white rounded-[3rem] border border-slate-200 p-12 shadow-sm">
                <div className="flex items-center gap-6 mb-12">
                   <Server size={32} className="text-slate-400" />
                   <h4 className="text-3xl font-luxury text-slate-900 tracking-widest uppercase">Project Environment Overview</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Frontend Stack</p>
                    <p className="text-lg font-bold text-slate-900">React + Vite SPA</p>
                    <p className="text-xs text-slate-500 mt-2 italic">Building as an Angular alternative per system spec.</p>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Backend Logic</p>
                    <p className="text-lg font-bold text-slate-900">Node.js / Express</p>
                    <p className="text-xs text-slate-500 mt-2 italic">Simulated via Database Service layer.</p>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Data Persistence</p>
                    <p className="text-lg font-bold text-slate-900">PostgreSQL Schema</p>
                    <p className="text-xs text-slate-500 mt-2 italic">LocalStorage used for demo persistence.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="space-y-16 animate-in fade-in duration-1000">
               <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-luxury text-slate-900 tracking-[0.2em] uppercase">Group Manager</h2>
                    <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mt-4">Organize collection by Asset class</p>
                  </div>
                  <button 
                    onClick={() => {
                      const name = prompt("Enter New Group Name:");
                      if(name) Database.saveCategory(name).then(fetchCategories);
                    }}
                    className="bg-white border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-10 py-4 rounded-full font-black shadow-sm transition-all active:scale-95 flex items-center gap-3 uppercase tracking-[0.2em] text-[10px]"
                  >
                    <Plus size={22} /> New Group
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {categories.map(cat => {
                    let Icon = Tags;
                    if (cat.name.toLowerCase().includes('ring')) Icon = Diamond;
                    if (cat.name.toLowerCase().includes('gold') || cat.name.toLowerCase().includes('bullion')) Icon = Briefcase;
                    if (cat.name.toLowerCase().includes('watch')) Icon = Watch;
                    if (cat.name.toLowerCase().includes('necklace') || cat.name.toLowerCase().includes('pendant')) Icon = Gem;
                    if (cat.name.toLowerCase().includes('bespoke') || cat.name.toLowerCase().includes('diamond')) Icon = Sparkles;

                    return (
                      <div key={cat.id} className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-10">
                            <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all duration-700 transform group-hover:rotate-6 border border-transparent group-hover:border-amber-100">
                              <Icon size={36} strokeWidth={1} />
                            </div>
                            <button 
                              onClick={() => Database.deleteCategory(cat.id).then(() => { fetchCategories(); fetchProducts(); })}
                              className="p-3 text-slate-200 hover:text-red-500 transition-colors border border-transparent hover:border-slate-50 rounded-2xl"
                            >
                              <Trash2 size={22} />
                            </button>
                        </div>
                        <h4 className="text-3xl font-luxury text-slate-900 mb-3 tracking-widest uppercase">{cat.name}</h4>
                        <p className="text-amber-600 font-black text-[10px] uppercase tracking-[0.3em] mb-12 flex items-center gap-2">
                          <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse shadow-sm"></span>
                          {cat.productCount || 0} Registered Items
                        </p>
                        <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Group</span>
                            <button 
                              onClick={() => { setActiveTab('products'); setFilters(f => ({...f, categoryId: cat.id, page: 1})); }}
                              className="text-amber-600 hover:text-amber-700 font-black text-[10px] uppercase tracking-[0.3em] border-b border-amber-200 hover:border-amber-600 transition-all pb-1"
                            >
                              Browse Items
                            </button>
                        </div>
                      </div>
                    );
                  })}
               </div>
            </div>
          )}
        </main>
      </div>

      <ProductModal 
        isOpen={isProductModalOpen} 
        onClose={() => setIsProductModalOpen(false)} 
        categories={categories}
        onSave={handleAddProduct}
      />
    </div>
  );
};

export default App;
