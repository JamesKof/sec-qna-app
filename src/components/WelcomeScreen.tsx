import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, ArrowRight, LayoutDashboard, Globe } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import heroImg from "@/assets/hero-landscape.jpg";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import PartnerLogos from "./PartnerLogos";
import { useI18n } from "@/lib/i18n";

interface WelcomeScreenProps {
  onStart: (certificateName: string) => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");

  const handleStart = () => {
    if (!name.trim()) return;
    onStart(name.trim());
  };

  const switchToLanguage = (targetLang: "en" | "rw") => {
    if (targetLang === lang) return;
    if (targetLang === "rw") {
      navigate("/rw" + location.pathname);
    } else {
      const path = location.pathname.replace(/^\/rw/, "") || "/";
      navigate(path);
    }
  };

  const dashboardPath = lang === "rw" ? "/rw/login" : "/login";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>

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
          {/* Language Selection Buttons */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              onClick={() => switchToLanguage("en")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                lang === "en"
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Globe className="w-4 h-4" />
              English
            </button>
            <button
              onClick={() => switchToLanguage("rw")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                lang === "rw"
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Globe className="w-4 h-4" />
              Kinyarwanda
            </button>
          </div>

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Leaf className="w-7 h-7 text-primary" />
          </div>

          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t("welcome.title")}
          </h1>

          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            {t("welcome.project")}
          </p>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
            {t("welcome.description")}
          </p>

          {/* Certificate Name Input */}
          <div className="text-left mb-4 space-y-2">
            <Label htmlFor="certName" className="text-sm font-semibold">
              {t("welcome.nameLabel")}
            </Label>
            <Input
              id="certName"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t("welcome.namePlaceholder")}
              className="text-center"
              onKeyDown={e => { if (e.key === "Enter" && name.trim()) handleStart(); }}
            />
          </div>

          <Button
            onClick={handleStart}
            disabled={!name.trim()}
            size="lg"
            className="w-full md:w-auto text-base font-bold gap-2 h-14 px-10 rounded-xl"
          >
            {t("welcome.start")}
            <ArrowRight className="w-5 h-5" />
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            {t("welcome.info")}
          </p>

          <Link to={dashboardPath}>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 gap-2 text-muted-foreground hover:text-foreground"
            >
              <LayoutDashboard className="w-4 h-4" />
              {t("welcome.dashboard")}
            </Button>
          </Link>
        </div>

        <PartnerLogos />
      </div>
    </div>
  );
};

export default WelcomeScreen;
