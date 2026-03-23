import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Mail, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useI18n } from "@/lib/i18n";

const ForgotPassword = () => {
  const { lang } = useI18n();
  const langPrefix = lang === "rw" ? "/rw" : "";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mx-auto mb-2">
            <Leaf className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="font-serif text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-success bg-success/10 rounded-lg p-3">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Check your email for a password reset link.
              </div>
              <Link to={langPrefix + "/login"}>
                <Button variant="outline" className="w-full gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-11 font-bold gap-2" disabled={loading}>
                  <Mail className="w-4 h-4" />
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link to={langPrefix + "/login"} className="text-sm text-primary hover:underline">
                  ← Back to Login
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
