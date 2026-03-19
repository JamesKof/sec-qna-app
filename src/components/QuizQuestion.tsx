import { useState } from "react";
import { QuizQuestion as QuizQuestionType } from "@/data/trainingContent";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

const QuizQuestion = ({ question, onAnswer, answered }: QuizQuestionProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempt, setAttempt] = useState(0); // 0 = no attempt, 1 = first wrong, 2 = final
  const { t } = useI18n();

  const isMulti = question.type === "multi-select";
  const isFinalized = showFeedback && (isCorrect || attempt >= 2);

  const handleSelect = (index: number) => {
    if (isFinalized || answered) return;
    if (isMulti) {
      setSelected(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setSelected([index]);
    }
  };

  const handleSubmit = () => {
    const correct =
      selected.length === question.correctAnswers.length &&
      selected.every(s => question.correctAnswers.includes(s));
    setIsCorrect(correct);
    const newAttempt = attempt + 1;
    setAttempt(newAttempt);

    if (correct || newAttempt >= 2) {
      setShowFeedback(true);
      onAnswer(correct);
    } else {
      // First wrong attempt — show retry feedback
      setShowFeedback(true);
    }
  };

  const handleRetry = () => {
    setSelected([]);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const getOptionClass = (index: number) => {
    const isSelected = selected.includes(index);
    const isCorrectOption = question.correctAnswers.includes(index);

    if (isFinalized || answered) {
      if (isCorrectOption) return "border-success bg-success/10 text-foreground";
      if (isSelected && !isCorrectOption) return "border-destructive bg-destructive/10 text-foreground";
      return "border-border bg-muted/30 text-muted-foreground opacity-60";
    }
    // After first wrong attempt but in retry mode — don't reveal correct answers
    if (showFeedback && !isCorrect && attempt === 1) {
      if (isSelected && !isCorrectOption) return "border-destructive bg-destructive/10 text-foreground";
      return "border-border bg-card text-foreground";
    }
    if (isSelected) return "border-primary bg-primary/10 text-foreground ring-2 ring-primary/30";
    return "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5";
  };

  const feedbackShown = isFinalized || answered;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Question type badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          {question.type === "multiple-choice" ? t("quiz.multipleChoice") :
           question.type === "true-false" ? t("quiz.trueFalse") : t("quiz.selectAll")}
        </span>
      </div>

      <p className="text-lg font-bold text-foreground leading-snug">
        {t(`${question.id}.question`)}
      </p>

      <div className="space-y-2.5">
        {question.options.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={feedbackShown}
            className={cn(
              "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium text-base flex items-center gap-3",
              getOptionClass(index)
            )}
          >
            {isMulti ? (
              <span className={cn(
                "w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center text-xs",
                selected.includes(index) ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/40"
              )}>
                {selected.includes(index) && "✓"}
              </span>
            ) : (
              <span className={cn(
                "w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
                selected.includes(index) ? "border-primary" : "border-muted-foreground/40"
              )}>
                {selected.includes(index) && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </span>
            )}
            {t(`${question.id}.${index}`)}
          </button>
        ))}
      </div>

      {/* Submit / Retry buttons */}
      {!feedbackShown && !showFeedback && (
        <Button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className="w-full h-12 text-base font-bold rounded-xl"
        >
          {t("quiz.checkAnswer")}
        </Button>
      )}

      {/* First wrong attempt — retry prompt */}
      {showFeedback && !isCorrect && attempt === 1 && !answered && (
        <div className="space-y-3 animate-fade-in">
          <div className="p-4 rounded-xl border-2 bg-destructive/10 border-destructive/30 flex items-start gap-3">
            <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-foreground">
              {t("quiz.tryAgain")}
            </p>
          </div>
          <Button
            onClick={handleRetry}
            variant="outline"
            className="w-full h-12 text-base font-bold rounded-xl border-primary text-primary hover:bg-primary/10"
          >
            {t("quiz.retryButton")}
          </Button>
        </div>
      )}

      {/* Final feedback */}
      {feedbackShown && (
        <div className={cn(
          "p-4 rounded-xl border-2 flex items-start gap-3 animate-fade-in",
          isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"
        )}>
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm font-medium text-foreground">
            {isCorrect ? t(`${question.id}.correct`) : t(`${question.id}.incorrect`)}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;

