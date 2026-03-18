import { useState, useCallback } from "react";
import { trainingSections } from "@/data/trainingContent";
import WelcomeScreen from "@/components/WelcomeScreen";
import ProgressHeader from "@/components/ProgressHeader";
import ContentSection from "@/components/ContentSection";
import CompletionScreen from "@/components/CompletionScreen";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type AppState = "welcome" | "training" | "completed";

const totalQuestions = trainingSections.reduce((sum, s) => sum + s.questions.length, 0);

const Index = () => {
  const [state, setState] = useState<AppState>("welcome");
  const [currentSection, setCurrentSection] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});

  const score = Object.values(answeredQuestions).filter(Boolean).length;

  const handleAnswer = useCallback((questionId: string, correct: boolean) => {
    setAnsweredQuestions(prev => ({ ...prev, [questionId]: correct }));
  }, []);

  const section = trainingSections[currentSection];
  const sectionQuestionsAnswered = section?.questions.every(q => q.id in answeredQuestions) ?? true;
  const isLastSection = currentSection === trainingSections.length - 1;

  const goNext = () => {
    if (isLastSection) {
      setState("completed");
    } else {
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRetry = () => {
    setCurrentSection(0);
    setAnsweredQuestions({});
    setState("welcome");
  };

  if (state === "welcome") {
    return <WelcomeScreen onStart={() => setState("training")} />;
  }

  if (state === "completed") {
    return <CompletionScreen score={score} totalQuestions={totalQuestions} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressHeader
        currentSection={currentSection}
        totalSections={trainingSections.length}
        score={score}
        totalQuestions={totalQuestions}
      />

      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        <ContentSection
          key={section.id}
          section={section}
          answeredQuestions={answeredQuestions}
          onAnswer={handleAnswer}
        />

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t">
          <Button
            onClick={goPrev}
            variant="outline"
            disabled={currentSection === 0}
            className="flex-1 h-12 rounded-xl font-bold gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={goNext}
            disabled={!sectionQuestionsAnswered}
            className="flex-1 h-12 rounded-xl font-bold gap-2"
          >
            {isLastSection ? "Finish" : "Next"}
            {!isLastSection && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>

        {!sectionQuestionsAnswered && section.questions.length > 0 && (
          <p className="text-center text-xs text-muted-foreground mt-3">
            Answer all questions to continue
          </p>
        )}
      </main>
    </div>
  );
};

export default Index;
