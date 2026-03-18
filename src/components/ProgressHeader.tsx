import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

interface ProgressHeaderProps {
  currentSection: number;
  totalSections: number;
  score: number;
  totalQuestions: number;
}

const ProgressHeader = ({ currentSection, totalSections, score, totalQuestions }: ProgressHeaderProps) => {
  const progress = ((currentSection) / totalSections) * 100;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b px-4 py-3">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">
            Section {currentSection + 1} of {totalSections}
          </span>
          {totalQuestions > 0 && (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-accent">
              <Trophy className="w-4 h-4" />
              {score}/{totalQuestions}
            </div>
          )}
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </header>
  );
};

export default ProgressHeader;
