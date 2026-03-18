import { Button } from "@/components/ui/button";
import { Award, RotateCcw, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { PASSING_SCORE } from "@/data/trainingContent";

interface CompletionScreenProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

const CompletionScreen = ({ score, totalQuestions, onRetry }: CompletionScreenProps) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const passed = percentage >= PASSING_SCORE;

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-12">
      <div className="max-w-md w-full text-center animate-slide-up">
        {/* Badge */}
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
          passed ? "bg-success/15" : "bg-destructive/15"
        }`}>
          {passed ? (
            <Award className="w-12 h-12 text-success" />
          ) : (
            <XCircle className="w-12 h-12 text-destructive" />
          )}
        </div>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
          {passed ? "Congratulations!" : "Keep Learning!"}
        </h1>

        <p className="text-muted-foreground text-lg mb-6">
          {passed
            ? "You have successfully completed the SEC App Online Training."
            : `You need ${PASSING_SCORE}% to pass. Review the material and try again.`}
        </p>

        {/* Score card */}
        <div className="bg-card rounded-2xl border p-6 mb-6 space-y-4">
          <div className="text-5xl font-bold text-foreground">{percentage}%</div>
          <p className="text-sm text-muted-foreground">
            {score} out of {totalQuestions} correct
          </p>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                passed ? "bg-success" : "bg-destructive"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            {passed ? (
              <><CheckCircle className="w-4 h-4 text-success" /> <span className="text-success font-semibold">Passed</span></>
            ) : (
              <><XCircle className="w-4 h-4 text-destructive" /> <span className="text-destructive font-semibold">Below passing score</span></>
            )}
          </div>
        </div>

        {passed && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-foreground font-medium">
              🎓 You are now ready to use the SEC App simulator or live USSD system to support inclusive soil erosion monitoring under the 125 Rwanda Project.
            </p>
          </div>
        )}

        {passed && (
          <Button
            asChild
            size="lg"
            className="w-full h-12 text-base font-bold rounded-xl gap-2 mb-3"
          >
            <a href="https://ussd-soil-erosion.vercel.app/ussd-simulator" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5" />
              Launch SEC App Simulator
            </a>
          </Button>
        )}

        <Button
          onClick={onRetry}
          variant={passed ? "outline" : "default"}
          size="lg"
          className="w-full h-12 text-base font-bold rounded-xl gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          {passed ? "Retake Training" : "Try Again"}
        </Button>
      </div>
    </div>
  );
};

export default CompletionScreen;
