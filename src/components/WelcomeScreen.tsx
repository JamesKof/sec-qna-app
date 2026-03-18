import { Button } from "@/components/ui/button";
import { Leaf, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-landscape.jpg";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Terraced hillsides in Rwanda showing erosion control measures"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-5 -mt-16 relative z-10">
        <div className="bg-card rounded-2xl shadow-lg border p-6 md:p-10 max-w-lg w-full text-center animate-slide-up">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Leaf className="w-7 h-7 text-primary" />
          </div>

          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
            SEC USSD App Training
          </h1>

          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            125 Rwanda Project
          </p>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
            Learn to use the USSD Soil Erosion Control App for community-based environmental monitoring — step by step, right from your phone.
          </p>

          <Button
            onClick={onStart}
            size="lg"
            className="w-full md:w-auto text-base font-bold gap-2 h-14 px-10 rounded-xl"
          >
            Start Training
            <ArrowRight className="w-5 h-5" />
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            11 sections · Interactive quizzes · ~25 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
