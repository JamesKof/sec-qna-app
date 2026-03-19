import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  full_name: string;
  best_score: number;
  total_questions: number;
  best_percentage: number;
  attempts: number;
  latest_completed_at: string;
}

const rankIcons = [
  <Trophy className="w-5 h-5 text-yellow-500" />,
  <Medal className="w-5 h-5 text-gray-400" />,
  <Award className="w-5 h-5 text-amber-600" />,
];

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .rpc("get_leaderboard", { limit_count: 10 })
      .then(({ data }) => {
        if (data) setEntries(data as LeaderboardEntry[]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Loading leaderboard...
        </CardContent>
      </Card>
    );
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No one has passed the training yet. Be the first! 🎯
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-yellow-500/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Top Scorers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {entries.map((entry, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              i === 0
                ? "bg-yellow-500/10 border border-yellow-500/20"
                : i === 1
                ? "bg-muted/70 border border-border/50"
                : i === 2
                ? "bg-amber-500/5 border border-amber-500/10"
                : "bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-center w-8 h-8 shrink-0">
              {i < 3 ? (
                rankIcons[i]
              ) : (
                <span className="text-sm font-bold text-muted-foreground">
                  {i + 1}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {entry.full_name}
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.attempts} attempt{entry.attempts !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-primary">
                {entry.best_percentage}%
              </p>
              <p className="text-[10px] text-muted-foreground">
                {entry.best_score}/{entry.total_questions}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
