import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const { lang, setLang, t } = useI18n();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(lang === "en" ? "rw" : "en")}
      className="gap-1.5 text-xs font-semibold"
    >
      <Globe className="w-4 h-4" />
      {t("lang.switch")}
    </Button>
  );
};

export default LanguageToggle;
