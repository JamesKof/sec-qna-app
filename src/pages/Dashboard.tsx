import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trainingSections } from "@/data/trainingContent";
import { Leaf, LogOut, CheckCircle2, Clock, ExternalLink, BookOpen, Award, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ThemeToggle from "@/components/ThemeToggle";
import { generateCertificate } from "@/lib/certificate";

interface TrainingRecord {
  completed_at: string;
  score: number;
  total_questions: number;
  passed: boolean;
  certificate_name: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, signOut, isAdmin } = useAuth();
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [profile, setProfile] = useState<{ full_name: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }
    if (user) {
      supabase.from("training_records").select("*").eq("user_id", user.id).order("completed_at", { ascending: true })
        .then(({ data }) => { if (data) setRecords(data); });
      supabase.from("profiles").select("full_name").eq("user_id", user.id).single()
        .then(({ data }) => { if (data) setProfile(data); });
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;

  const latestRecord = records.length > 0 ? records[records.length - 1] : null;
  const bestScore = records.length > 0 ? Math.max(...records.map(r => Math.round((r.score / r.total_questions) * 100))) : 0;
  const hasPassed = records.some(r => r.passed);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 bg-card border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-serif font-bold text-lg text-foreground">SEC Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={() => navigate("/admin")} className="text-xs">
                Admin
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-muted-foreground">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {profile?.full_name && (
          <p className="text-lg font-medium text-foreground">Welcome, {profile.full_name}!</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-6 h-6 mx-auto text-primary mb-1" />
              <p className="text-2xl font-bold text-foreground">{records.length}</p>
              <p className="text-xs text-muted-foreground">Attempts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 mx-auto text-success mb-1" />
              <p className="text-2xl font-bold text-foreground">{bestScore}%</p>
              <p className="text-xs text-muted-foreground">Best Score</p>
            </CardContent>
          </Card>
          <Card className="col-span-2 sm:col-span-1">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-6 h-6 mx-auto text-primary mb-1" />
              <p className="text-2xl font-bold text-foreground">{records.filter(r => r.passed).length}</p>
              <p className="text-xs text-muted-foreground">Passed</p>
            </CardContent>
          </Card>
        </div>

        {/* Certificate Download */}
        {hasPassed && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">🎓 You passed the training!</p>
                <p className="text-sm text-muted-foreground">Download your certificate</p>
              </div>
              <Button
                onClick={() => {
                  const passedRecord = records.find(r => r.passed);
                  const certName = passedRecord?.certificate_name || profile?.full_name || user?.email || "Student";
                  generateCertificate(certName, bestScore);
                }}
                className="gap-2"
              >
                <Download className="w-4 h-4" /> Certificate
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Training Modules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trainingSections.map((section, i) => (
              <div key={section.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{section.title}</p>
                  <p className="text-xs text-muted-foreground">{section.questions.length} question{section.questions.length !== 1 ? "s" : ""}</p>
                </div>
                {latestRecord && latestRecord.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                ) : (
                  <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Training Report Summary */}
        {records.length > 0 && (
          <Card className="border-accent/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Training Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold text-foreground">{records.length}</p>
                  <p className="text-xs text-muted-foreground">Total Sessions</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold text-foreground">{records.filter(r => r.passed).length}/{records.length}</p>
                  <p className="text-xs text-muted-foreground">Pass Rate</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 text-muted-foreground font-medium">#</th>
                      <th className="pb-2 text-muted-foreground font-medium">Name</th>
                      <th className="pb-2 text-muted-foreground font-medium">Date</th>
                      <th className="pb-2 text-muted-foreground font-medium">Score</th>
                      <th className="pb-2 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...records].reverse().map((r, i) => {
                      const pct = Math.round((r.score / r.total_questions) * 100);
                      return (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-2.5 text-muted-foreground">{records.length - i}</td>
                          <td className="py-2.5 font-medium text-foreground">{r.certificate_name || "—"}</td>
                          <td className="py-2.5 text-muted-foreground whitespace-nowrap">
                            {new Date(r.completed_at).toLocaleDateString()}
                          </td>
                          <td className="py-2.5">
                            <div className="flex items-center gap-2">
                              <Progress value={pct} className="h-1.5 w-16" />
                              <span className="text-xs text-muted-foreground">{pct}%</span>
                            </div>
                          </td>
                          <td className="py-2.5">
                            <Badge variant={r.passed ? "default" : "destructive"} className="text-[10px]">
                              {r.passed ? "Passed" : "Failed"}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => navigate("/")} variant="outline" className="flex-1 h-11 font-bold gap-2">
            <BookOpen className="w-4 h-4" /> Start Training
          </Button>
          <Button asChild className="flex-1 h-11 font-bold gap-2">
            <a href="https://ussd-soil-erosion.vercel.app/ussd-simulator" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" /> SEC App Simulator
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
