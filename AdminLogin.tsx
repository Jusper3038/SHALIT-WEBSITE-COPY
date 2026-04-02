import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn } from "lucide-react";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError("Invalid credentials. Only admin accounts can access this panel.");
    } else {
      navigate("/admin");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-sm bg-card rounded-xl border border-border p-8 shadow-lg">
        <div className="text-center mb-8">
          <img src={logo} alt="Shalit Group" className="h-12 mx-auto mb-4" />
          <h1 className="text-xl font-serif font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage your leads</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button variant="hero" size="lg" type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Sign In"} <LogIn size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
