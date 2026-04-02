import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Users, Clock, CheckCircle, TrendingUp, ArrowRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  service: string | null;
  status: string;
  is_read: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    setLeads((data as Lead[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();

    // Realtime subscription for new leads
    const channel = supabase
      .channel("leads-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, (payload) => {
        setLeads((prev) => [payload.new as Lead, ...prev].slice(0, 10));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const unreadLeads = leads.filter((l) => !l.is_read).length;
  const contactedLeads = leads.filter((l) => l.status === "Contacted").length;

  const stats = [
    { label: "Total Leads", value: totalLeads, icon: Users, color: "text-accent" },
    { label: "New Leads", value: newLeads, icon: Bell, color: "text-orange-500" },
    { label: "Unread", value: unreadLeads, icon: Clock, color: "text-red-500" },
    { label: "Contacted", value: contactedLeads, icon: CheckCircle, color: "text-emerald-500" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
          </div>
          {unreadLeads > 0 && (
            <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm font-medium">
              <Bell size={16} /> {unreadLeads} new lead{unreadLeads > 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-2">
                <s.icon size={20} className={s.color} />
                <TrendingUp size={14} className="text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Leads */}
        <div className="bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-semibold text-foreground">Recent Leads</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/leads">View all <ArrowRight size={14} /></Link>
            </Button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No leads yet. They'll appear here when visitors submit the contact form.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {leads.slice(0, 5).map((lead) => (
                <Link
                  key={lead.id}
                  to="/admin/leads"
                  className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${!lead.is_read ? "bg-accent" : "bg-border"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        lead.status === "New" ? "bg-orange-100 text-orange-700" :
                        lead.status === "Contacted" ? "bg-blue-100 text-blue-700" :
                        "bg-emerald-100 text-emerald-700"
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.service || "General inquiry"} • {lead.phone || lead.email || "No contact"}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground shrink-0">
                    {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
