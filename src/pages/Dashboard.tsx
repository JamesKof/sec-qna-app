import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trainingSections } from "@/data/trainingContent";
import { Leaf, LogOut, CheckCircle2, Clock, ExternalLink, BookOpen, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TrainingRecord {
  completedAt: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<TrainingRecord[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("sec-auth");
    if (!auth) {
      navigate("/login");
      return;
    }
    const saved = localStorage.getItem("sec-training-records");
    if (saved) setRecords(JSON.parse(saved));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("sec-auth");
    navigate("/login");
  };

  const latestRecord = records.length > 0 ? records[records.length - 1] : null;
  const bestScore = records.length > 0 ? Math.max(...records.map(r => Math.round((r.score / r.totalQuestions) * 100))) : 0;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-serif font-bold text-lg text-foreground">SEC Dashboard</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-muted-foreground">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
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

        {/* Training Sections */}
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

        {/* History */}
        {records.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attempt History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...records].reverse().map((r, i) => {
                const pct = Math.round((r.score / r.totalQuestions) * 100);
                return (
                  <div key={i} className="p-3 rounded-lg border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {new Date(r.completedAt).toLocaleDateString()} {new Date(r.completedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.passed ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                        {r.passed ? "Passed" : "Failed"}
                      </span>
                    </div>
                    <Progress value={pct} className="h-2" />
                    <p className="text-xs text-muted-foreground">{r.score}/{r.totalQuestions} correct ({pct}%)</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => navigate("/")} variant="outline" className="flex-1 h-11 font-bold gap-2">
            <BookOpen className="w-4 h-4" /> Start Training
          </Button>
          <Button asChild className="flex-1 h-11 font-bold gap-2">
            <a href="https://ussd-soil-erosion.vercel.app/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" /> SEC App Simulator
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
