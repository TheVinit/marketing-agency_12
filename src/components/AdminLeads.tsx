import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import {
    Users,
    Clock,
    CheckCircle2,
    MessageSquare,
    Phone,
    Mail,
    Building2,
    Filter,
    Search,
    ChevronRight,
    MoreVertical,
    X,
    Trash2,
    Calendar,
    Briefcase,
    Download,
    Lock
} from 'lucide-react';

const T = {
    bg: "#e8e4db",
    bgAlt: "#ded8cb",
    bgChild: "#ffffff",
    fg: "#0a0a0a",
    gold: "#c5a059",
    goldLight: "#D4AF33",
    goldDark: "#8a6b1f",
    muted: "#6b7280",
    border: "rgba(197,160,89,0.25)",
    success: "#10b981",
    warning: "#f59e0b",
    white: "#ffffff"
};

type Lead = {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    business_name: string;
    business_scale: string;
    monthly_budget: string;
    project_details: string;
    preferred_contact_method: string;
    status: string;
    admin_notes: string;
    created_at: string;
    services?: string[];
};

export default function AdminLeads() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(() => {
        return sessionStorage.getItem('admin_auth') === 'true';
    });
    const [passcode, setPasscode] = useState('');
    const [authError, setAuthError] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [note, setNote] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isAuthorized) {
            fetchLeads();
        }
    }, [isAuthorized]);

    async function fetchLeads() {
        setLoading(true);
        try {
            const { data: enquiries, error } = await supabase
                .from('enquiries')
                .select(`
          *,
          enquiry_services (
            services (
              service_name
            )
          )
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formatted = enquiries.map((e: any) => ({
                ...e,
                services: e.enquiry_services?.map((es: any) => es.services?.service_name) || []
            }));

            setLeads(formatted);
        } catch (err) {
            console.error('Error fetching leads:', err);
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(id: number, newStatus: string) {
        try {
            const { error } = await supabase
                .from('enquiries')
                .update({ status: newStatus })
                .eq('id', id);
            if (error) throw error;
            setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
            if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status: newStatus });
        } catch (err) {
            console.error('Error updating status:', err);
        }
    }

    async function saveNote() {
        if (!selectedLead) return;
        try {
            const { error } = await supabase
                .from('enquiries')
                .update({ admin_notes: note })
                .eq('id', selectedLead.id);
            if (error) throw error;
            setLeads(leads.map(l => l.id === selectedLead.id ? { ...l, admin_notes: note } : l));
            setSelectedLead({ ...selectedLead, admin_notes: note });
            alert('Note saved!');
        } catch (err) {
            console.error('Error saving note:', err);
        }
    }

    async function deleteLead(id: number) {
        if (!confirm('Are you sure you want to delete this lead?')) return;
        try {
            const { error } = await supabase.from('enquiries').delete().eq('id', id);
            if (error) throw error;
            setLeads(leads.filter(l => l.id !== id));
            setSelectedLead(null);
        } catch (err) {
            console.error('Error deleting lead:', err);
        }
    }

    function exportToCSV() {
        if (filteredLeads.length === 0) {
            alert("No leads to export.");
            return;
        }

        const headers = ["Full Name", "Email", "Phone", "Business", "Scale", "Budget", "Status", "Services", "Date", "Notes"];
        const rows = filteredLeads.map(l => [
            l.full_name || "",
            l.email || "",
            l.phone || "",
            l.business_name || "Individual",
            l.business_scale || "",
            l.monthly_budget || "",
            l.status || "",
            l.services?.join(", ") || "",
            l.created_at ? new Date(l.created_at).toLocaleDateString() : "",
            l.admin_notes || ""
        ]);

        const csvContent = headers.join(",") + "\n"
            + rows.map(e => e.map(val => `"${String(val ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `MarketSpark_Leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function handleAuth() {
        // @ts-ignore
        const correctCode = import.meta.env.VITE_ADMIN_PASSCODE || 'mvp360';
        if (passcode === correctCode) {
            setIsAuthorized(true);
            sessionStorage.setItem('admin_auth', 'true');
            setAuthError(false);
        } else {
            setAuthError(true);
            setPasscode('');
        }
    }

    if (!isAuthorized) {
        return (
            <div style={{
                background: T.bg,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', sans-serif"
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: T.white,
                        padding: '3rem',
                        borderRadius: '24px',
                        border: `1.5px solid ${T.border}`,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                        width: '100%',
                        maxWidth: '400px',
                        textAlign: 'center'
                    }}
                >
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'rgba(197,160,89,0.1)',
                        borderRadius: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        color: T.gold
                    }}>
                        <Lock size={32} />
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '0.5rem' }}>Admin Access</h2>
                    <p style={{ color: T.muted, fontSize: '0.9rem', marginBottom: '2rem' }}>Enter the secret passcode to unlock the dashboard.</p>

                    <input
                        type="password"
                        placeholder="••••••"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '12px',
                            border: `1.5px solid ${authError ? '#ef4444' : T.border}`,
                            background: '#fafafa',
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            letterSpacing: '0.5em',
                            marginBottom: '1rem',
                            outline: 'none',
                            transition: 'all 0.2s'
                        }}
                    />

                    {authError && (
                        <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '1rem' }}>Incorrect passcode. Please try again.</p>
                    )}

                    <button
                        onClick={handleAuth}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '12px',
                            background: '#000',
                            color: '#fff',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            border: 'none',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = T.gold}
                        onMouseLeave={e => e.currentTarget.style.background = '#000'}
                    >
                        UNLOCK PORTAL
                    </button>
                </motion.div>
            </div>
        );
    }

    const filteredLeads = leads.filter(l => {
        const matchesSearch = l.full_name.toLowerCase().includes(search.toLowerCase()) ||
            l.email.toLowerCase().includes(search.toLowerCase()) ||
            l.business_name?.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || l.status === filter;
        return matchesSearch && matchesFilter;
    });

    const statuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

    return (
        <div
            className="admin-container"
            style={{
                background: T.bg,
                color: T.fg,
                minHeight: '100vh',
                fontFamily: "'Inter', sans-serif",
                padding: isMobile ? '1rem' : '2rem'
            }}
        >
            <header style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                marginBottom: isMobile ? '1.5rem' : '3rem',
                gap: isMobile ? '1.5rem' : '0'
            }}>
                <div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 900, margin: 0 }}>Portal</h1>
                    <p style={{ color: T.gold, letterSpacing: '0.3em', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>— MARKETINGSPARK ADMIN —</p>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '1rem',
                    alignItems: isMobile ? 'stretch' : 'center',
                    width: isMobile ? '100%' : 'auto'
                }}>
                    <button
                        onClick={exportToCSV}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            background: T.white,
                            border: `1.5px solid ${T.border}`,
                            borderRadius: '100px',
                            padding: '0.8rem 1.5rem',
                            color: T.goldDark,
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(197,160,89,0.08)',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(197,160,89,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = T.white}
                    >
                        <Download size={16} /> EXPORT CSV
                    </button>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: T.muted }} />
                        <input
                            placeholder="Search leads..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                background: T.bgAlt,
                                border: `1.5px solid ${T.border}`,
                                borderRadius: '100px',
                                padding: '0.8rem 1rem 0.8rem 3rem',
                                color: T.fg,
                                width: '100%',
                                outline: 'none',
                                transition: 'border-color 0.3s'
                            }}
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            background: T.bgAlt,
                            border: `1.5px solid ${T.border}`,
                            borderRadius: '100px',
                            padding: '0.8rem 1.5rem',
                            color: T.fg,
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="All">All Statuses</option>
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </header>
            <div style={{
                display: 'grid',
                gridTemplateColumns: (!isMobile && selectedLead) ? '1fr 420px' : '1fr',
                gap: '2.5rem',
                transition: 'all 0.5s ease'
            }}>
                <div style={{
                    background: isMobile ? 'transparent' : T.white,
                    borderRadius: '28px',
                    border: isMobile ? 'none' : `1.5px solid ${T.border}`,
                    overflow: 'hidden',
                    boxShadow: isMobile ? 'none' : '0 8px 32px rgba(197,160,89,0.08)'
                }}>
                    {isMobile ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {loading ? (
                                <div style={{ padding: '4rem', textAlign: 'center', color: T.muted }}>Loading leads...</div>
                            ) : filteredLeads.length === 0 ? (
                                <div style={{ padding: '4rem', textAlign: 'center', color: T.muted }}>No leads found.</div>
                            ) : (
                                filteredLeads.map(lead => (
                                    <div
                                        key={lead.id}
                                        onClick={() => { setSelectedLead(lead); setNote(lead.admin_notes || ""); }}
                                        style={{
                                            background: T.white,
                                            padding: '1.5rem',
                                            borderRadius: '20px',
                                            border: `1.5px solid ${T.border}`,
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{lead.full_name}</div>
                                                <div style={{ color: T.muted, fontSize: '0.85rem' }}>{lead.email}</div>
                                            </div>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '100px',
                                                fontSize: '0.6rem',
                                                fontWeight: 800,
                                                background: lead.status === 'New' ? 'rgba(197,160,89,0.15)' : 'rgba(0,0,0,0.05)',
                                                color: lead.status === 'New' ? T.goldDark : T.muted
                                            }}>
                                                {lead.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ fontSize: '0.9rem', color: T.goldDark, fontWeight: 600 }}>{lead.business_name || 'Individual'}</div>
                                            <ChevronRight size={16} color={T.gold} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: `1.5px solid ${T.border}`, background: 'rgba(197,160,89,0.03)' }}>
                                    <th style={{ padding: '1.5rem', color: T.goldDark, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Lead</th>
                                    <th style={{ padding: '1.5rem', color: T.goldDark, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Business</th>
                                    <th style={{ padding: '1.5rem', color: T.goldDark, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Status</th>
                                    <th style={{ padding: '1.5rem', color: T.goldDark, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Date</th>
                                    <th style={{ padding: '1.5rem' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: T.muted }}>Loading leads...</td></tr>
                                ) : filteredLeads.length === 0 ? (
                                    <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: T.muted }}>No leads found.</td></tr>
                                ) : (
                                    filteredLeads.map(lead => (
                                        <tr
                                            key={lead.id}
                                            onClick={() => { setSelectedLead(lead); setNote(lead.admin_notes || ""); }}
                                            style={{
                                                borderBottom: `1px solid ${T.border}`,
                                                cursor: 'pointer',
                                                background: selectedLead?.id === lead.id ? 'rgba(197,160,89,0.06)' : 'transparent',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(197,160,89,0.04)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = selectedLead?.id === lead.id ? 'rgba(197,160,89,0.06)' : 'transparent'}
                                        >
                                            <td style={{ padding: '1.5rem' }}>
                                                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: T.fg }}>{lead.full_name}</div>
                                                <div style={{ color: T.muted, fontSize: '0.85rem' }}>{lead.email}</div>
                                            </td>
                                            <td style={{ padding: '1.5rem' }}>
                                                <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{lead.business_name || 'Individual'}</div>
                                                <div style={{ color: T.goldDark, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{lead.business_scale}</div>
                                            </td>
                                            <td style={{ padding: '1.5rem' }}>
                                                <span style={{
                                                    padding: '6px 14px',
                                                    borderRadius: '100px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.05em',
                                                    background: lead.status === 'New' ? 'rgba(197,160,89,0.15)' :
                                                        lead.status === 'Contacted' ? 'rgba(16,185,129,0.15)' :
                                                            lead.status === 'Qualified' ? 'rgba(212,175,51,0.15)' :
                                                                lead.status === 'Converted' ? 'rgba(16,185,129,0.25)' : 'rgba(0,0,0,0.05)',
                                                    color: lead.status === 'New' ? T.goldDark :
                                                        lead.status === 'Contacted' ? T.success :
                                                            lead.status === 'Qualified' ? T.goldLight :
                                                                lead.status === 'Converted' ? T.success : T.muted,
                                                    border: `1.5px solid ${lead.status === 'New' ? T.goldDark :
                                                        lead.status === 'Converted' ? T.success : 'transparent'}`
                                                }}>
                                                    {lead.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.5rem', color: T.muted, fontSize: '0.85rem', fontWeight: 500 }}>
                                                {new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                                                <ChevronRight size={18} color={T.gold} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {selectedLead && (
                    <div style={{
                        background: T.white,
                        borderRadius: isMobile ? '0' : '28px',
                        border: isMobile ? 'none' : `1.5px solid ${T.border}`,
                        padding: isMobile ? '1.5rem' : '2.5rem',
                        position: isMobile ? 'fixed' : 'sticky',
                        top: isMobile ? '0' : '2rem',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 100,
                        height: isMobile ? '100vh' : 'fit-content',
                        overflowY: 'auto',
                        boxShadow: '0 12px 48px rgba(197,160,89,0.12)',
                        animation: isMobile ? 'slideUp 0.3s ease' : 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                            <div>
                                <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 900 }}>Enquiry Brief</h2>
                                <div style={{ width: '40px', height: '2px', background: T.gold, marginTop: '0.5rem' }} />
                            </div>
                            <button onClick={() => setSelectedLead(null)} style={{ background: T.bgAlt, border: 'none', color: T.fg, cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex' }}><X size={18} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <section>
                                <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: T.goldDark, fontWeight: 700, letterSpacing: '0.25em', marginBottom: '1rem' }}>— CONTACT DOSSIER —</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ background: T.bgAlt, padding: '10px', borderRadius: '12px' }}><Users size={16} color={T.goldDark} /></div>
                                        <div style={{ fontWeight: 700 }}>{selectedLead.full_name}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ background: T.bgAlt, padding: '10px', borderRadius: '12px' }}><Mail size={16} color={T.goldDark} /></div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{selectedLead.email}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ background: T.bgAlt, padding: '10px', borderRadius: '12px' }}><Phone size={16} color={T.goldDark} /></div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{selectedLead.phone}</div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: T.goldDark, fontWeight: 700, letterSpacing: '0.25em', marginBottom: '1rem' }}>— CORE SERVICES —</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                    {selectedLead.services?.map(s => (
                                        <span key={s} style={{ background: T.bgAlt, border: `1px solid rgba(197,160,89,0.3)`, color: T.fg, padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>{s}</span>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: T.goldDark, fontWeight: 700, letterSpacing: '0.25em', marginBottom: '1rem' }}>— MISSION DETAILS —</p>
                                <div style={{ background: T.bgAlt, padding: '1.25rem', borderRadius: '20px', border: `1px solid ${T.border}` }}>
                                    <div style={{ marginBottom: '0.75rem', fontWeight: 800, color: T.goldDark, fontSize: '0.85rem' }}>Budget: {selectedLead.monthly_budget}</div>
                                    <div style={{ color: T.fg, fontSize: '0.95rem', lineHeight: 1.7, fontStyle: 'italic' }}>"{selectedLead.project_details || 'No additional brief provided.'}"</div>
                                </div>
                            </section>

                            <section>
                                <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: T.goldDark, fontWeight: 700, letterSpacing: '0.25em', marginBottom: '1rem' }}>— STATUS CONTROL —</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                    {statuses.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => updateStatus(selectedLead.id, s)}
                                            style={{
                                                padding: '8px 14px',
                                                borderRadius: '100px',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                background: selectedLead.status === s ? T.goldDark : T.bgAlt,
                                                color: selectedLead.status === s ? T.white : T.fg,
                                                border: `1.5px solid ${selectedLead.status === s ? T.goldDark : T.border}`,
                                                cursor: 'pointer',
                                                transition: 'all 0.25s'
                                            }}
                                        >{s.toUpperCase()}</button>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: T.goldDark, fontWeight: 700, letterSpacing: '0.25em', marginBottom: '1rem' }}>— INTERNAL BRIEFING —</p>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Append internal notes..."
                                    style={{
                                        width: '100%',
                                        background: T.bgAlt,
                                        border: `1.5px solid ${T.border}`,
                                        borderRadius: '20px',
                                        padding: '1.25rem',
                                        color: T.fg,
                                        minHeight: '120px',
                                        outline: 'none',
                                        fontFamily: 'inherit',
                                        fontSize: '0.95rem',
                                        resize: 'none',
                                        marginBottom: '1rem',
                                        transition: 'border-color 0.3s'
                                    }}
                                />
                                <button
                                    onClick={saveNote}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '100px',
                                        background: T.gold,
                                        color: T.white,
                                        fontWeight: 800,
                                        letterSpacing: '0.15em',
                                        fontSize: '0.75rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 6px 20px rgba(197,160,89,0.3)',
                                        transition: 'all 0.3s'
                                    }}
                                >SAVE NOTES ✦</button>
                            </section>

                            <button
                                onClick={() => deleteLead(selectedLead.id)}
                                style={{
                                    marginTop: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    color: '#ef4444',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                            >
                                <Trash2 size={16} /> Delete Lead
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        body { 
            overflow-x: hidden; 
        }
        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
      `}</style>
        </div >
    );
}
