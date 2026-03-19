import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const LanguageToggle = () => {
  const { lang, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    if (lang === "en") {
      // Switch to Kinyarwanda: add /rw prefix
      navigate("/rw" + location.pathname);
    } else {
      // Switch to English: remove /rw prefix
      const path = location.pathname.replace(/^\/rw/, "") || "/";
      navigate(path);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-1.5 text-xs font-semibold"
    >
      <Globe className="w-4 h-4" />
      {t("lang.switch")}
    </Button>
  );
};

export default LanguageToggle;
