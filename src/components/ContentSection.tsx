import { TrainingSection, learningObjectives } from "@/data/trainingContent";
import QuizQuestion from "./QuizQuestion";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, useRef } from "react";
import {
  BookOpen, Target, CloudRain, Users, Smartphone,
  UserCheck, MapPin, Mountain, ShieldCheck, MonitorSmartphone,
  CheckCircle, HeartHandshake
} from "lucide-react";
import heroImg from "@/assets/hero-landscape.jpg";
import communityImg from "@/assets/community.jpg";
import ussdImg from "@/assets/ussd-phone.jpg";
import upiDiagram from "@/assets/upi-diagram.png";
import erosionEvidenceCollage from "@/assets/erosion-evidence-collage.png";
import erosionControlCollage from "@/assets/erosion-control-collage.png";
import { useI18n } from "@/lib/i18n";

const iconMap: Record<string, React.ReactNode> = {
  "book-open": <BookOpen className="w-7 h-7" />,
  "target": <Target className="w-7 h-7" />,
  "cloud-rain": <CloudRain className="w-7 h-7" />,
  "users": <Users className="w-7 h-7" />,
  "smartphone": <Smartphone className="w-7 h-7" />,
  "user-check": <UserCheck className="w-7 h-7" />,
  "map-pin": <MapPin className="w-7 h-7" />,
  "mountain": <Mountain className="w-7 h-7" />,
  "shield-check": <ShieldCheck className="w-7 h-7" />,
  "monitor-smartphone": <MonitorSmartphone className="w-7 h-7" />,
  "check-circle": <CheckCircle className="w-7 h-7" />,
  "heart-handshake": <HeartHandshake className="w-5 h-5" />,
};

const smallIconMap: Record<string, React.ReactNode> = {
  "cloud-rain": <CloudRain className="w-5 h-5" />,
  "users": <Users className="w-5 h-5" />,
  "smartphone": <Smartphone className="w-5 h-5" />,
  "heart-handshake": <HeartHandshake className="w-5 h-5" />,
  "monitor-smartphone": <MonitorSmartphone className="w-5 h-5" />,
};

const sectionImages: Record<number, string> = {
  1: heroImg,
  3: heroImg,
  4: communityImg,
  5: ussdImg,
};


interface ContentSectionProps {
  section: TrainingSection;
  answeredQuestions: Record<string, boolean>;
  onAnswer: (questionId: string, correct: boolean) => void;
}

const ContentSection = ({ section, answeredQuestions, onAnswer }: ContentSectionProps) => {
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});
  const { t } = useI18n();
  const firstQuestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (section.questions.length > 0 && firstQuestionRef.current) {
      setTimeout(() => {
        firstQuestionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 400);
    }
  }, [section.id]);

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          {iconMap[section.icon]}
        </div>
        <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground">
          {t(`section.${section.id}.title`)}
        </h2>
      </div>

      {/* Section hero image */}
      {sectionImages[section.id] && (
        <img
          src={sectionImages[section.id]}
          alt={t(`section.${section.id}.title`)}
          className="w-full h-40 md:h-52 object-cover rounded-xl"
        />
      )}

      {/* Erosion evidence collage (section 8) */}
      {section.id === 8 && (
        <div className="rounded-xl overflow-hidden border bg-card">
          <img src={erosionEvidenceCollage} alt="Erosion evidence: sheet & rill erosion, large gully, landslide, small gully, turbid water, river bank erosion" className="w-full object-cover rounded-xl" />
          <p className="text-xs font-semibold text-center py-2 px-1 text-foreground/80">
            {t(`section.8.content.3`)}
          </p>
        </div>
      )}

      {/* Erosion control measures collage (section 9) */}
      {section.id === 9 && (
        <div className="rounded-xl overflow-hidden border bg-card">
          <img src={erosionControlCollage} alt="Erosion control measures: progressive terraces, agroforestry, radical terraces, riparian buffer, mulching" className="w-full object-cover rounded-xl" />
          <p className="text-xs font-semibold text-center py-2 px-1 text-foreground/80">
            {t(`section.9.content.1`)}
          </p>
        </div>
      )}

      {/* Content paragraphs */}
      <div className="space-y-3">
        {section.content.map((_, i) => (
          <p key={i} className="text-base leading-relaxed text-foreground/90">
            {t(`section.${section.id}.content.${i}`)}
          </p>
        ))}
      </div>

      {/* UPI Diagram (section 7) */}
      {section.id === 7 && (
        <div className="rounded-xl overflow-hidden border bg-muted/30 p-4">
          <img src={upiDiagram} alt="UPI structure diagram showing province, district, sector, cell, and parcel codes" className="w-full max-w-md mx-auto rounded-lg" />
          <p className="text-xs text-muted-foreground text-center mt-2">UPI Structure: Province / District / Sector / Cell / Parcel</p>
        </div>
      )}

      {/* Learning objectives (section 2 only) */}
      {section.id === 2 && (
        <div className="space-y-3">
          {learningObjectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                {smallIconMap[obj.icon] || <CheckCircle className="w-5 h-5" />}
              </div>
              <p className="text-sm font-medium text-foreground">{t(`objective.${i}`)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Practice tasks (section 10) */}
      {section.practiceTasks && (
        <div className="space-y-3 bg-muted/50 rounded-xl p-4">
          <p className="text-sm font-bold text-foreground uppercase tracking-wider">{t("practice.title")}</p>
          {section.practiceTasks.map((_, i) => (
            <label key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg cursor-pointer border hover:border-primary/50 transition-colors">
              <Checkbox
                checked={checkedTasks[i] || false}
                onCheckedChange={(checked) => setCheckedTasks(prev => ({ ...prev, [i]: !!checked }))}
              />
              <span className="text-sm font-medium text-foreground">{t(`practice.${i}`)}</span>
            </label>
          ))}
        </div>
      )}

      {/* Quiz questions */}
      {section.questions.length > 0 && (() => {
        const firstUnansweredIdx = section.questions.findIndex(q => !(q.id in answeredQuestions));
        return (
          <div className="space-y-6 pt-2">
            <div className="h-px bg-border" />
            {section.questions.map((q, idx) => {
              const isCurrent = idx === firstUnansweredIdx;
              return (
                <div
                  key={q.id}
                  ref={idx === 0 ? firstQuestionRef : undefined}
                  className={isCurrent ? "ring-2 ring-primary/40 rounded-xl p-3 bg-primary/5 transition-all duration-500 animate-pulse-subtle" : "p-3"}
                >
                  {isCurrent && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">{t("quiz.currentQuestion")}</span>
                    </div>
                  )}
                  <QuizQuestion
                    question={q}
                    onAnswer={(correct) => onAnswer(q.id, correct)}
                    answered={q.id in answeredQuestions}
                  />
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
};

export default ContentSection;
