import AdminLayout from "@/components/AdminLayout";
import { Bell, Shield, ExternalLink } from "lucide-react";

const AdminSettings = () => (
  <AdminLayout>
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Settings</h1>

      <div className="space-y-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <Bell size={18} className="text-accent" />
            <h3 className="font-semibold text-foreground text-sm">Notifications</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Real-time lead notifications are enabled. New leads appear instantly on the dashboard via live updates.
          </p>
          <p className="text-xs text-muted-foreground">
            To receive Telegram alerts, ask your developer to set up the Telegram bot integration.
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <Shield size={18} className="text-accent" />
            <h3 className="font-semibold text-foreground text-sm">Security</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Admin access is protected with role-based authentication. Only users with the admin role can access this panel.
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <ExternalLink size={18} className="text-accent" />
            <h3 className="font-semibold text-foreground text-sm">Quick Setup Guide</h3>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>1. Create admin account:</strong> Sign up a user via Supabase Auth, then assign the admin role in the user_roles table.</p>
            <p><strong>2. Telegram alerts:</strong> Create a bot via @BotFather, get the bot token and your chat ID, then add them as secrets.</p>
            <p><strong>3. Email alerts:</strong> Configure email notifications via Lovable Cloud email settings.</p>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
);

export default AdminSettings;
