import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, LogIn, AlertCircle } from "lucide-react";

const DEMO_USER = { email: "demo@sec-app.rw", password: "demo1234" };

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      localStorage.setItem("sec-auth", JSON.stringify({ email, loggedInAt: Date.now() }));
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Use the demo account below.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mx-auto mb-2">
            <Leaf className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="font-serif text-2xl">SEC Dashboard</CardTitle>
          <CardDescription>Sign in to view training progress</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="demo@sec-app.rw" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full h-11 font-bold gap-2">
              <LogIn className="w-4 h-4" /> Sign In
            </Button>
          </form>

          <div className="mt-5 p-3 rounded-lg bg-accent/50 border border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Demo Credentials</p>
            <p className="text-sm font-mono">demo@sec-app.rw</p>
            <p className="text-sm font-mono">demo1234</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
