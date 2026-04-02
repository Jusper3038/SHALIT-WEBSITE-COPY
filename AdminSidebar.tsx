import { LayoutDashboard, Users, Package, Settings, LogOut, ChevronLeft } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const MENU = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Leads", path: "/admin/leads" },
  { icon: Package, label: "Services", path: "/admin/services" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 bg-card border-r border-border flex flex-col transition-all duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-border">
        {!collapsed && <img src={logo} alt="Shalit Group" className="h-8" />}
        <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground">
          <ChevronLeft size={18} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {MENU.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== "/admin" && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-2 border-t border-border">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
