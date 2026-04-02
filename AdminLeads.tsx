import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search, Download, Trash2, Eye, MessageCircle, Phone,
  X, ChevronDown, Filter
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  service: string | null;
  budget: string | null;
  company: string | null;
  message: string | null;
  status: string;
  internal_notes: string | null;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

const STATUS_OPTIONS = ["New", "Contacted", "Closed"];

const AdminLeads = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");

  const fetchLeads = async () => {
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "All") query = query.eq("status", statusFilter);
    const { data } = await query;
    setLeads((data as Lead[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();

    const channel = supabase
      .channel("admin-leads")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
        fetchLeads();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [statusFilter]);

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    return !q || l.name.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.phone?.includes(q) ||
      l.service?.toLowerCase().includes(q);
  });

  const openLead = async (lead: Lead) => {
    setSelectedLead(lead);
    setNotes(lead.internal_notes || "");
    if (!lead.is_read) {
      await supabase.from("leads").update({ is_read: true }).eq("id", lead.id);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status });
    fetchLeads();
    toast({ title: `Lead marked as ${status}` });
  };

  const saveNotes = async () => {
    if (!selectedLead) return;
    await supabase.from("leads").update({ internal_notes: notes }).eq("id", selectedLead.id);
    toast({ title: "Notes saved ✅" });
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    await supabase.from("leads").delete().eq("id", id);
    setSelectedLead(null);
    fetchLeads();
    toast({ title: "Lead deleted" });
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Service", "Budget", "Company", "Message", "Status", "Date"];
    const rows = filtered.map((l) => [
      l.name, l.email || "", l.phone || "", l.service || "", l.budget || "",
      l.company || "", (l.message || "").replace(/,/g, ";"), l.status,
      format(new Date(l.created_at), "yyyy-MM-dd HH:mm")
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shalit-leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Leads</h1>
            <p className="text-sm text-muted-foreground">{filtered.length} lead{filtered.length !== 1 ? "s" : ""}</p>
          </div>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download size={14} /> Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone, service..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["All", ...STATUS_OPTIONS].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`text-xs px-3 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === s
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {/* Lead list */}
          <div className={`flex-1 bg-card rounded-xl border border-border overflow-hidden ${selectedLead ? "hidden md:block" : ""}`}>
            {loading ? (
              <div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">No leads found.</div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => openLead(lead)}
                    className={`w-full flex items-center gap-3 p-4 text-left hover:bg-secondary/50 transition-colors ${
                      selectedLead?.id === lead.id ? "bg-secondary" : ""
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${!lead.is_read ? "bg-accent" : "bg-border"}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${!lead.is_read ? "font-semibold text-foreground" : "text-foreground"}`}>
                        {lead.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {lead.service || "General"} • {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${
                      lead.status === "New" ? "bg-orange-100 text-orange-700" :
                      lead.status === "Contacted" ? "bg-blue-100 text-blue-700" :
                      "bg-emerald-100 text-emerald-700"
                    }`}>{lead.status}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lead detail */}
          {selectedLead && (
            <div className="flex-1 md:max-w-md bg-card rounded-xl border border-border">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-foreground text-sm">Lead Details</h3>
                <button onClick={() => setSelectedLead(null)} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <p className="text-lg font-semibold text-foreground">{selectedLead.name}</p>
                  {selectedLead.company && <p className="text-sm text-muted-foreground">{selectedLead.company}</p>}
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(selectedLead.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>

                {/* Contact actions */}
                <div className="flex gap-2">
                  {selectedLead.phone && (
                    <>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`} target="_blank">
                          <MessageCircle size={14} /> WhatsApp
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={`tel:${selectedLead.phone}`}>
                          <Phone size={14} /> Call
                        </a>
                      </Button>
                    </>
                  )}
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Email", value: selectedLead.email },
                    { label: "Phone", value: selectedLead.phone },
                    { label: "Service", value: selectedLead.service },
                    { label: "Budget", value: selectedLead.budget },
                  ].map((f) => f.value && (
                    <div key={f.label}>
                      <p className="text-xs text-muted-foreground">{f.label}</p>
                      <p className="font-medium text-foreground">{f.value}</p>
                    </div>
                  ))}
                </div>

                {selectedLead.message && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Message</p>
                    <p className="text-sm text-foreground bg-secondary/50 p-3 rounded-lg">{selectedLead.message}</p>
                  </div>
                )}

                {/* Status */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Status</p>
                  <div className="flex gap-2">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedLead.id, s)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                          selectedLead.status === s
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Internal Notes</p>
                  <Textarea
                    placeholder="Add notes about this lead..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="text-sm"
                  />
                  <Button variant="outline" size="sm" onClick={saveNotes} className="mt-2">
                    Save Notes
                  </Button>
                </div>

                {/* Delete */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteLead(selectedLead.id)}
                  className="text-destructive hover:text-destructive w-full"
                >
                  <Trash2 size={14} /> Delete Lead
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLeads;
