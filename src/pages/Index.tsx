import { useState, useCallback } from "react";
import { trainingSections } from "@/data/trainingContent";
import WelcomeScreen from "@/components/WelcomeScreen";
import ProgressHeader from "@/components/ProgressHeader";
import ContentSection from "@/components/ContentSection";
import CompletionScreen from "@/components/CompletionScreen";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

type AppState = "welcome" | "training" | "completed";

const totalQuestions = trainingSections.reduce((sum, s) => sum + s.questions.length, 0);

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

const pageTransition = {
  type: "tween" as const,
  ease: [0.4, 0, 0.2, 1] as const,
  duration: 0.35,
};

const Index = () => {
  const [state, setState] = useState<AppState>("welcome");
  const [currentSection, setCurrentSection] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});
  const [direction, setDirection] = useState(1);
  const [certificateName, setCertificateName] = useState("");
  const { t } = useI18n();
  const { user } = useAuth();

  const score = Object.values(answeredQuestions).filter(Boolean).length;

  const handleAnswer = useCallback((questionId: string, correct: boolean) => {
    setAnsweredQuestions(prev => ({ ...prev, [questionId]: correct }));
  }, []);

  const section = trainingSections[currentSection];
  const sectionQuestionsAnswered = section?.questions.every(q => q.id in answeredQuestions) ?? true;
  const isLastSection = currentSection === trainingSections.length - 1;

  const goNext = async () => {
    setDirection(1);
    if (isLastSection) {
      const passed = Math.round((score / totalQuestions) * 100) >= 70;

      // Save to Supabase if logged in
      if (user) {
        await supabase.from("training_records").insert({
          user_id: user.id,
          score,
          total_questions: totalQuestions,
          passed,
          certificate_name: certificateName,
        });
      }

      // Also keep localStorage for non-logged-in users
      const record = { completedAt: new Date().toISOString(), score, totalQuestions, passed, certificateName };
      const existing = JSON.parse(localStorage.getItem("sec-training-records") || "[]");
      existing.push(record);
      localStorage.setItem("sec-training-records", JSON.stringify(existing));

      setState("completed");
    } else {
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    if (currentSection > 0) {
      setDirection(-1);
      setCurrentSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRetry = () => {
    setCurrentSection(0);
    setAnsweredQuestions({});
    setState("welcome");
  };

  const handleStart = (name: string) => {
    setCertificateName(name);
    setState("training");
  };

  if (state === "welcome") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <WelcomeScreen onStart={handleStart} />
      </motion.div>
    );
  }

  if (state === "completed") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CompletionScreen score={score} totalQuestions={totalQuestions} onRetry={handleRetry} certificateName={certificateName} />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressHeader
        currentSection={currentSection}
        totalSections={trainingSections.length}
        score={score}
        totalQuestions={totalQuestions}
      />

      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSection}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
          >
            <ContentSection
              section={section}
              answeredQuestions={answeredQuestions}
              onAnswer={handleAnswer}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t">
          <Button
            onClick={goPrev}
            variant="outline"
            disabled={currentSection === 0}
            className="flex-1 h-12 rounded-xl font-bold gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("nav.previous")}
          </Button>
          <Button
            onClick={goNext}
            disabled={!sectionQuestionsAnswered}
            className="flex-1 h-12 rounded-xl font-bold gap-2"
          >
            {isLastSection ? t("nav.finish") : t("nav.next")}
            {!isLastSection && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>

        {!sectionQuestionsAnswered && section.questions.length > 0 && (
          <p className="text-center text-xs text-muted-foreground mt-3">
            {t("nav.answerAll")}
          </p>
        )}
      </main>
    </div>
  );
};

export default Index;
