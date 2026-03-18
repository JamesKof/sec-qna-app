import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/lib/i18n";

interface ProgressHeaderProps {
  currentSection: number;
  totalSections: number;
  score: number;
  totalQuestions: number;
}

const ProgressHeader = ({ currentSection, totalSections, score, totalQuestions }: ProgressHeaderProps) => {
  const progress = ((currentSection) / totalSections) * 100;
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b px-4 py-3">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">
            {t("progress.section")} {currentSection + 1} {t("progress.of")} {totalSections}
          </span>
          <div className="flex items-center gap-3">
            {totalQuestions > 0 && (
              <div className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                <Trophy className="w-4 h-4" />
                {score}/{totalQuestions}
              </div>
            )}
            <LanguageToggle />
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </header>
  );
};

export default ProgressHeader;
