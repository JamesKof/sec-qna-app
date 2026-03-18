import { TrainingSection, learningObjectives } from "@/data/trainingContent";
import QuizQuestion from "./QuizQuestion";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  BookOpen, Target, CloudRain, Users, Smartphone,
  UserCheck, MapPin, Mountain, ShieldCheck, MonitorSmartphone,
  CheckCircle, HeartHandshake
} from "lucide-react";
import communityImg from "@/assets/community.jpg";
import ussdImg from "@/assets/ussd-phone.jpg";
import heroImg from "@/assets/hero-landscape.jpg";

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
  8: heroImg,
};

interface ContentSectionProps {
  section: TrainingSection;
  answeredQuestions: Record<string, boolean>;
  onAnswer: (questionId: string, correct: boolean) => void;
}

const ContentSection = ({ section, answeredQuestions, onAnswer }: ContentSectionProps) => {
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          {iconMap[section.icon]}
        </div>
        <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground">
          {section.title}
        </h2>
      </div>

      {/* Section image */}
      {sectionImages[section.id] && (
        <img
          src={sectionImages[section.id]}
          alt={section.title}
          className="w-full h-40 md:h-52 object-cover rounded-xl"
        />
      )}

      {/* Content paragraphs */}
      <div className="space-y-3">
        {section.content.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-foreground/90">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Learning objectives (section 2 only) */}
      {section.id === 2 && (
        <div className="space-y-3">
          {learningObjectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                {smallIconMap[obj.icon] || <CheckCircle className="w-5 h-5" />}
              </div>
              <p className="text-sm font-medium text-foreground">{obj.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Practice tasks (section 10) */}
      {section.practiceTasks && (
        <div className="space-y-3 bg-muted/50 rounded-xl p-4">
          <p className="text-sm font-bold text-foreground uppercase tracking-wider">Practice Tasks</p>
          {section.practiceTasks.map((task, i) => (
            <label key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg cursor-pointer border hover:border-primary/50 transition-colors">
              <Checkbox
                checked={checkedTasks[i] || false}
                onCheckedChange={(checked) => setCheckedTasks(prev => ({ ...prev, [i]: !!checked }))}
              />
              <span className="text-sm font-medium text-foreground">{task}</span>
            </label>
          ))}
        </div>
      )}

      {/* Quiz questions */}
      {section.questions.length > 0 && (
        <div className="space-y-6 pt-2">
          <div className="h-px bg-border" />
          {section.questions.map((q) => (
            <QuizQuestion
              key={q.id}
              question={q}
              onAnswer={(correct) => onAnswer(q.id, correct)}
              answered={q.id in answeredQuestions}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentSection;
