import { useState, ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-primary/50 z-30 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - hidden on mobile unless opened */}
      <div className={`hidden md:block`}>
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>
      <div className={`md:hidden ${mobileOpen ? "block" : "hidden"}`}>
        <AdminSidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
      </div>

      {/* Main content */}
      <div className={`transition-all duration-200 ${collapsed ? "md:ml-16" : "md:ml-60"}`}>
        {/* Top bar for mobile */}
        <header className="md:hidden flex items-center h-14 px-4 bg-card border-b border-border">
          <button onClick={() => setMobileOpen(true)} className="p-2 text-foreground">
            <Menu size={20} />
          </button>
          <span className="ml-3 font-semibold text-sm text-foreground">Admin Panel</span>
        </header>

        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
