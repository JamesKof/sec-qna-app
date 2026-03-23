import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, UserPlus, Shield, Users, AlertCircle, FileDown, Activity } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StudentRecord {
  user_id: string;
  full_name: string;
  email: string | null;
  attempts: number;
  best_score: number;
  passed: boolean;
  certificate_name: string;
}

interface SessionRecord {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  district: string;
  certificate_name: string;
  language: string;
  started_at: string;
  completed_at: string | null;
  score: number | null;
  total_questions: number | null;
  passed: boolean;
  status: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading, isAdmin, signOut } = useAuth();
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
      return;
    }
    if (isAdmin) {
      loadStudents();
      loadSessions();
    }
  }, [user, loading, isAdmin, navigate]);

  const loadStudents = async () => {
    const { data: profiles } = await supabase.from("profiles").select("user_id, full_name, email");
    const { data: records } = await supabase.from("training_records").select("user_id, score, total_questions, passed, certificate_name");

    if (profiles) {
      const studentMap: Record<string, StudentRecord> = {};
      for (const p of profiles) {
        studentMap[p.user_id] = {
          user_id: p.user_id,
          full_name: p.full_name,
          email: p.email,
          attempts: 0,
          best_score: 0,
          passed: false,
          certificate_name: "",
        };
      }
      if (records) {
        for (const r of records) {
          if (studentMap[r.user_id]) {
            studentMap[r.user_id].attempts++;
            const pct = Math.round((r.score / r.total_questions) * 100);
            if (pct > studentMap[r.user_id].best_score) studentMap[r.user_id].best_score = pct;
            if (r.passed) studentMap[r.user_id].passed = true;
            if (r.certificate_name) studentMap[r.user_id].certificate_name = r.certificate_name;
          }
        }
      }
      setStudents(Object.values(studentMap));
    }
  };

  const loadSessions = async () => {
    const { data } = await supabase
      .from("training_sessions")
      .select("*")
      .order("started_at", { ascending: false })
      .limit(500);
    if (data) setSessions(data as SessionRecord[]);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    setAddSuccess("");
    setAddLoading(true);

    const { error } = await supabase.auth.signUp({
      email: newEmail,
      password: newPassword,
      options: { data: { full_name: newName } },
    });

    if (error) {
      setAddError(error.message);
    } else {
      setAddSuccess(`User ${newEmail} created successfully!`);
      setNewEmail("");
      setNewName("");
      setNewPassword("");
      setTimeout(() => loadStudents(), 1000);
    }
    setAddLoading(false);
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Certificate Name", "Email", "Attempts", "Best Score (%)", "Status"];
    const rows = students.map(s => [
      s.full_name || "",
      s.certificate_name || "",
      s.email || "",
      String(s.attempts),
      String(s.best_score),
      s.passed ? "Passed" : s.attempts > 0 ? "Failed" : "Not Started",
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `SEC_Training_Report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleExportSessionsCSV = () => {
    const headers = ["First Name", "Middle Name", "Last Name", "District", "Certificate Name", "Language", "Started", "Completed", "Score", "Status"];
    const rows = sessions.map(s => [
      s.first_name,
      s.middle_name,
      s.last_name,
      s.district,
      s.certificate_name,
      s.language,
      new Date(s.started_at).toLocaleString(),
      s.completed_at ? new Date(s.completed_at).toLocaleString() : "—",
      s.score !== null && s.total_questions ? `${Math.round((s.score / s.total_questions) * 100)}%` : "—",
      s.status === "completed" ? (s.passed ? "Passed" : "Failed") : "In Progress",
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `SEC_Sessions_Report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!isAdmin) return null;

  const completedSessions = sessions.filter(s => s.status === "completed");
  const inProgressSessions = sessions.filter(s => s.status === "in_progress");

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 bg-card border-b px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-serif font-bold text-lg text-foreground">Admin Portal</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")} className="text-xs">
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-muted-foreground">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto text-primary mb-1" />
              <p className="text-2xl font-bold text-foreground">{students.length}</p>
              <p className="text-xs text-muted-foreground">Registered Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="w-6 h-6 mx-auto text-accent mb-1" />
              <p className="text-2xl font-bold text-foreground">{sessions.length}</p>
              <p className="text-xs text-muted-foreground">Total Sessions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{completedSessions.filter(s => s.passed).length}</p>
              <p className="text-xs text-muted-foreground">Passed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{inProgressSessions.length}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Add User */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="w-5 h-5" /> Add New User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUser} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <Label htmlFor="newName" className="text-xs">Full Name</Label>
                <Input id="newName" value={newName} onChange={e => setNewName(e.target.value)} placeholder="John Doe" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newEmail" className="text-xs">Email</Label>
                <Input id="newEmail" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="user@example.com" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newPass" className="text-xs">Password</Label>
                <Input id="newPass" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min 6 chars" required minLength={6} />
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full gap-2" disabled={addLoading}>
                  <UserPlus className="w-4 h-4" /> {addLoading ? "Adding..." : "Add User"}
                </Button>
              </div>
            </form>
            {addError && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3 mt-3">
                <AlertCircle className="w-4 h-4 shrink-0" /> {addError}
              </div>
            )}
            {addSuccess && (
              <div className="text-sm text-success bg-success/10 rounded-lg p-3 mt-3">{addSuccess}</div>
            )}
          </CardContent>
        </Card>

        {/* Tabs for Sessions & Students */}
        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sessions">All Sessions ({sessions.length})</TabsTrigger>
            <TabsTrigger value="students">Registered Students ({students.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Training Sessions</CardTitle>
                {sessions.length > 0 && (
                  <Button variant="outline" size="sm" onClick={handleExportSessionsCSV} className="gap-2">
                    <FileDown className="w-4 h-4" /> Export CSV
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No sessions recorded yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>District</TableHead>
                          <TableHead>Language</TableHead>
                          <TableHead>Started</TableHead>
                          <TableHead className="text-center">Score</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sessions.map(s => {
                          const fullName = [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(" ") || s.certificate_name || "—";
                          const pct = s.score !== null && s.total_questions ? Math.round((s.score / s.total_questions) * 100) : null;
                          return (
                            <TableRow key={s.id}>
                              <TableCell className="font-medium">{fullName}</TableCell>
                              <TableCell className="text-muted-foreground">{s.district || "—"}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-[10px]">
                                  {s.language === "rw" ? "KIN" : "ENG"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground whitespace-nowrap text-xs">
                                {new Date(s.started_at).toLocaleString()}
                              </TableCell>
                              <TableCell className="text-center">{pct !== null ? `${pct}%` : "—"}</TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant={s.status === "completed" ? (s.passed ? "default" : "destructive") : "secondary"}
                                  className="text-[10px]"
                                >
                                  {s.status === "completed" ? (s.passed ? "Passed" : "Failed") : "In Progress"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Registered Students</CardTitle>
                {students.length > 0 && (
                  <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-2">
                    <FileDown className="w-4 h-4" /> Export CSV
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {students.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No students registered yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Certificate Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Attempts</TableHead>
                        <TableHead className="text-center">Best Score</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map(s => (
                        <TableRow key={s.user_id}>
                          <TableCell className="font-medium">{s.full_name || "—"}</TableCell>
                          <TableCell className="text-muted-foreground">{s.certificate_name || "—"}</TableCell>
                          <TableCell className="text-muted-foreground">{s.email || "—"}</TableCell>
                          <TableCell className="text-center">{s.attempts}</TableCell>
                          <TableCell className="text-center">{s.best_score}%</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={s.passed ? "default" : s.attempts > 0 ? "destructive" : "secondary"}
                              className="text-[10px]"
                            >
                              {s.passed ? "Passed" : s.attempts > 0 ? "Failed" : "Not Started"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;